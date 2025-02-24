package com.example.demo.property.propertycmrs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.service.IPropertyService;

@RestController
@RequestMapping("/property")
@CrossOrigin(origins="http:localhost:3000", allowCredentials = "true")
public class PropertyController {
    @Autowired private IPropertyService propertyService;

    @PreAuthorize("hasAuthority('host')")
    @PostMapping("/property/add_property")
    public ResponseEntity<?> addProperty(@CookieValue("JWT") String token, CreatePropertyHandler cph){

        return ResponseEntity.ok().body("hi");
    }

    @GetMapping("/property/{property_id}")
    public ResponseEntity<?> getPropertyFromId(@Param("property_id") String property_id){

        return ResponseEntity.ok().body("hi");
    }

    // @GetMapping("/coordinates/{search}")
    // public ResponseEntity<?> getCoord(@Param("search") String property_id){
    //     final String uri = "http://localhost:8080/springrestexample/employees.xml";

    //     RestTemplate restTemplate = new RestTemplate();
    //     String result = restTemplate.getForObject(uri, String.class);

    //     System.out.println(result);
    //     return ResponseEntity.ok().body("hi");
    // }


}
