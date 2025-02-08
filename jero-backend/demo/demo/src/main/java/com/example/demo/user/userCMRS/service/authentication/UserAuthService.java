package com.example.demo.user.userCMRS.service.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.email.EmailTemplate;
import com.example.demo.email.IEmailService;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.validator.signup.AbstractSignupValidator;
import com.example.demo.validator.signup.EmailMatchValidator;
import com.example.demo.validator.signup.PasswordMatchValidator;
import com.example.demo.validator.signup.ValidPasswordValidator;

@Service
public class UserAuthService implements IUserAuthService {

        @Autowired EmailMatchValidator emailMatchValidator;
        @Autowired PasswordMatchValidator passwordMatchValidator;
        @Autowired ValidPasswordValidator validPasswordValidator;
        @Autowired private PasswordEncoder passwordEncoder; 
        @Autowired private UserRepository userRepository;
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
        }
    
        @Override
        public void sendRegisterEmail(String email){
            // this will become the OTP
            EmailTemplate emailTemplate = new EmailTemplate();
            emailTemplate.setMsgBody("12345");
            emailTemplate.setSubject("Welcome");
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
            signupValidator.validateRequest(user);
    }
    
}
