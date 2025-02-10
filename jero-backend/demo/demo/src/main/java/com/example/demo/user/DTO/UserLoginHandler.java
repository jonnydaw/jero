package com.example.demo.user.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginHandler {

    @NotBlank
    @Email
    String username;

    @NotBlank String password;
    
}
