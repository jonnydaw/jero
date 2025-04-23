package com.example.demo.booking.bookingCMRS.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
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
        //System.out.println("cont");
        Map<String, List<PropertyBooking>> propertyBooking = propertyService.getPropertiesFromBookings(bookingService.getBookings(token), token);
        return ResponseEntity.ok().body(propertyBooking);
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
 