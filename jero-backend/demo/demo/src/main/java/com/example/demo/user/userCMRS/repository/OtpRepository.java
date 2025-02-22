package com.example.demo.user.userCMRS.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.user.userCMRS.model.OtpModel;

@Repository
public interface OtpRepository extends MongoRepository<OtpModel,ObjectId> { 
	OtpModel findOTPById(ObjectId id); 
} 

