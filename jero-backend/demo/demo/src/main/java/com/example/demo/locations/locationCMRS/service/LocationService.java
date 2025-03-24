package com.example.demo.locations.locationCMRS.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;

@Service
public class LocationService implements ILocationService {
    
    @Autowired LocationRepository locationRepository;



    @Override
    public String findMostPreciseLocation(Map<String,String> areaTypeToName) {
        System.out.println("hit service");
        String mostPreciseLocation = ""; 
        System.out.println("Locations: " + areaTypeToName.toString());
        for(String loc : areaTypeToName.values()){
            System.out.println("loc " + loc);
            if(locationRepository.findLocationById(loc.toLowerCase()) != null){
                System.out.println("if");
               System.out.println("mostprecise: " + loc);
                mostPreciseLocation = loc;
                break;
            }
        }
        System.out.println("Most precise:" + mostPreciseLocation);
        if(mostPreciseLocation.length() == 0){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_SUPPORTED");
        }
        return mostPreciseLocation;
    }

    @Override
    public Map<String,String> graphLookUpFinder(String mostPreciseLocation) {
        Map<String,String> hierarchy = locationRepository.getLocationHierarchy(mostPreciseLocation.toLowerCase());
        System.out.println(hierarchy);
        return hierarchy;
    }

    // @Override 
    // public String getLocationOverview(String queriedLocation, String locale){
    //     LocationModel location  = locationRepository.findLocationById(queriedLocation);
    //     if(location == null){
    //         throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
    //     }
    //     return location.getOverview().get(locale);
    // }



}
