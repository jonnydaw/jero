package com.example.demo.refreshTokenTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.user.userCMRS.model.RefreshModel;
import com.example.demo.user.userCMRS.repository.RefreshRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.RefreshTokenService;

@ExtendWith(MockitoExtension.class)
public class refreshtokentests {

    @Mock RefreshRepository refreshRepository;
    @Mock ConcUserDetailService concUserDetailService;
    @Mock UserRepository userRepo;
    @InjectMocks RefreshTokenService refreshTokenService;

    @Test
    void checkRefreshToken_notfound(){
        final String ID = "67b85d62e8ddf130ce699241";
        when(refreshRepository.findRefreshById(new ObjectId(ID))).thenReturn(null);
        //refreshTokenService.checkRefreshToken(ID, "ofpakfopa");

         Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> refreshTokenService.checkRefreshToken(ID,"ofpakfopa"));
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
        () -> refreshTokenService.checkRefreshToken(ID,"ofpakfopa"));
        assertEquals("400 BAD_REQUEST \"invalid refresh token\"", exception.getMessage());
    }
    
}
