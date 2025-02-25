package com.example.demo.locations.country.countryCMRS.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.locations.country.countryCMRS.model.CountryModel;

@Repository
public interface CountryRepository extends MongoRepository<CountryModel, ObjectId> {
	CountryModel findByCountry(String country);
    
} 
