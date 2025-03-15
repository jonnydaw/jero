package com.example.demo.property.propertycmrs.service;

import java.util.List;
import java.util.Map;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);

    List<Map<String,String>> getPropertiesByLocation(String location);
    
}
