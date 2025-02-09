package com.example.demo.userTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
import com.example.demo.validator.signup.EmailMatchValidator;
import com.example.demo.validator.signup.PasswordMatchValidator;
import com.example.demo.validator.signup.ValidPasswordValidator;

@SpringBootTest
class ContextUserAuthServiceTests {
    
    @Autowired UserAuthService userAuthService;
    @Autowired EmailMatchValidator emailMatchValidator;
    @Autowired PasswordMatchValidator passwordMatchValidator;
    @Autowired ValidPasswordValidator validPasswordValidator;

    private final String FIRST_NAME = "fname";
    private final String LAST_NAME = "lname";
    private final String DOB = "dob";
    private final String EMAIL = "email@email.com";
    private final String DIFFERENT_EMAIL = "email1@email.com";
    private final String PASSWORD = "password12!";
    private final String DIFFERENT_PASSWORD = "password2!";
    private final String ROLES = "tourist";

    @Test
    void signupValidatorTestsEmailMismatch(){
        UserSignupHandler user = new UserSignupHandler();
        user.setFirstName(FIRST_NAME);
        user.setLastName(LAST_NAME);
        user.setDob(DOB);
        user.setEmail(EMAIL);
        user.setConfirmEmail(DIFFERENT_EMAIL);
        user.setPassword(PASSWORD);
        user.setConfirmPassword(PASSWORD);
        user.setRoles(ROLES);
        // https://stackoverflow.com/questions/156503/how-do-you-assert-that-a-certain-exception-is-thrown-in-junit-tests
        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> userAuthService.validate(user));
        assertEquals("400 BAD_REQUEST \"[EMAIL_ERROR_MISMATCH]\"", exception.getMessage());
    }

    @Test
    void signupValidatorTestsPasswordMismatchAndEmailMismatch(){
        UserSignupHandler user = new UserSignupHandler();
        user.setFirstName(FIRST_NAME);
        user.setLastName(LAST_NAME);
        user.setDob(DOB);
        user.setEmail(EMAIL);
        user.setConfirmEmail(DIFFERENT_EMAIL);
        user.setPassword(PASSWORD);
        user.setConfirmPassword(DIFFERENT_PASSWORD);
        user.setRoles(ROLES);
        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> userAuthService.validate(user));
        assertEquals("400 BAD_REQUEST \"[EMAIL_ERROR_MISMATCH, PASSWORD_ERROR_MISMATCH]\"", exception.getMessage());
    }
}
