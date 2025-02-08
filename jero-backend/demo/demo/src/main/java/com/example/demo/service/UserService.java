 package com.example.demo.service;


 import com.example.demo.repository.UserRepository; 
 
 
 import com.example.demo.usermodel.User; 
 import org.springframework.beans.factory.annotation.Autowired; 
 import org.springframework.security.core.GrantedAuthority;
 import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; 
 import org.springframework.security.core.userdetails.UserDetailsService; 
 import org.springframework.security.core.userdetails.UsernameNotFoundException; 
 import org.springframework.stereotype.Service; 
 
 
 import java.util.ArrayList; 
 import java.util.List; 
 
 	
 @Service
 public class UserService implements UserDetailsService { 
 
	 @Autowired
	 private UserRepository userRepository; 
	 
	 public UserService(UserRepository userRepository) { 
		 this.userRepository=userRepository; 
	 } 
	 
	 
	 @Override
	 public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
		 User user = userRepository.findByEmail(username); 
		 System.out.println(user); 
		 
		 if(user==null) { 
			 throw new UsernameNotFoundException("User not found with this email"+username); 
 
		 } 
 
		 
		 System.out.println("Loaded user: " + user.getEmail() + ", Role: " + user.getRoles()); 
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
 