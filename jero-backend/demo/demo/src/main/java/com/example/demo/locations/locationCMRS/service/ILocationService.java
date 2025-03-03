package com.example.demo.locations.locationCMRS.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;


@Service
public interface ILocationService {

     public String findMostPreciseLocation(Map<String,String> areaTypeToName);
    

     public List<String> graphLookUpFinder(String mostPreciseLocation);
}
