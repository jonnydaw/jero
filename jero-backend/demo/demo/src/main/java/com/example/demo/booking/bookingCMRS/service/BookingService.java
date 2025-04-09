package com.example.demo.booking.bookingCMRS.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
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
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "DATE CONFLICT");
        }
        Instant start = Instant.parse(booking.getStart()+"T00:00:00.000Z");
        Instant end = Instant.parse(booking.getEnd()+"T00:00:00.000Z");


        BookingModel bm = new BookingModel();
        System.out.println("id test" + bm.getId());
        String userId = JwtProvider.getIdFromJwtToken(token);
        System.out.println("hi");
        Optional<PropertyModel> pm = propertyRepo.findById(new ObjectId(booking.getPropertyId()));

        System.out.println("property id" + booking.getPropertyId());
        System.out.println(pm.get().toString());
        
        Set<Instant> blocked = pm.get().getBlockedDates();
        Set<Instant> requestedDays = populateInstantRange(start, end);
        System.out.println("blocked: " + blocked);
        System.out.println("request: " + requestedDays);
        boolean unique = Collections.disjoint(blocked,requestedDays);
        System.out.println("unqiue: " + unique);
         if(!unique){
             throw new ResponseStatusException(HttpStatus.CONFLICT, "ONLY_CUSTOMERS");
 
         }

        ObjectId ownerId = pm.get().getOwnerId();
        UserModel um = userRepository.findById(ownerId).get();
        String ownerEmail = um.getEmail();
        //https://stackoverflow.com/questions/27005861/calculate-days-between-two-dates-in-java-8
        double totalCost = getAdditionalGuests(booking, pm);

        bm.setPropertyId(new ObjectId(booking.getPropertyId()));
        bm.setGuestId(new ObjectId(userId));
        bm.setOwnerId(ownerId);
        bm.setStartDate(start);
        System.out.println("Booking end: " + end);
        System.out.println("Booking end 2: " + end.toString());
        bm.setEndDate(end);
        bm.setNumChildren(booking.getGuests().get("childCount"));
        bm.setNumAdults(booking.getGuests().get("adultCount"));
        bm.setNumPets(booking.getGuests().get("petCount"));
        bm.setTotalCost(totalCost);
        bm.setAccepted(false);
        bm.setCancelled(false);
        bm.setReviewed(false);
        bookingRepo.save(bm);
        sendEmail(pm, ownerEmail);
    }


    @Override
    public Map<String,List<BookingModel>> getBookings(String token) {
        //String id = JwtProvider.getIdFromJwtToken(token);
        
       //List<BookingModel> bms = bookingRepo.findBookingByGuestId(new ObjectId(id));
       return bookingRepo.getBookings(token);
    }

    @Override
    public void acceptBooking(String id, String token){
        BookingModel bm = bookingRepo.findById(new ObjectId(id)).get();
        String userId = JwtProvider.getIdFromJwtToken(token);
        if(!userId.equals(bm.getOwnerId().toHexString())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not allowed");
        }
        PropertyModel pm = propertyRepo.findById(bm.getPropertyId()).get();
        Set<Instant> toBlock = populateInstantRange(bm.getStartDate(), bm.getEndDate());
        // System.out.println("End: " + bm.getEndDate().toInstant());
        System.out.println("new " + toBlock.toString());
        Set<Instant> currentBlockedDates = pm.getBlockedDates();
        System.out.println("current " + currentBlockedDates);
        
        // https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html
       boolean unique = Collections.disjoint(currentBlockedDates,toBlock);
       System.out.println("unqiue: " + unique);
        if(!unique){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "DATE CONFLICT");

        }
        bm.setAccepted(true);
        // https://stackoverflow.com/questions/9062574/is-there-a-better-way-to-combine-two-string-sets-in-java
        Set<Instant> updatedBlockedDates = Stream.concat(currentBlockedDates.stream(), toBlock.stream())
        .collect(Collectors.toSet());
        System.out.println("new");
        System.out.println(updatedBlockedDates.toString());
        pm.setBlockedDates(updatedBlockedDates);
        propertyRepo.save(pm);
        bookingRepo.save(bm);
    }


    @Override
    public void deleteBooking(String id, String token) {
        BookingModel bm = bookingRepo.findById(new ObjectId(id)).get();
        String userId = JwtProvider.getIdFromJwtToken(token);
        if(!userId.equals(bm.getOwnerId().toHexString()) && !userId.equals(bm.getGuestId().toHexString()) ){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not allowed");
        }

        PropertyModel pm = propertyRepo.findById(bm.getPropertyId()).get();
        Set<Instant> toUnblock = populateInstantRange(bm.getStartDate(), bm.getEndDate());
        System.out.println("to unblock" + toUnblock.toString());
        Set<Instant> currentBlockedDates = pm.getBlockedDates();
        System.out.println("before removal : " + currentBlockedDates);
        currentBlockedDates.removeAll(toUnblock);
        System.out.println("after removal : " + currentBlockedDates);
        //pm.setBlockedDates(currentBlockedDates);
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "booking does not exist");
        }
        BookingModel booking = bookingOpt.get();
        if(!userRequestId.equals(booking.getGuestId().toHexString())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "user not part of booking");
        }

        if(!booking.isAccepted() || booking.isCancelled()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "booking not accepted");
        }

        Instant dayAfterBookingEnd = booking.getEndDate().plus(1, ChronoUnit.DAYS);
        System.out.println(dayAfterBookingEnd.toString());
        Instant now = Instant.now();
        if(dayAfterBookingEnd.isBefore(now)){
            throw new ResponseStatusException(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, "booking in the past");
        }
    }

    @Override 
    public void handleDeletedUserBooking(String jwt, List<BookingModel> bookings ){

        String role = JwtProvider.getRoleFromJwtToken(jwt);
        //String id = JwtProvider.getIdFromJwtToken(jwt);
        // List<BookingModel> combinedBookings = Stream.concat(bookings.get("past").stream(), bookings.get("future").stream())
        //                      .collect(Collectors.toList());
        //List<BookingModel> full = 
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


    

    private void sendEmail(Optional<PropertyModel> pm, String ownerEmail) {
        EmailTemplate et = new EmailTemplate();
        et.setMsgBody("New booking request for property\n" + pm.get().getTitle());
        et.setRecipient(ownerEmail);
        et.setSubject("new booking request");
        emailService.sendSimpleMail(et);
    }

    private double getAdditionalGuests(AddBookingHandler booking, Optional<PropertyModel> pm) {
        Instant start = Instant.parse(booking.getStart()+"T00:00:00.000Z");
        Instant end = Instant.parse(booking.getEnd()+"T00:00:00.000Z");
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        // long diff = end.getTime() - start.getTime();
        // long daysBetween = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        double pricePerNight = pm.get().getPricePerNight();
        double priceIncrese = pm.get().getPriceIncreasePerPerson();
        double totalCost = daysBetween * pricePerNight;
        int additionalGuests = -1;
        for(int val : booking.getGuests().values()){
            additionalGuests += val;
        }
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
