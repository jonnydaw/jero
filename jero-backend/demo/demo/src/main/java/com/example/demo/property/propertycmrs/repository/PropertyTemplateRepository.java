package com.example.demo.property.propertycmrs.repository;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface PropertyTemplateRepository {
    
    public List<PropertyModel> basicFilter(String location, LocalDate startDate, LocalDate endDate, int numGuests, boolean searchContainsChildren, boolean searchContainsPets);

}