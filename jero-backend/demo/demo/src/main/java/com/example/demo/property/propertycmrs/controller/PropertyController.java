package com.example.demo.property.propertycmrs.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBasicHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBookedHandler;
import com.example.demo.property.propertycmrs.DTO.ReviewHandler;
import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;

import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.property.propertycmrs.service.IUpdatePropertyService;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/property")

//@CrossOrigin(origins="http:localhost:3000", allowCredentials = "true")
public class PropertyController {

   @Autowired private IPropertyService propertyService;
   @Autowired private IBookingService bookingService;
   @Autowired private IUpdatePropertyService updatePropertyService;


    //@PreAuthorize("hasAuthority('host')")
    @PostMapping("/add_property")
    public ResponseEntity<?> addProperty(@CookieValue("JWT") String token, @RequestBody CreatePropertyHandler cph, PropertyModel pm){
       
       //System.out.println(cph.getStep3Data().getDoubleBeds());
        propertyService.createProperty(token, cph, pm);
        return ResponseEntity.ok().body("hi");
    }


    @GetMapping("{property_id}")
    public ResponseEntity<?> getPropertyFromId(@PathVariable("property_id") String propertyId, PropertyModel property, GetPropertyBasicHandler res){
        System.out.println("hit");
        System.out.println(propertyId);
        property = propertyService.getPropertyById(new ObjectId(propertyId));
        res = propertyService.processProperty(property, res);

        // // https://stackoverflow.com/questions/15117403/dto-pattern-best-way-to-copy-properties-between-two-objects
        // BeanUtils.copyProperties(property, res);
 

        System.out.println(property.toString());
        return ResponseEntity.ok().body(res);
    }
    // https://stackoverflow.com/questions/22373696/requestparam-in-spring-mvc-handling-optional-parameters

    @GetMapping("/search-properties")
    public ResponseEntity<?> getPropertiesFromLocation(@RequestParam("location") @NotEmpty String location, 
        @RequestParam("startdate") @NotEmpty String startDate, 
        @RequestParam("enddate") @NotEmpty String endDate,
        @RequestParam("numadults") @NotNull Integer numAdults,
        @RequestParam("numchildren") @NotNull Integer numChildren,
        @RequestParam("numpets") @NotNull Integer numPets,
        @RequestParam("sort") Optional<String> sort                               
        ){ 
        Instant start = Instant.parse(startDate +"T00:00:00.000Z");
        Instant end = Instant.parse(endDate+"T00:00:00.000Z");
        List<Map<String,String>> res = propertyService.getPropertiesByLocation(location, start, end, numAdults, numChildren, numPets ,sort);
        System.out.println("hit controller");
        System.out.println(res.toString());
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/smart-search-properties")
    public ResponseEntity<?> getPropertiesFromSmart(@RequestParam("startdate") Optional<String> startDate, 
        @RequestParam("enddate") Optional<String> endDate,
        @RequestParam("numadults") Optional<Integer> numAdults,
        @RequestParam("numchildren") Optional<Integer> numChildren,
        @RequestParam("numpets") Optional<Integer> numPets,
        @RequestParam("attractions") Optional<String> attractions,
        @RequestParam("holidayType") Optional<String> holidayType,
        @RequestParam("tourismLevels") Optional<String> tourismLevels,
        @RequestParam("minTemp") Optional<Integer> minTemp,
        @RequestParam("maxTemp") Optional<Integer> maxTemp,
        @RequestParam("gettingAround") Optional<String> gettingAround
        ){
        Instant start = Instant.parse(startDate.orElse("2025-12-20")+"T00:00:00.000Z");
        //Instant start = Instant.parse(("2025-12-20")+"T00:00:00.000Z");
        
        //System.out.println("controller ga " + gettingAround.get());
        Instant end = Instant.parse(endDate.orElse("2025-12-25")+"T00:00:00.000Z");
        //Instant end = Instant.parse(("2025-12-25")+"T00:00:00.000Z");

        System.out.println(attractions.get());
        List<Map<String,String>> res = propertyService.getPropertiesBySmart(
            start, 
            end, 
            numAdults.orElse(1), 
            numChildren.orElse(0), 
            numPets.orElse(0),
            attractions.orElse(null),
            holidayType.orElse(null),
            tourismLevels.orElse(null),
            minTemp.orElse(null),
            maxTemp.orElse(null),
            gettingAround.orElse(null),
            new ArrayList<>(),
            new ArrayList<>()
            );
        // System.out.println("hit controller");
        // System.out.println(res.toString());
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("add-review")
    public ResponseEntity<?> addReview(@CookieValue("JWT") String token, @RequestBody ReviewHandler rh){
        System.out.println(rh.getPropertyId());
        propertyService.addReview(token, rh);
        return ResponseEntity.ok().body("posted");
    }

    @GetMapping("booked-property/{booking_id}/{property_id}")
    public ResponseEntity<?> getBookedProperty(@CookieValue("JWT") String token, 
    @PathVariable("booking_id") String bookingId ,
    @PathVariable("property_id") String propertyId,
    PropertyModel property,
    GetPropertyBookedHandler res
    ){
        System.out.println("hit this controller");
        //List<String> res = new ArrayList<>();
        //res.add("hi");

        bookingService.verifyUser(token,bookingId);
        property = propertyService.getPropertyById(new ObjectId(propertyId)); 
        propertyService.processBookedProperty(property, res);
        System.out.println("booking " + bookingId);
        System.out.println("property " + propertyId);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/get-owner-properties")
    public ResponseEntity<?> getPropertiesFromSmart(@CookieValue("JWT") String token){
        List<Map<String, String>> res = propertyService.getPropertiesByOwnerId(token);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/get-property-images/{property_id}")
    public ResponseEntity<?> getPropertyImages(@CookieValue("JWT") String token, @PathVariable("property_id") String propertyId){
        System.out.println(propertyId);
        List<String> res = updatePropertyService.getPropertyImages(token, propertyId);
        return ResponseEntity.ok().body(res);
    }

    @PatchMapping("/update-property-images/{property_id}")
    public ResponseEntity<?> updatePropertyImages(@CookieValue("JWT") String token, @RequestBody Map<String, List<String>> newImages, @PathVariable("property_id") String propertyId){
        System.out.println(newImages);
        updatePropertyService.updatePropertyImages( token,  propertyId, newImages.get("updatedImages"));
        return ResponseEntity.ok().body("Hi");
    }

    @GetMapping("/get-guests-pricing/{property_id}")
    public ResponseEntity<?> getGuestsAndPricing(@CookieValue("JWT") String token, @PathVariable("property_id") String propertyId){
        System.out.println(propertyId);
        Step3Data res = updatePropertyService.getGuestManagement(token, propertyId);
        return ResponseEntity.ok().body(res);
    }

    @PatchMapping("/update-guests-pricing/{property_id}")
    public ResponseEntity<?> updateGuestsAndPricing(@CookieValue("JWT") String token, @RequestBody Map<String, Step3Data> newStep3, @PathVariable("property_id") String propertyId){
        System.out.println();
        updatePropertyService.updateStep3Data( token,  propertyId, newStep3.get("updateGuestManagement"));
        return ResponseEntity.ok().body("Hi");
    }


    @GetMapping("/get-amenities/{property_id}")
    public ResponseEntity<?> getAmenities(@CookieValue("JWT") String token, @PathVariable("property_id") String propertyId,  AmentiesHandler res){
        //System.out.println(propertyId);
        res = updatePropertyService.getAmenties(token, propertyId, res);
        return ResponseEntity.ok().body(res);
    }

    
    @PatchMapping("/update-amenities/{property_id}")
    public ResponseEntity<?> updateAmenities(@CookieValue("JWT") String token, @RequestBody AmentiesHandler newAmenities, @PathVariable("property_id") String propertyId){
        System.out.println();
        updatePropertyService.updateAmenities(token,  propertyId, newAmenities);
        return ResponseEntity.ok().body("Hi");
    }


    @GetMapping("/get-descriptions/{property_id}")
    public ResponseEntity<?> getDescriptions(@CookieValue("JWT") String token, @PathVariable("property_id") String propertyId, OverviewData res){
        //System.out.println(propertyId);
        res = updatePropertyService.getDescriptions(token, propertyId, res);
        return ResponseEntity.ok().body(res);
    }

    @PatchMapping("/update-descriptions/{property_id}")
    public ResponseEntity<?> updateDescriptions(@CookieValue("JWT") String token, @RequestBody Map<String, OverviewData> newDescriptions, @PathVariable("property_id") String propertyId){
        System.out.println();
        // System.out.println("nd " + newDescriptions.toString());
        updatePropertyService.updateDescriptions(token,  propertyId, newDescriptions.get("newDescriptions"));
        return ResponseEntity.ok().body("Hi");
    }

    @DeleteMapping("/delete-property/{property_id}")
    public ResponseEntity<?> deleteProperty(@CookieValue("JWT") String token, @PathVariable("property_id") String propertyId){
        updatePropertyService.deleteProperty(token, propertyId);
        return ResponseEntity.ok().body("Hi");

    }




}
