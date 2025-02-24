package com.example.demo.property.propertycmrs.service;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);
    
}
