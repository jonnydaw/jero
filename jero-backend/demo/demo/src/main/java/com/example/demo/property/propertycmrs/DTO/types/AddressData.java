package com.example.demo.property.propertycmrs.DTO.types;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddressData {
    private String locationName;
    private double lat;
    private double lon;
    private Map<String, String> hierarchy;
}
