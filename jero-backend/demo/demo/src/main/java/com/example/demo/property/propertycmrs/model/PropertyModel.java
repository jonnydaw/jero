package com.example.demo.property.propertycmrs.model;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.property.propertycmrs.DTO.types.BeautyData;
import com.example.demo.property.propertycmrs.DTO.types.ClimateData;
import com.example.demo.property.propertycmrs.DTO.types.EntertainmentData;
import com.example.demo.property.propertycmrs.DTO.types.HealthAndSafetyData;
import com.example.demo.property.propertycmrs.DTO.types.KitchenData;
import com.example.demo.property.propertycmrs.DTO.types.LaundryData;
import com.example.demo.property.propertycmrs.DTO.types.TransportData;
import com.example.demo.property.propertycmrs.DTO.types.WaterData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "property")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class PropertyModel {
    @Id
    private ObjectId id;
    private ObjectId ownerId;

    private String townId;
    private String cityDistrictId;
    private String cityId;
    private String countyId;
    private String stateId;
    private String countryId;
    private String address;
    private double longitude;
    private double latitude;

    private String title;
    private String description;
    private String guide;
    private String rules;

    private ClimateData climateData;
    private BeautyData beautyData;
    private EntertainmentData entertainmentData;
    private HealthAndSafetyData healthAndSafetyData;
    private KitchenData kitchenData;
    private LaundryData laundryData;
    private TransportData transportData;
    private WaterData waterData;
    // private int numberBedrooms;
    // private int numberBathrooms;
    private int numberDoubleBeds;
    private int numberSingleBeds;
    private int numberHammocks;
    private int numberSofaBeds; 
    private int numBedrooms;
    private int numberBathrooms;
    private int minGuests;
    private int maxGuests;
    // private EProperty propertyType;
    private double pricePerNight;
    private double priceIncreasePerPerson;


    
    private List<String> imageUrls;
    // private List<FacilitiesType> facilities;
    private Map<String,List<ReviewsType>> reviews;
    private Set<Instant> blockedDates;

    private boolean acceptsChildren;
    private boolean acceptsPets;
    private boolean disabilityFriendly;
    private boolean status;
    private double avgReviewScore;
    private double percentile;
    
}
