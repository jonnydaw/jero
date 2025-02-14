package com.example.demo.user.userCMRS.service.authentication;

import com.example.demo.user.DTO.OtpHandler;

public interface IOtpService {

    public void checkOTP(String token, OtpHandler otp);
    
}
