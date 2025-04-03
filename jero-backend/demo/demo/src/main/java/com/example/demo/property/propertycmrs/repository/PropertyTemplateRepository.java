package com.example.demo.property.propertycmrs.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface PropertyTemplateRepository {
    
    public List<PropertyModel> basicFilter(String location, 
    Instant startDate, 
    Instant endDate, 
    int numGuests, 
    boolean searchContainsChildren, 
    boolean searchContainsPets,
    Optional<String> sort);

    public Set<PropertyModel> smartFilter( Instant startDate, 
    Instant endDate, 
    int numAdults, 
    int numChildren, 
    int numPets,
    List<String> attractions,
    String holidayType,
    String tourismLevels,
    int minTemp,
    int maxTemp);


}