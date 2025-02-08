package com.example.demo.email;
// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailTemplate {
    private String recipient;
    private String subject;
    private String msgBody;
}
