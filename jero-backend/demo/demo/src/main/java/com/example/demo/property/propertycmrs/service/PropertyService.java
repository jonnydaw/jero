package com.example.demo.property.propertycmrs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

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
        String email =  JwtProvider.getEmailFromJwtToken(token);
		UserModel user = userRepository.findByEmail(email);
        PropertyModel pm = new PropertyModel();
        pm.setOwnerId(user.getId());
        pm.setTownId(cph.getTownId());
        pm.setBoroughId(cph.getBoroughId());
        pm.setMetroAreaId(cph.getMetroAreaId());
        pm.setCountyId(cph.getCountyId());
        pm.setStateId(cph.getStateId());
        pm.setCountryId(cph.getCountryId());
        pm.setContinentId(cph.getContinentId());

        pm.setNumberBedrooms(cph.getNumberBedrooms());
        pm.setNumberBathrooms(cph.getNumberBathrooms());
        pm.setNumberBeds(cph.getNumberBeds());
        pm.setMaxGuests(cph.getMaxGuests());
        pm.setPropertyType(EProperty.APARTMENT);
        
        pm.setPricePerNight(cph.getPricePerNight());
        pm.setRateIncreasePerPerson(cph.getRateIncreasePerPerson());

        pm.setAddress(cph.getAddress());
        pm.setTitle(cph.getTitle());
        pm.setDescription(cph.getDescription());

        pm.setLongitude(cph.getLongitude());
        pm.setLatitude(cph.getLatitude());

        pm.setImageUrls(cph.getImageUrls());
        pm.setFacilities(cph.getFacilities());
        pm.setAvailableDates(cph.getAvailableDates());

        pm.setAcceptsChildren(cph.isAcceptsChildren());
        pm.setAcceptsPets(cph.isAcceptsPets());
        pm.setDisabilityFriendly(cph.isDisabilityFriendly());

        pm.setStatus(false);


        propertyRepo.save(pm);
        
    }
}
