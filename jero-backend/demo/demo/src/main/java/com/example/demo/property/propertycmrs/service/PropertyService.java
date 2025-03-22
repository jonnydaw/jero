package com.example.demo.property.propertycmrs.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.locations.locationCMRS.service.ILocationService;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.model.EProperty;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class PropertyService implements IPropertyService {

    @Autowired private PropertyRepo propertyRepo;
    @Autowired private LocationRepository locationRepository;
    @Autowired private ILocationService locationService;
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
        pm.setTownId((hierarchy.get("town")));
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
        List<LocalDate> today = new ArrayList<>();
        today.add(LocalDate.now());
        pm.setBlockedDates(today);
        // dates
        //pm.setAvailableDates(cph.getAvailableDates());
        pm.setStatus(false);
        propertyRepo.save(pm);
    }

    @Override
    public List<Map<String,String>> getPropertiesByLocation(String queriedLocation, LocalDate startDate, LocalDate endDate, int numAdults, int numChildren, int numPets) {
        LocationModel location  = locationRepository.findLocationById(queriedLocation);
        if(location == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
        }

        String locationType = location.getLocationType();
        List<PropertyModel> pms = new ArrayList<>();
        pms = extracted2(location, locationType, pms, startDate, endDate, numAdults, numChildren, numPets);

        List<Map<String,String>> res = new ArrayList<>();
        for(PropertyModel pm : pms){
            String displayLocation = extracted(pm);
            Map<String,String> propertyAttributes = new HashMap<>();
            propertyAttributes.put("id", pm.getId().toHexString());
            propertyAttributes.put("title", pm.getTitle());
            propertyAttributes.put("displayLocation",displayLocation);
            // propertyAttributes.put("townId", pm.getTownId());
            // propertyAttributes.put("cityDistrictId",pm.getCityDistrictId());
            propertyAttributes.put("pricePerNight", String.valueOf(pm.getPricePerNight()));
            propertyAttributes.put("mainImage",pm.getImageUrls().getFirst());
            res.add(propertyAttributes);
        }
        return res;
    }

    @Override
    public Map<String, List<PropertyBooking>> getPropertiesFromBookings(Map<String, List<BookingModel>> bookings) {
        Map<String, List<PropertyBooking>>  res = new HashMap<>();
        for(String key : bookings.keySet()){
            List<PropertyBooking> arr = new ArrayList<>();
            for(BookingModel booking : bookings.get(key)){
                PropertyBooking pb = new PropertyBooking();
                PropertyModel pm = this.getPropertyById(booking.getPropertyId());

                pb.setPropertyId(booking.getPropertyId().toHexString());
                pb.setBookingId(booking.getId().toHexString());
                pb.setTitle(pm.getTitle());
                pb.setImage(pm.getImageUrls().getFirst());
                pb.setStart(booking.getStartDate());
                pb.setEnd(booking.getEndDate());
                pb.setNumAdults(booking.getNumAdults());
                pb.setNumChildren(booking.getNumChildren());
                pb.setNumPets(booking.getNumPets());
                pb.setTotalCost(booking.getTotalCost());
                arr.add(pb);
            }
            res.put(key,arr);
            System.out.println("*********************8");
        }
        return res;
    }

    @Override
    public PropertyModel getPropertyById(ObjectId propertyId) {
        PropertyModel property = propertyRepo.findById(propertyId).get();
        if(property == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }
        return property;
    }

    private List<PropertyModel> extracted2(LocationModel location, String locationType, List<PropertyModel> pms, LocalDate startDate, LocalDate endDate, int numAdults, int numChildren, int numPets) {
       // if(locationType.equals("city")){
            pms = propertyRepo.basicFilter(location.getId(), startDate, endDate, (numAdults + numChildren), numChildren > 0, numPets > 0);
        //}
        return pms;
    }

    private String extracted(PropertyModel pm) {
        String displayLocation = "";
        if(pm.getTownId() != null && !pm.getTownId().equals("")){
            displayLocation = pm.getTownId();
        }else if(pm.getCityDistrictId() != null && !pm.getCityDistrictId().equals("")){
            displayLocation = pm.getCityDistrictId();
        } else if(pm.getCityId() != null && !pm.getCityId().equals("")){
            displayLocation = pm.getCityId();
        }
        return displayLocation;
    }




}
