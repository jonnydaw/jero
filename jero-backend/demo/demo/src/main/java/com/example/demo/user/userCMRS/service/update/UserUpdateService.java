package com.example.demo.user.userCMRS.service.update;

import java.util.HashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;

@Service
public class UserUpdateService  implements IUserUpdateService{
    @Autowired private UserRepository userRepository;

    @Override
    public void updateUserFirstName(String firstName, String token) {
        UserModel user = getUser(token);
        user.setFirstName(firstName);
        userRepository.save(user);
    }

    @Override
    public void updateUserLastName(String lastName, String token) {
        UserModel user = getUser(token);
        //dry violation???
        user.setLastName(lastName);
        userRepository.save(user);
    }

    @Override
    public void updateUserIntroduction(String introduction, String token) {
        UserModel user = getUser(token);
        user.setIntroduction(introduction);
        userRepository.save(user);
    }

    @Override
    public void updateImageUrl(String imageUrl, String token) {
        UserModel user = getUser(token);
        user.setProfileImgUrl(imageUrl);
        userRepository.save(user);
    }

    private UserModel getUser(String token) {
        String id =  JwtProvider.getIdFromJwtToken(token);
        UserModel user = userRepository.findById(new ObjectId(id)).get();
        return user;
    }

    @Override
    public Map<String,String> getUpdatableFields(String token){
        UserModel user = getUser(token);
        Map<String, String> fieldsToVal = new HashMap<>();
        fieldsToVal.put("firstName",user.getFirstName());
        fieldsToVal.put("lastName", user.getLastName());
        fieldsToVal.put("introduction",user.getIntroduction());
        fieldsToVal.put("profileImgUrl",user.getProfileImgUrl());
        return fieldsToVal;
        // user.getFirstName();
        // user.getLastName();
        // user.getIntroduction();
        // user.getProfileImgUrl();

    }



}
