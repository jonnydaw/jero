package com.example.demo.updatePropertyTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.BeautyData;
import com.example.demo.property.propertycmrs.DTO.types.ClimateData;
import com.example.demo.property.propertycmrs.DTO.types.EntertainmentData;
import com.example.demo.property.propertycmrs.DTO.types.HealthAndSafetyData;
import com.example.demo.property.propertycmrs.DTO.types.KitchenData;
import com.example.demo.property.propertycmrs.DTO.types.LaundryData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.DTO.types.TransportData;
import com.example.demo.property.propertycmrs.DTO.types.WaterData;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.property.propertycmrs.service.UpdatePropertyService;

@ExtendWith(MockitoExtension.class)
public class UpdateAmenitiesTests {
    
    @Mock private PropertyRepo propertyRepo;
    @Mock private IBookingService bookingService;
    @Mock private IPropertyService propertyService;
    @Mock private BookingRepo bookingRepo;

    @InjectMocks UpdatePropertyService updatePropertyService;

    final private String token = "JWT";
    private final String ownerId = "67deffd7bccf5204ebef3f43";
    private final ObjectId ownerObjectId = new ObjectId("67deffd7bccf5204ebef3f43");
    private final String notTheOwnerId = "67b877cbe8ddf130ce69924a";
    private final ObjectId propertyObjectId = new ObjectId("67d19f119222aa4f889fa092");
    private final String propertyId = "67d19f119222aa4f889fa092";

    @Test
    void getAmentiesTest_NOT_PROPERTY(){
        AmentiesHandler res = new AmentiesHandler();
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.empty());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getAmenties(token, propertyId, res));
                        
            assertEquals("404 NOT_FOUND \"PROPERTY_NOT_FOUND\"", exception.getMessage());

        }
    }


    @Test
    void getAmentiesTest_NOT_THE_OWNER(){
        AmentiesHandler res = new AmentiesHandler();

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getAmenties(token, propertyId, res));
                        
            assertEquals("403 FORBIDDEN \"NOT_THE_OWNER\"", exception.getMessage());

        }
    }


    @Test
    void getAmenties(){
        AmentiesHandler res = new AmentiesHandler();
        
        BeautyData beautyData = new BeautyData();
        beautyData.setHasBodyWash(true);

        ClimateData climateData = new ClimateData();
        climateData.setHasAirCon(true);

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setBeautyData(beautyData);
        property.setClimateData(climateData);

        EntertainmentData entertainmentData = new EntertainmentData();
        HealthAndSafetyData healthAndSafetyData = new HealthAndSafetyData();
        KitchenData kitchenData = new KitchenData();
        LaundryData laundryData = new LaundryData();
        TransportData transportData = new TransportData();
        WaterData waterData = new WaterData();


        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            AmentiesHandler result = updatePropertyService.getAmenties(token, propertyId, res);
                        
            assertEquals(result.getBeautyData().isHasBodyWash(), true);
            assertEquals(result.getBeautyData().isHasConditioner(), false);
            assertEquals(result.getClimateData().isHasAirCon(), true);
            assertEquals(result.getClimateData().isHasFan(), false);

        }
    }

    @Test
    void updateAmenities(){

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setAcceptsPets(true);

        BeautyData olBeautyData = new BeautyData();
        olBeautyData.setHasBodyWash(true);
        property.setBeautyData(olBeautyData);

        BeautyData newBeautyData = new BeautyData();
        newBeautyData.setHasConditioner(true);

        AmentiesHandler newAmentiesHandler = new AmentiesHandler();
        newAmentiesHandler.setBeautyData(newBeautyData);
        
       

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            updatePropertyService.updateAmenities(token, propertyId, newAmentiesHandler, property);
                        
            assertEquals(property.getBeautyData().isHasBodyWash(), false);
            assertEquals(property.getBeautyData().isHasConditioner(), true);

        }
    }
}
