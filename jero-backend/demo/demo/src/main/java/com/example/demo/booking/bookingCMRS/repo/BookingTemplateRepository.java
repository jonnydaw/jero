package com.example.demo.booking.bookingCMRS.repo;

import java.util.Map;
import java.util.List;

import org.bson.types.ObjectId;

import com.example.demo.booking.bookingCMRS.model.BookingModel;

public interface BookingTemplateRepository {

    Map<String, List<BookingModel>>  getBookings(String token);
    
}
