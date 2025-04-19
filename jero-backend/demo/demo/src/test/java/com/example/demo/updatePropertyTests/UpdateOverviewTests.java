package com.example.demo.updatePropertyTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
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
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.BeautyData;
import com.example.demo.property.propertycmrs.DTO.types.ClimateData;
import com.example.demo.property.propertycmrs.DTO.types.EntertainmentData;
import com.example.demo.property.propertycmrs.DTO.types.HealthAndSafetyData;
import com.example.demo.property.propertycmrs.DTO.types.KitchenData;
import com.example.demo.property.propertycmrs.DTO.types.LaundryData;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.TransportData;
import com.example.demo.property.propertycmrs.DTO.types.WaterData;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.property.propertycmrs.service.UpdatePropertyService;

@ExtendWith(MockitoExtension.class)
public class UpdateOverviewTests {
      
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
    void getOverviewTest_NOT_PROPERTY(){
        OverviewData res = new OverviewData();
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.empty());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getDescriptions(token, propertyId, res));
                        
            assertEquals("404 NOT_FOUND \"PROPERTY_NOT_FOUND\"", exception.getMessage());

        }
    }


    @Test
    void getOverviewTest_NOT_THE_OWNER(){
        OverviewData res = new OverviewData();

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getDescriptions(token, propertyId, res));
                        
            assertEquals("403 FORBIDDEN \"NOT_THE_OWNER\"", exception.getMessage());

        }
    }


    @Test
    void getOverview(){
        OverviewData res = new OverviewData();
        


        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setTitle("hi");
        property.setRules("no parties");
        property.setDescription("description");
        property.setGuide("guide");


        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            OverviewData result = updatePropertyService.getDescriptions(token, propertyId, res);
                        
            assertEquals(result.getPropertyTitle(), "hi");
            assertEquals(result.getPropertyDescription(), "description");
            assertEquals(result.getPropertyRules(), "no parties");
            assertEquals(result.getPropertyGuide(), "guide");

        }
    }

    @Test
    void updateOverview(){

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setTitle("hi");
        property.setRules("no parties");
        property.setDescription("description");
        property.setGuide("guide");

        OverviewData newOverviewData = new OverviewData();
        newOverviewData.setPropertyDescription("new desc");
        newOverviewData.setPropertyGuide("new guide");
        newOverviewData.setPropertyRules("new rules");
        newOverviewData.setPropertyTitle("new title");


        
       

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            updatePropertyService.updateDescriptions(token, propertyId, newOverviewData, property);
                        
            assertNotEquals(property.getTitle(), "hi" );
            assertEquals(property.getTitle(), "new title");

        }
    }
}
