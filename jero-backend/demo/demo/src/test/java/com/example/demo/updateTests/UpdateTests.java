package com.example.demo.updateTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.UpdatePropertyService;
import com.example.demo.user.DTO.UpdateHostPrivacyHandler;
import com.example.demo.user.DTO.UpdatePrivacyHandler;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.update.UserUpdateService;

@ExtendWith(MockitoExtension.class)
public class UpdateTests {
    
    @Mock private UserRepository userRepository;
    @Mock private PropertyRepo propertyRepo;
    @Mock private BookingRepo bookingRepo;
    @InjectMocks UserUpdateService userUpdateService;


    @Test
    void testGetUpdateableFields(){
        UserModel user = new UserModel();
        user.setFirstName("mr");
        user.setLastName("me");
        user.setIntroduction("hu");
        user.setProfileImgUrl("image");
        
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            Map<String, String> res = userUpdateService.getUpdatableFields("jwt");
            
            assertEquals("mr", res.get("firstName"));
            assertEquals("me", res.get("lastName"));
            assertEquals("hu", res.get("introduction"));
            assertEquals("image", res.get("profileImgUrl"));
        }
    }

    @Test
    void testUpdateablePrivacy(){
        UserModel user = new UserModel();
        user.setFirstName("mr");
        user.setLastName("me");
        user.setIntroduction("hu");
        user.setProfileImgUrl("image");

        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        privacy.put("profile",false);
        privacy.put("analysis",false);
        user.setPrivacy(privacy);

        UpdatePrivacyHandler uph = new UpdatePrivacyHandler();
        uph.setShowNameOnReviews(true);
        uph.setShowProfileAfterBooking(true);
        uph.setAllowAnalysisOnBookings(true);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updatePrivacySettings("jwt", uph);
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals(true, user.getPrivacy().get("review"));
            assertEquals(true, user.getPrivacy().get("profile"));
            assertEquals(true, user.getPrivacy().get("analysis"));
        }
    }


    @Test
    void testUpdateablePrivacy_HOST(){
        UserModel user = new UserModel();
        user.setFirstName("mr");
        user.setLastName("me");
        user.setIntroduction("hu");
        user.setProfileImgUrl("image");

        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profile",false);
        privacy.put("alwaysShowProfile",false);
        privacy.put("analysis",false);
        user.setPrivacy(privacy);

        UpdateHostPrivacyHandler uph = new UpdateHostPrivacyHandler();
        uph.setShowProfileOnPropertyPage(true);
        uph.setShowProfileAfterBooking(true);
        uph.setAllowAnalysisOnBookings(true);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updateHostPrivacySettings("jwt", uph);
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals(true, user.getPrivacy().get("profile"));
            assertEquals(true, user.getPrivacy().get("alwaysShowProfile"));
            assertEquals(true, user.getPrivacy().get("analysis"));
        }
    }

    @Test
    void updateFirstName(){
        UserModel user = new UserModel();
        user.setFirstName("mr");

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updateUserFirstName("new", "jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals("new", user.getFirstName());

        }
    }


    @Test
    void updateLastName(){
        UserModel user = new UserModel();
        user.setLastName("mr");

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updateUserLastName("new", "jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals("new", user.getLastName());

        }
    }


    @Test
    void updateIntro(){
        UserModel user = new UserModel();
        user.setIntroduction("hi");

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updateUserIntroduction("bye", "jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals("bye", user.getIntroduction());

        }
    }

    @Test
    void updateImg(){
        UserModel user = new UserModel();
        user.setProfileImgUrl("oldimg");

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            userUpdateService.updateImageUrl("newimg", "jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals("newimg", user.getProfileImgUrl());

        }
    }

    @Test
    void getPrivacy(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profile",false);
        privacy.put("alwaysShowProfile",false);
        privacy.put("analysis",false);
        user.setPrivacy(privacy);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            Map<String, Boolean> settings = userUpdateService.getPrivacySettings("jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals(settings.get("analysis"), false);
            assertEquals(settings.get("alwaysShowProfile"), false);
            assertEquals(settings.get("profile"), false);

        }
    }

    @Test
    void getPrivacy_OTHER(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profile",false);
        privacy.put("review",false);
        privacy.put("analysis",false);
        user.setPrivacy(privacy);

        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            
            Map<String, Boolean> settings = userUpdateService.getPrivacySettings("jwt");
            
           // when(userRepository.save(user)).thenReturn(user);

            assertEquals(settings.get("analysis"), false);
            assertEquals(settings.get("review"), false);
            assertEquals(settings.get("profile"), false);

        }
    }
}
