package com.example.demo.locations.locationCMRS.service;

import java.util.Map;
import org.springframework.stereotype.Service;


@Service
public interface ILocationService {
     public String findMostPreciseLocation(Map<String,String> areaTypeToName);
     public Map<String, String> graphLookUpFinder(String mostPreciseLocation);
     public String getLocationOverview(String queriedLocation, String locale);
}
