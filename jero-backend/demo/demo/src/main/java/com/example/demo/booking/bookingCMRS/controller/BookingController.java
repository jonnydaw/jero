package com.example.demo.booking.bookingCMRS.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.DTO.GetAllBookingsHandler;
import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.locations.locationCMRS.service.ILocationService;
import com.example.demo.locations.locationCMRS.service.LocationService;
import com.example.demo.property.propertycmrs.service.IPropertyService;

@RestController
@RequestMapping("/booking")
//@CrossOrigin(origins = "http://000", allowCredentials = "true")

public class BookingController {

    @Autowired IBookingService bookingService;
    @Autowired IPropertyService propertyService;

    @PostMapping("/add-booking")
    public ResponseEntity<?> addBooking(@RequestBody AddBookingHandler booking, @CookieValue("JWT") String token){
        bookingService.addBooking(booking, token);
        return ResponseEntity.ok().body("confirmed");
    }



    @GetMapping("/get-upcoming-bookings")
    public ResponseEntity<?> addBooking(@CookieValue("JWT") String token){
        // System.out.println("hit");
        // System.out.println(booking.toString());
        System.out.println("cont");
        // System.out.println(booking.getPropertyId());
        //List<BookingModel> bookings = ;
        // GetAllBookingsHandler gabh = new GetAllBookingsHandler();
        // gabh.setBookingData(bookingService.getBookings(token));
        Map<String, List<PropertyBooking>> hi = propertyService.getPropertiesFromBookings(bookingService.getBookings(token));
        return ResponseEntity.ok().body(hi);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptBooking(@CookieValue("JWT") String token, @RequestBody Map<String, String> bookingId){
        System.out.println(bookingId);
        bookingService.acceptBooking(bookingId.get("bookingId"), token);
        return ResponseEntity.ok().body("booking accepted");
    }

    @PatchMapping("/cancel-booking")
    public ResponseEntity<?> cancelBooking(@RequestBody Map<String, String> bookingId, @CookieValue("JWT") String token){
        bookingService.deleteBooking(bookingId.get("bookingId"), token);
        
        return ResponseEntity.ok().body("cancelled");


    }
}
 