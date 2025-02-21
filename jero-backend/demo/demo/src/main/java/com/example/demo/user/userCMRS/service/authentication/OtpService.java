package com.example.demo.user.userCMRS.service.authentication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.OtpModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.OtpRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class OtpService implements IOtpService {
    @Autowired UserRepository userRepository;
    @Autowired OtpRepository otpRepo;
    @Autowired UserAuthService userAuthService;
   
    @Override
    public void checkOTP(String token, OtpHandler otp) {
        UserModel user = getUserFromToken(token);
        verifyWithDB(user.getId(), otp.getOtpPassword());
        updateStatus(user);
    }

    @Override
    public String reissue(String token, OtpHandler otp){
        String pass = otp.getPass();
        String email = JwtProvider.getEmailFromJwtToken(token);
        UserLoginHandler ul = new UserLoginHandler();
        ul.setPassword(pass);
        ul.setUsername(email);
        Authentication auth = userAuthService.authenticate(ul);
		SecurityContextHolder.getContext().setAuthentication(auth); 
		String newToken = userAuthService.provideJWTCookie(auth);
        return newToken;
        
    }
    

    private UserModel getUserFromToken(String token){
        String email = JwtProvider.getEmailFromJwtToken(token);
		UserModel user = userRepository.findByEmail(email);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
		return user;
    }

    private void verifyWithDB(ObjectId id, int userOtp){
        OtpModel dbOtp = otpRepo.findOTPById(id);
        if(dbOtp == null){
            throw new BadCredentialsException("OTP has expired"); 
        }
		if(dbOtp.getOtp() != userOtp){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect OTP");
		}
    }

    private void updateStatus(UserModel user){
        user.setStatus(UserStatus.VERIFIED);
        userRepository.save(user);
    }
}
