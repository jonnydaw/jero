package com.example.demo.response;

import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 
// https://www.geeksforgeeks.org/spring-security-login-page-with-react/
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AuthResponse { 
	private String jwt; 
	private String message; 
	private Boolean status; 
	private Cookie cookie;

} 

