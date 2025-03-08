package com.example.demo.property.propertycmrs.DTO;

import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;

import com.example.demo.property.propertycmrs.DTO.types.AddressData;
import com.example.demo.property.propertycmrs.DTO.types.BeautyData;
import com.example.demo.property.propertycmrs.DTO.types.ClimateData;
import com.example.demo.property.propertycmrs.DTO.types.EntertainmentData;
import com.example.demo.property.propertycmrs.DTO.types.HealthAndSafetyData;
import com.example.demo.property.propertycmrs.DTO.types.KitchenData;
import com.example.demo.property.propertycmrs.DTO.types.LaundryData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.DTO.types.TransportData;
import com.example.demo.property.propertycmrs.DTO.types.WaterData;
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
}
