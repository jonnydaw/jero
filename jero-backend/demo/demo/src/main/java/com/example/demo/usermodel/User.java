package com.example.demo.usermodel;


import java.util.*;
import com.example.demo.enumeration.user.*;
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
	private Set<Roles> roles;
} 
