package com.example.demo.authServiceTests.createUser;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;

@ExtendWith(MockitoExtension.class)
public class CreateUserUnitTests {

    @InjectMocks UserAuthService mockUserAuthService;
    @Mock PasswordEncoder mockPasswordEncoder;

    @Test
    void testPrivacySetting_Customer(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getPrivacy().get("review"), false);
        assertEquals(res.getPrivacy().get("alwaysShowProfile"), null);


    }

    @Test
    void testPrivacySetting_Host(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("host");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getPrivacy().get("review"), null);
        assertEquals(res.getPrivacy().get("alwaysShowProfile"), false);
    }

}
