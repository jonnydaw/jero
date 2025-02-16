package com.example.demo.user.userCMRS.service.authentication;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.JwtProvider;
import com.example.demo.email.EmailTemplate;
import com.example.demo.email.IEmailService;
import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.OtpModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.OtpRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;
import com.example.demo.validator.signup.AbstractSignupValidator;
import com.example.demo.validator.signup.EmailMatchValidator;
import com.example.demo.validator.signup.PasswordMatchValidator;
import com.example.demo.validator.signup.ValidPasswordValidator;
// split into two separate classes
@Service
public class UserAuthService implements IUserAuthService {

        @Autowired EmailMatchValidator emailMatchValidator;
        @Autowired PasswordMatchValidator passwordMatchValidator;
        @Autowired ValidPasswordValidator validPasswordValidator;
        @Autowired ConcUserDetailService concUserDetailService;
        @Autowired private PasswordEncoder passwordEncoder; 
        @Autowired private UserRepository userRepository;
        @Autowired private OtpRepository otpRepository;
        //@Autowired private EmailTemplate emailTemplate;
        @Autowired private IEmailService emailService;
        @Autowired private AbstractSignupValidator signupValidator;
    
        @Override
        public UserModel createUser(UserSignupHandler user) {
            UserModel createdUser = new UserModel(); 
            createdUser.setEmail(user.getEmail()); 
            createdUser.setFirstName(user.getFirstName()); 
            createdUser.setLastName(user.getLastName()); 
            createdUser.setDateOfBirth(user.getDob());
            createdUser.setPassword(passwordEncoder.encode(user.getPassword())); 
            createdUser.setRoles(user.getRoles());
            createdUser.setStatus(UserStatus.PENDING);
            return createdUser;
        }
    
        @Override
        public void saveUser(UserModel createdUser) {
            UserModel savedUser = userRepository.save(createdUser); 
            userRepository.save(savedUser);
            saveOTP(createdUser);
        }
    
        @Override
        public void sendRegisterEmail(String email, String locale){
            System.out.println(locale);
            String[] arr = locale.split("/");
            String subject = "";
            Map<String,String> localeToWelcome = new HashMap<>();
            localeToWelcome.put("en", "Welcome");
            localeToWelcome.put("br", "Bem-vindo");
            localeToWelcome.put("es", "Bienvenido");
            for(String split : arr){
                if(localeToWelcome.containsKey(split)){
                    subject = localeToWelcome.get(split);
                }
            }
            EmailTemplate emailTemplate = new EmailTemplate();
            emailTemplate.setMsgBody("12345");
            emailTemplate.setSubject(subject.length() > 0 ? subject : "Welcome");
            emailTemplate.setRecipient(email);
            emailService.sendSimpleMail(emailTemplate);
        }
    
        @Override
        public boolean isEmailInUse(String email) {
            UserModel isEmailInUse = userRepository.findByEmail(email);
            return isEmailInUse != null;
        }
    
        @Override
        public void validate(UserSignupHandler user) throws Exception {
            signupValidator.link(emailMatchValidator, passwordMatchValidator,validPasswordValidator);
            ArrayList<SignupErrorMessages> arr = new ArrayList<>();
            ArrayList<SignupErrorMessages> res = signupValidator.validateRequest(user, arr);
            if(res.size() > 0){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, res.toString() );
            }
            signupValidator.validateRequest(user, arr);
        }

        @Override
        public Authentication authenticate(UserLoginHandler user) {
            //System.out.println(username+"---++----"+password); 
            final String username = user.getUsername();
            final String password = user.getPassword();
            return authenticateHelper(username, password); 
        }



        @Override
        public String provideJWTCookie(Authentication auth) {
            return JwtProvider.generateToken(auth); 
        }

        @Override
        public AuthResponse buildAuthResponse(String token){
            AuthResponse authResponse = new AuthResponse(); 
            authResponse.setMessage("Login success"); 
            authResponse.setJwt(token);
            authResponse.setStatus(true); 
            return authResponse;
        }

        @Override
        public String buildCookie(String token){
            ResponseCookie jwtCookie = ResponseCookie.from("JWT", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(86_400) 
                .sameSite("Lax") 
                .build();
                return jwtCookie.toString();

        }

        @Override
        public Authentication authenticate(UserSignupHandler user) {
            final String username = user.getEmail();
            final String password = user.getPassword();
            return authenticateHelper(username, password);
        }

        private Authentication authenticateHelper(final String username, final String password) {
            UserDetails ud = concUserDetailService.loadUserByUsername(username); 
    
            System.out.println("Sign in in user details"+ ud); 
    
            if(ud == null) { 
                System.out.println("Sign in details - null" + ud); 
    
                throw new BadCredentialsException("Invalid username and password"); 
            } 
            if(!passwordEncoder.matches(password,ud.getPassword())) { 
                System.out.println("Sign in userDetails - password mismatch"+ud); 
    
                throw new BadCredentialsException("Invalid password"); 
                
    
            } 
            return new UsernamePasswordAuthenticationToken(ud,null,ud.getAuthorities());
        }

        //@Override
        private void saveOTP(UserModel createdUser) {
            OtpModel otpModel = new OtpModel();
            otpModel.setId(createdUser.getId());
            otpModel.setOtp(12345);
            otpModel.setCreatedAt(new Date(System.currentTimeMillis()));
            otpRepository.save(otpModel);
        }
}
