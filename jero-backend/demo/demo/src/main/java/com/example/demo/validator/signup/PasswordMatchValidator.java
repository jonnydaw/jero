package com.example.demo.validator.signup;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;

@Component
public class PasswordMatchValidator extends AbstractSignupValidator {

    @Override
    public boolean validateRequest(UserSignupHandler user) throws Exception {
        boolean isMatch = user.getPassword().equals(user.getConfirmPassword());
        if(!isMatch){
            // System.out.println("password mismatch cor");
            // return false;
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_MISMATCH.toString());
        }
        return validateNextRequest(user);
    }
    
}
