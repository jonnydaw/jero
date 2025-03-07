package com.example.demo.property.propertycmrs.DTO.types;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class EntertainmentData {
    private boolean hasWifi;
    private boolean hasSmartTv;
    private boolean hasGym;
    private boolean hasBooks;
    private boolean hasBoardGames;
    private boolean hasLocalMuseums;
    private boolean hasLocalBars;
    private boolean hasLocalTheatres;
}
