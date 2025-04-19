package com.example.demo.updatePropertyTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
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
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.property.propertycmrs.service.UpdatePropertyService;

@ExtendWith(MockitoExtension.class)
public class UpdateGuestManagementTests {
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
    void getGuestManagementTest_NOT_PROPERTY(){
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.empty());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getGuestManagement(token, propertyId));
                        
            assertEquals("404 NOT_FOUND \"PROPERTY_NOT_FOUND\"", exception.getMessage());

        }
    }


    @Test
    void getGuestManagementTest_NOT_THE_OWNER(){

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(notTheOwnerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> updatePropertyService.getGuestManagement(token, propertyId));
                        
            assertEquals("403 FORBIDDEN \"NOT_THE_OWNER\"", exception.getMessage());

        }
    }


    @Test
    void getGuestManagementTest(){

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setAcceptsChildren(true);
        property.setAcceptsPets(true);


        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            Step3Data res = updatePropertyService.getGuestManagement(token, propertyId);
                        
            assertEquals(res.isAcceptsChildren(), property.isAcceptsChildren());
            assertEquals(res.isAcceptsPets(), property.isAcceptsPets());
            assertEquals(res.isDisabilityFriendly(), false);

        }
    }

    @Test
    void updateStep3Data(){

        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerObjectId);
        property.setAcceptsPets(true);

        Step3Data newStep3Data = new Step3Data();
        newStep3Data.setAcceptsChildren(true);
        
       

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(propertyRepo.findById(propertyObjectId)).thenReturn(Optional.of(property));

            updatePropertyService.updateStep3Data(token, propertyId, newStep3Data, property);
                        
            assertEquals(property.isAcceptsPets(), false);
            assertEquals(property.isAcceptsChildren(), true);

        }
    }
}
