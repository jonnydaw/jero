package com.example.demo.validator.signup;

import org.springframework.stereotype.Component;

import com.example.demo.user.DTO.UserSignupHandler;

@Component
public class PasswordMatchValidator extends AbstractSignupValidator {

    @Override
    public boolean validateRequest(UserSignupHandler user) {
        boolean isMatch = user.getPassword().equals(user.getConfirmPassword());
        if(!isMatch){
            System.out.println("password mismatch cor");
            return false;
        }
        return validateNextRequest(user);
    }
    
}
