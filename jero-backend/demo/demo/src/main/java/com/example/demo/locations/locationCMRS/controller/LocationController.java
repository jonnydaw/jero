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

@RestController
@RequestMapping("/country")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class LocationController {
    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired private ILocationService locationService;
    // https://stackoverflow.com/questions/60421302/spring-boot-handling-multiple-parameters-in-a-get-request
    @GetMapping("/get_location")
    public ResponseEntity<?> checkIfLocationIsAllowed(@RequestParam Map<String,String> areaTypeToName){
        String mp = locationService.findMostPreciseLocation(areaTypeToName);
        // System.out.println(mp);
        // List<String> list = new ArrayList<>();
        // list.add(mp);
        List<String> granularLocations = locationService.graphLookUpFinder(mp.toLowerCase());
        return ResponseEntity.ok().body(granularLocations);
    }
    
}
// 