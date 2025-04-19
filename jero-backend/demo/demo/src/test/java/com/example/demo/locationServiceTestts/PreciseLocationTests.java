package com.example.demo.locationServiceTestts;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.locations.locationCMRS.service.LocationService;

@ExtendWith(MockitoExtension.class)
public class PreciseLocationTests {
    @Mock LocationRepository locationRepository;

    @InjectMocks LocationService locationService;

    @Test
    void findMostPreciseLocation_NOT_FOUND(){
        Map<String,String> areaTypeToName =  new HashMap<>();
        areaTypeToName.put("area","name");
        when(locationRepository.findLocationById("name")).thenReturn(null);

        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> locationService.findMostPreciseLocation(areaTypeToName));
        assertEquals("404 NOT_FOUND \"LOCATION_NOT_SUPPORTED\"", exception.getMessage());  
    }

    @Test
    void findMostPreciseLocation(){
        LocationModel locationModel = new LocationModel();
        Map<String,String> areaTypeToName =  new HashMap<>();
        areaTypeToName.put("area","name");
        when(locationRepository.findLocationById("name")).thenReturn(locationModel);

        String res = locationService.findMostPreciseLocation(areaTypeToName);
        assertEquals(res, "name");  
    }

    // @Test
    // void testGraphLookup(){
    //     String location = "location";
    //     Map<String,String> hierarchyMap = new HashMap<>();
    //     when(locationRepository.getLocationHierarchy(location)).thenReturn(hierarchyMap);
    //     assertEquals(, hierarchyMap);
    // }
}
