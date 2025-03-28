

package com.example.demo.SecurityConfig.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;
// https://www.geeksforgeeks.org/spring-security-login-page-with-react/
public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        
        String jwt = extractToken(request);
        if (jwt != null) {
            try {
                validateAndSetAuthentication(jwt);
            } catch (Exception e) {
                if(e.getMessage().equals("io.jsonwebtoken.ExpiredJwtException")){
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("JWT expired");
            }
            }
        }
        
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String token = request.getHeader(JwtConstant.JWT_HEADER);
        if (token == null && request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("JWT".equals(cookie.getName())) {
                    token = cookie.getValue();
                    System.out.println("valid " + token);
                    break;
                }
            }
        }
        
        return token;
    }

    private void validateAndSetAuthentication(String jwt) {
        SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(jwt)
            .getBody();

        String email = String.valueOf(claims.get("email"));
        String role = String.valueOf(claims.get("role"));
        String status = String.valueOf(claims.get("status"));
        //System.out.println("authorities" + authorities);
        
        List<GrantedAuthority> auth = AuthorityUtils.createAuthorityList(role,status);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
    }
}