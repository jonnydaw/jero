package com.example.demo.property.propertycmrs.service;

import java.util.List;

import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface IUpdatePropertyService {
    
    public List<String> getPropertyImages(String token, String propertyId);
    public void updatePropertyImages(String token, String propertyId, List<String> newImgs, PropertyModel property );
    public Step3Data getGuestManagement(String token, String propertyId);
    public void updateStep3Data( String token, String propertyId, Step3Data newStep3, PropertyModel property);
    public AmentiesHandler  getAmenties(String token, String propertyId,  AmentiesHandler res);
    public void updateAmenities(String token, String propertyId, AmentiesHandler newAmenities,  PropertyModel propertyModel);
    public OverviewData getDescriptions(String token, String propertyId,  OverviewData res);
    public void updateDescriptions(String token, String propertyId,  OverviewData res, PropertyModel propertyModel);
    public void deleteProperty(String token, String propertyId);




}
