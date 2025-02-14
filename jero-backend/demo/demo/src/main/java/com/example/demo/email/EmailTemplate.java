package com.example.demo.email;
import lombok.Data;

@Data
public class EmailTemplate {
     String recipient;
     String subject;
     String msgBody;
}
