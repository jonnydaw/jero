package com.example.demo.user.userCMRS.controller;





import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.email.EmailTemplate;
import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.OtpModel;
import com.example.demo.user.userCMRS.model.RefreshModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IOtpService;
import com.example.demo.user.userCMRS.service.authentication.IRefreshTokenService;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;




import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth") 
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserAuthController { 
	// https://stackoverflow.com/questions/12899372/spring-why-do-we-autowire-the-interface-and-not-the-implemented-class

	@Autowired UserRepository userRepository;
	@Autowired IOtpService otpService;
	@Autowired IRefreshTokenService refreshTokenService;


	@Autowired
	private IUserAuthService userAuthService;	



	@PostMapping("/signup") 
	public ResponseEntity<AuthResponse> signup(@Valid @RequestBody UserSignupHandler user, EmailTemplate emailTemplate, RefreshModel rm, AuthResponse authResponse, OtpModel otpModel) throws Exception{ 
		boolean isEmailInUse = userAuthService.isEmailInUse(user.getEmail());
		if(isEmailInUse) throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
		userAuthService.validate(user);
		UserModel createdUser = userAuthService.createUser(user);
		userAuthService.saveUser(createdUser); 

		otpService.saveOTPOnCreation(createdUser, otpModel);

		
		Authentication authentication = userAuthService.authenticate(user); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		String token = userAuthService.provideJWTCookie(authentication, createdUser.getId().toHexString()); 
		authResponse = userAuthService.buildAuthResponse(token, "signup success", authResponse);
		String jwtCookie = userAuthService.buildCookie(token,"JWT", 3600*24);

		String rt = refreshTokenService.createRefreshToken();
		refreshTokenService.saveRefreshToken(user, rt,rm);
		String rtCookie = userAuthService.buildCookie(rt, "RT", 3600*24);

		userAuthService.sendRegisterEmail(user.getEmail(), user.getLocale(), emailTemplate);
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie, HttpHeaders.SET_COOKIE, rtCookie)
			.body(authResponse);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteUser(HttpServletRequest req, @CookieValue("JWT") String JWT, @CookieValue("RT") String refresh, RefreshModel rm){
		// try {
		// 	req.logout();
		// } catch (ServletException e) {
		// 	// TODO Auto-generated catch block
		// 	e.printStackTrace();
		// }
		// String email =  JwtProvider.getEmailFromJwtToken(JWT);
		// UserModel user = userRepository.findByEmail(email);
		String id = JwtProvider.getIdFromJwtToken(JWT);
		refreshTokenService.checkRefreshToken(id, refresh, rm);
		userAuthService.deleteUserPrecursor(JWT);
		return ResponseEntity.ok().body("Account deleted");
	}

	@PostMapping("/verify_otp")
	public ResponseEntity<?> verifyOtp(@CookieValue("JWT") String token, @RequestBody OtpHandler otp, AuthResponse authResponse){
		System.out.println("hit otp");

		otpService.checkOTP(token, otp);
		String newToken = otpService.reissue(token, otp);
		authResponse = userAuthService.buildAuthResponse(newToken, "OTP verified",authResponse);
		String jwtCookie = userAuthService.buildCookie(newToken,"JWT", 3600*24);
		return ResponseEntity.ok()
		//https://stackoverflow.com/questions/24642508/spring-inserting-cookies-in-a-rest-call-response
			.header(HttpHeaders.SET_COOKIE, jwtCookie)
			.body(authResponse);
	}

	@PostMapping("/regenerate_otp")
	public ResponseEntity<?> regenerateOtp(@CookieValue("JWT") String token, OtpModel otpModel){
		otpService.saveOTPOnRegen(token, otpModel);
		return ResponseEntity.ok().body("OTP Regenerated");
	}




	@PostMapping("/signin") 
	public ResponseEntity<AuthResponse> signin(@Valid @RequestBody UserLoginHandler user, RefreshModel rm, AuthResponse authResponse) { 
		Authentication authentication = userAuthService.authenticate(user); 
		SecurityContextHolder.getContext().setAuthentication(authentication);
		// not great
		UserModel um = userRepository.findByEmail(user.getUsername());
		String token = userAuthService.provideJWTCookie(authentication, um.getId().toHexString()); 
		authResponse = userAuthService.buildAuthResponse(token, "Login success", authResponse);
		String jwtCookie = userAuthService.buildCookie(token, "JWT", 3600*24);
		
		String rt = refreshTokenService.createRefreshToken();
		refreshTokenService.saveRefreshToken(user, rt, rm);
		String rtCookie = userAuthService.buildCookie(rt, "RT", 3600*24);
		//refreshTokenService.saveRefreshToken(user, token);

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie, HttpHeaders.SET_COOKIE, rtCookie )
			.body(authResponse);
	}

	@GetMapping("/refresh") 
	public ResponseEntity<AuthResponse> refresh(@CookieValue("JWT") String expiredJWT, @CookieValue("RT") String rt, RefreshModel rm, AuthResponse authResponse) { 
		String email =  JwtProvider.getEmailFromJwtToken(expiredJWT);
		String id =  JwtProvider.getIdFromJwtToken(expiredJWT);

		// getId from token
		// remove
		//UserModel user = userRepository.findByEmail(email);
		refreshTokenService.checkRefreshToken(id,rt, rm);
		Authentication auth = refreshTokenService.authenticateHelper(email);
		String token = userAuthService.provideJWTCookie(auth, id);
		authResponse = userAuthService.buildAuthResponse(token, "Refresh success", authResponse); 
		String jwtCookie = userAuthService.buildCookie(token,"JWT", 3600*24);
		String rtCookie = userAuthService.buildCookie(rt, "RT", 3600*24);
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, jwtCookie, HttpHeaders.SET_COOKIE, rtCookie)
			.body(authResponse);
	} 

} 


