package com.example.demo.property.propertycmrs.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;

@RestController
@RequestMapping("/property")
@CrossOrigin(origins="http:localhost:3000", allowCredentials = "true")
public class PropertyController {

    @PreAuthorize("hasAuthority('host')")
    @PostMapping("/property/add_property")
    public ResponseEntity<?> addProperty(@CookieValue("JWT") String token, CreatePropertyHandler cph){

        return ResponseEntity.ok().body("hi");
    }

    @GetMapping("/property/{property_id}")
    public ResponseEntity<?> getPropertyFromId(@Param("property_id") String propertyId){

        return ResponseEntity.ok().body("hi");
    }



}
