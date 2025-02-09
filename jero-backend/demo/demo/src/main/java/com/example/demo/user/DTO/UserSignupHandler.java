package com.example.demo.user.DTO;


import org.springframework.validation.annotation.Validated;

import com.example.demo.user.enumeration.user.Roles;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;



@Data
public class UserSignupHandler {
    @NotBlank
    String firstName;
    
    @NotBlank
    String lastName;
    // to-do change to date type
    @NotBlank
    String dob;
    
    @Email
    @NotBlank
    String email;
    
    @Email
    String confirmEmail;
    
    @NotBlank
    String password;
    
    @NotBlank
    String confirmPassword;

    @NotBlank
    String roles;
}
