package com.example.demo.booking.DTO;

import java.time.LocalDate;
import java.util.Map;

import org.bson.types.ObjectId;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddBookingHandler {
    private String propertyId;
    private LocalDate start;
    private LocalDate end;
    private Map<String, Integer> guests;
    private double frontendPrice;
}
