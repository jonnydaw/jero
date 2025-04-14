package com.example.demo.booking.DTO;

import java.time.Instant;


import lombok.Data;

@Data
public class PropertyBooking {
    private String propertyId;
    private String bookingId;
    private String title;
    private String image;
    private Instant start;
    private Instant end;
    private int numAdults;
    private int numChildren;
    private int numPets;
    private double totalCost;
    private boolean accepted;
    private boolean cancelled;
    private OtherPartyinfo otherPartyInfo;  
}
