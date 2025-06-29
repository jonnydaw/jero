package com.example.demo.locations.locationCMRS.controller;

import java.time.LocalDate;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.locations.locationCMRS.service.ILocationService;

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
      //  System.out.println("hit 5 " + areaTypeToName.toString());
        String mp = locationService.findMostPreciseLocation(areaTypeToName);
        //System.out.println("area type " + areaTypeToName.toString());
        Map<String,String> granularLocations = locationService.graphLookUpFinder(mp.toLowerCase());
        return ResponseEntity.ok().body(granularLocations);
    }

    @GetMapping("/location-overview")
    public ResponseEntity<?> getPropertiesFromLocation(@RequestParam("location") String location, @CookieValue("NEXT_LOCALE") String locale, @RequestParam("start") LocalDate date){
        // System.out.println("hit location overview: " + location);
        // System.out.println("locale " + locale );
        // System.out.println("month " + date.getMonthValue());
        int month = date.getMonthValue();
        Map<String,Object> res = locationService.getLocationOverview(location, locale,month);
        // List<String> res = new ArrayList<>();
        //res.add("poo");
        return ResponseEntity.ok().body(res);
    }
    
}
// 