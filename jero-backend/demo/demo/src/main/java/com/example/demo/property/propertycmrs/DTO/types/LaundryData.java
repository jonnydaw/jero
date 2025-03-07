package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LaundryData {
    private boolean hasWashingMachine;
    private boolean hasTumbleDryer;
    private boolean hasIron;
    private boolean hasDryingRack;

}
