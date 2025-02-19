// package com.example.demo.user.userCMRS.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CookieValue;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.demo.SecurityConfig.jwt.JwtProvider;
// import com.example.demo.response.AuthResponse;
// import com.example.demo.user.userCMRS.model.UserModel;
// import com.example.demo.user.userCMRS.repository.UserRepository;
// import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
// import com.example.demo.user.userCMRS.service.authentication.OtpService;
// import com.example.demo.user.userCMRS.service.authentication.RefreshTokenService;



// @RestController
// @RequestMapping("/open_auth") 
// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
// public class RefreshController {
    
// 	@Autowired UserRepository userRepository;
// 	@Autowired OtpService otpService;
// 	@Autowired RefreshTokenService refreshTokenService;


// 	@Autowired
// 	private IUserAuthService userAuthService;	


//     @PostMapping("/refresh") 
// 	public ResponseEntity<AuthResponse> refresh(@CookieValue("JWT") String expiredJWT, @CookieValue("RT") String rt) { 
// 		String email =  JwtProvider.getEmailFromJwtToken(expiredJWT);
// 		UserModel user = userRepository.findByEmail(email);
// 		refreshTokenService.checkRefreshToken(user,rt);
// 		Authentication auth = refreshTokenService.authenticateHelper(email);
// 		String token = userAuthService.provideJWTCookie(auth, 200 * 1000);
// 		AuthResponse authResponse = userAuthService.buildAuthResponse(token, "Login success"); 
// 		String jwtCookie = userAuthService.buildCookie(token,"JWT", 1800);
// 		return ResponseEntity.ok()
// 			.header(HttpHeaders.SET_COOKIE, jwtCookie)
// 			.body(authResponse);
// 	} 
    
// }
