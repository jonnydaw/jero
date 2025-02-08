package com.example.demo.email;
// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class EmailTemplate {
     String recipient;
     String subject;
     String msgBody;
}
