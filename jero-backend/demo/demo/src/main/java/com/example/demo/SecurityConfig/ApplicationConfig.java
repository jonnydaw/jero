package com.example.demo.SecurityConfig;



import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.web.SecurityFilterChain; 
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter; 
import org.springframework.web.cors.CorsConfiguration; 
import org.springframework.web.cors.CorsConfigurationSource; 

import java.util.Arrays; 
import java.util.Collections; 

@Configuration
public class ApplicationConfig { 


	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception { 
		System.out.println("Security Config is Active");
		http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
		.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests( 
						authorize -> authorize
						.requestMatchers("/recommendation").authenticated()
						.requestMatchers("auth/profile").authenticated()
						.requestMatchers("/signup").permitAll()
						.anyRequest().permitAll())
						.logout((logout) -> logout
							.deleteCookies("JWT")
							// https://stackoverflow.com/questions/79314702/spring-authorization-server-threw-exception-with-message-delegatingauthenticati
							.logoutSuccessHandler((request, response, authentication) -> {
								response.setStatus(HttpServletResponse.SC_OK);
								response.getWriter().flush();
							})
					)
				.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class);
		return http.build(); 
	} 

	private CorsConfigurationSource corsConfigurationSource() { 
		return new CorsConfigurationSource() { 
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) { 
				CorsConfiguration ccfg = new CorsConfiguration(); 
				ccfg.setAllowedOrigins(Arrays.asList("http://localhost:3000")); 
				ccfg.setAllowedMethods(Collections.singletonList("*")); 
				ccfg.setAllowCredentials(true); 
				ccfg.setAllowedHeaders(Collections.singletonList("*")); 
				ccfg.setExposedHeaders(Arrays.asList("Authorization")); 
				ccfg.setMaxAge(3600L); 
				return ccfg; 

			} 
		}; 

	} 

	@Bean
	PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); 
	} 

} 
