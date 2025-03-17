package com.example.demo.user.userCMRS.repository;

import org.bson.types.ObjectId;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.mongodb.repository.MongoRepository; 
// import org.springframework.data.mongodb.repository.Query; 
import org.springframework.stereotype.Repository;

import com.example.demo.user.userCMRS.model.UserModel; 

@Repository
public interface UserRepository extends MongoRepository<UserModel,ObjectId> { 
	UserModel findByEmail(String email);
} 

 