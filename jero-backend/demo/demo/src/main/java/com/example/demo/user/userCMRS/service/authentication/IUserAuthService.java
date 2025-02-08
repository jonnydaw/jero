package com.example.demo.user.userCMRS.service.authentication;


import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.UserModel; 


public interface IUserAuthService { 

	public UserModel createUser(UserSignupHandler user);

	public void saveUser(UserModel createdUser);

	public boolean isEmailInUse(String email);

	public void sendRegisterEmail(String email);

	public void validate(UserSignupHandler user);
		
		
} 

