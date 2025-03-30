package com.example.demo.property.propertycmrs.DTO;

import lombok.Data;

@Data
public class ReviewHandler {
    private int score;
    private String title;
    private String body;
    private String propertyId;
    private String bookingId;
}
