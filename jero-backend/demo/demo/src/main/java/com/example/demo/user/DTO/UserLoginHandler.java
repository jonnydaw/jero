package com.example.demo.user.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginHandler {

    @NotBlank String userName;

    @NotBlank String password;
    
}
