package com.example.demo.property.propertycmrs.service;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);

    List<Map<String,String>> getPropertiesByLocation(String location);

    PropertyModel getPropertyById(ObjectId propertyId);
    
}
