package com.example.demo.authServiceTests.authenticate;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserLoginHandler;

import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;



@ExtendWith(MockitoExtension.class)
public class AuthenticateUnitTests {

    private final String EMAIL = "email@email.com";
    private final String PASSWORD = "password12!";
    private final String DIFFERENT_PASSWORD = "password123!";

    private final String ROLES = "tourist";

    @InjectMocks private UserAuthService mockUserAuthService;
    @Mock ConcUserDetailService mockConcUserDetailService;
    @Mock PasswordEncoder mockPasswordEncoder;




    @Test
    void testLoginAuthNoAccount(){
        UserLoginHandler ul = new UserLoginHandler();
        ul.setUsername(EMAIL);
        ul.setPassword(PASSWORD);

        when(mockConcUserDetailService.loadUserByUsername(EMAIL)).thenReturn(null);
        Throwable exception = assertThrows(BadCredentialsException.class, 
        () -> mockUserAuthService.authenticate(ul));
        assertEquals("Invalid username and password", exception.getMessage());

        
    }

    @Test
    void testLoginAuthWrongPassword(){

        UserLoginHandler ul = new UserLoginHandler();
        ul.setUsername(EMAIL);
        ul.setPassword(PASSWORD);

        List<GrantedAuthority> authorities = new ArrayList<>(); 
		authorities.add(new SimpleGrantedAuthority("host".toString()));
		authorities.add(new SimpleGrantedAuthority("pending".toString()));

        UserDetails ud =  new org.springframework.security.core.userdetails.User( 
            EMAIL, 
            DIFFERENT_PASSWORD, 
            authorities); 

        when(mockConcUserDetailService.loadUserByUsername(EMAIL)).thenReturn(ud);
        Throwable exception = assertThrows(BadCredentialsException.class, 
        () -> mockUserAuthService.authenticate(ul));
        assertEquals("Invalid password", exception.getMessage());

    }

    @Test
    void testLoginAuthSucess(){
        UserLoginHandler ul = new UserLoginHandler();
        ul.setUsername(EMAIL);
        ul.setPassword(PASSWORD);

        List<GrantedAuthority> authorities = new ArrayList<>(); 
		authorities.add(new SimpleGrantedAuthority("host".toString()));
		authorities.add(new SimpleGrantedAuthority("pending".toString()));

        UserDetails ud =  new org.springframework.security.core.userdetails.User( 
            EMAIL, 
            PASSWORD, 
            authorities); 

        when(mockConcUserDetailService.loadUserByUsername(ul.getUsername())).thenReturn(ud);
        when(mockPasswordEncoder.matches(PASSWORD,ud.getPassword())).thenReturn(true);
        assertEquals(mockUserAuthService.authenticate(ul), new UsernamePasswordAuthenticationToken(ud,null,ud.getAuthorities()));

    }

    @Test
    void authResponse(){
        String token = "JWT";
        String message = "message";
        AuthResponse authResponse = new AuthResponse();

        mockUserAuthService.buildAuthResponse(token, message, authResponse);

        assertEquals(authResponse.getMessage(), message);
        assertEquals(authResponse.getJwt(), token);
        assertEquals(authResponse.getStatus(), true);
    }
    
}
