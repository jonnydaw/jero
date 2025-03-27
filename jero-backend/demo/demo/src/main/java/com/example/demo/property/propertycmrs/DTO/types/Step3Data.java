package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Step3Data {
    private int pricePerNight;
    private int priceIncreasePerPerson;
    private boolean acceptsChildren;
    private boolean acceptsPets;
    private boolean disabilityFriendly;
    private int minGuests;
    private int maxGuests;
    private int numBedrooms;
    private int numBathrooms;
    private int doubleBeds;
    private int singleBeds;
    private int hammocks;
    private int sofaBeds;
}
