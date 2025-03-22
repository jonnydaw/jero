package com.example.demo.SecurityConfig.jwt;


import io.jsonwebtoken.ClaimJwtException;
import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jws;
// import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.security.Keys; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;

import java.util.ArrayList;
import java.util.Collection; 
import java.util.Date; 
import java.util.List;

public class JwtProvider { 
	static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()); 

	public static String generateToken(Authentication auth, String id) { 
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities(); 
		List<String> roles = populateAuthorities(authorities); 
		String jwt = Jwts.builder() 
				.setIssuedAt(new Date()) 
				.setExpiration(new Date(System.currentTimeMillis() + 300_000)) 
				.claim("email", auth.getName())
				.claim("id", id)
				.claim("status", roles.get(0))
				.claim( "role",roles.get(1))
				.signWith(key) 
				.compact(); 
		return jwt; 
	} 



	private static List<String> populateAuthorities(Collection<? extends GrantedAuthority> authorities) { 
		List<String> auths = new ArrayList<>(); 
		for(GrantedAuthority authority: authorities) { 
			auths.add(authority.getAuthority()); 
		} 
		return auths; 
	} 


	public static String getEmailFromJwtToken(String jwt) { 
		try { 
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody(); 
			String email = String.valueOf(claims.get("email")); 
			System.out.println("Email extracted from JWT: " + claims); 
			return email; 
		} catch (Exception e) { 
			// https://stackoverflow.com/questions/35791465/is-there-a-way-to-parse-claims-from-an-expired-jwt-token
			if(e.getClass() == io.jsonwebtoken.ExpiredJwtException.class){
				Claims claims = ((ClaimJwtException) e).getClaims();
				String email = String.valueOf(claims.get("email")); 
				System.out.println("Email extracted from expired JWT: " + claims); 
				return email; 

			}
			System.err.println("Error extracting email from JWT: " + e.getMessage()); 
			e.printStackTrace(); 
			return null; 
		} 
	}

	public static String getIdFromJwtToken(String jwt) { 
		try { 
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody(); 
			String id = String.valueOf(claims.get("id")); 
			System.out.println("Id extracted from JWT: " + claims); 
			return id; 
		} catch (Exception e) { 
			// https://stackoverflow.com/questions/35791465/is-there-a-way-to-parse-claims-from-an-expired-jwt-token
			if(e.getClass() == io.jsonwebtoken.ExpiredJwtException.class){
				Claims claims = ((ClaimJwtException) e).getClaims();
				String id = String.valueOf(claims.get("id")); 
				System.out.println("id extracted from expired JWT: " + claims); 
				return id; 

			}
			System.err.println("Error extracting id from JWT: " + e.getMessage()); 
			e.printStackTrace(); 
			return null; 
		} 
	} 

	public static String getRoleFromJwtToken(String jwt) { 
		try { 
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody(); 
			String role = String.valueOf(claims.get("role")); 
			System.out.println("role extracted from JWT: " + claims); 
			return role; 
		} catch (Exception e) { 
			// https://stackoverflow.com/questions/35791465/is-there-a-way-to-parse-claims-from-an-expired-jwt-token
			if(e.getClass() == io.jsonwebtoken.ExpiredJwtException.class){
				Claims claims = ((ClaimJwtException) e).getClaims();
				String role = String.valueOf(claims.get("role")); 
				System.out.println("id extracted from expired JWT: " + claims); 
				return role; 

			}
			System.err.println("Error extracting role from JWT: " + e.getMessage()); 
			e.printStackTrace(); 
			return null; 
		} 
	} 

} 


