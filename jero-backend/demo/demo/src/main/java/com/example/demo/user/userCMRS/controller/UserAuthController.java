package com.example.demo.user.userCMRS.controller;





import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserSignupHandler;

import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;



import org.springframework.http.HttpHeaders;
import com.example.demo.SecurityConfig.JwtProvider;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.authentication.BadCredentialsException; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder; 

import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.security.crypto.password.PasswordEncoder;
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
	// @Autowired
	// private UserRepository userRepository; 
	@Autowired
	private PasswordEncoder passwordEncoder; 
	@Autowired
	private ConcUserDetailService concUserDetailService; 
	@Autowired
	private IUserAuthService userAuthService;	
	// @Autowired
	// private UserService userService; 

	@GetMapping("/profile") 
	public String getProfile(@CookieValue("JWT") String token)  { 
		// https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
		// 27/11/24
		return JwtProvider.getEmailFromJwtToken(token);
	} 

	@PostMapping("/signup") 
	public ResponseEntity<?> signup(@RequestBody UserSignupHandler user) throws Exception { 
		// String userEmail = user.getEmail();
		// String userConfirmEmail = user.getConfirmEmail();
		// String userPassword = user.getPassword();
		// String userConfirmPassword = user.getConfirmPassword();

		boolean isEmailInUse = userAuthService.isEmailInUse(user.getEmail());

		// if (isEmailInUse) { 
		// 	String message = "Email already in use.";
		// 	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
		// } else if(!signupValidator.checkFieldsMatch(userEmail, userConfirmEmail) || !signupValidator.validPasswordMsg(userPassword).isEmpty() || !signupValidator.checkFieldsMatch(userPassword, userConfirmPassword)){
		// 		String message = signupValidator.buildErrorMessage(userEmail, userConfirmEmail, userPassword, userConfirmPassword);
		// 		// https://stackoverflow.com/questions/24292373/spring-boot-rest-controller-how-to-return-different-http-status-codes
		// 		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
		// 	}
		userAuthService.validate(user);
		UserModel createdUser = userAuthService.createUser(user);
		userAuthService.saveUser(createdUser); 
		userAuthService.sendRegisterEmail(user.getEmail());

		return new ResponseEntity<String>("Signup success", HttpStatus.OK); 
	}


	@PostMapping("/otp")
	public ResponseEntity<?> otp(@RequestBody String otp){
		return new ResponseEntity<>(null);
	}



	@PostMapping("/signin") 
	public ResponseEntity<AuthResponse> signin(@RequestBody UserModel user, HttpServletResponse response) { 
		String username = user.getEmail(); 
		String password = user.getPassword(); 
		System.out.println(username); 

		System.out.println(username+"-------"+password); 

		Authentication authentication = authenticate(username,password); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 

		String token = JwtProvider.generateToken(authentication); 
		AuthResponse authResponse = new AuthResponse(); 
		
		authResponse.setMessage("Login success"); 
		authResponse.setJwt(token);
		System.out.println(JwtProvider.getEmailFromJwtToken(token));
		authResponse.setStatus(true); 

		ResponseCookie jwtCookie = ResponseCookie.from("JWT", token)
			.httpOnly(true)
			.secure(false)
			.path("/")
			.maxAge(3600) 
			.sameSite("Strict") 
			.build();


	return ResponseEntity.ok()
	.header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
	.body(authResponse);
	} 



	
	private Authentication authenticate(String username, String password) { 

		System.out.println(username+"---++----"+password); 

		UserDetails userDetails = concUserDetailService.loadUserByUsername(username); 

		System.out.println("Sign in in user details"+ userDetails); 

		if(userDetails == null) { 
			System.out.println("Sign in details - null" + userDetails); 

			throw new BadCredentialsException("Invalid username and password"); 
		} 
		if(!passwordEncoder.matches(password,userDetails.getPassword())) { 
			System.out.println("Sign in userDetails - password mismatch"+userDetails); 

			throw new BadCredentialsException("Invalid password"); 
			

		} 
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities()); 

	} 

} 


