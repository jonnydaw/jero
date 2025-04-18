package com.example.demo.validator.signup;


import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;

@Component
public class ValidPasswordValidator extends AbstractSignupValidator {

    @Override
    public ArrayList<SignupErrorMessages> validateRequest(UserSignupHandler user, ArrayList<SignupErrorMessages> list) {
        String password = user.getPassword();
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern digit = Pattern.compile("[0-9]");
        Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
        Matcher hasLetter = letter.matcher(password);
        Matcher hasDigit = digit.matcher(password);
        Matcher hasSpecial = special.matcher(password);

        if(password.length() < 8){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_TOO_SHORT.toString());
            // return false;
            // errors.add(PasswordError.TOO_SHORT);
        }

        if(!hasDigit.find()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_NO_DIGIT.toString());
            // errors.add(PasswordError.NO_DIGIT);
        }

        if(!hasSpecial.find()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_NO_SPECIAL.toString());
            // errors.add(PasswordError.NO_SPECIAL);
        }

        if(!hasLetter.find()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.PASSWORD_ERROR_NO_LETTER.toString());

            // errors.add(PasswordError.NO_LETTER);
        }

        return validateNextRequest(user, list);
    }
    
}
