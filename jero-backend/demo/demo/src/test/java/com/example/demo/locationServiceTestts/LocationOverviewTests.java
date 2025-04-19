package com.example.demo.locationServiceTestts;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.exceptions.base.MockitoException;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.locations.locationCMRS.service.LocationService;

@ExtendWith(MockitoExtension.class)
 class LocationOverviewTests {

    @Mock LocationRepository locationRepository;
    @InjectMocks LocationService locationService;


    @Test
    void getLocationHierarchyTest_FAIL(){

        LocationModel location = new LocationModel();
        String queriedLocation = "london";
        String locale = "en";
        int month = 7;

        when(locationRepository.findLocationById(queriedLocation)).thenReturn(null);
        when(locationRepository.findFallbacks(queriedLocation)).thenReturn(null);

        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> locationService.getLocationOverview(queriedLocation, locale, month));
        
        assertEquals("404 NOT_FOUND \"LOCATION_NOT_FOUND\"", exception.getMessage());  

    }

    @Test
    void getLocationHierarchyTest_EMPTY_FALLBACK(){

        LocationModel location = new LocationModel();
        String queriedLocation = "london";
        String locale = "en";
        int month = 7;

        List<String> fallbacks = new ArrayList<>();
        fallbacks.add("");
        
        when(locationRepository.findLocationById(queriedLocation)).thenReturn(null);
        when(locationRepository.findFallbacks(queriedLocation)).thenReturn(fallbacks);

        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> locationService.getLocationOverview(queriedLocation, locale, month));
        
        assertEquals("404 NOT_FOUND \"LOCATION_NOT_FOUND\"", exception.getMessage());  

    }

    @Test
    void getLocationHierarchyTest(){

        LocationModel location = new LocationModel();
        Map<String, Map<String, Object>> lanToOverview = new HashMap<>();
        Map<String, Object> overview = new HashMap<>();

        overview.put("costs", 10 );
        lanToOverview.put("en", overview);
        List<Integer> temperatures = new ArrayList<>();
        temperatures.add(10);
        temperatures.add(19);
        temperatures.add(27);
        location.setTemperature(temperatures);


        location.setOverview(lanToOverview);
        String queriedLocation = "london";
        String locale = "en";
        int month = 3;

        List<String> fallbacks = new ArrayList<>();
        fallbacks.add("");
        
        when(locationRepository.findLocationById(queriedLocation)).thenReturn(location);
        //when(locationRepository.findFallbacks(queriedLocation)).thenReturn(fallbacks);

        Map<String,Object> res = locationService.getLocationOverview(queriedLocation, locale, month);

        assertEquals(res.get("temp"), 27);
        assertEquals(res.get("costs"), 10);
        

    }

}
