package com.example.demo.usermodel;


import org.springframework.data.annotation.Id; 
import org.springframework.data.mongodb.core.mapping.Document; 

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
public class User { 

	@Id
	private String id; 
	private String firstName; 
	private String lastName;
	private String dateOfBirth;
	private String email; 
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
	private String password; 
	private String role = "ROLE_CUSTOMER"; 
	// private String mobile; 
	

	
	
	// public String getId() { 
	// 	return id; 
	// } 
	// public void setId(String id) { 
	// 	this.id = id; 
	// } 
	// public String get_id() { 
	// 	return id; 
	// } 
	// public void set_id(String id) { 
	// 	this.id = id; 
	// } 
	// public String getFullName() { 
	// 	return fullName; 
	// } 
	// public void setFullName(String fullName) { 
	// 	this.fullName = fullName; 
	// } 
	// public String getEmail() { 
	// 	return email; 
	// } 
	// public void setEmail(String email) { 
	// 	this.email = email; 
	// } 
	// public String getPassword() { 
	// 	return password; 
	// } 
	// public void setPassword(String password) { 
	// 	this.password = password; 
	// } 
	// public String getRole() { 
	// 	return role; 
	// } 
	// public void setRole(String role) { 
	// 	this.role = role; 
	// } 
	// public String getMobile() { 
	// 	return mobile; 
	// } 
	// public void setMobile(String mobile) { 
	// 	this.mobile = mobile; 
	// } 
	
} 
