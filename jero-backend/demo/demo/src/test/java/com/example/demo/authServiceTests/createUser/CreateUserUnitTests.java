package com.example.demo.authServiceTests.createUser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
import com.example.demo.validator.signup.AbstractSignupValidator;
import com.example.demo.validator.signup.EmailMatchValidator;
import com.example.demo.validator.signup.PasswordMatchValidator;
import com.example.demo.validator.signup.ValidPasswordValidator;

@ExtendWith(MockitoExtension.class)
public class CreateUserUnitTests {

    @Mock EmailMatchValidator emailMatchValidator;
    @Mock PasswordMatchValidator passwordMatchValidator;
    @Mock ValidPasswordValidator validPasswordValidator;
    @Mock IBookingService bookingService;
    @Mock IPropertyService propertyService;
    @Mock ConcUserDetailService concUserDetailService;
    @Mock private PasswordEncoder passwordEncoder; 
    @Mock private UserRepository userRepository;
    @Mock private IEmailService emailService;
    @Mock private AbstractSignupValidator signupValidator;
    @Mock PasswordEncoder mockPasswordEncoder;

    @InjectMocks UserAuthService mockUserAuthService;

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

    @Test
    void testFirstName(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setFirstName("firstsname");
        ush.setRoles("host");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getFirstName(), "firstsname");
    }

    @Test
    void testLastName(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setLastName("lastname");
        ush.setRoles("host");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getLastName(), "lastname");
    }


    @Test
    void testDob(){
        UserSignupHandler ush = new UserSignupHandler();
        Date dob = new Date();
        ush.setDob(dob);
        ush.setRoles("host");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getDateOfBirth(), dob);
    }

    @Test
    void password(){
        UserSignupHandler ush = new UserSignupHandler();
        String password = "password";
        ush.setPassword(password);
        ush.setRoles("host");

        when(passwordEncoder.encode(ush.getPassword())).thenReturn(password);

        UserModel res = mockUserAuthService.createUser(ush);
        
        assertEquals(res.getPassword(), password);
    }

    @Test
    void testRoles_HOST(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("host");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getRoles(), "host");
    }

    @Test
    void testRoles_CUSTOMER(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getRoles(), "customer");
    }


    @Test
    void testStatus(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getStatus(), UserStatus.PENDING);
    }

    @Test
    void testPrefs(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        Map<String,String> prefs = new HashMap<>();
        prefs.put("language", "en");
        prefs.put("currency", "gbp");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getInternationalisationPreferences(), prefs);
    }

    @Test
    void testIntro(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getIntroduction(), "");
    }

    @Test
    void testImg(){
        UserSignupHandler ush = new UserSignupHandler();
        ush.setRoles("customer");
        UserModel res = mockUserAuthService.createUser(ush);
        assertEquals(res.getProfileImgUrl(), "");
    }

    @Test
    void testSave(){
        UserModel user = new UserModel();

        mockUserAuthService.saveUser(user);

        verify(userRepository, times(1)).save(user);
    }



}
