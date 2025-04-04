package com.example.demo.user.userCMRS.controller;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.user.DTO.UpdateHandler;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.update.IUserUpdateService;

@RestController
@RequestMapping("/profile") 
public class UserProfileController {
    	
        @Autowired UserRepository userRepository;
        @Autowired IUserUpdateService updateService;


    	@GetMapping("/get-first-name") 
	    public ResponseEntity<String> getProfile(@CookieValue("JWT") String token)  { 
            // https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
            // 27/11/24
            String email =  JwtProvider.getEmailFromJwtToken(token);
            UserModel user = userRepository.findByEmail(email);
            return ResponseEntity.ok()
            .body(user.getFirstName());
	    }

        @PutMapping("/update-firstname") 
	    public ResponseEntity<String> updateFirstName(@RequestBody UpdateHandler newFirstName, @CookieValue("JWT") String token)  { 
            updateService.updateUserFirstName(newFirstName.getUpdateVal(), token);
            return ResponseEntity.ok().body("hi");
	    }

        @PutMapping("/update-lastname") 
	    public ResponseEntity<String> updateLastName(@RequestBody UpdateHandler newLastName, @CookieValue("JWT") String token)  { 
     
            updateService.updateUserLastName(newLastName.getUpdateVal(), token);
            return ResponseEntity.ok().body("hi");
	    }

        @PutMapping("/update-introduction") 
	    public ResponseEntity<String> updateIntroduction(@RequestBody UpdateHandler newIntroduction, @CookieValue("JWT") String token)  { 
            updateService.updateUserIntroduction(newIntroduction.getUpdateVal(), token);
            return ResponseEntity.ok().body("hi");
	    }

        @PutMapping("/update-imgLink") 
	    public ResponseEntity<String> updateProfilePic(@RequestBody UpdateHandler newImageUrl, @CookieValue("JWT") String token)  { 
            updateService.updateImageUrl(newImageUrl.getUpdateVal(), token);
            return ResponseEntity.ok().body("hi");
	    }

        @PutMapping("/update-password") 
	    public ResponseEntity<String> updateProfilePic(@RequestBody , @CookieValue("JWT") String token)  { 
            updateService.updateImageUrl(newImageUrl.getUpdateVal(), token);
            return ResponseEntity.ok().body("hi");
	    }

        @GetMapping("/get-update-fields") 
	    public ResponseEntity<?> getUpdateableFields(@CookieValue("JWT") String token)  { 
            // https://stackoverflow.com/questions/33118342/java-get-cookie-value-by-name-in-spring-mvc
            // 27/11/24
            // String token =  JwtProvider.getEmailFromJwtToken(token);
            Map<String, String> res = updateService.getUpdatableFields(token);

            System.out.println(res.toString());
            return ResponseEntity.ok()
            .body(res);
	    }
    
}
