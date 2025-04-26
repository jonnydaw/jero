package com.example.demo.user.userCMRS.service.authentication;

import org.springframework.security.core.Authentication;

import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.RefreshModel;

public interface IRefreshTokenService {

    public String createRefreshToken();

    public void saveRefreshToken(UserLoginHandler user, String refreshToken, RefreshModel rm);

    public void saveRefreshToken(UserSignupHandler user, String refreshToken, RefreshModel rm);

    public void checkRefreshToken(String id, String refreshToken, RefreshModel rm);

    //public void deleteRefreshToken(String id);

    public Authentication authenticateHelper(final String email);

}
