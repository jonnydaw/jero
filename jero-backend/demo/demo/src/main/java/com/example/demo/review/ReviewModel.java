package com.example.demo.review;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "review")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class ReviewModel {
    @Id
    private int id = 1;
    private List<Double> scores;
}
