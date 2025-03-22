package com.example.demo.booking.bookingCMRS.service;

import com.example.demo.booking.DTO.AddBookingHandler;

public interface IBookingService {
    
    public void addBooking(AddBookingHandler booking, String token);
}
