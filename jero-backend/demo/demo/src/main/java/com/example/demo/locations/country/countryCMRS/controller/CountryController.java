package com.example.demo.locations.country.countryCMRS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.locations.country.countryCMRS.service.ICountryService;

@RestController
@RequestMapping("/country")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class CountryController {

    @Autowired private ICountryService countryService;

    @GetMapping("/get_country")
    public ResponseEntity<?> getPropertyFromId(@RequestParam("country_name") String country){

        boolean countryExists = countryService.countryExists(country);
        System.out.println(countryExists);
        System.out.println(country);
        return ResponseEntity.ok().body("hi");
    }
    
}
