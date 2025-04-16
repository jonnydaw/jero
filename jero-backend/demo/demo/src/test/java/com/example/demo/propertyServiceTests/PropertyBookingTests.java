package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class PropertyBookingTests {

    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;


    @Test
    void testPropertyFromBookings_DELETED_PROPERTY(){
        final ObjectId mainUserId = new ObjectId("67b877cbe8ddf130ce69924a");
        final ObjectId otherUserId = new ObjectId("67b877cbe8ddf130ce69927a");
        final ObjectId pastPropertyId = new ObjectId("67f6ae5881ebbd6dc69897e1");
        final ObjectId pastPropertyBookingId = new ObjectId("67b877cbe8ddf130ce69824a");
        final Instant fiveDaysAgo = Instant.now().minus(5, ChronoUnit.DAYS);
        final Instant tenDaysAgo = Instant.now().minus(10, ChronoUnit.DAYS);

        // other user setup
        UserModel otherUser = new UserModel();
        otherUser.setId(otherUserId);
        otherUser.setFirstName("otheruser");
        otherUser.setLastName("otheruserlastname");
        otherUser.setIntroduction("hi");
        otherUser.setProfileImgUrl("otheruserimg");
        Map<String, Boolean> otherUserPrivacy = new HashMap<>();
        otherUserPrivacy.put("profile", false);
        otherUser.setPrivacy(otherUserPrivacy);
        
        // other user setup end;



        // past property/ booking

        List<BookingModel> pastBookings = new ArrayList<>();

        PropertyModel pastProperty = new PropertyModel();
        pastProperty.setTitle("pastPropertTest");
        List<String> imageList = new ArrayList<>();
        imageList.add("pastPropertyImage");
        pastProperty.setImageUrls(imageList);
        pastProperty.setId(pastPropertyId);
        
        BookingModel pastPropertyBooking = new BookingModel();
        pastPropertyBooking.setId(pastPropertyBookingId);
        pastPropertyBooking.setPropertyId(pastPropertyId);
        pastPropertyBooking.setGuestId(mainUserId);
        pastPropertyBooking.setOwnerId(otherUserId);
        pastPropertyBooking.setStartDate(tenDaysAgo);
        pastPropertyBooking.setEndDate(fiveDaysAgo);
        pastPropertyBooking.setNumAdults(2);
        pastPropertyBooking.setNumChildren(1);
        pastPropertyBooking.setNumPets(1);
        pastPropertyBooking.setTotalCost(150.0);
        pastPropertyBooking.setAccepted(true);
        pastPropertyBooking.setCancelled(false);
        pastPropertyBooking.setReviewed(false);

        pastBookings.add(pastPropertyBooking);

        // past property end



        

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        bookings.put("past",pastBookings);


        try (MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt")).thenReturn("customer");
                
           // when(propertyRepo.findById(new ObjectId("67b85d62e8ddf130ce699241"))).thenReturn(null);
          //  when(userRepository.findById(otherUserId)).thenReturn(Optional.ofNullable(otherUser));
            
            Map<String, List<PropertyBooking>> fullRes = propertyService.getPropertiesFromBookings(bookings, "jwt");
            PropertyBooking pastRes = fullRes.get("past").getFirst();
            

            assertNotEquals(pastRes.getTitle(), pastProperty.getTitle());
            assertNotEquals(pastRes.getImage(), pastProperty.getImageUrls().getFirst());

            assertNotEquals(pastRes.getOtherPartyInfo().getFirstName(), otherUser.getFirstName());
            assertNotEquals(pastRes.getOtherPartyInfo().getLastName(), otherUser.getLastName());
            assertNotEquals(pastRes.getOtherPartyInfo().getImgULR(), otherUser.getProfileImgUrl());
            assertNotEquals(pastRes.getOtherPartyInfo().getIntro(), otherUser.getIntroduction());

            assertEquals(pastRes.getStart(), pastPropertyBooking.getStartDate());
            assertEquals(pastRes.getEnd(), pastPropertyBooking.getEndDate());
            assertEquals(pastRes.getNumAdults(), pastPropertyBooking.getNumAdults());
            assertEquals(pastRes.getNumChildren(), pastPropertyBooking.getNumChildren());
            assertEquals(pastRes.getNumPets(), pastPropertyBooking.getNumPets());
            assertEquals(pastRes.getTotalCost(), pastPropertyBooking.getTotalCost());
            assertEquals(pastRes.isAccepted(), pastPropertyBooking.isAccepted());
            assertEquals(pastRes.isCancelled(), pastPropertyBooking.isCancelled());
            //assertEquals(res.get("past").getFirst().getNumPets(), pastPropertyBooking.getNumPets());
         }
    } 

    @Test
    void testPropertyFromBookings_EXISTING_PROPERTY_PRIVATE_USER(){
        final ObjectId mainUserId = new ObjectId("67b877cbe8ddf130ce69924a");
        final ObjectId otherUserId = new ObjectId("67b877cbe8ddf130ce69927a");
        final ObjectId pastPropertyId = new ObjectId("67f6ae5881ebbd6dc69893e1");
        final ObjectId pastPropertyBookingId = new ObjectId("67b877cbe8ddf130ce69824a");
        final Instant fiveDaysAgo = Instant.now().minus(5, ChronoUnit.DAYS);
        final Instant tenDaysAgo = Instant.now().minus(10, ChronoUnit.DAYS);

        // other user setup
        UserModel otherUser = new UserModel();
        otherUser.setId(otherUserId);
        otherUser.setFirstName("otheruser");
        otherUser.setLastName("otheruserlastname");
        otherUser.setIntroduction("hi");
        otherUser.setProfileImgUrl("otheruserimg");
        Map<String, Boolean> otherUserPrivacy = new HashMap<>();
        otherUserPrivacy.put("profile", false);
        otherUser.setPrivacy(otherUserPrivacy);
        
        // other user setup end;



        // past property/ booking

        List<BookingModel> pastBookings = new ArrayList<>();

        PropertyModel pastProperty = new PropertyModel();
        pastProperty.setTitle("pastPropertTest");
        List<String> imageList = new ArrayList<>();
        imageList.add("pastPropertyImage");
        pastProperty.setImageUrls(imageList);
        pastProperty.setId(pastPropertyId);
        
        BookingModel pastPropertyBooking = new BookingModel();
        pastPropertyBooking.setId(pastPropertyBookingId);
        pastPropertyBooking.setPropertyId(pastPropertyId);
        pastPropertyBooking.setGuestId(mainUserId);
        pastPropertyBooking.setOwnerId(otherUserId);
        pastPropertyBooking.setStartDate(tenDaysAgo);
        pastPropertyBooking.setEndDate(fiveDaysAgo);
        pastPropertyBooking.setNumAdults(2);
        pastPropertyBooking.setNumChildren(1);
        pastPropertyBooking.setNumPets(1);
        pastPropertyBooking.setTotalCost(150.0);
        pastPropertyBooking.setAccepted(true);
        pastPropertyBooking.setCancelled(false);
        pastPropertyBooking.setReviewed(false);

        pastBookings.add(pastPropertyBooking);

        // past property end

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        bookings.put("past",pastBookings);


        try (MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt")).thenReturn("customer");
                
            when(propertyRepo.findById(new ObjectId("67f6ae5881ebbd6dc69893e1"))).thenReturn(Optional.of(pastProperty));
            when(userRepository.findById(otherUserId)).thenReturn(Optional.ofNullable(otherUser));
            
            Map<String, List<PropertyBooking>> fullRes = propertyService.getPropertiesFromBookings(bookings, "jwt");
            PropertyBooking pastRes = fullRes.get("past").getFirst();
            

            assertEquals(pastRes.getTitle(), pastProperty.getTitle());
            assertEquals(pastRes.getImage(), pastProperty.getImageUrls().getFirst());

            assertNotEquals(pastRes.getOtherPartyInfo().getFirstName(), otherUser.getFirstName());
            assertNotEquals(pastRes.getOtherPartyInfo().getLastName(), otherUser.getLastName());
            assertNotEquals(pastRes.getOtherPartyInfo().getImgULR(), otherUser.getProfileImgUrl());
            assertNotEquals(pastRes.getOtherPartyInfo().getIntro(), otherUser.getIntroduction());

            assertEquals(pastRes.getStart(), pastPropertyBooking.getStartDate());
            assertEquals(pastRes.getEnd(), pastPropertyBooking.getEndDate());
            assertEquals(pastRes.getNumAdults(), pastPropertyBooking.getNumAdults());
            assertEquals(pastRes.getNumChildren(), pastPropertyBooking.getNumChildren());
            assertEquals(pastRes.getNumPets(), pastPropertyBooking.getNumPets());
            assertEquals(pastRes.getTotalCost(), pastPropertyBooking.getTotalCost());
            assertEquals(pastRes.isAccepted(), pastPropertyBooking.isAccepted());
            assertEquals(pastRes.isCancelled(), pastPropertyBooking.isCancelled());
         }
    } 
    
}
