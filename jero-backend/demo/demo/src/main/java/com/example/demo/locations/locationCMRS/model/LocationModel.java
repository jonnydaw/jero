package com.example.demo.locations.locationCMRS.model;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "location")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class LocationModel{
    @Id
    private String id;
    private String locationType;
    private String parent;
    private Map<String,String> overview;
    private List<LocationModel> nParents;

}