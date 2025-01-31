package com.example.demo.controller.User;





import com.example.demo.repository.UserRepository; 
import com.example.demo.response.AuthResponse; 
import com.example.demo.service.UserServiceImplementation;
import com.example.demo.enumeration.user.*;
import com.example.demo.enumeration.validator.PasswordError;
import com.example.demo.validator.signup.SignupValidator;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import com.example.demo.SecurityConfig.JwtProvider;
import com.example.demo.dto.User.UserSignupHandler;
import com.example.demo.email.EmailService;
import com.example.demo.email.EmailTemplate;
import com.example.demo.usermodel.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import org.springframework.web.server.ResponseStatusException; 

@RestController
@RequestMapping("/auth") 
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserAuthController { 

	@Autowired
	private UserRepository userRepository; 
	@Autowired
	private PasswordEncoder passwordEncoder; 
	@Autowired
	private UserServiceImplementation userServiceImplementation; 
	@Autowired 
	private EmailService emailService;
	
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
		String userEmail = user.getEmail();
		String userConfirmEmail = user.getConfirmEmail();
		String userPassword = user.getPassword();
		String userConfirmPassword = user.getConfirmPassword();

		User isEmailExist = userRepository.findByEmail(user.getEmail());
		SignupValidator sv = new SignupValidator();

		if (isEmailExist != null) { 
			String message = "Email already in use.";
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
		}else if(!sv.checkFieldsMatch(userEmail, userConfirmEmail) || !sv.validPasswordMsg(userPassword).isEmpty() || !sv.checkFieldsMatch(userPassword, userConfirmPassword)){
				String message = buildErrorMessage(sv, userEmail, userConfirmEmail, userPassword, userConfirmPassword);
				// https://stackoverflow.com/questions/24292373/spring-boot-rest-controller-how-to-return-different-http-status-codes
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
			}

		
		User createdUser = createUser(user.getEmail(), user.getFirstName(), user.getLastName(), user.getDob(), user.getPassword(), user.getRoles());
		saveUser(createdUser); 
		sendRegisterEmail(user.getEmail());

		return new ResponseEntity<String>("Signup success", HttpStatus.OK); 
	}

	private User createUser(String email, String fName, String lName, String dob, String password, String roles){
		User createdUser = new User(); 
		createdUser.setEmail(email); 
		createdUser.setFirstName(fName); 
		createdUser.setLastName(lName); 
		createdUser.setDateOfBirth(dob);
		createdUser.setPassword(passwordEncoder.encode(password)); 
		createdUser.setRoles(roles);
		createdUser.setStatus(UserStatus.PENDING);
		return createdUser;
	}

	private void saveUser(User createdUser) {
		User savedUser = userRepository.save(createdUser); 
		userRepository.save(savedUser);
	}

	private void sendRegisterEmail(String email){
		EmailTemplate emailTemplate = new EmailTemplate();
		// this will become the OTP
		emailTemplate.setMsgBody("12345");
		emailTemplate.setSubject("Welcome");
		emailTemplate.setRecipient(email);
		emailService.sendSimpleMail(emailTemplate);
	}

	@PostMapping("/otp")
	public ResponseEntity<?> otp(@RequestBody String otp){
		return new ResponseEntity<>(null);
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

	private String buildErrorMessage(SignupValidator sv,String userEmail, String userConfirmEmail, String userPassword, String userConfirmPassword){
		StringBuilder errorMsg = new StringBuilder();
		if(!sv.checkFieldsMatch(userEmail, userConfirmEmail)){
			errorMsg.append("Emails do not match. ");
		} 

		if(!sv.checkFieldsMatch(userPassword, userConfirmPassword)){
			errorMsg.append("Passwords do not match.");
		}

		if(!sv.validPasswordMsg(userPassword).isEmpty()){
			for(PasswordError err : sv.validPasswordMsg(userPassword)){
				errorMsg.append(err.toString() + " ");
			}
		}
		
		return errorMsg.toString().trim();

	}


} 


