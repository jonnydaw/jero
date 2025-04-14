package com.example.demo.booking.bookingCMRS.repo;

import java.util.Map;
import java.util.List;

import com.example.demo.booking.bookingCMRS.model.BookingModel;

public interface BookingTemplateRepository {

    Map<String, List<BookingModel>>  getBookings(String token);
    public Map<String, List<BookingModel>> getBookingsFromPropertyId(String propertyId);

    
}
