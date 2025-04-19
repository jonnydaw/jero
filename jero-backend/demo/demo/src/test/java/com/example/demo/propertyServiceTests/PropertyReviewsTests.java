package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.hibernate.validator.cfg.defs.pl.REGONDef;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.DTO.ReviewHandler;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.model.ReviewsType;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewModel;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

import lombok.experimental.ExtensionMethod;

@ExtendWith(MockitoExtension.class)
public class PropertyReviewsTests {

    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;

    final String location = "invalidlocation";
    final Instant start = Instant.now();
    final Instant end = Instant.now();
    final Optional<String> sort = Optional.ofNullable("DESC");




    @Test
    void addReview_FAiL_NO_BOOKING(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        user.setPrivacy(privacy);
        ReviewHandler newReview = new ReviewHandler();

        newReview.setBookingId("67b85d62e8ddf130ce699241");

         try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            when(bookingRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(null);

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> propertyService.addReview("jwt", newReview));
           
            assertEquals("404 NOT_FOUND \"BOOKING_NOT_FOUND\"", exception.getMessage());
         }

    }

    @Test
    void addReview_FAiL_BOOKING_NOT_OVER(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        user.setPrivacy(privacy);
        ReviewHandler newReview = new ReviewHandler();

        BookingModel booking = new BookingModel();
        Instant future = Instant.now().plus(1, ChronoUnit.DAYS);
        booking.setEndDate(future);

        newReview.setBookingId("67b85d62e8ddf130ce699241");

         try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            when(bookingRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.of(booking));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> propertyService.addReview("jwt", newReview));
           
            assertEquals("425 TOO_EARLY \"REVIEW_NOT_ALLOWED_UNTIL_AFTER\"", exception.getMessage());
         }

    }

    @Test
    void addReview_FAiL_BOOKING_ALREADY_REVIEWED(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        user.setPrivacy(privacy);
        ReviewHandler newReview = new ReviewHandler();

        BookingModel booking = new BookingModel();
        Instant past = Instant.now().minus(1, ChronoUnit.DAYS);
        booking.setEndDate(past);
        booking.setReviewed(true);

        newReview.setBookingId("67b85d62e8ddf130ce699241");

         try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            when(bookingRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.of(booking));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> propertyService.addReview("jwt", newReview));
           
            assertEquals("409 CONFLICT \"ALREADY_REVIEWED\"", exception.getMessage());
         }

    }

    @Test
    void addReview_FAiL_BOOKING_NEVER_HAPPENED(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        user.setPrivacy(privacy);
        ReviewHandler newReview = new ReviewHandler();

        BookingModel booking = new BookingModel();
        Instant past = Instant.now().minus(1, ChronoUnit.DAYS);
        booking.setEndDate(past);
        booking.setReviewed(false);
        booking.setAccepted(false);
        booking.setCancelled(true);

        newReview.setBookingId("67b85d62e8ddf130ce699241");

         try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            when(bookingRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.of(booking));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> propertyService.addReview("jwt", newReview));
           
            assertEquals("418 I_AM_A_TEAPOT \"CANT_REVIEW_BOOKING_DID_NOT_HAPPEN\"", exception.getMessage());
         }

    }

    @Test
    void addReview_SUCCESS(){
        UserModel user = new UserModel();
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("review",false);
        user.setPrivacy(privacy);
        ReviewHandler newReview = new ReviewHandler();

        BookingModel booking = new BookingModel();
        Instant past = Instant.now().minus(1, ChronoUnit.DAYS);
        booking.setEndDate(past);
        booking.setReviewed(false);
        booking.setAccepted(true);
        booking.setCancelled(false);

        PropertyModel pm = new PropertyModel();
        Map<String,List<ReviewsType>> reviews = new HashMap<>();
        pm.setReviews(reviews);
        Map<String,List<ReviewsType>> oldReviews = new HashMap<>(pm.getReviews());


        pm.setAvgReviewScore(0);
        pm.setPercentile(-1);
        
        ReviewModel rm = new ReviewModel();
        rm.setScores(new ArrayList<>());

        newReview.setBookingId("67b85d62e8ddf130ce699241");
        newReview.setBody("hi");

         try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt")).thenReturn("67b85d62e8ddf130ce699241");
            
            when(userRepository.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.ofNullable(user));
            when(bookingRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(Optional.of(booking));
            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.of(pm));
            when(reviewRepo.findById(1)).thenReturn(Optional.of(rm));

            propertyService.addReview("jwt", newReview);
            assertNotEquals(oldReviews, pm.getReviews());
            
         }

    }

    @Test
    void propertyDeletionOnUserDeletion(){

    }

 

    
}
