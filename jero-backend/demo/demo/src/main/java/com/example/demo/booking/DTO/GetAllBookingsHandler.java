package com.example.demo.booking.DTO;

import java.util.List;
import java.util.Map;

import com.example.demo.booking.bookingCMRS.model.BookingModel;

import lombok.Data;

@Data
public class GetAllBookingsHandler {
    OtherPartyinfo otherPartyInfo;
    Map<String, List<PropertyBooking>> propertyData;    
}
