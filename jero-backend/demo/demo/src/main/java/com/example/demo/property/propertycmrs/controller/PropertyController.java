package com.example.demo.property.propertycmrs.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
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
import com.example.demo.property.propertycmrs.model.PropertyModel;
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
    public ResponseEntity<?> getPropertyFromId(@PathVariable("property_id") String propertyId, PropertyModel property ){
        System.out.println("hit");
        System.out.println(propertyId);
        property = propertyService.getPropertyById(new ObjectId(propertyId));
        double lat = property.getLatitude();
        double lon = property.getLongitude();

        property.setLatitude(((double)((int)(lat *1000.0)))/1000.0);
        property.setLongitude(((double)((int)(lon*1000.0)))/1000.0);

        System.out.println(property.toString());
        return ResponseEntity.ok().body(property);
    }
    // https://stackoverflow.com/questions/22373696/requestparam-in-spring-mvc-handling-optional-parameters

    @GetMapping("/search-properties")
    public ResponseEntity<?> getPropertiesFromLocation(@RequestParam("location") String location, 
                                                       @RequestParam("startdate") Optional<String> startDate, 
                                                       @RequestParam("enddate") Optional<String> endDate,
                                                       @RequestParam("numadults") Optional<Integer> numAdults,
                                                       @RequestParam("numchildren") Optional<Integer> numChildren,
                                                       @RequestParam("numpets") Optional<Integer> numPets
                                                       ){
        Instant start = Instant.parse(startDate.get()+"T00:00:00.000Z");
        Instant end = Instant.parse(endDate.get()+"T00:00:00.000Z");

        List<Map<String,String>> res = propertyService.getPropertiesByLocation(location, start, end, numAdults.orElse(1), numChildren.orElse(0), numPets.orElse(0));
        System.out.println("hit controller");
        System.out.println(res.toString());
        return ResponseEntity.ok().body(res);
    }




}
