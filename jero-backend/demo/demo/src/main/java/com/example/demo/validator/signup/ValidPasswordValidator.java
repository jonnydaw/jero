package com.example.demo.validator.signup;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.example.demo.user.DTO.UserSignupHandler;

@Component
public class ValidPasswordValidator extends AbstractSignupValidator {

    @Override
    public boolean validateRequest(UserSignupHandler user) {
        String password = user.getPassword();
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern digit = Pattern.compile("[0-9]");
        Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
        Matcher hasLetter = letter.matcher(password);
        Matcher hasDigit = digit.matcher(password);
        Matcher hasSpecial = special.matcher(password);

        if(password.length() < 8){
            return false;
            // errors.add(PasswordError.TOO_SHORT);
        }

        if(!hasDigit.find()){
            return false;
            // errors.add(PasswordError.NO_DIGIT);
        }

        if(!hasSpecial.find()){
            return false;
            // errors.add(PasswordError.NO_SPECIAL);
        }

        if(!hasLetter.find()){
            return false;
            // errors.add(PasswordError.NO_LETTER);
        }

        return validateNextRequest(user);
    }
    
}
