package com.example.demo.property.propertycmrs.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;

import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBasicHandler;
import com.example.demo.property.propertycmrs.DTO.ReviewHandler;
import com.example.demo.property.propertycmrs.model.PropertyModel;

public interface IPropertyService {

    void createProperty(String jwt, CreatePropertyHandler cph);

    List<Map<String,String>> getPropertiesByLocation(
        String queriedLocation, 
        Instant startDate, 
        Instant endDate, 
        int numAdults, 
        int numChildren, 
        int numPets,
        Optional<String> sort);

    public List<Map<String,String>> getPropertiesBySmart(
        Instant startDate, 
        Instant endDate, 
        int numAdults, 
        int numChildren, 
        int numPets,
        String attractions,
        String holidayType,
        String tourismLevels,
        int minTemp,
        int maxTemp
        );

    PropertyModel getPropertyById(ObjectId propertyId);

    Map<String, List<PropertyBooking>> getPropertiesFromBookings(Map<String, List<BookingModel>> bookings);

    public void addReview(String jwt, ReviewHandler rh);

    public GetPropertyBasicHandler processProperty(PropertyModel propertyModel, GetPropertyBasicHandler res);

    
}
