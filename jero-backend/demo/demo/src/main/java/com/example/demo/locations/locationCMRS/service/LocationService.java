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
        //System.out.println("hit service");
        String mostPreciseLocation = ""; 
        // System.out.println("Locations: " + areaTypeToName.toString());
        for(String loc : areaTypeToName.values()){
            //System.out.println("loc " + loc);
            if(locationRepository.findLocationById(loc.toLowerCase()) != null){
            //     System.out.println("if");
            //    System.out.println("mostprecise: " + loc);
                mostPreciseLocation = loc;
                break;
            }
        }
       // System.out.println("Most precise:" + mostPreciseLocation);
        if(mostPreciseLocation.length() == 0){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_SUPPORTED");
        }
        return mostPreciseLocation;
    }

    @Override
    public Map<String,String> graphLookUpFinder(String mostPreciseLocation) {
      //  System.out.println("graphlookupfinderhit");
        Map<String,String> hierarchy = locationRepository.getLocationHierarchy(mostPreciseLocation.toLowerCase());
      //  System.out.println(hierarchy);
        return hierarchy;
    }

    @Override 
    public Map<String,Object> getLocationOverview(String queriedLocation, String locale,int month){
        LocationModel location  = locationRepository.findLocationById(queriedLocation);
        if(location == null){
            List<String> fallbacks =(locationRepository.findFallbacks(queriedLocation));
            if(fallbacks == null || fallbacks.size() == 0){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
            } else{
                String longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy = "";
                for(String fallback : fallbacks){
                    if(fallback.length() > longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy.length()){
                        longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy = fallback;
                    }
                }
                if(longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy.equals("")){
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
                }
                return getLocationOverview(longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy, locale, month);
            }
        }
        System.out.println("hit location overview service");
        System.out.println(location.getOverview().get("en"));
        int temp = location.getTemperature().get(month - 1);
        Map<String,Object> res = location.getOverview().get("en");
        res.put("temp", temp);
        return res;
    }



}
