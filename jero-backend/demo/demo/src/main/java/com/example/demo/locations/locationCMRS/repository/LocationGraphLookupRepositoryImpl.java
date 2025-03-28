package com.example.demo.locations.locationCMRS.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GraphLookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;

import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.mongodb.client.AggregateIterable;


public class LocationGraphLookupRepositoryImpl implements LocationGraphLookupRepository {

    @Autowired
    MongoTemplate mongoTemplate;



    @Override
    public Map<String,String> getLocationHierarchy(String mostPreciseLocation){

        // https://github.com/kmandalas/spring-mongodb-graphlookup/blob/master/src/main/java/com/github/kmandalas/mongodb/repository/NodeRepositoryImpl.java
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
        // List<Document> hi = mongoTemplate.aggregate(aggregation, "location", Document.class).getMappedResults();
        // System.out.println("first " + hi);
        System.out.println("*****************");

        List<LocationModel> subList = results.getFirst().getNParents();
        Map<String,String> map = new HashMap<>();
        String[] locationOptions = new String[]{
            "town", 
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
        //arr.add(mostPreciseLocation);
        for(LocationModel he : subList){
            // Object x = he.get("id");
            // System.out.println(x.toString());
            map.put(he.getLocationType(), he.getId());
            // System.out.println(he.getId());
            // System.out.println();
        }
        System.out.println("****************");
        //System.out.println(results.get(0).getNParents());
        System.out.println("results" + results);

        return map;
    }
    
}
