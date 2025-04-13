package com.example.demo.SecurityConfig;



import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.web.SecurityFilterChain; 
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter; 
import org.springframework.web.cors.CorsConfiguration; 
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.demo.SecurityConfig.jwt.JwtTokenValidator;

import java.util.Arrays; 
import java.util.Collections; 
// https://www.geeksforgeeks.org/spring-security-login-page-with-react/
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
						.requestMatchers("/auth/delete").authenticated()
						.requestMatchers("/auth/profile").authenticated()
						//.requestMatchers("/property/add_property").authenticated()
						.requestMatchers("/signup").permitAll()
						.requestMatchers("/location").permitAll()
						.requestMatchers("/auth/refresh").permitAll()
						.anyRequest().permitAll())
						.logout((logout) -> logout
							//.deleteCookies("JWT","RT") // local
							// https://stackoverflow.com/questions/79314702/spring-authorization-server-threw-exception-with-message-delegatingauthenticati
							.logoutSuccessHandler((request, response, authentication) -> {

								
								// https://stackoverflow.com/questions/9821919/delete-cookie-from-a-servlet-response
								// Cookie nullJWTCookie = new Cookie("JWT", null);
								// nullJWTCookie.setPath("/");
								// nullJWTCookie.setHttpOnly(true);
								// nullJWTCookie.setMaxAge(3600);
								// nullJWTCookie.setSecure(true);
								// nullJWTCookie.setDomain(".jero.travel");

								

								// Cookie nullRTCookie = new Cookie("RT", null);
								// nullRTCookie.setPath("/");
								// nullRTCookie.setHttpOnly(true);
								// nullRTCookie.setMaxAge(3600);
								// nullRTCookie.setSecure(true);
								// nullRTCookie.setDomain(".jero.travel");
								
								// response.addCookie(nullJWTCookie);
								// response.addCookie(nullRTCookie);

								ResponseCookie nullJWTCookie = ResponseCookie.from("JWT", null)
									.httpOnly(true)
									.secure(true)
									.path("/")
									.maxAge(0) 
									.sameSite("none")
									//https://stackoverflow.com/questions/58191969/how-to-fix-set-samesite-cookie-to-none-warning 
									.domain(".jero.travel")
									.build();
								
								ResponseCookie nullRTCookie = ResponseCookie.from("RT", null)
									.httpOnly(true)
									.secure(true)
									.path("/")
									.maxAge(0) 
									.sameSite("none")
									//https://stackoverflow.com/questions/58191969/how-to-fix-set-samesite-cookie-to-none-warning 
									.domain(".jero.travel")
									.build();
								

								response.addHeader(HttpHeaders.SET_COOKIE, nullJWTCookie.toString());
								response.addHeader(HttpHeaders.SET_COOKIE, nullRTCookie.toString());
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
				ccfg.setAllowedOrigins(Arrays.asList("http://localhost:3000","https://jero.travel", "https://www.jero.travel", "*.jero.travel")); 
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
