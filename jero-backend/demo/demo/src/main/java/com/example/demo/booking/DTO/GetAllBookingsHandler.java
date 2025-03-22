package com.example.demo.booking.DTO;

import java.util.List;
import java.util.Map;

import com.example.demo.booking.bookingCMRS.model.BookingModel;

import lombok.Data;

@Data
public class GetAllBookingsHandler {
    Map<String, List<BookingModel>> bookingData;
    Map<String, PropertyBooking> propertyData;    
}
