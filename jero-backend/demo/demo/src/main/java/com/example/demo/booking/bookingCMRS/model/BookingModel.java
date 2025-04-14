package com.example.demo.booking.bookingCMRS.model;

import java.time.Instant;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "booking")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class BookingModel{
    @Id
    private ObjectId id;
    private ObjectId propertyId;
    private ObjectId guestId;
    private ObjectId ownerId;
    private Instant startDate;
    private Instant endDate;
    private int numChildren;
    private int numAdults;
    private int numPets;
    private double totalCost;
    private boolean accepted;
    private boolean cancelled;
    private boolean reviewed;
} 
