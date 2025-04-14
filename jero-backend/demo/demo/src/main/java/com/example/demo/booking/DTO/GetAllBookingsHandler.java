package com.example.demo.booking.DTO;

import java.util.List;
import java.util.Map;


import lombok.Data;

@Data
public class GetAllBookingsHandler {
    OtherPartyinfo otherPartyInfo;
    Map<String, List<PropertyBooking>> propertyData;    
}
