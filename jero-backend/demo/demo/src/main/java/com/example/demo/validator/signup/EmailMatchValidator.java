package com.example.demo.validator.signup;

import java.util.ArrayList;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

// import java.util.HashSet;
// import java.util.Set;
// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;

@Primary
@Component
public class EmailMatchValidator extends AbstractSignupValidator {

    @Override
    public ArrayList<SignupErrorMessages> validateRequest(UserSignupHandler user, ArrayList<SignupErrorMessages> list) {
        boolean isMatch = user.getEmail().equals(user.getConfirmEmail());
        if(!isMatch){
            list.add(SignupErrorMessages.EMAIL_ERROR_MISMATCH);
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.EMAIL_ERROR_MISMATCH.toString());
            //return false;
        }
        return validateNextRequest(user, list);
    }

}