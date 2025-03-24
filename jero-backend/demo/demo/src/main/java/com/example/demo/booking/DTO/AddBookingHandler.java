package com.example.demo.booking.DTO;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;

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
