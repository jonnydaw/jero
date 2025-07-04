package com.example.demo.property.propertycmrs.model;

import java.time.Instant;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReviewsType {
    private Instant reviewDate;
    private String userName;
    private int score;
    private String title;
    private String body;
}
