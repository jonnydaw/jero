package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class KitchenData {
    private boolean hasKitchen;
    private boolean hasDishwasher;
    private boolean hasMicrowave;
    private boolean hasOven;
    private boolean hasHob;
    private boolean hasPotsAndPans;
    private boolean hasCutlery;
    private boolean hasCrockery;
    private boolean hasKettle;
    private boolean hasCoffeeMaker;

}
