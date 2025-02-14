package com.example.demo.user.userCMRS.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "otp") 
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class OtpModel {
    @Id
	private String id;
    private int otp;
    private Date createdAt;
}
