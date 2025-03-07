package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ClimateData {
    private boolean hasAirCon;
    private boolean hasFan;
    private boolean hasHeating;
    private boolean hasWoodBurningFire;

}
