package com.example.demo.property.propertycmrs.service;

import java.util.List;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);

    List<String> getPropertiesByLocation(String location);
    
}
