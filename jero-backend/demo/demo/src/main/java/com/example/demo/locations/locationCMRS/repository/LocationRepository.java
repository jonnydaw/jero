package com.example.demo.locations.locationCMRS.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.locations.locationCMRS.model.LocationModel;

@Repository
public interface LocationRepository extends MongoRepository<LocationModel, String>, LocationGraphLookupRepository {
	Map<String, String> getLocationHierarchy(String id);
	LocationModel findLocationById(String lowerCase);   

	// https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/repository/Aggregation.html
	// https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/search/
	//https://www.mongodb.com/docs/atlas/atlas-search/tutorial/run-query/
	@Aggregation(pipeline = { 
		"{'$search': {'index' : 'default', 'text': {'query' : ?0, 'path':'_id'}}}",
		"{'$project': { '_id': 1 } }",
		"{'$limit' : 3}"

	})
    public List<String> findFallbacks(String undeterminedLocation);
} 
