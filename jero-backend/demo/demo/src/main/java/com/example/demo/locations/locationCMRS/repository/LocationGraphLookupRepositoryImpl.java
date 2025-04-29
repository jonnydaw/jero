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
import com.sun.jdi.Location;




public class LocationGraphLookupRepositoryImpl implements LocationGraphLookupRepository {

    @Autowired
    MongoTemplate mongoTemplate;



    @Override
    public Map<String,String> getLocationHierarchy(String mostPreciseLocation){
        System.out.println(1);

        Map<String, String> newVersion = new HashMap<>();
        LocationModel location = mongoTemplate.findById(mostPreciseLocation, LocationModel.class, "location");
        if(location == null){
            return newVersion;
        }
        // String id = location.getId();
        // String parent = location.getParent();
        // String locationType = location.getLocationType();
        //System.out.println(location.getId());
        int count = 0;
        while(location != null && location.getParent() != null){
            newVersion.put(location.getLocationType(), location.getId());
          //  System.out.println(newVersion.toString());
            location = mongoTemplate.findById(location.getParent(), LocationModel.class, "location");
            count++;
            if(count == 10){
                break;
            }
        }
        if(location != null){
            newVersion.put(location.getLocationType(), location.getId());
        }

        //System.out.println("newVersion " + newVersion.toString());

       // Map<String,String> map = new HashMap<>();
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
            if(!newVersion.containsKey(locationOption)){
                newVersion.put(locationOption, "");
            }
        }

        // map.put(results.getFirst().getLocationType(), results.getFirst().getId());
        // for(LocationModel he : subList){
        //     map.put(he.getLocationType(), he.getId());

        // }
        // System.out.println("****************");
        // System.out.println("results" + );
        //System.out.println("old version " + map.toString());
        return newVersion;
    }
    
}
