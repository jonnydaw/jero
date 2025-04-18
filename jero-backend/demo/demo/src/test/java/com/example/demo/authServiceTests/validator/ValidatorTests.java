// package com.example.demo.authServiceTests.validator;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertThrows;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.server.ResponseStatusException;

// import com.example.demo.booking.bookingCMRS.service.IBookingService;
// import com.example.demo.email.IEmailService;
// import com.example.demo.property.propertycmrs.service.IPropertyService;
// import com.example.demo.user.DTO.UserSignupHandler;
// import com.example.demo.user.userCMRS.repository.UserRepository;
// import com.example.demo.user.userCMRS.service.ConcUserDetailService;
// import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
// import com.example.demo.validator.signup.AbstractSignupValidator;
// import com.example.demo.validator.signup.EmailMatchValidator;
// import com.example.demo.validator.signup.PasswordMatchValidator;
// import com.example.demo.validator.signup.ValidPasswordValidator;

// @ExtendWith(MockitoExtension.class)
// public class ValidatorTests {
//     // @Autowired EmailMatchValidator emailMatchValidator;
//     // @Mock PasswordMatchValidator passwordMatchValidator;
//     // @Mock ValidPasswordValidator validPasswordValidator;
//     @Mock IBookingService bookingService;
//     @Mock IPropertyService propertyService;
//     @Mock ConcUserDetailService concUserDetailService;
//     @Mock private PasswordEncoder passwordEncoder; 
//     @Mock private UserRepository userRepository;
//     @Mock private IEmailService emailService;
//     // @Autowired private AbstractSignupValidator signupValidator;
//     @Mock PasswordEncoder mockPasswordEncoder;

//     @InjectMocks UserAuthService mockUserAuthService;

//     @Test
//     void emailTest(){
//         UserSignupHandler ush = new UserSignupHandler();

//         ush.setConfirmEmail("mis@mail.com");
//         ush.setEmail("match@mail.com");
//         ush.setPassword("Password201!");
//         ush.setPassword("Password201!");

//         Throwable exception = assertThrows(ResponseStatusException.class, 
//         () -> mockUserAuthService.validate(ush));
//         assertEquals("Invalid password", exception.getMessage());
//     }
// }
