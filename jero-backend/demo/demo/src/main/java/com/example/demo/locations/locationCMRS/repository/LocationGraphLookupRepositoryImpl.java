package com.example.demo.locations.locationCMRS.repository;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import com.example.demo.locations.locationCMRS.model.LocationModel;




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

        return newVersion;
    }
    
}
