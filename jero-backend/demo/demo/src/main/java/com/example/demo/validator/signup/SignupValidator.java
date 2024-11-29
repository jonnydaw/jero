package com.example.demo.validator.signup;

import com.example.demo.enumeration.validator.PasswordError;

import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SignupValidator {
    

    public boolean checkFieldsMatch(String field1, String field2){
        return field1.equals(field2);
    }


    public Set<PasswordError> validPasswordMsg(String password){
        
        Set<PasswordError> errors =  new HashSet<>();
        
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern digit = Pattern.compile("[0-9]");
        Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
        Matcher hasLetter = letter.matcher(password);
        Matcher hasDigit = digit.matcher(password);
        Matcher hasSpecial = special.matcher(password);


        if(password.length() < 8){
            errors.add(PasswordError.TOO_SHORT);
        }

        if(!hasDigit.find()){
            errors.add(PasswordError.NO_DIGIT);
        }

        if(!hasSpecial.find()){
            errors.add(PasswordError.NO_SPECIAL);
        }

        if(!hasLetter.find()){
            errors.add(PasswordError.NO_LETTER);
        }

        return errors;

    }

    // private boolean verifyPassword(String password){

    //     return true;
    // }
}
