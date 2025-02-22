package com.example.demo.user.userCMRS.service.authentication;

import com.example.demo.user.DTO.OtpHandler;
import com.example.demo.user.userCMRS.model.UserModel;

public interface IOtpService {

    public void checkOTP(String token, OtpHandler otp);

    public String reissue(String token, OtpHandler otp);

    public void saveOTPOnCreation(UserModel createdUser);

    public void saveOTPOnRegen(String token);

    
}
