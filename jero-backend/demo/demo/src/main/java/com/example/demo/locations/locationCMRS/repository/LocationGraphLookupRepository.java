package com.example.demo.locations.locationCMRS.repository;

import java.util.List;



// https://stackoverflow.com/questions/38288258/spring-boot-with-mongotemplate

public interface LocationGraphLookupRepository {
    List<String> getLocationHierarchy(String mostPreciseLocation);

    
} 
