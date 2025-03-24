package com.example.demo.locations.locationCMRS.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.locations.locationCMRS.service.ILocationService;
import com.example.demo.locations.locationCMRS.service.LocationService;

@RestController
@RequestMapping("/location")
//@CrossOrigin(origins = "http://000", allowCredentials = "true")

public class LocationController {
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired ILocationService locationService;

    // https://stackoverflow.com/questions/60421302/spring-boot-handling-multiple-parameters-in-a-get-request
    @GetMapping("/get_location")
    public ResponseEntity<?> checkIfLocationIsAllowed(@RequestParam Map<String, String> areaTypeToName){
        System.out.println("hit 5 " + areaTypeToName.toString());
        String mp = locationService.findMostPreciseLocation(areaTypeToName);
        System.out.println("area type " + areaTypeToName.toString());
        Map<String,String> granularLocations = locationService.graphLookUpFinder(mp.toLowerCase());
        return ResponseEntity.ok().body(granularLocations);
    }

    // @GetMapping("/location-overview")
    // public ResponseEntity<?> getPropertiesFromLocation(@RequestParam("location") String location, @RequestParam("locale") String locale){
    //     System.out.println(locale);
    //     String res = locationService.getLocationOverview(location, locale);
    //     return ResponseEntity.ok().body(res);
    // }
    
}
// 