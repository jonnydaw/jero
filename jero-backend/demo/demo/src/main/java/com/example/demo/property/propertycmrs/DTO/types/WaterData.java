package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class WaterData {
    private boolean hasDrinkingWater;
    private boolean hasBath;
    private boolean hasPrivateToilet;
    private boolean hasJacuzzi;
    private boolean hasShower;
    private boolean hasBidet;
    private boolean hasSwimmingPool;
}
