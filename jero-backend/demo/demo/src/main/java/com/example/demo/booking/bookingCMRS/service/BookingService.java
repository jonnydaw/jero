package com.example.demo.booking.bookingCMRS.service;

import java.time.Instant;

import java.time.temporal.ChronoUnit;

import java.util.Collections;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.email.EmailTemplate;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class BookingService implements IBookingService {
    
    @Autowired BookingRepo bookingRepo;
    @Autowired PropertyRepo propertyRepo;
    @Autowired UserRepository userRepository;
    @Autowired IEmailService emailService;

    @Override
    public void addBooking(AddBookingHandler booking, String token) {
        if(!JwtProvider.getRoleFromJwtToken(token).equals("customer")){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "HOSTS_CANNOT_BOOK");
        }
        Instant start = Instant.parse(booking.getStart()+"T00:00:00.000Z");
        Instant end = Instant.parse(booking.getEnd()+"T00:00:00.000Z");

        Instant tomorrow = Instant.parse(Instant.now().plus(1, ChronoUnit.DAYS).toString().split("T")[0]+"T00:00:00.000Z");
        //Instant overmorrow = Instant.parse(Instant.now().plus(2, ChronoUnit.DAYS).toString().split("T")[0]+"T00:00:00.000Z");

        if(start.isBefore(tomorrow)){
            throw new ResponseStatusException(HttpStatus.TOO_EARLY, "START_DATE_IS_IN_PAST");
        }

        if(end.isBefore(start)){
            throw new ResponseStatusException(HttpStatus.TOO_EARLY, "END_DATE_IS_BEFORE_START");

        }

        BookingModel bm = new BookingModel();
      //  System.out.println("id test" + bm.getId());
        String userId = JwtProvider.getIdFromJwtToken(token);
        //System.out.println("hi");
        Optional<PropertyModel> optionalProperty = propertyRepo.findById(new ObjectId(booking.getPropertyId()));

        if(optionalProperty.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }
        PropertyModel property = optionalProperty.get();
        int totalGuests = booking.getGuests().get("adultCount") + booking.getGuests().get("childCount");
        if(totalGuests < property.getMinGuests()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TOO_FEW");
        }

        if(totalGuests > property.getMaxGuests()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TOO_MANY");
        }

        double totalCost = getAdditionalGuests(booking, property);
        if(totalCost != booking.getFrontendPrice()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "PRICE_MISMATCH");
        }
        
        
        Set<Instant> blocked = property.getBlockedDates();
        Set<Instant> requestedDays = populateInstantRange(start, end);

        boolean unique = Collections.disjoint(blocked,requestedDays);
        System.out.println("unqiue: " + unique);
         if(!unique){
             throw new ResponseStatusException(HttpStatus.CONFLICT, "BOOKING_CONFLICT");
 
         }

        ObjectId ownerId = property.getOwnerId();
        Optional<UserModel> optionalUser = userRepository.findById(ownerId);
        if(optionalUser.isEmpty()){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED);
        }
        UserModel user = optionalUser.get();
        String ownerEmail = user.getEmail();
        //https://stackoverflow.com/questions/27005861/calculate-days-between-two-dates-in-java-8



        bm.setPropertyId(new ObjectId(booking.getPropertyId()));
        bm.setGuestId(new ObjectId(userId));
        bm.setOwnerId(ownerId);
        bm.setStartDate(start);

        bm.setEndDate(end);
        bm.setNumChildren(booking.getGuests().get("childCount"));
        bm.setNumAdults(booking.getGuests().get("adultCount"));
        bm.setNumPets(booking.getGuests().get("petCount"));
        bm.setTotalCost(totalCost);
        bm.setAccepted(false);
        bm.setCancelled(false);
        bm.setReviewed(false);
        bookingRepo.save(bm);
        sendEmail(property, ownerEmail);
    }


    @Override
    public Map<String,List<BookingModel>> getBookings(String token) {
       return bookingRepo.getBookings(token);
    }

    @Override
    public void acceptBooking(String id, String token){
        Optional<BookingModel> optionalBooking = bookingRepo.findById(new ObjectId(id));
        
        if(optionalBooking.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "BOOKING_NOT_FOUND");
        }
        
        BookingModel booking = optionalBooking.get();
        String userId = JwtProvider.getIdFromJwtToken(token);

        if(!userId.equals(booking.getOwnerId().toHexString())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not allowed");
        }

        Optional<PropertyModel> optionalProperty = propertyRepo.findById(booking.getPropertyId());

        if(optionalProperty.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }
        PropertyModel pm = optionalProperty.get();

        Set<Instant> toBlock = populateInstantRange(booking.getStartDate(), booking.getEndDate());

        Set<Instant> currentBlockedDates = pm.getBlockedDates();
        
        // https://stackoverflow.com/questions/8708542/something-like-contains-any-for-java-set
       boolean unique = Collections.disjoint(currentBlockedDates,toBlock);
        if(!unique){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "DATE CONFLICT");

        }
        booking.setAccepted(true);

        // https://stackoverflow.com/questions/9062574/is-there-a-better-way-to-combine-two-string-sets-in-java
        Set<Instant> updatedBlockedDates = Stream.concat(currentBlockedDates.stream(), toBlock.stream())
        .collect(Collectors.toSet());

        pm.setBlockedDates(updatedBlockedDates);
        propertyRepo.save(pm);
        bookingRepo.save(booking);
    }


    @Override
    public void deleteBooking(String id, String token) {
        Optional<BookingModel> optionalBooking = bookingRepo.findById(new ObjectId(id));

        if(optionalBooking.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "BOOKING_NOT_FOUND");
        }

        BookingModel bm = optionalBooking.get();

        String userId = JwtProvider.getIdFromJwtToken(token);

        if((bm.getOwnerId() == null || !userId.equals(bm.getOwnerId().toHexString())) && 
        (bm.getGuestId() == null || !userId.equals(bm.getGuestId().toHexString()) )){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not allowed");
        }

        Optional<PropertyModel> optionalProperty = propertyRepo.findById(bm.getPropertyId());

        if(optionalProperty.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }

        PropertyModel pm = optionalProperty.get();

        Set<Instant> toUnblock = populateInstantRange(bm.getStartDate(), bm.getEndDate());
       
        Set<Instant> currentBlockedDates = pm.getBlockedDates();
        currentBlockedDates.removeAll(toUnblock);
       // pm.setBlockedDates(currentBlockedDates);
        bm.setCancelled(true);
        propertyRepo.save(pm);
        bookingRepo.save(bm);
    }

    @Override
    public void verifyUser(String token, String bookingID) {
        // TODO Auto-generated method stub
        String userRequestId = JwtProvider.getIdFromJwtToken(token);
        Optional<BookingModel> bookingOpt = bookingRepo.findById(new ObjectId(bookingID));

        if(!bookingOpt.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "BOOKING_NOT_FOUND");
        }
        BookingModel booking = bookingOpt.get();
        if(!userRequestId.equals(booking.getGuestId().toHexString())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "user not part of booking");
        }

        if(!booking.isAccepted() || booking.isCancelled()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "booking not accepted");
        }

        Instant dayAfterBookingEnd = booking.getEndDate().plus(1, ChronoUnit.DAYS);
        //System.out.println(dayAfterBookingEnd.toString());
        Instant now = Instant.now();
        if(dayAfterBookingEnd.isBefore(now)){
            throw new ResponseStatusException(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, "booking in the past");
        }
    }

    @Override 
    public void handleDeletedUserBooking(String jwt, List<BookingModel> bookings ){

        String role = JwtProvider.getRoleFromJwtToken(jwt);

        if(role.equals("host")){
            for(BookingModel booking : bookings){
                booking.setPropertyId(new ObjectId("67f6ae5881ebbd6dc69897e1"));
                booking.setOwnerId(new ObjectId("67f6b00b81ebbd6dc69897e5"));
            }
            bookingRepo.saveAll(bookings);

        } else if (role.equals("customer")){
            for(BookingModel booking : bookings){
                booking.setGuestId(new ObjectId("67f6b00b81ebbd6dc69897e5"));
            }
            bookingRepo.saveAll(bookings);

        }

    }


    

    private void sendEmail(PropertyModel pm, String ownerEmail) {
        EmailTemplate et = new EmailTemplate();
        et.setMsgBody("New booking request for property\n" + pm.getTitle());
        et.setRecipient(ownerEmail);
        et.setSubject("new booking request");
        emailService.sendSimpleMail(et);
    }

    private double getAdditionalGuests(AddBookingHandler booking, PropertyModel property) {
        Instant start = Instant.parse(booking.getStart()+"T00:00:00.000Z");
        Instant end = Instant.parse(booking.getEnd()+"T00:00:00.000Z");
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        double pricePerNight = property.getPricePerNight();
        double priceIncrese = property.getPriceIncreasePerPerson();
        double totalCost = daysBetween * pricePerNight;
        int additionalGuests = -1 + booking.getGuests().get("adultCount") + 
        booking.getGuests().get("childCount");
        System.out.println("additional " + additionalGuests);
        if(pricePerNight > 0 && additionalGuests > 0){
            totalCost += additionalGuests * priceIncrese * daysBetween;
        }
        return totalCost;
    }





    private Set<Instant> populateInstantRange(Instant start, Instant end) {
        Set<Instant> range = new HashSet<>();
        long days = ChronoUnit.DAYS.between(start, end);
        for(long day = 0; day < days; day++){
            range.add(start.plus(day, ChronoUnit.DAYS));
        }
        return range;
    }




}
