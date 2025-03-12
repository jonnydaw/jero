package com.example.demo.property.propertycmrs.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.property.propertycmrs.service.IPropertyService;

@RestController
@RequestMapping("/property")

//@CrossOrigin(origins="http:localhost:3000", allowCredentials = "true")
public class PropertyController {

   @Autowired private IPropertyService propertyService;


    //@PreAuthorize("hasAuthority('host')")
    @PostMapping("/add_property")
    public ResponseEntity<?> addProperty(@CookieValue("JWT") String token, @RequestBody CreatePropertyHandler cph){
       
       //System.out.println(cph.getStep3Data().getDoubleBeds());
        propertyService.createProperty(token, cph);
        return ResponseEntity.ok().body("hi");
    }

    @GetMapping("{property_id}")
    public ResponseEntity<?> getPropertyFromId(@Param("property_id") String propertyId){
        return ResponseEntity.ok().body("hi");
    }

    @GetMapping("/search-properties")
    public ResponseEntity<?> getPropertiesFromLocation(@RequestParam("location") String location){
        List<String> res = propertyService.getPropertiesByLocation(location);
        System.out.println("hit controller");
        return ResponseEntity.ok().body(res);
    }



}
