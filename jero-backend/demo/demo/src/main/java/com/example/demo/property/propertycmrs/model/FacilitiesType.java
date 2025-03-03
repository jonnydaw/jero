package com.example.demo.property.propertycmrs.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class FacilitiesType {
    private boolean hasKitchen;
    private boolean hasWashingMachine;
    private boolean hasTumbleDryer;
    private boolean hasJacuzzi;
    private boolean hasGym;
    private boolean hasHairdryer;
    private boolean hasAirCon;
    private boolean hasWifi;
    private boolean hasBalcony;
    private boolean hasSwimmingPool;
    private boolean hasGarden;
    
}
