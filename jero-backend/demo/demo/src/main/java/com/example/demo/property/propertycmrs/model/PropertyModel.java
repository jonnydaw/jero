package com.example.demo.property.propertycmrs.model;

import java.beans.JavaBean;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
@JavaBean
public class PropertyModel {
    @Id
    private ObjectId id;
    private ObjectId ownerId;
    private ObjectId townId;
    private ObjectId boroughId;
    private ObjectId metroAreaId;
    private ObjectId countyId;
    private ObjectId stateId;
    private ObjectId countryId;
    private ObjectId continentId;
    
    private int numberBedrooms;
    private int numberBathrooms;
    private int numberBeds;
    private int maxGuests;
    private EProperty propertyType;


    private double pricePerNight;
    private double rateIncreasePerPerson;

    private String address;
    private String title;
    private String description;
    private double longitude;
    private double latitude;
    
    private List<String> imageUrls;
    private List<FacilitiesType> facilities;
    private Map<ObjectId,ReviewsType> userIdToReviews;
    private List<Date> availableDates;

    private boolean acceptsChildren;
    private boolean acceptsPets;
    private boolean disabilityFriendly;
    private boolean status;
    
}
