package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BeautyData {
    private boolean hasHairDryer;
    private boolean hasHairStraightner;
    private boolean hasShampoo;
    private boolean hasConditioner;
    private boolean hasBodyWash;
}
