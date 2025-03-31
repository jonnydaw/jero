package com.example.demo.user.userCMRS.service.authentication;

import org.springframework.security.core.Authentication;

import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.UserModel;

public interface IRefreshTokenService {

    public String createRefreshToken();

    public void saveRefreshToken(UserLoginHandler user, String refreshToken);

    public void saveRefreshToken(UserSignupHandler user, String refreshToken);

    public void checkRefreshToken(String id, String refreshToken);

    public void deleteRefreshToken(String id);

    public Authentication authenticateHelper(final String email);

}
