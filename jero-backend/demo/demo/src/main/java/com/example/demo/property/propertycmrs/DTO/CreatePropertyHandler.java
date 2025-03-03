package com.example.demo.property.propertycmrs.DTO;

import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;
import com.example.demo.property.propertycmrs.model.FacilitiesType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreatePropertyHandler {

    private ObjectId boroughId;
    
    private ObjectId metroAreaId;
    
    private ObjectId townId;

    @NotNull
    private ObjectId countyId;
    
    @NotNull
    private ObjectId stateId;
    
    @NotNull
    private ObjectId countryId;
    
    @NotNull
    private ObjectId continentId;
    
    @NotNull
    private int numberBedrooms;
    
    @NotNull
    private int numberBathrooms;
    
    @NotNull
    private int numberBeds;
    
    @NotNull
    private int maxGuests;
    
    @NotNull
    private String propertyType;

    @NotNull
    private double pricePerNight;
    
    private double rateIncreasePerPerson;

    @NotNull
    private String address;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private double longitude;

    @NotNull
    private double latitude;

    @NotNull
    private List<String> imageUrls;

    
    @NotNull
    private List<FacilitiesType> facilities;

    private List<Date> availableDates;
    
    @NotNull
    private boolean acceptsChildren;

    @NotNull
    private boolean acceptsPets;

    @NotNull
    private boolean disabilityFriendly;
    
    
}
