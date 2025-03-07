package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TransportData {
    private boolean hasGarage;
    private boolean hasOffStreetParking;
    private boolean hasOnStreetParking;
    private boolean hasReliablePublicTransportNearby;
}
