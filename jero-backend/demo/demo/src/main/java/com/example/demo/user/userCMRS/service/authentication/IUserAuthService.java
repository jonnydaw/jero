package com.example.demo.user.userCMRS.service.authentication;


import org.springframework.security.core.Authentication;

import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.UserModel; 


public interface IUserAuthService { 

	public UserModel createUser(UserSignupHandler user);

	public void saveUser(UserModel createdUser);

	public boolean isEmailInUse(String email);

	public void sendRegisterEmail(String email);

	public void validate(UserSignupHandler user) throws Exception;

	public Authentication authenticate(UserLoginHandler user);

	public Authentication authenticate(UserSignupHandler user);

	public String provideJWTCookie(Authentication auth);

	public AuthResponse buildAuthResponse(String token);

	public String buildCookie(String token);
		
		
} 

