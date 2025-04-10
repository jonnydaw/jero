package com.example.demo.property.propertycmrs.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;


@Service
public class UpdatePropertyService implements IUpdatePropertyService{

    @Autowired private PropertyRepo propertyRepo;

    @Override
    public List<String> getPropertyImages(String token, String propertyId) {
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }
        return property.getImageUrls();
    }

    @Override
    public void updatePropertyImages(String token, String propertyId, List<String> newImgs) {
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }

        property.setImageUrls(newImgs);
        propertyRepo.save(property);
    }

    @Override
    public Step3Data getGuestManagement(String token, String propertyId){
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }
        Step3Data data = new Step3Data();
        System.out.println(property.getPricePerNight());
        BeanUtils.copyProperties(property, data);
        System.out.println("ppn " + data.getPricePerNight());
        return data;
    }

    @Override
    public void updateStep3Data( String token, String propertyId, Step3Data newStep3){
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }

        BeanUtils.copyProperties(newStep3, property);
        propertyRepo.save(property);
        //System.out.println(property.getPricePerNight());
    }

    @Override
    public AmentiesHandler getAmenties(String token, String propertyId, AmentiesHandler res){
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }

        BeanUtils.copyProperties(property, res);
        System.out.println("menties " + res.toString());
        return res;
    }

    @Override
    public void updateAmenities(String token, String propertyId, AmentiesHandler newAmenities){
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        PropertyModel property = propertyRepo.findById(new ObjectId(propertyId)).get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NO");
        }

        BeanUtils.copyProperties(newAmenities, property);
        //property.setBeautyData(null);
        propertyRepo.save(property);

    }

    
}
