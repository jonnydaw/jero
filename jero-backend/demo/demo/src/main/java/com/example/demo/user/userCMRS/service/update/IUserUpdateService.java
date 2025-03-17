package com.example.demo.user.userCMRS.service.update;

import java.util.Map;

public interface IUserUpdateService {

    public void updateUserFirstName(String firstName, String token );
    public void updateUserLastName(String lastName, String token);
    public void updateUserIntroduction(String introduction, String token);
    public void updateImageUrl(String imageUrl, String token);
    public Map<String,String> getUpdatableFields(String token);

    
} 
