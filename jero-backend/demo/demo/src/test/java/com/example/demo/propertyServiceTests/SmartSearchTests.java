package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class SmartSearchTests {

    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;

    @Test
    void checkSplit(){
        Instant start = Instant.parse(("2025-12-20")+"T00:00:00.000Z");
        Instant end = Instant.parse(("2025-12-25")+"T00:00:00.000Z");
        List<String> attractionsClean = new ArrayList<>();
        List<String> attractionsCleanShouldEqual = new ArrayList<>();
        attractionsCleanShouldEqual.add("hello");
        attractionsCleanShouldEqual.add("hi");

        List<String> gettingAroundClean = new ArrayList<>();
        List<String> gettingAroundCleanShouldEqual = new ArrayList<>();
        gettingAroundCleanShouldEqual.add("hi");
        gettingAroundCleanShouldEqual.add("hello");

        PropertyModel propert = new PropertyModel();
        propert.setId(new ObjectId("67d19f119222aa4f889fa092"));
        List<String> imgs = new ArrayList<>();
        imgs.add("hi");
        propert.setImageUrls(imgs);
        Set<PropertyModel> uniqueProps = new HashSet<>();
        uniqueProps.add(propert);
        
        when(propertyRepo.smartFilter(start, end, 0, 0, 0, 
        attractionsClean, null, null, 0, 0, 
        gettingAroundClean))
        .thenReturn(uniqueProps);

        propertyService.getPropertiesBySmart(start, end, 0, 0, 0,
             "hello=true&hi=true", 
            null, null, 0, 0, "hi=true&hello=true", 
            attractionsClean, gettingAroundClean);

        assertEquals(attractionsClean.get(0), attractionsCleanShouldEqual.get(0));
        assertEquals(attractionsClean.get(1), attractionsCleanShouldEqual.get(1));

        assertEquals(gettingAroundClean.get(0), gettingAroundCleanShouldEqual.get(0));
        assertEquals(gettingAroundClean.get(1), gettingAroundCleanShouldEqual.get(1));
    }
    
}
