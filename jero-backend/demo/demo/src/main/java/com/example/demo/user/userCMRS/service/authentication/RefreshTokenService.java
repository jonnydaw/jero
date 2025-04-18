package com.example.demo.user.userCMRS.service.authentication;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.refresh.RefreshProvider;
import com.example.demo.user.DTO.UserLoginHandler;
import com.example.demo.user.DTO.UserSignupHandler;
import com.example.demo.user.userCMRS.model.RefreshModel;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.RefreshRepository;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.ConcUserDetailService;



@Service
public class RefreshTokenService implements IRefreshTokenService {
    @Autowired RefreshRepository refreshRepository;
    @Autowired ConcUserDetailService concUserDetailService;
    @Autowired UserRepository userRepo;


    @Override
    public String createRefreshToken() {
        return RefreshProvider.generateRefreshString();
    }

    @Override
    public void saveRefreshToken(UserLoginHandler user, String refreshToken,  RefreshModel rm ) {
        UserModel loadedUser = userRepo.findByEmail(user.getUsername());
        if(loadedUser == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND");
        }
        rm.setId(loadedUser.getId());
        rm.setRefreshToken(refreshToken);
        rm.setCreatedAt(new Date(System.currentTimeMillis()));
        refreshRepository.save(rm);
    }

    @Override
    public void saveRefreshToken(UserSignupHandler user, String refreshToken,  RefreshModel rm ){
        UserModel loadedUser = userRepo.findByEmail(user.getEmail());
        if(loadedUser == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND");
        }
      //  RefreshModel rm = new RefreshModel();
        rm.setId(loadedUser.getId());
        rm.setRefreshToken(refreshToken);
        rm.setCreatedAt(new Date(System.currentTimeMillis()));
        refreshRepository.save(rm);
    }


    @Override
    public void checkRefreshToken(String id, String messageRefreshToken,  RefreshModel rm ) {
        rm =  refreshRepository.findRefreshById(new ObjectId(id));
        if(rm == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "refresh token not found");
       }
    //    System.out.println("db:" +rm.getRefreshToken());
    //     System.out.println("Message: " + messageRefreshToken);
       if(messageRefreshToken.equals(rm.getRefreshToken())){
        System.out.println("matching rts");
       }else{
        System.out.println("invalid");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid refresh token");
       }
    }

    @Override
    public Authentication authenticateHelper(final String email) {
            UserDetails ud = concUserDetailService.loadUserByUsername(email); 
            System.out.println("Sign in in user details"+ ud); 
    
            if(ud == null) { 
                System.out.println("Sign in details - null" + ud); 
    
                throw new BadCredentialsException("Invalid email"); 
            } 

            return new UsernamePasswordAuthenticationToken(ud,null,ud.getAuthorities());
        }

    // @Override
    // public void deleteRefreshToken(String id) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'deleteRefreshToken'");
    // }

    // @Override
    // public void deleteRefreshToken(String id) {
    //     refreshRepository.deleteById(id);
    // }

    
}
