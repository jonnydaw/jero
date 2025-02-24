package com.example.demo.property.propertycmrs.model;

import java.util.Date;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReviewsType {
    private Date reviewDate;
    private String title;
    private String body;
}
