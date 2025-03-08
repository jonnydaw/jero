package com.example.demo.locations.locationCMRS.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.locations.locationCMRS.model.LocationModel;

@Repository
public interface LocationRepository extends MongoRepository<LocationModel, String>, LocationGraphLookupRepository {
	Map<String, String> getLocationHierarchy(String id);
	LocationModel findLocationById(String lowerCase);    
} 
