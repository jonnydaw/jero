package com.example.demo.user.userCMRS.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "refresh")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class RefreshModel {
    @Id
	private ObjectId id;
    private String refreshToken;
    private boolean active;
    private Date createdAt;
    
}
