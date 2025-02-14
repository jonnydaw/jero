package com.example.demo.response;

import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AuthResponse { 
	private String jwt; 
	private String message; 
	private Boolean status; 
	private Cookie cookie;

	// public String getJwt() { 
	// 	return jwt; 
	// } 

	// public void setJwt(String jwt) { 
	// 	this.jwt = jwt; 
	// }
	
	// public void setCookie(ResponseCookie cookie){
	// 	this.cookie = cookie;
	// }

	// public ResponseCookie getCookie(){
	// 	return cookie;
	// }

	// public String getMessage() { 
	// 	return message; 
	// } 

	// public void setMessage(String message) { 
	// 	this.message = message; 
	// } 

	// public Boolean getStatus() { 
	// 	return status; 
	// } 

	// public void setStatus(Boolean status) { 
	// 	this.status = status; 
	// } 
} 

