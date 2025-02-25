package com.example.demo.locations.country.countryCMRS.service;

import org.springframework.stereotype.Service;

@Service
public interface ICountryService {

     boolean countryExists(String country);
    
}
