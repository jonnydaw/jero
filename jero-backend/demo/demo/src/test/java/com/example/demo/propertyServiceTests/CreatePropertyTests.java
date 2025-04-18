package com.example.demo.propertyServiceTests;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.example.demo.property.propertycmrs.DTO.types.BeautyData;
import com.example.demo.property.propertycmrs.DTO.types.ClimateData;
import com.example.demo.property.propertycmrs.DTO.types.EntertainmentData;
import com.example.demo.property.propertycmrs.DTO.types.HealthAndSafetyData;
import com.example.demo.property.propertycmrs.DTO.types.KitchenData;
import com.example.demo.property.propertycmrs.DTO.types.LaundryData;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.DTO.types.TransportData;
import com.example.demo.property.propertycmrs.DTO.types.WaterData;
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

    @Test
    void setPriceIncreasePerPerson(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        double priceIncrease = 15.7;
        step3.setPriceIncreasePerPerson(priceIncrease);
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

            assertEquals(pm.getPriceIncreasePerPerson(), priceIncrease);
        }
    }

    @Test
    void setAcceptsChildren(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        boolean acceptChildren = false;
        step3.setAcceptsChildren(acceptChildren);
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

            assertEquals(pm.isAcceptsChildren(), acceptChildren);
        }
    }

    @Test
    void setAcceptsPets(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        boolean acceptPets = true;
        step3.setAcceptsPets(acceptPets);
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

            assertEquals(pm.isAcceptsPets(), acceptPets);
        }
    }

    @Test
    void setDisabilityFriendly(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();
        boolean disabilityFriendly = true;
        step3.setDisabilityFriendly(disabilityFriendly);
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

            assertEquals(pm.isDisabilityFriendly(), disabilityFriendly);
        }
    }


    @Test
    void setTitle(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();
        String title = "my house";
        overviewData.setPropertyTitle(title);

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

            assertEquals(pm.getTitle(), title);
        }
    }

    @Test
    void setDescription(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();
        String description = "my house on a road";
        overviewData.setPropertyDescription(description);

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

            assertEquals(pm.getDescription(), description);
        }
    }

    @Test
    void setGuide(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();
        String guide = "down an alley";
        overviewData.setPropertyGuide(guide);

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

            assertEquals(pm.getGuide(), guide);
        }
    }

    @Test
    void setRules(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();
        String rules = "no smoking";
        overviewData.setPropertyRules(rules);

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

            assertEquals(pm.getRules(), rules);
        }
    }

    @Test
    void setBeautyData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        BeautyData beautyData = new BeautyData();
        beautyData.setHasBodyWash(true);
        beautyData.setHasHairStraightner(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setBeautyData(beautyData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getBeautyData().isHasBodyWash(), beautyData.isHasBodyWash());
            assertEquals(pm.getBeautyData().isHasHairStraightner(), beautyData.isHasHairStraightner());
            assertEquals(pm.getBeautyData().isHasShampoo(), beautyData.isHasShampoo());

        }
    }

    @Test
    void setClimateData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        ClimateData climateDate = new ClimateData();
        climateDate.setHasAirCon(true);
        climateDate.setHasFan(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setClimateData(climateDate);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getClimateData().isHasAirCon(), climateDate.isHasAirCon());
            assertEquals(pm.getClimateData().isHasFan(), climateDate.isHasFan());
            assertEquals(pm.getClimateData().isHasHeating(), climateDate.isHasHeating());

        }
    }

    @Test
    void setEntertainmentData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        EntertainmentData entertainmentData = new EntertainmentData();
        entertainmentData.setHasBoardGames(true);
        entertainmentData.setHasBooks(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setEntertainmentData(entertainmentData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getEntertainmentData().isHasBoardGames(), entertainmentData.isHasBoardGames());
            assertEquals(pm.getEntertainmentData().isHasBooks(), entertainmentData.isHasBooks());
            assertEquals(pm.getEntertainmentData().isHasGym(), entertainmentData.isHasGym());

        }
    }

    @Test
    void setHealthAndSafetyData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        HealthAndSafetyData healthAndSafetyData = new HealthAndSafetyData();
        healthAndSafetyData.setHasCarbonMonoxideDetector(true);
        healthAndSafetyData.setHasFireAlarm(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setHealthAndSafetyData(healthAndSafetyData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getHealthAndSafetyData().isHasCarbonMonoxideDetector(), healthAndSafetyData.isHasCarbonMonoxideDetector());
            assertEquals(pm.getHealthAndSafetyData().isHasFireAlarm(), healthAndSafetyData.isHasFireAlarm());
            assertEquals(pm.getHealthAndSafetyData().isHasFireExtinguisher(), healthAndSafetyData.isHasFireExtinguisher());

        }
    }

    @Test
    void setKitchenData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        KitchenData kitchenData = new KitchenData();
        kitchenData.setHasCoffeeMaker(true);
        kitchenData.setHasCrockery(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setKitchenData(kitchenData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getKitchenData().isHasCoffeeMaker(), kitchenData.isHasCoffeeMaker());
            assertEquals(pm.getKitchenData().isHasCrockery(), kitchenData.isHasCrockery());
            assertEquals(pm.getKitchenData().isHasCutlery(), kitchenData.isHasCutlery());

        }
    }

    @Test
    void setLaundryData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        LaundryData laundryData = new LaundryData();
        laundryData.setHasDryingRack(true);
        laundryData.setHasIron(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setLaundryData(laundryData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getLaundryData().isHasDryingRack(), laundryData.isHasDryingRack());
            assertEquals(pm.getLaundryData().isHasIron(), laundryData.isHasIron());
            assertEquals(pm.getLaundryData().isHasTumbleDryer(), laundryData.isHasTumbleDryer());

        }
    }

    @Test
    void setTransportData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        TransportData transportData = new TransportData();
        transportData.setHasGarage(true);
        transportData.setHasOffStreetParking(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setTransportData(transportData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getTransportData().isHasGarage(), transportData.isHasGarage());
            assertEquals(pm.getTransportData().isHasOffStreetParking(), transportData.isHasOffStreetParking());
            assertEquals(pm.getTransportData().isHasOnStreetParking(), transportData.isHasOnStreetParking());

        }
    }

    @Test
    void setWaterData(){
        AddressData ad = new AddressData();
        Step3Data step3 = new Step3Data();

        OverviewData overviewData = new OverviewData();

        WaterData waterData = new WaterData();
        waterData.setHasBath(true);
        waterData.setHasBidet(true);

        CreatePropertyHandler cph = new CreatePropertyHandler();
        PropertyModel pm = new PropertyModel();
        Map<String,String> hierarchy = new HashMap<>();
        ad.setHierarchy(hierarchy);

        cph.setAddressData(ad);
        cph.setStep3Data(step3);
        cph.setOverviewData(overviewData);
        cph.setWaterData(waterData);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(pm.getWaterData().isHasBath(), waterData.isHasBath());
            assertEquals(pm.getWaterData().isHasBidet(), waterData.isHasBidet());
            assertEquals(pm.getWaterData().isHasDrinkingWater(), waterData.isHasDrinkingWater());

        }
    }

    @Test
    void setImage(){
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
        List<String> images = new ArrayList<>();
        images.add("image0");
        images.add("image1");

        cph.setImagesData(images);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
            .thenReturn(userId);
        
            propertyService.createProperty("jwt", cph, pm);

            assertEquals(images.get(0), pm.getImageUrls().get(0));
            assertEquals(images.get(0), pm.getImageUrls().get(0));


        }
    }

    @Test
    void assertAvgPercentile(){
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

            assertEquals(pm.getPercentile(), -1);
            assertEquals(pm.getAvgReviewScore(), 0);


        }
    }
}
