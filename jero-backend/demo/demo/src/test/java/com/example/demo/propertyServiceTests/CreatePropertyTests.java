package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.DTO.types.AddressData;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class CreatePropertyTests {
        
    @Mock private PropertyRepo propertyRepo;
    @Mock private ReviewRepo reviewRepo;
    @Mock private LocationRepository locationRepository;
    @Mock private UserRepository userRepository;
    @Mock BookingRepo bookingRepo;
    @InjectMocks PropertyService propertyService;

    String userId = "67b85d62e8ddf130ce699241";

    @Test
    void setOwner(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getOwnerId().toHexString(), userId);
        }
    }

    @Test
    void setTown(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("town", "horley");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getTownId(), "horley");
        }
    }

    @Test
    void setDistrict(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("city_district", "dalston");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getCityDistrictId(), "dalston");
        }
    }

    @Test
    void setCity(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("city", "london");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getCityId(), "london");
        }
    }

    @Test
    void setCounty(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("county", "east sussex");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getCountyId(), "east sussex");
        }
    }

    @Test
    void setState(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("state", "england");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getStateId(), "england");
        }
    }

    @Test
    void setCountry(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("country", "uk");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getCountryId(), "uk");
        }
    }

    @Test
    void setAddress(){
        AddressData ad = new AddressData();
        ad.setLocationName("Village Way, Brighton and Hove, Brighton BN1 9PH");
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("country", "uk");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getAddress(), "Village Way, Brighton and Hove, Brighton BN1 9PH");
        }
    }

    @Test
    void setLongitude(){
        AddressData ad = new AddressData();
        double longitude = 51.123456;
        ad.setLon(longitude);
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("country", "uk");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getLongitude(), longitude);
        }
    }

    @Test
    void setLatitude(){
        AddressData ad = new AddressData();
        double latitude = -0.113244;
        ad.setLat(latitude);
        Step3Data step3 = new Step3Data();
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        hierarchy.put("country", "uk");
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getLatitude(), latitude);
        }
    }

    @Test
    void setNumDoubleBeds(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numBeds = 5;
        step3.setDoubleBeds(numBeds);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumberDoubleBeds(), numBeds);
        }
    }

    @Test
    void setNumberSingleBeds(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numBeds = 3;
        step3.setSingleBeds(numBeds);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumberSingleBeds(), numBeds);
        }
    }

    @Test
    void setNumberHammocks(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numHammocks = 3;
        step3.setHammocks(numHammocks);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumberHammocks(), numHammocks);
        }
    }

    @Test
    void setNumberSofaBeds(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numSofaBeds = 1;
        step3.setSofaBeds(numSofaBeds);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumberSofaBeds(), numSofaBeds);
        }
    }

    @Test
    void setMinGuests(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int minGuests = 1;
        step3.setMinGuests(minGuests);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getMinGuests(), minGuests);
        }
    }

    @Test
    void setNumBedrooms(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numBedrooms = 7;
        step3.setNumBedrooms(numBedrooms);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumBedrooms(), numBedrooms);
        }
    }

    @Test
    void setNumberBathrooms(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int numBathrooms = 3;
        step3.setNumBathrooms(numBathrooms);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getNumberBathrooms(), numBathrooms);
        }
    }

    @Test
    void setMaxGuests(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        int maxGuests = 10;
        step3.setMaxGuests(maxGuests);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getMaxGuests(), maxGuests);
        }
    }

    @Test
    void setPricePerNight(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        double pricePerNight = 150.0;
        step3.setPricePerNight(pricePerNight);
        OverviewData overviewData = new OverviewData();

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getPricePerNight(), pricePerNight);
        }
    }
}
