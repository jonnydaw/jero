package com.example.demo.property.propertycmrs.model;

import java.time.Instant;
import java.util.Date;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReviewsType {
    private Instant reviewDate;
    private int score;
    private String title;
    private String body;
}
