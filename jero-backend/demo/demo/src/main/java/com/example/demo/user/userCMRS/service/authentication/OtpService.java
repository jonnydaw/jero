package com.example.demo.user.userCMRS.service.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.NotFound;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.JwtProvider;
import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.enumeration.user.UserStatus;
import com.example.demo.user.userCMRS.model.OtpModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.OtpRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class OtpService implements IOtpService {
    @Autowired UserRepository userRepository;
    @Autowired OtpRepository otpRepo;
   
    @Override
    public void checkOTP(String token, OtpHandler otp) {
        UserModel user = getUserFromToken(token);
        verifyWithDB(user.getId(), otp.getOtpPassword());
        updateStatus(user);
    }
    

    private UserModel getUserFromToken(String token){
        String email = JwtProvider.getEmailFromJwtToken(token);
		UserModel user = userRepository.findByEmail(email);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
		return user;
    }

    private void verifyWithDB(String id, int userOtp){
        OtpModel dbOtp = otpRepo.findOTPById(id);
		if(dbOtp.getOtp() != userOtp){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad");
		}
    }

    private void updateStatus(UserModel user){
        user.setStatus(UserStatus.VERIFIED);
        userRepository.save(user);
    }
}
