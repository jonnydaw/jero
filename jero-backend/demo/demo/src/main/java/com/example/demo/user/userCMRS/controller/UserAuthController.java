package com.example.demo.user.userCMRS.controller;





import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;

import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
import com.example.demo.user.userCMRS.service.authentication.OtpService;

import org.springframework.http.HttpHeaders;
import com.example.demo.SecurityConfig.JwtProvider;

import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth") 
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserAuthController { 
	// https://stackoverflow.com/questions/12899372/spring-why-do-we-autowire-the-interface-and-not-the-implemented-class

	@Autowired UserRepository userRepository;
	@Autowired OtpService otpService;


	@Autowired
	private IUserAuthService userAuthService;	


	@GetMapping("/profile") 
	public ResponseEntity<String> getProfile(@CookieValue("JWT") String token)  { 
		System.out.println("hi");
		// https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
		// 27/11/24
		String email =  JwtProvider.getEmailFromJwtToken(token);
		UserModel user = userRepository.findByEmail(email);
		System.out.println("Firstname " + user.getFirstName());
		return ResponseEntity.ok()
		.body(user.getFirstName());
	}

	@PostMapping("/signup") 
	public ResponseEntity<AuthResponse> signup(@Valid @RequestBody UserSignupHandler user) throws Exception { 
		boolean isEmailInUse = userAuthService.isEmailInUse(user.getEmail());
		if(isEmailInUse) throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
		userAuthService.validate(user);
		UserModel createdUser = userAuthService.createUser(user);
		userAuthService.saveUser(createdUser); 

		
		Authentication authentication = userAuthService.authenticate(user); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		String token = userAuthService.provideJWTCookie(authentication); 
		AuthResponse authResponse = userAuthService.buildAuthResponse(token);
		String jwtCookie = userAuthService.buildCookie(token);

		userAuthService.sendRegisterEmail(user.getEmail(), user.getLocale());
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	}


	@PostMapping("/otp")
	public ResponseEntity<?> otp(@CookieValue("JWT") String token, @RequestBody OtpHandler otp){
		
		otpService.checkOTP(token, otp);
		String newToken = otpService.reissue(token, otp);
		AuthResponse authResponse = userAuthService.buildAuthResponse(newToken);
		String jwtCookie = userAuthService.buildCookie(newToken);

		//userAuthService.sendRegisterEmail(user.getEmail(), user.getLocale());
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	}



	@PostMapping("/signin") 
	public ResponseEntity<AuthResponse> signin(@Valid @RequestBody UserLoginHandler user) { 
		Authentication authentication = userAuthService.authenticate(user); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		String token = userAuthService.provideJWTCookie(authentication); 
		AuthResponse authResponse = userAuthService.buildAuthResponse(token);
		String jwtCookie = userAuthService.buildCookie(token);

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	} 

} 


