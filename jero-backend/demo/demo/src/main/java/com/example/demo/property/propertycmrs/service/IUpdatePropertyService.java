package com.example.demo.property.propertycmrs.service;

import java.util.List;

import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;

public interface IUpdatePropertyService {
    
    public List<String> getPropertyImages(String token, String propertyId);
    public void updatePropertyImages(String token, String propertyId, List<String> newImgs);
    public Step3Data getGuestManagement(String token, String propertyId);
    public void updateStep3Data( String token, String propertyId, Step3Data newStep3);
    public AmentiesHandler  getAmenties(String token, String propertyId,  AmentiesHandler res);
    public void updateAmenities(String token, String propertyId, AmentiesHandler newAmenities);

}
