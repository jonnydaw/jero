package com.example.demo.booking.DTO;

import java.util.Map;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddBookingHandler {
    private String propertyId;
    private String start;
    private String end;
    private Map<String, Integer> guests;
    private double frontendPrice;
}
