// package com.example.demo.authServiceTests.buildAuthResponse;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.example.demo.response.AuthResponse;
// import com.example.demo.user.DTO.UserLoginHandler;

// import com.example.demo.user.userCMRS.service.ConcUserDetailService;
// import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;
// import com.example.demo.user.userCMRS.service.authentication.UserAuthService;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertThrows;
// import static org.mockito.Mockito.when;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// // @ExtendWith(MockitoExtension.class)
// // public class BuildAuthResponseTests {

// //     @InjectMocks UserAuthService mockUserAuthService;

// //     @Test
// //     void testBuildAuthResponse(){
// //        AuthResponse ar =  mockUserAuthService.buildAuthResponse("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30", "hi");
// //         assertEquals(ar.get, new AuthResponse());
// //     }
    
// // }
