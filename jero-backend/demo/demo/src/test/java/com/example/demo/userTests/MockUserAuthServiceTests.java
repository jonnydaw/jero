package com.example.demo.userTests;


import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.email.EmailService;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
// https://stackoverflow.com/questions/75482134/generating-unit-tests-for-my-service-implementations-on-the-spring-boot-applicat
@ExtendWith(MockitoExtension.class)
class MockUserAuthServiceTests {
    private final String FIRST_NAME = "fname";
    private final String LAST_NAME = "lname";
    private final Date DOB = new Date();
    private final String EMAIL = "email@email.com";
    private final String PASSWORD = "password12!";
    private final String ROLES = "tourist";

    @InjectMocks private UserAuthService userAuthService;
    @Mock PasswordEncoder mockPasswordEncoder;
    @Mock UserRepository mockUserRepository;
    @Mock EmailService mockEmailService;
    @Mock ConcUserDetailService mockConcUserDetailService;

    //https://stackoverflow.com/questions/75482134/generating-unit-tests-for-my-service-implementations-on-the-spring-boot-applicat
    @Test
    void testCreateUser(){

        UserSignupHandler request = new UserSignupHandler();
        request.setFirstName(FIRST_NAME);
        request.setLastName(LAST_NAME);
        request.setDob(DOB);
        request.setEmail(EMAIL);
        request.setConfirmEmail(EMAIL);
        request.setPassword(PASSWORD);
        request.setConfirmPassword(PASSWORD);
        request.setRoles(ROLES);
        when(mockPasswordEncoder.encode(PASSWORD)).thenReturn(PASSWORD);
        
        UserModel res = userAuthService.createUser(request);

        assertEquals(res.getFirstName(), FIRST_NAME);
        assertEquals(res.getLastName(), LAST_NAME);
        assertEquals(res.getDateOfBirth(), DOB);
        assertEquals(res.getEmail(), EMAIL);
        assertEquals(res.getPassword(), PASSWORD);
        assertEquals(res.getRoles(), ROLES);
        assertEquals(res.getStatus(), UserStatus.PENDING);

    }

    @Test 
    void testEmailNotInUse(){
        when(mockUserRepository.findByEmail(EMAIL)).thenReturn(null);
        boolean res = userAuthService.isEmailInUse(EMAIL);
        assertEquals(res, false);
    }

    @Test 
    void testEmailInUse(){
        when(mockUserRepository.findByEmail(EMAIL)).thenReturn(new UserModel());
        boolean res = userAuthService.isEmailInUse(EMAIL);
        assertEquals(res, true);
    }

    @Test 
    void invalidCredentials_LOGIN_INVALID_USERNAME_AND_PASSWORD(){
        UserLoginHandler request = new UserLoginHandler();
        request.setUsername(EMAIL);
        request.setPassword(PASSWORD);

        when(mockConcUserDetailService.loadUserByUsername(EMAIL)).thenReturn(null);
                Throwable exception = assertThrows(BadCredentialsException.class, 
        () -> userAuthService.authenticate(request));
        assertEquals("Invalid username and password", exception.getMessage());
    }

    @Test 
    void invalidCredentials_LOGIN_INVALID_PASSWORD(){
        UserLoginHandler request = new UserLoginHandler();
        request.setUsername(EMAIL);
        request.setPassword(PASSWORD);

        when(mockConcUserDetailService.loadUserByUsername(EMAIL)).thenReturn(null);
                Throwable exception = assertThrows(BadCredentialsException.class, 
        () -> userAuthService.authenticate(request));
        assertEquals("Invalid username and password", exception.getMessage());
    }
}
