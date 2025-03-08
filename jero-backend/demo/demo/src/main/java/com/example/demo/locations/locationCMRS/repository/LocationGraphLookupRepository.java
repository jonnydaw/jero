package com.example.demo.locations.locationCMRS.repository;

import java.util.List;
import java.util.Map;



// https://stackoverflow.com/questions/38288258/spring-boot-with-mongotemplate

public interface LocationGraphLookupRepository {
    Map<String,String> getLocationHierarchy(String mostPreciseLocation);

    
} 
