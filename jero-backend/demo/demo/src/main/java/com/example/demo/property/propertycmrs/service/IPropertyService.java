package com.example.demo.property.propertycmrs.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);

    List<Map<String,String>> getPropertiesByLocation(String queriedLocation, LocalDate startDate, LocalDate endDate, int numAdults, int numChildren, int numPets);

    PropertyModel getPropertyById(ObjectId propertyId);
    
}
