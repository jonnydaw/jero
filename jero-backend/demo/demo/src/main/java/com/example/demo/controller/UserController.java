package com.example.demo.controller;





import com.example.demo.repository.UserRepository; 
import com.example.demo.response.AuthResponse; 
import com.example.demo.service.UserServiceImplementation;
import java.util.concurrent.TimeUnit;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import com.example.demo.SecurityConfig.JwtProvider; 
import com.example.demo.usermodel.User;

import jakarta.servlet.http.Cookie;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 

@RestController
@RequestMapping("/auth") 
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserController { 

	@Autowired
	private UserRepository userRepository; 
	@Autowired
	private PasswordEncoder passwordEncoder; 
	@Autowired
	private UserServiceImplementation userServiceImplementation; 
	
	// @Autowired
	// private UserService userService; 

	@GetMapping("/profile") 
	public String getProfile(@CookieValue("JWT") String token)  { 
		// https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
		return JwtProvider.getEmailFromJwtToken(token);
	} 	



	@PostMapping("/signup") 
	public ResponseEntity<AuthResponse> signup(@RequestBody User user) throws Exception { 
		String email = user.getEmail(); 
		String password = user.getPassword(); 
		System.out.println("Signup ctrler : " + user.getEmail());
		// String fullName = user.getFullName(); 
		// String mobile = user.getMobile(); 
		// String role = user.getRole(); 

		User isEmailExist = userRepository.findByEmail(email); 
		// User isMobileExist = userRepository.findByMobile(mobile); 
		if (isEmailExist != null) { 
			throw new Exception("Email Is Already Used With Another Account");
		} 
		// else if(isMobileExist != null){
		// 	throw new Exception("Mobile number is already in use");
		// }

		
		User createdUser = new User(); 
		createdUser.setEmail(email); 
		// createdUser.setFullName(fullName); 
		// createdUser.setMobile(mobile); 
		// createdUser.setRole(role); 
		//createdUser.setPassword(passwordEncoder.encode(password)); 
		createdUser.setPassword(password);
		
		User savedUser = userRepository.save(createdUser); 
		userRepository.save(savedUser); 
		Authentication authentication = new UsernamePasswordAuthenticationToken(email,password); 
		SecurityContextHolder.getContext().setAuthentication(authentication); 
		String token = JwtProvider.generateToken(authentication); 


		AuthResponse authResponse = new AuthResponse(); 
		authResponse.setJwt(token); 
		authResponse.setMessage("Register Success"); 
		authResponse.setStatus(true); 
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK); 

	} 





	@PostMapping("/signin") 
	public ResponseEntity<AuthResponse> signin(@RequestBody User user, HttpServletResponse response) { 
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

		UserDetails userDetails = userServiceImplementation.loadUserByUsername(username); 

		System.out.println("Sig in in user details"+ userDetails); 

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


