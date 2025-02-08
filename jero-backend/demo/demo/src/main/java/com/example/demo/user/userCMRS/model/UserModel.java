package com.example.demo.user.userCMRS.model;


import org.springframework.data.annotation.Id; 
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.user.enumeration.user.*;
import com.fasterxml.jackson.annotation.JsonProperty; 

import lombok.AllArgsConstructor; 
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 

@Document(collection = "user") 
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class UserModel { 
	@Id
	private String id; 
	private String firstName; 
	private String lastName;
	private String dateOfBirth;
	private String email; 
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
	private String password; 
	private String roles;
	private UserStatus status;
} 
