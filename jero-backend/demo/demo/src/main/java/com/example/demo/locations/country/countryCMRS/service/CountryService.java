package com.example.demo.locations.country.countryCMRS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.locations.country.countryCMRS.model.CountryModel;
import com.example.demo.locations.country.countryCMRS.repository.CountryRepository;

@Service
public class CountryService implements ICountryService {
    
    @Autowired CountryRepository countryRepo;

    @Override
    public boolean countryExists(String country) {
            CountryModel cm = countryRepo.findByCountry(country);
            return cm != null;
    }



}
