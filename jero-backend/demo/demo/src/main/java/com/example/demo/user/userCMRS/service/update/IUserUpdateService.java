package com.example.demo.user.userCMRS.service.update;

import java.util.Map;

import com.example.demo.user.DTO.UpdateHostPrivacyHandler;
import com.example.demo.user.DTO.UpdatePrivacyHandler;
import com.example.demo.user.userCMRS.model.UserModel;

public interface IUserUpdateService {

    public void updateUserFirstName(String firstName, String token );
    public void updateUserLastName(String lastName, String token);
    public void updateUserIntroduction(String introduction, String token);
    public void updateImageUrl(String imageUrl, String token);
    public Map<String,String> getUpdatableFields(String token);
    public Map<String,Boolean> getPrivacySettings(String token);
    public void updatePrivacySettings(String token, UpdatePrivacyHandler newSettings);
    public void updateHostPrivacySettings(String token, UpdateHostPrivacyHandler newSettings);

    
} 
