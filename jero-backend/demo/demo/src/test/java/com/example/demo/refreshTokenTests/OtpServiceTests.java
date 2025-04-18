package com.example.demo.refreshTokenTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.OtpModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.OtpRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
import com.example.demo.user.userCMRS.service.authentication.OtpService;
import com.example.demo.user.userCMRS.service.authentication.RefreshTokenService;

@ExtendWith(MockitoExtension.class)
public class OtpServiceTests {

    @Mock UserRepository userRepository;
    @Mock OtpRepository otpRepo;
    @Mock IUserAuthService userAuthService;
    @Mock RefreshTokenService refreshTokenService;
    @Mock private OtpRepository otpRepository;
    @InjectMocks OtpService mockotpService;

    final ObjectId userId = new ObjectId("67b85d62e8ddf130ce699241");


    @Test
    void checkOTP_NO_USER(){
        String token = "JWT";
        String email = "mail@mail.com";
        OtpHandler otph = new OtpHandler();
        otph.setOtpPassword(12345);

        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> mockotpService.checkOTP(token, otph));

        assertEquals("400 BAD_REQUEST \"user not found\"", exception.getMessage());
    }

    @Test
    void checkOTP_NOT_EXIST(){
        String token = "JWT";
        String email = "mail@mail.com";
        OtpHandler otph = new OtpHandler();
        otph.setOtpPassword(12345);

        UserModel user = new UserModel();
        user.setId(userId);

        user.setEmail(email);
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getEmailFromJwtToken(token))
            .thenReturn(email);

            when(userRepository.findByEmail(email)).thenReturn(user);
            when(otpRepo.findOTPById(user.getId())).thenReturn(null);
            
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> mockotpService.checkOTP(token, otph));

            assertEquals("400 BAD_REQUEST \"OTP has expired\"", exception.getMessage());
        }
    }

    @Test
    void checkOTP_NOT_EQUAL(){
        String token = "JWT";
        String email = "mail@mail.com";
        OtpHandler otph = new OtpHandler();
        otph.setOtpPassword(12345);

        OtpModel om = new OtpModel();
        om.setOtp(54321);

        UserModel user = new UserModel();
        user.setId(userId);

        user.setEmail(email);
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getEmailFromJwtToken(token))
            .thenReturn(email);

            when(userRepository.findByEmail(email)).thenReturn(user);
            when(otpRepo.findOTPById(user.getId())).thenReturn(om);
            
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> mockotpService.checkOTP(token, otph));

            assertEquals("400 BAD_REQUEST \"Incorrect OTP\"", exception.getMessage());
        }
    }

    @Test
    void checkOTP_UPDATE_STATUS(){
        String token = "JWT";
        String email = "mail@mail.com";
        OtpHandler otph = new OtpHandler();
        otph.setOtpPassword(12345);

        OtpModel om = new OtpModel();
        om.setOtp(12345);

        UserModel user = new UserModel();
        user.setId(userId);
        user.setStatus(UserStatus.PENDING);

        user.setEmail(email);
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getEmailFromJwtToken(token))
            .thenReturn(email);

            when(userRepository.findByEmail(email)).thenReturn(user);
            when(otpRepo.findOTPById(user.getId())).thenReturn(om);
            
            mockotpService.checkOTP(token, otph);

            verify(userRepository, times(1)).save(user);
            assertNotEquals(user.getStatus(), UserStatus.PENDING);
            //assertEquals("400 BAD_REQUEST \"Incorrect OTP\"", exception.getMessage());
        }
    }

    @Test 
    void saveOTP_ON_CREATE(){
        UserModel user = new UserModel();
        OtpModel otp = new OtpModel();

        user.setId(userId);

        mockotpService.saveOTPOnCreation(user, otp);

        assertEquals(otp.getId(), userId);
        assertEquals(otp.getOtp(), 12345);
        verify(otpRepository, times(1)).save(otp);
    }

    @Test
    void saveOTP_ON_REGEN_USER_NOT_FOUND(){
        UserModel user = new UserModel();
        OtpModel otp = new OtpModel();
        String token = "JWT";

        user.setId(userId);
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(userId.toHexString());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> mockotpService.saveOTPOnRegen(token, otp));
            
            assertEquals("400 BAD_REQUEST \"user not found\"", exception.getMessage());

        }
    }

    @Test
    void saveOTP_ON_REGEN(){
        UserModel user = new UserModel();
        OtpModel otp = new OtpModel();
        String token = "JWT";
        String email = "mail@mail.com";

        user.setId(userId);
        try(MockedStatic<JwtProvider> mockJwtProvider = mockStatic(JwtProvider.class)) {
            mockJwtProvider.when(() -> JwtProvider.getEmailFromJwtToken(token))
            .thenReturn(email);

            when(userRepository.findByEmail(email)).thenReturn(user);
            mockotpService.saveOTPOnRegen(token, otp);
            
            assertEquals(otp.getId(), userId);
            assertEquals(otp.getOtp(), 54321);
            verify(otpRepository, times(1)).save(otp);
        }
    }
    
}
