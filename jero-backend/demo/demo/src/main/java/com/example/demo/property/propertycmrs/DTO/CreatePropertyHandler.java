package com.example.demo.property.propertycmrs.DTO;

import java.util.List;

import com.example.demo.property.propertycmrs.DTO.types.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true) 
public class CreatePropertyHandler {
    private AddressData addressData;
    private BeautyData beautyData;
    private ClimateData climateData;
    private EntertainmentData entertainmentData;
    private HealthAndSafetyData healthAndSafetyData;
    private List<String> imagesData;
    private KitchenData kitchenData;
    private LaundryData laundryData;
    private Step3Data step3Data;
    private TransportData transportData;
    private WaterData waterData;
    private OverviewData overviewData;
}
