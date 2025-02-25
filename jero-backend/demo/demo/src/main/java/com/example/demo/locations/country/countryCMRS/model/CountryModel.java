package com.example.demo.locations.country.countryCMRS.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "country")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class CountryModel{
    @Id
    private ObjectId id;
    private String country;
    private String pLanguage;
    private String overview;
}