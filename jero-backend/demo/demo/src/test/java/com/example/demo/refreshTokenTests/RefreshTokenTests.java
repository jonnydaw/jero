package com.example.demo.refreshTokenTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.RefreshModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.RefreshRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.RefreshTokenService;

@ExtendWith(MockitoExtension.class)
public class RefreshTokenTests {

    @Mock RefreshRepository refreshRepository;
    @Mock ConcUserDetailService concUserDetailService;
    @Mock UserRepository userRepo;
    @InjectMocks RefreshTokenService refreshTokenService;

    final ObjectId userId = new ObjectId("67b85d62e8ddf130ce699241");

    @Test
    void checkRefreshToken_notfound(){
        final String ID = "67b85d62e8ddf130ce699241";
        RefreshModel rm = new RefreshModel();
        when(refreshRepository.findRefreshById(new ObjectId(ID))).thenReturn(null);
        //refreshTokenService.checkRefreshToken(ID, "ofpakfopa");

         Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> refreshTokenService.checkRefreshToken(ID,"ofpakfopa", rm));
        assertEquals("404 NOT_FOUND \"refresh token not found\"", exception.getMessage());
    }

    @Test
    void checkRefreshToken_notMATCHING(){
        RefreshModel rm = new RefreshModel();
        rm.setRefreshToken("hi");
        final String ID = "67b85d62e8ddf130ce699241";
        when(refreshRepository.findRefreshById(new ObjectId(ID))).thenReturn(rm);
        //refreshTokenService.checkRefreshToken(ID, "ofpakfopa");

         Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> refreshTokenService.checkRefreshToken(ID,"ofpakfopa", rm));
        assertEquals("400 BAD_REQUEST \"invalid refresh token\"", exception.getMessage());
    }

    @Test
    void saveRefreshToken_LOGIN_USER_NOT_FOUND(){
        RefreshModel rm = new RefreshModel();
        String refreshToken = "rt";
        UserLoginHandler ul = new UserLoginHandler();
        ul.setUsername("mail@mail.com");

        when(userRepo.findByEmail(ul.getUsername())).thenReturn(null);
        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> refreshTokenService.saveRefreshToken(ul,refreshToken, rm));
        assertEquals("404 NOT_FOUND \"USER_NOT_FOUND\"", exception.getMessage());

    }

    @Test
    void saveRefreshToken_SIGNUP_USER_NOT_FOUND(){
        RefreshModel rm = new RefreshModel();
        String refreshToken = "rt";
        UserSignupHandler ush = new UserSignupHandler();
        ush.setEmail("mail@mail.com");

        when(userRepo.findByEmail(ush.getEmail())).thenReturn(null);
        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> refreshTokenService.saveRefreshToken(ush,refreshToken, rm));
        assertEquals("404 NOT_FOUND \"USER_NOT_FOUND\"", exception.getMessage());

    }

    @Test
    void saveRefreshToken_SIGNUP(){
        RefreshModel rm = new RefreshModel();
        String refreshToken = "rt";
        UserSignupHandler ush = new UserSignupHandler();
        ush.setEmail("mail@mail.com");
        UserModel user = new UserModel();
        user.setId(userId);

        when(userRepo.findByEmail(ush.getEmail())).thenReturn(user);
        refreshTokenService.saveRefreshToken(ush,refreshToken, rm);
        
        assertEquals(rm.getRefreshToken(), refreshToken);
        assertEquals(rm.getId(), user.getId());
        verify(refreshRepository, times(1)).save(rm);

    }

    @Test
    void saveRefreshToken_LOGIN(){
        RefreshModel rm = new RefreshModel();
        String refreshToken = "rt";
        UserLoginHandler ul = new UserLoginHandler();
        ul.setUsername("mail@mail.com");
        UserModel user = new UserModel();
        user.setId(userId);

        when(userRepo.findByEmail(ul.getUsername())).thenReturn(user);
        refreshTokenService.saveRefreshToken(ul,refreshToken, rm);
        
        assertEquals(rm.getRefreshToken(), refreshToken);
        assertEquals(rm.getId(), user.getId());
        verify(refreshRepository, times(1)).save(rm);

    }
    
}
