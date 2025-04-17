package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

import java.time.Instant;
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
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBasicHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBookedHandler;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.model.ReviewsType;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class ProcessPropertyTests {
    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;

    @Test
    void processProperty_PRIVATE_OWNER(){
        GetPropertyBasicHandler res = new GetPropertyBasicHandler();
        UserModel owner = new UserModel();
        owner.setId(new ObjectId("67b8d989e8ddf130ce69926b"));
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("alwaysShowProfile", false);
        owner.setPrivacy(privacy);
        owner.setFirstName("firstname");
        owner.setLastName("lastname");
        owner.setIntroduction("hi i am firstname lastname");
        owner.setProfileImgUrl("img");

        // property
        PropertyModel property = new PropertyModel();
        property.setOwnerId(owner.getId());
        property.setLatitude(51.509865);
        property.setLongitude(-0.118092);
            // reviews
        ReviewsType review = new ReviewsType();
        review.setBody("great");
        review.setReviewDate(Instant.now());
        review.setScore(10);
        review.setTitle("super");
        review.setUserName("hi");

        List<ReviewsType> reviews = new ArrayList<>();
        reviews.add(review);
        Map<String, List<ReviewsType>> propertyReviews = new HashMap<>();
        propertyReviews.put("id", reviews);
        property.setReviews(propertyReviews);
            // reviews end



        when(userRepository.findById(property.getOwnerId())).thenReturn(Optional.ofNullable(owner));

        GetPropertyBasicHandler processedProperty = propertyService.processProperty(property, res);

        assertNotEquals(processedProperty.getLatitude(), property.getLatitude());
        assertNotEquals(processedProperty.getLongitude(), property.getLongitude());

        assertNotEquals(processedProperty.getProfileCardInfo().get("fname") ,owner.getFirstName());
        assertNotEquals(processedProperty.getProfileCardInfo().get("lname") ,owner.getLastName());
        assertNotEquals(processedProperty.getProfileCardInfo().get("intro") ,owner.getIntroduction());
        assertNotEquals(processedProperty.getProfileCardInfo().get("img") ,owner.getProfileImgUrl());

    }

    @Test
    void processProperty_PUBLIC_OWNER(){
        GetPropertyBasicHandler res = new GetPropertyBasicHandler();
        UserModel owner = new UserModel();
        owner.setId(new ObjectId("67b8d989e8ddf130ce69926b"));
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("alwaysShowProfile", true);
        owner.setPrivacy(privacy);
        owner.setFirstName("firstname");
        owner.setLastName("lastname");
        owner.setIntroduction("hi i am firstname lastname");
        owner.setProfileImgUrl("img");

        // property
        PropertyModel property = new PropertyModel();
        property.setOwnerId(owner.getId());
        property.setLatitude(51.509865);
        property.setLongitude(-0.118092);
            // reviews
        ReviewsType review = new ReviewsType();
        review.setBody("great");
        review.setReviewDate(Instant.now());
        review.setScore(10);
        review.setTitle("super");
        review.setUserName("hi");

        List<ReviewsType> reviews = new ArrayList<>();
        reviews.add(review);
        Map<String, List<ReviewsType>> propertyReviews = new HashMap<>();
        propertyReviews.put("id", reviews);
        property.setReviews(propertyReviews);
            // reviews end



        when(userRepository.findById(property.getOwnerId())).thenReturn(Optional.ofNullable(owner));

        GetPropertyBasicHandler processedProperty = propertyService.processProperty(property, res);
        assertNotEquals(processedProperty.getLatitude(), property.getLatitude());
        assertNotEquals(processedProperty.getLongitude(), property.getLongitude());
        assertEquals(processedProperty.getProfileCardInfo().get("fname") ,owner.getFirstName());
        assertEquals(processedProperty.getProfileCardInfo().get("lname") ,owner.getLastName());
        assertEquals(processedProperty.getProfileCardInfo().get("intro") ,owner.getIntroduction());
        assertEquals(processedProperty.getProfileCardInfo().get("img") ,owner.getProfileImgUrl());
    }

    @Test
    void processProperty_BOOKED_PUBLIC_OWNER(){
        GetPropertyBookedHandler res = new GetPropertyBookedHandler();

        UserModel owner = new UserModel();
        owner.setId(new ObjectId("67b8d989e8ddf130ce69926b"));
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profile", true);
        owner.setPrivacy(privacy);
        owner.setFirstName("firstname");
        owner.setLastName("lastname");
        owner.setIntroduction("hi i am firstname lastname");
        owner.setProfileImgUrl("img");

        // property
        PropertyModel property = new PropertyModel();
        property.setOwnerId(owner.getId());
        property.setLatitude(51.509865);
        property.setLongitude(-0.118092);
        property.setGuide("this is a guide");
            // reviews
        ReviewsType review = new ReviewsType();
        review.setBody("great");
        review.setReviewDate(Instant.now());
        review.setScore(10);
        review.setTitle("super");
        review.setUserName("hi");

        List<ReviewsType> reviews = new ArrayList<>();
        reviews.add(review);
        Map<String, List<ReviewsType>> propertyReviews = new HashMap<>();
        propertyReviews.put("id", reviews);
        property.setReviews(propertyReviews);
            // reviews end


        when(userRepository.findById(property.getOwnerId())).thenReturn(Optional.ofNullable(owner));

        propertyService.processBookedProperty(property, res);

        assertEquals(res.getLatitude(), property.getLatitude());
        assertEquals(res.getLongitude(), property.getLongitude());
        assertEquals(res.getGuide(), property.getGuide());
        assertEquals(res.getProfileCardInfo().get("fname") ,owner.getFirstName());
        assertEquals(res.getProfileCardInfo().get("lname") ,owner.getLastName());
        assertEquals(res.getProfileCardInfo().get("intro") ,owner.getIntroduction());
        assertEquals(res.getProfileCardInfo().get("img") ,owner.getProfileImgUrl());
    }

    @Test
    void processProperty_BOOKED_PRIVATE_OWNER(){
        GetPropertyBookedHandler res = new GetPropertyBookedHandler();

        UserModel owner = new UserModel();
        owner.setId(new ObjectId("67b8d989e8ddf130ce69926b"));
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profile", false);
        owner.setPrivacy(privacy);
        owner.setFirstName("firstname");
        owner.setLastName("lastname");
        owner.setIntroduction("hi i am firstname lastname");
        owner.setProfileImgUrl("img");

        // property
        PropertyModel property = new PropertyModel();
        property.setOwnerId(owner.getId());
        property.setLatitude(51.509865);
        property.setLongitude(-0.118092);
        property.setGuide("this is a guide");
            // reviews
        ReviewsType review = new ReviewsType();
        review.setBody("great");
        review.setReviewDate(Instant.now());
        review.setScore(10);
        review.setTitle("super");
        review.setUserName("hi");

        List<ReviewsType> reviews = new ArrayList<>();
        reviews.add(review);
        Map<String, List<ReviewsType>> propertyReviews = new HashMap<>();
        propertyReviews.put("id", reviews);
        property.setReviews(propertyReviews);
            // reviews end

        when(userRepository.findById(property.getOwnerId())).thenReturn(Optional.ofNullable(owner));

        propertyService.processBookedProperty(property, res);

        assertEquals(res.getLatitude(), property.getLatitude());
        assertEquals(res.getLongitude(), property.getLongitude());
        assertEquals(res.getGuide(), property.getGuide());
        assertNotEquals(res.getProfileCardInfo().get("fname") ,owner.getFirstName());
        assertNotEquals(res.getProfileCardInfo().get("lname") ,owner.getLastName());
        assertNotEquals(res.getProfileCardInfo().get("intro") ,owner.getIntroduction());
        assertNotEquals(res.getProfileCardInfo().get("img") ,owner.getProfileImgUrl());
    }


}
