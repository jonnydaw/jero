package com.example.demo.authServiceTests.Email;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.email.EmailTemplate;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
import com.example.demo.validator.signup.AbstractSignupValidator;
import com.example.demo.validator.signup.EmailMatchValidator;
import com.example.demo.validator.signup.PasswordMatchValidator;
import com.example.demo.validator.signup.ValidPasswordValidator;

@ExtendWith(MockitoExtension.class)
public class RegisterEmailTests {

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
    void testEmail_EN(){

        String locale = "/en/hi";
        EmailTemplate emailTemplate = new EmailTemplate();

        mockUserAuthService.sendRegisterEmail("mail@mail.com", locale, emailTemplate);

        assertEquals(emailTemplate.getMsgBody(), "12345");
        assertEquals(emailTemplate.getRecipient(), "mail@mail.com");
        assertEquals(emailTemplate.getSubject(), "Welcome");

    }

    @Test
    void testEmail_ES(){

        String locale = "/es/hi";
        EmailTemplate emailTemplate = new EmailTemplate();

        mockUserAuthService.sendRegisterEmail("mail@mail.com", locale, emailTemplate);

        assertEquals(emailTemplate.getMsgBody(), "12345");
        assertEquals(emailTemplate.getRecipient(), "mail@mail.com");
        assertEquals(emailTemplate.getSubject(), "Bienvenido");

    }

    @Test
    void testEmail_BR(){

        String locale = "/br/hi";
        EmailTemplate emailTemplate = new EmailTemplate();

        mockUserAuthService.sendRegisterEmail("mail@mail.com", locale, emailTemplate);

        assertEquals(emailTemplate.getMsgBody(), "12345");
        assertEquals(emailTemplate.getRecipient(), "mail@mail.com");
        assertEquals(emailTemplate.getSubject(), "Bem-vindo");

    }
    
    @Test
    void testEmail_FALLBACK(){

        String locale = "//hi";
        EmailTemplate emailTemplate = new EmailTemplate();

        mockUserAuthService.sendRegisterEmail("mail@mail.com", locale, emailTemplate);

        assertEquals(emailTemplate.getMsgBody(), "12345");
        assertEquals(emailTemplate.getRecipient(), "mail@mail.com");
        assertEquals(emailTemplate.getSubject(), "Welcome");

    }
}
