package com.example.demo.SecurityConfig.refresh;

import java.security.SecureRandom;

public class RefreshProvider {

    // https://stackoverflow.com/questions/7111651/how-to-generate-a-secure-random-alphanumeric-string-in-java-efficiently
final static String CHRS = "0123456789abcdefghijklmnopqrstuvwxyz-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
final static SecureRandom SECURE_RANDOM = new SecureRandom();


public static String generateRefreshString(){

    final String refresh = SECURE_RANDOM
        .ints(64, 0, CHRS.length())
        .mapToObj(i -> CHRS.charAt(i))
        .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
        .toString();
        return refresh;
    }
}
