package com.example.demo.user.userCMRS.controller;





import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;

import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
import com.example.demo.user.userCMRS.service.authentication.OtpService;
import com.example.demo.user.userCMRS.service.authentication.RefreshTokenService;



import org.springframework.http.HttpHeaders;

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
	@Autowired RefreshTokenService refreshTokenService;


	@Autowired
	private IUserAuthService userAuthService;	


	@GetMapping("/profile") 
	public ResponseEntity<String> getProfile(@CookieValue("JWT") String token)  { 
		// https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
		// 27/11/24
		String email =  JwtProvider.getEmailFromJwtToken(token);
		UserModel user = userRepository.findByEmail(email);
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
		AuthResponse authResponse = userAuthService.buildAuthResponse(token, "signup success");
		String jwtCookie = userAuthService.buildCookie(token,"JWT", 3600);

		String rt = refreshTokenService.createRefreshToken();
		refreshTokenService.saveRefreshToken(user, rt);
		String rtCookie = userAuthService.buildCookie(rt, "RT", 3600);

		userAuthService.sendRegisterEmail(user.getEmail(), user.getLocale());
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie, HttpHeaders.SET_COOKIE, rtCookie)
			.body(authResponse);
	}


	@PostMapping("/otp")
	public ResponseEntity<?> otp(@CookieValue("JWT") String token, @RequestBody OtpHandler otp){
		otpService.checkOTP(token, otp);
		String newToken = otpService.reissue(token, otp);
		AuthResponse authResponse = userAuthService.buildAuthResponse(newToken, "OTP verified");
		String jwtCookie = userAuthService.buildCookie(newToken,"JWT", 3600);
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	}



	@PostMapping("/signin") 
	public ResponseEntity<AuthResponse> signin(@Valid @RequestBody UserLoginHandler user) { 
		Authentication authentication = userAuthService.authenticate(user); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		String token = userAuthService.provideJWTCookie(authentication); 
		AuthResponse authResponse = userAuthService.buildAuthResponse(token, "Login success");
		String jwtCookie = userAuthService.buildCookie(token, "JWT", 3600);
		
		String rt = refreshTokenService.createRefreshToken();
		refreshTokenService.saveRefreshToken(user, rt);
		String rtCookie = userAuthService.buildCookie(rt, "RT", 3600);
		//refreshTokenService.saveRefreshToken(user, token);

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie, HttpHeaders.SET_COOKIE, rtCookie )
			.body(authResponse);
	} 

	@GetMapping("/refresh") 
	public ResponseEntity<AuthResponse> refresh(@CookieValue("JWT") String expiredJWT, @CookieValue("RT") String rt) { 
		String email =  JwtProvider.getEmailFromJwtToken(expiredJWT);
		UserModel user = userRepository.findByEmail(email);

		refreshTokenService.checkRefreshToken(user,rt);

		Authentication auth = refreshTokenService.authenticateHelper(email);
		String token = userAuthService.provideJWTCookie(auth);
		AuthResponse authResponse = userAuthService.buildAuthResponse(token, "Refresh success"); 
		String jwtCookie = userAuthService.buildCookie(token,"JWT", 3600);
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	} 

} 


