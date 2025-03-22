package com.example.demo.booking.bookingCMRS.repo;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.locations.locationCMRS.model.LocationModel;

@Repository
public interface BookingRepo extends MongoRepository<BookingModel, ObjectId> {
	// Map<String, String> getLocationHierarchy(String id);
	// LocationModel findLocationById(String lowerCase);    
} 

