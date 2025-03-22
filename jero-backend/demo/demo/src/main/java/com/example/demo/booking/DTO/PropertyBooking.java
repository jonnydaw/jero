package com.example.demo.booking.DTO;

import java.time.LocalDate;
import java.util.Map;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class PropertyBooking {
    private String propertyId;
    private String bookingId;
    private String title;
    private String image;
    private LocalDate start;
    private LocalDate end;
    private int numAdults;
    private int numChildren;
    private int numPets;
    private double totalCost;
    
}
