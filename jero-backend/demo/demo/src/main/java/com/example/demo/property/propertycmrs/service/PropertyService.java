package com.example.demo.property.propertycmrs.service;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.model.EProperty;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class PropertyService implements IPropertyService {

    @Autowired private PropertyRepo propertyRepo;
    @Autowired private UserRepository userRepository;

    @Override
    public void createProperty(String token, CreatePropertyHandler cph) {
        String userID =  JwtProvider.getIdFromJwtToken(token);
        System.out.println(userID);
		//UserModel user = userRepository.findByEmail(email);
        PropertyModel pm = new PropertyModel();

        pm.setOwnerId(new ObjectId(userID));
        System.out.println("hitwio");
        Map<String,String> hierarchy = cph.getAddressData().getHierarchy();
        System.out.println("hi:" + hierarchy.get("city_district"));
        System.out.println(hierarchy.get("town"));
        //pm.setTownId(new ObjectId(hierarchy.get("town")) || null);
        pm.setCityDistrictId((hierarchy.get("city_district")));
        pm.setCityId((hierarchy.get("city")));
        pm.setCountyId((hierarchy.get("county")));
        pm.setStateId((hierarchy.get("state")));
        
        pm.setCountryId((hierarchy.get("country")));
        
        pm.setAddress(cph.getAddressData().getLocationName());
        pm.setLongitude(cph.getAddressData().getLon());
        pm.setLatitude(cph.getAddressData().getLat());


        // pm.setNumberBedrooms(cph.getNumberBedrooms());
        // pm.setNumberBathrooms(cph.getNumberBathrooms());

        pm.setNumberDoubleBeds(cph.getStep3Data().getDoubleBeds());
        pm.setNumberSingleBeds(cph.getStep3Data().getSingleBeds());
        pm.setNumberHammocks(cph.getStep3Data().getHammocks());
        pm.setNumberSofaBeds(cph.getStep3Data().getSofaBeds());
        pm.setMinGuests(cph.getStep3Data().getMinGuests());
        pm.setMaxGuests(cph.getStep3Data().getMaxGuests());
        pm.setPricePerNight(cph.getStep3Data().getPricePerNight());
        pm.setPriceIncreasePerPerson(cph.getStep3Data().getPriceIncreasePerPerson());
        pm.setAcceptsChildren(cph.getStep3Data().isAcceptsChildren());
        pm.setAcceptsPets(cph.getStep3Data().isAcceptsPets());
        pm.setDisabilityFriendly(cph.getStep3Data().isDisabilityFriendly());
        pm.setTitle(cph.getOverviewData().getPropertyTitle());
        pm.setDescription(cph.getOverviewData().getPropertyDescription());
        pm.setGuide(cph.getOverviewData().getPropertyGuide());
        pm.setRules(cph.getOverviewData().getPropertyRules());

        pm.setClimateData(cph.getClimateData());
        pm.setBeautyData(cph.getBeautyData());
        pm.setEntertainmentData(cph.getEntertainmentData());
        pm.setHealthAndSafetyData(cph.getHealthAndSafetyData());
        pm.setKitchenData(cph.getKitchenData());
        pm.setLaundryData(cph.getLaundryData());
        pm.setTransportData(cph.getTransportData());
        pm.setWaterData(cph.getWaterData());
       
        // pm.setPropertyType(EProperty.APARTMENT);
        
        pm.setImageUrls(cph.getImagesData());
        // dates
        //pm.setAvailableDates(cph.getAvailableDates());



        pm.setStatus(false);


        propertyRepo.save(pm);
        
    }
}
