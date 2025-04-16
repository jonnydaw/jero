package com.example.demo.authServiceTests.buildCookie;




import java.io.StringBufferInputStream;
import java.text.SimpleDateFormat;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserLoginHandler;

import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
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
public class BuildCookieUnitTest {

    @InjectMocks UserAuthService mockUserAuthService;

    @Test
    void testBuildAuthResponse(){
        final String VAL = "hi";
        final String COOKIE_NAME = "GREETING";
        final int AGE = 500;

        //https://stackoverflow.com/questions/5236052/get-gmt-time-in-java
        final Date currentTime = new Date(System.currentTimeMillis() + (AGE) * 1000);

        final SimpleDateFormat sdf =
                new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z");

        // Give it to me in GMT time.
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        String expiry = sdf.format(currentTime);


        String cookie = mockUserAuthService.buildCookie(VAL, COOKIE_NAME, AGE);
        String expected = String.format("%s=%s; Path=/; Domain=.jero.travel; Max-Age=%d; Expires=%s; Secure; HttpOnly; SameSite=none", COOKIE_NAME, VAL, AGE, expiry);

        assertEquals(expected, cookie);
    }
    
}

