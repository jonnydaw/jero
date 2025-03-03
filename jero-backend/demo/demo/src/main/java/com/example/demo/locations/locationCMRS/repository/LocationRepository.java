package com.example.demo.locations.locationCMRS.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.locations.locationCMRS.model.LocationModel;

@Repository
public interface LocationRepository extends MongoRepository<LocationModel, String>, LocationGraphLookupRepository {
	List<String> getLocationHierarchy(String id);

	LocationModel findLocationById(String lowerCase);    
} 
