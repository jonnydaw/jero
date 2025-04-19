package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class SearchTests {

    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;


    //final String location = "invalidlocation";
    final Optional<String> sort = Optional.ofNullable("DESC");
    final Instant start = Instant.parse(("2025-12-20")+"T00:00:00.000Z");
    final Instant end = Instant.parse(("2025-12-25")+"T00:00:00.000Z");

    @Test
    void checkSplit(){

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

    @Test
    void getPropertyiesByLocation_INVALID_LOCATION(){
        String location = "invalidlocation";
        List<PropertyModel> pms = new ArrayList<>();
        when(locationRepository.findLocationById(location)).thenReturn(null);
        when(locationRepository.findFallbacks(location)).thenReturn(null);
        when(locationRepository.ignoreAccents(location)).thenReturn(null);
         Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> propertyService.getPropertiesByLocation(location, start, end, 1, 1, 1 ,sort, pms));
        assertEquals("404 NOT_FOUND \"LOCATION_NOT_FOUND\"", exception.getMessage());

        // https://stackoverflow.com/questions/9841623/mockito-how-to-verify-method-was-called-on-an-object-created-within-a-method
        verify(locationRepository, times(1)).findFallbacks(location);
        verify(locationRepository, times(1)).ignoreAccents(location);
    }

    @Test
    void getPropertyiesByLocation_RETURN_PROPERTIES(){
        ObjectId propertId = new ObjectId("67d19f119222aa4f889fa092");
        List<String> imgs = new ArrayList<>();
        imgs.add("img");

        String location = "london";
        int numAdults = 3;
        int numChildren =1;
        int numPets = 1;
        Optional<String> sort = Optional.of("DESC");
        
        List<PropertyModel> pms = new ArrayList<>();

        List<PropertyModel> populatePms = new ArrayList<>();
        PropertyModel property = new PropertyModel();
        property.setId(propertId);
        property.setImageUrls(imgs);
        populatePms.add(property);

        LocationModel locationModel = new LocationModel();
        locationModel.setId(location);
        locationModel.setLocationType("city");
        
        when(locationRepository.findLocationById(location)).thenReturn(locationModel);
        when(propertyRepo.basicFilter(location, start, end, (numAdults + numChildren), numChildren > 0, numPets > 0, sort))
        .thenReturn(populatePms);
        List<Map<String, String>> res =  propertyService.getPropertiesByLocation(location, start, end, numAdults, numChildren, numPets ,sort, pms);

        assertEquals(pms.get(0).getId(), propertId); 
        assertEquals(res.get(0).get("id"), propertId.toHexString());    
    }

    @Test
    void getPropertyiesByLocation_VALID_LOCATION(){
        ObjectId propertId = new ObjectId("67d19f119222aa4f889fa092");
        List<String> imgs = new ArrayList<>();
        imgs.add("img");

        String location = "london";
        int numAdults = 3;
        int numChildren =1;
        int numPets = 1;
        Optional<String> sort = Optional.of("DESC");
        
        List<PropertyModel> pms = new ArrayList<>();

        List<PropertyModel> populatePms = new ArrayList<>();
        PropertyModel property = new PropertyModel();
        property.setId(propertId);
        property.setImageUrls(imgs);
        populatePms.add(property);

        LocationModel locationModel = new LocationModel();
        locationModel.setId(location);
        locationModel.setLocationType("city");
        
        when(locationRepository.findLocationById(location)).thenReturn(locationModel);
        when(propertyRepo.basicFilter(location, start, end, (numAdults + numChildren), numChildren > 0, numPets > 0, sort))
        .thenReturn(populatePms);
        List<Map<String, String>> res =  propertyService.getPropertiesByLocation(location, start, end, numAdults, numChildren, numPets ,sort, pms);
  
        }
    
}
