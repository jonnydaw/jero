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
	// https://www.mongodb.com/docs/atlas/atlas-search/create-index/
	// https://www.mongodb.com/docs/atlas/atlas-search/text/
	// https://www.mongodb.com/docs/atlas/atlas-search/tutorial/run-query/
	// https://www.mongodb.com/docs/manual/reference/operator/query/text/
	// https://www.mongodb.com/docs/manual/tutorial/text-search-in-aggregation/
	// https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string
	@Aggregation(pipeline = { 
		"{'$match': {'$text': {'$search': ?0}}}",
		"{'$project': { '_id': 1 } }",
		"{'$limit' : 3}"

	})
    public List<String> findFallbacks(String undeterminedLocation);
} 
