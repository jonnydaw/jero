package com.example.demo.locations.locationCMRS.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GraphLookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;

import org.springframework.data.mongodb.core.query.Criteria;

import com.example.demo.locations.locationCMRS.model.LocationModel;

// https://stackoverflow.com/questions/38288258/spring-boot-with-mongotemplate
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/  
// https://github.com/kmandalas/spring-mongodb-graphlookup/blob/master/src/main/java/com/github/kmandalas/mongodb/repository/NodeRepositoryImpl.java
// https://stackoverflow.com/questions/50057396/spring-data-mongodb-graphlookup-query-does-not-contain-as-field
// https://stackoverflow.com/questions/40989763/mongodb-graphlookup
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/
// https://github.com/spring-projects/spring-data-mongodb/blob/main/spring-data-mongodb/src/main/java/org/springframework/data/mongodb/core/aggregation/GraphLookupOperation.java
// https://docs.spring.io/spring-data/mongodb/docs/2.1.0.RELEASE/api/index.html?org/springframework/data/mongodb/core/aggregation/GraphLookupOperation.FromBuilder.html
// https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/aggregation/GraphLookupOperation.html
// https://www.oodlestechnologies.com/blogs/How-To-Use-GraphLookup-In-Mongodb/
// https://stackoverflow.com/questions/47764704/mongodb-graphlookup-in-java-spring-data
// https://www.mongodb.com/community/forums/t/problem-with-a-graphlookup/301555
// https://stackoverflow.com/questions/67170965/mongodb-recursive-query-not-working-as-expected-with-graphlookup
// https://stackoverflow.com/questions/61988004/aggregation-graphlookup-retrieving-results-in-different-order-every-time-the-qu
// https://stackoverflow.com/questions/63150091/mongodb-graphlookup-aggregation-inconsistent-ouput-order-and-sorting
// https://www.mongodb.com/community/forums/t/graphlookup-does-not-return-documents-in-order/10426

public class LocationGraphLookupRepositoryImpl implements LocationGraphLookupRepository {

    @Autowired
    MongoTemplate mongoTemplate;



    @Override
    public Map<String,String> getLocationHierarchy(String mostPreciseLocation){
        System.out.println(1);

        final MatchOperation matchStage = Aggregation.match(new Criteria("_id").is(mostPreciseLocation));
        GraphLookupOperation graphLookupOperation = GraphLookupOperation.builder()
                .from("location")
                .startWith("$parent")
                .connectFrom("parent")
                .connectTo("_id")
                .maxDepth(10)
                .depthField("order")
                .as("nParents");
        // https://stackoverflow.com/questions/63412261/aggregate-sort-by-inner-array-in-spring-data-mongodb
        Aggregation aggregation = Aggregation.newAggregation(
            matchStage, 
            graphLookupOperation, 
            Aggregation.unwind("nParents"), 
            Aggregation.sort(Sort.Direction.ASC, "nParents.order"),
            Aggregation.group("_id")
                .first("parent").as("parent")
                .first("locationType").as("locationType")
                .push("nParents").as("nParents")
            );
      
        List<LocationModel> results = mongoTemplate.aggregate(aggregation, "location", LocationModel.class).getMappedResults();
        System.out.println("*****************");

        List<LocationModel> subList = results.getFirst().getNParents();
        Map<String,String> map = new HashMap<>();
        String[] locationOptions = new String[]{
            "town", 
            "neighbourhood",
            "city_district",
            "city", 
            "county", 
            "state",
            "country"
        }; 
        for(String locationOption : locationOptions){
            map.put(locationOption, "");
        }

        map.put(results.getFirst().getLocationType(), results.getFirst().getId());
        for(LocationModel he : subList){
            map.put(he.getLocationType(), he.getId());

        }
        System.out.println("****************");
        System.out.println("results" + results);

        return map;
    }
    
}
