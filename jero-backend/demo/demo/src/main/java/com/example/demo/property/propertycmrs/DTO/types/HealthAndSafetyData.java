package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class HealthAndSafetyData {
    private boolean hasFireAlarm;
    private boolean hasCarbonMonoxideDetector;
    private boolean hasFireExtinguisher;
    private boolean hasFirstAidKit;
}
