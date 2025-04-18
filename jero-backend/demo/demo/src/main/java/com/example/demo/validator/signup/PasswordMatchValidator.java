package com.example.demo.validator.signup;

import java.util.ArrayList;

import org.springframework.stereotype.Component;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;

@Component
public class PasswordMatchValidator extends AbstractSignupValidator {

    @Override
    public ArrayList<SignupErrorMessages>  validateRequest(UserSignupHandler user, ArrayList<SignupErrorMessages> errors) {
        boolean isMatch = user.getPassword().equals(user.getConfirmPassword());
        if(!isMatch){
            errors.add(SignupErrorMessages.PASSWORD_ERROR_MISMATCH);
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_MISMATCH.toString());
        }
        return validateNextRequest(user, errors);
    }
    
}
