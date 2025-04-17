package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.model.ReviewsType;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class DeletionTests {
    
    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;

    @Test
    void reviewDeletionTest_DELETEDUSER(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        ReviewsType reviewtToBeAdjusted = new ReviewsType();

        BookingModel booking1 = new BookingModel();
        BookingModel booking2 = new BookingModel();
        booking1.setPropertyId(propertyId);
        booking2.setPropertyId(propertyId);
        List<BookingModel> bookings = new ArrayList<>();
        bookings.add(booking2);
        bookings.add(booking1);
        
        reviewtToBeAdjusted.setBody("adjust");
        reviewtToBeAdjusted.setReviewDate(Instant.now());
        reviewtToBeAdjusted.setScore(10);
        reviewtToBeAdjusted.setTitle("adjust");
        reviewtToBeAdjusted.setUserName("adjust");

        ReviewsType reviewtToBeLeftAlone = new ReviewsType();
        reviewtToBeLeftAlone.setBody("leave");
        reviewtToBeLeftAlone.setReviewDate(Instant.now());
        reviewtToBeLeftAlone.setScore(7);
        reviewtToBeLeftAlone.setTitle("leave");
        reviewtToBeLeftAlone.setUserName("leave");

        List<ReviewsType> reviewsUser1 = new ArrayList<>();
        List<ReviewsType> reviewsUser2 = new ArrayList<>();
        reviewsUser1.add(reviewtToBeLeftAlone);
        reviewsUser2.add(reviewtToBeAdjusted);

        Map<String,List<ReviewsType>> idToReviews = new HashMap<>();
        idToReviews.put("1", reviewsUser1 );
        idToReviews.put("2", reviewsUser2);

        PropertyModel property = new PropertyModel();
        property.setReviews(idToReviews);
        property.setId(propertyId);
        Set<ObjectId> idSet = new HashSet<>();
        idSet.add(propertyId);

        when(propertyRepo.findAllById(idSet)).thenReturn(List.of(property));

        propertyService.handleReviewDeletion(bookings, "2");

        assertEquals(property.getReviews().get("1").getFirst().getBody(), reviewtToBeLeftAlone.getBody());
        assertEquals(property.getReviews().get("2"), null);
        assertEquals(property.getReviews().get("67f6b00b81ebbd6dc69897e5").getFirst().getBody(), reviewtToBeAdjusted.getBody());

    }
}
