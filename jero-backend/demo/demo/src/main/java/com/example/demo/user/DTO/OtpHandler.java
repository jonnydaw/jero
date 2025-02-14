package com.example.demo.user.DTO;

import org.springframework.web.bind.annotation.CookieValue;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class OtpHandler {

// public class UserLoginHandler {

    @Size(min=5, max=5)
    @NotBlank
    int otpPassword; 
    @NotBlank
    String locale;
}

    

