package com.example.demo.dto.User;
import java.util.Set;

import com.example.demo.enumeration.user.UserStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor; 
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 


@Data
public class UserSignupHandler {
    @NotBlank
    String firstName;
    
    @NotBlank
    String lastName;
    
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
