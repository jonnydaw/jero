package com.example.demo.user.userCMRS.service.authentication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.bson.types.ObjectId;
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

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.email.EmailTemplate;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.service.IPropertyService;
import com.example.demo.response.AuthResponse;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.SignupErrorMessages;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.UserModel;
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
        @Autowired IBookingService bookingService;
        @Autowired IPropertyService propertyService;
        @Autowired ConcUserDetailService concUserDetailService;
        @Autowired private PasswordEncoder passwordEncoder; 
        @Autowired private UserRepository userRepository;
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
            Map<String,String> prefs = new HashMap<>();
            prefs.put("language", "en");
            prefs.put("currency", "gbp");
            createdUser.setInternationalisationPreferences(prefs);
            createdUser.setProfileImgUrl("");
            createdUser.setIntroduction("");
            Map<String, Boolean> privacy = new HashMap<>();
            if(user.getRoles().equals("customer")){
                privacy.put("review", false);

            }else{
                privacy.put("alwaysShowProfile", false);

            }
            privacy.put("profile", false);
            privacy.put("analysis", false);
            createdUser.setPrivacy(privacy);
            return createdUser;
        }
    
        @Override
        public void saveUser(UserModel createdUser) {
            UserModel savedUser = userRepository.save(createdUser); 
            userRepository.save(savedUser);
        }

        @Override
        public void deleteUserPrecursor(String JWT){
            String role = JwtProvider.getRoleFromJwtToken(JWT);
            String id = JwtProvider.getIdFromJwtToken(JWT);
           Map<String, List<BookingModel>> bookings =  bookingService.getBookings(JWT);
           List<BookingModel> currentBookings = bookings.get("present");
           if(currentBookings != null && currentBookings.size() > 0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ongoing booking" );
           }
           List<BookingModel> futureBookings = bookings.get("future");
           for(BookingModel futureBooking : futureBookings){
            if(futureBooking.isAccepted() && !futureBooking.isCancelled()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "cancel booking before deletion" );
            }
           }
            
           List<BookingModel> combinedBookings = Stream.concat(bookings.get("past").stream(), bookings.get("future").stream())
                             .collect(Collectors.toList());
          
           bookingService.handleDeletedUserBooking(JWT, combinedBookings);
           if(role.equals("host")){
                propertyService.handlePropertiesUserDeletion(id);
           }else if(role.equals("customer")){
            propertyService.handleReviewDeletion(combinedBookings, id);
           }

           userRepository.deleteById(new ObjectId(id));
        }



    
        @Override
        public void sendRegisterEmail(String email, String locale, EmailTemplate emailTemplate){
           // System.out.println(locale);
            String[] split = locale.split("/");
            String subject = "";
            Map<String,String> localeToWelcome = new HashMap<>();
            localeToWelcome.put("en", "Welcome");
            localeToWelcome.put("br", "Bem-vindo");
            localeToWelcome.put("es", "Bienvenido");
            for(String chop : split){
                if(localeToWelcome.containsKey(chop)){
                    subject = localeToWelcome.get(chop);
                }
            }
          //  EmailTemplate emailTemplate = new EmailTemplate();
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
        public void validate(UserSignupHandler user) {
            signupValidator.link(emailMatchValidator, passwordMatchValidator,validPasswordValidator);
            ArrayList<SignupErrorMessages> arr = new ArrayList<>();
            ArrayList<SignupErrorMessages> res = signupValidator.validateRequest(user, arr);
            //System.out.println("right here " + res.toString());
            if(res.size() > 0){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, res.toString() );
            }
            signupValidator.validateRequest(user, arr);
        }

        @Override
        public Authentication authenticate(UserLoginHandler user) {
            final String username = user.getUsername();
            final String password = user.getPassword();
            return authenticateHelper(username, password); 
        }



        @Override
        public String provideJWTCookie(Authentication auth, String id) {
            return JwtProvider.generateToken(auth, id); 
        }

        @Override
        public AuthResponse buildAuthResponse(String token, String message, AuthResponse authResponse){
            //AuthResponse authResponse = new AuthResponse(); 
            authResponse.setMessage(message); 
            authResponse.setJwt(token);
            authResponse.setStatus(true); 
            return authResponse;
        }

        @Override
        public String buildCookie(String value, String cookieName, int age ){
            // if local do secure false, comment out domain, sameSite Lax.
            // if deploing secure true domain("".jero.travel") same site none
            ResponseCookie cookie = ResponseCookie.from(cookieName, value)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(age) 
                .sameSite("none")
                //https://stackoverflow.com/questions/58191969/how-to-fix-set-samesite-cookie-to-none-warning 
                .domain(".jero.travel")
                .build();
                return cookie.toString();
        }

        // @Override
        // public String buildCookie(String value, String cookieName, int age ){
        //     // if local do secure false, comment out domain, sameSite Lax.
        //     // if deploing secure true domain("".jero.travel") same site none
        //     ResponseCookie cookie = ResponseCookie.from(cookieName, value)
        //         .httpOnly(true)
        //         .secure(false)
        //         .path("/")
        //         .maxAge(age) 
        //         .sameSite("Lax")
        //         //https://stackoverflow.com/questions/58191969/how-to-fix-set-samesite-cookie-to-none-warning 
        //         //.domain(".jero.travel")
        //         .build();
        //         return cookie.toString();
        // }
        
// https://www.geeksforgeeks.org/spring-security-login-page-with-react/
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
    }

