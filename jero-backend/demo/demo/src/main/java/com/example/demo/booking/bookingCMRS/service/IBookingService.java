package com.example.demo.booking.bookingCMRS.service;

import java.util.List;
import java.util.Map;

import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.bookingCMRS.model.BookingModel;

public interface IBookingService {
    
    public void addBooking(AddBookingHandler booking, String token);

    public  Map<String,List<BookingModel>> getBookings(String token);
}
