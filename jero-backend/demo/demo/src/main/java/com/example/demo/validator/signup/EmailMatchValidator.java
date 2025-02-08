package com.example.demo.validator.signup;

import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

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
    public boolean validateRequest(UserSignupHandler user) throws Exception {
        boolean isMatch = user.getEmail().equals(user.getConfirmEmail());
        if(!isMatch){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SignupErrorMessages.EMAIL_ERROR_MISMATCH.toString());
            //return false;
        }
        return validateNextRequest(user);
    }

    


}


    // public Set<PasswordError> validPasswordMsg(String password){
        
    //     Set<PasswordError> errors =  new HashSet<>();
        
    //     Pattern letter = Pattern.compile("[a-zA-z]");
    //     Pattern digit = Pattern.compile("[0-9]");
    //     Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
    //     Matcher hasLetter = letter.matcher(password);
    //     Matcher hasDigit = digit.matcher(password);
    //     Matcher hasSpecial = special.matcher(password);


    //     if(password.length() < 8){
    //         errors.add(PasswordError.TOO_SHORT);
    //     }

    //     if(!hasDigit.find()){
    //         errors.add(PasswordError.NO_DIGIT);
    //     }

    //     if(!hasSpecial.find()){
    //         errors.add(PasswordError.NO_SPECIAL);
    //     }

    //     if(!hasLetter.find()){
    //         errors.add(PasswordError.NO_LETTER);
    //     }

    //     return errors;
    // }

    // public String buildErrorMessage(String userEmail, String userConfirmEmail, String userPassword, String userConfirmPassword){
    //     StringBuilder errorMsg = new StringBuilder();
	// 	if(!this.checkFieldsMatch(userEmail, userConfirmEmail)){
	// 		errorMsg.append("Emails do not match.");
	// 	} 

	// 	if(!this.checkFieldsMatch(userPassword, userConfirmPassword)){
	// 		errorMsg.append("Passwords do not match.");
	// 	}

	// 	if(!this.validPasswordMsg(userPassword).isEmpty()){
	// 		for(PasswordError err : this.validPasswordMsg(userPassword)){
	// 			errorMsg.append(err.toString() + " ");
	// 		}
	// 	}
		
	// 	return errorMsg.toString().trim();
    // }


