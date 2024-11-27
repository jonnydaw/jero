package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class RecController {

    @GetMapping("/recommendation")
    public String getMethodName(@RequestParam String param) {
        System.out.println(param.toString());
        return "ormogpkrrg";
    }
    

}
