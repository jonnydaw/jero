package com.example.demo.user.userCMRS.service;


 import org.springframework.beans.factory.annotation.Autowired; 
 import org.springframework.security.core.GrantedAuthority;
 import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; 
 import org.springframework.security.core.userdetails.UserDetailsService; 
 import org.springframework.security.core.userdetails.UsernameNotFoundException; 
 import org.springframework.stereotype.Service;

import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

import java.util.ArrayList; 
 import java.util.List; 
 
 	// https://www.geeksforgeeks.org/spring-security-login-page-with-react/
 @Service
 public class ConcUserDetailService implements UserDetailsService { 
 
	 @Autowired
	 private UserRepository userRepository; 
	 
	
	 @Override
	 public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
		 UserModel user = userRepository.findByEmail(username); 
		 System.out.println(user); 
		 if(user==null) {
			StringBuilder sb = new StringBuilder();
			sb.append("User not found with this email ");
			sb.append(username);
			 throw new UsernameNotFoundException(sb.toString()); 
		 } 
 
		 
		 //System.out.println("Loaded user: " + user.getEmail() + ", Role: " + user.getRoles()); 
		 List<GrantedAuthority> authorities = new ArrayList<>(); 
		 authorities.add(new SimpleGrantedAuthority(user.getRoles().toString()));
		 authorities.add(new SimpleGrantedAuthority(user.getStatus().toString()));
		 // https://stackoverflow.com/questions/32276482/java-lang-classcastexception-org-springframework-security-core-userdetails-user
		 return new org.springframework.security.core.userdetails.User( 
				 user.getEmail(), 
				 user.getPassword(), 
				 authorities); 
	 } 
 } 
 