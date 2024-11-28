package com.example.demo.handler.User;
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
    String email;
    
    @Email

    String confirmEmail;
    
    @NotBlank
    String password;
    
    @NotBlank
    String confirmPassword;


    public boolean isValid(){
        if(!password.equals(confirmPassword) || !email.equals(confirmEmail)){
            System.out.println(password + " - " + confirmPassword);
            System.out.println(email + " - " + confirmEmail);
            System.out.println("hit is valid");
            return false;
        }
        return true;
    }
}
