package com.example.demo.user.userCMRS.service.update;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;

@Service
public class UserUpdateService  implements IUserUpdateService{
    @Autowired private UserRepository userRepository;

}
