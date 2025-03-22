package com.example.demo.booking.bookingCMRS.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        BookingModel bm = new BookingModel();
        System.out.println("id test" + bm.getId());
        String userId = JwtProvider.getIdFromJwtToken(token);
        System.out.println("hi");
        Optional<PropertyModel> pm = propertyRepo.findById(new ObjectId(booking.getPropertyId()));
        System.out.println("property id" + booking.getPropertyId());
        System.out.println(pm.get().toString());
        ObjectId ownerId = pm.get().getOwnerId();
        UserModel um = userRepository.findById(ownerId).get();
        String ownerEmail = um.getEmail();
        //https://stackoverflow.com/questions/27005861/calculate-days-between-two-dates-in-java-8
        double totalCost = getAdditionalGuests(booking, pm);

        bm.setPropertyId(new ObjectId(booking.getPropertyId()));
        bm.setGuestId(new ObjectId(userId));
        bm.setOwnerId(ownerId);
        bm.setStartDate(booking.getStart());
        bm.setEndDate(booking.getEnd());
        bm.setNumChildren(booking.getGuests().get("childCount"));
        bm.setNumAdults(booking.getGuests().get("adultCount"));
        bm.setNumPets(booking.getGuests().get("petCount"));
        bm.setTotalCost(totalCost);
        bm.setAccepted(false);
        bm.setCancelled(false);
        bookingRepo.save(bm);
        sendEmail(pm, ownerEmail);
    }


    @Override
    public Map<String,List<BookingModel>> getBookings(String token) {
        //String id = JwtProvider.getIdFromJwtToken(token);
        
       //List<BookingModel> bms = bookingRepo.findBookingByGuestId(new ObjectId(id));
       return bookingRepo.getBookings(token);
    }


    

    private void sendEmail(Optional<PropertyModel> pm, String ownerEmail) {
        EmailTemplate et = new EmailTemplate();
        et.setMsgBody("New booking request for property\n" + pm.get().getTitle());
        et.setRecipient(ownerEmail);
        et.setSubject("new booking request");
        emailService.sendSimpleMail(et);
    }

    private double getAdditionalGuests(AddBookingHandler booking, Optional<PropertyModel> pm) {
        long daysBetween = ChronoUnit.DAYS.between(booking.getStart(), booking.getEnd());
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



    
}
