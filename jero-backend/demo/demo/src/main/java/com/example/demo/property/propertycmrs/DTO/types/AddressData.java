package com.example.demo.property.propertycmrs.DTO.types;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddressData {
    private String fullAddress;
    private String latitude;
    private String longitude;
    private List<String> hierarchy;
}
