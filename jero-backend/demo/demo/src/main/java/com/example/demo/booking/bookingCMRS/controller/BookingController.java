package com.example.demo.booking.bookingCMRS.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.locations.locationCMRS.service.ILocationService;
import com.example.demo.locations.locationCMRS.service.LocationService;

@RestController
@RequestMapping("/booking")
//@CrossOrigin(origins = "http://000", allowCredentials = "true")

public class BookingController {

    @Autowired IBookingService bookingService;

    @PostMapping("/add-booking")
    public ResponseEntity<?> addBooking(@RequestBody AddBookingHandler booking, @CookieValue("JWT") String token){
        // System.out.println("hit");
        // System.out.println(booking.toString());
        System.out.println("cont");
        System.out.println(booking.getPropertyId());
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
        return ResponseEntity.ok().body(bookingService.getBookings(token));
    }

    
}
 