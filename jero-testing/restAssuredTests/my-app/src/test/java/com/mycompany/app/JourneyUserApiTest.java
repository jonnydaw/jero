package com.mycompany.app;


import java.util.Map;

import org.junit.jupiter.api.Test;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.*;

public class JourneyUserApiTest {
    
    @Test
    void assertSuccessSignup() {


        Response signup = 
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "new@mail.com",
                    "confirmEmail": "new@mail.com",
                    "password": "Password0!",
                    "confirmPassword": "Password0!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .response();

        Map<String, String> extractedCookies = signup.getCookies();
        given()
            .cookies(extractedCookies)
        .when()
            .delete("/auth/delete")
        .then()
            .statusCode(200);
        }


    @Test
    void assertSuccessSignup_assertOtpSuccess() {
    
    
        Response signup = 
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "otpSuccess@mail.com",
                    "confirmEmail": "otpSuccess@mail.com",
                    "password": "Password0!",
                    "confirmPassword": "Password0!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .response();

        Map<String, String> extractedCookies = signup.getCookies();

        given()
            .cookies(extractedCookies)
            .contentType(ContentType.JSON)
            .body("""
                {
                    "otpPassword" : 12345,
                    "locale" : "en"
                }
                    """)
        .when()
            .post("/auth/verify_otp")
        .then()
            .statusCode(200);



        given()
            .cookies(extractedCookies)
        .when()
            .delete("/auth/delete")
        .then()
            .statusCode(200);
        }


        @Test
    void assertSuccessSignup_assertOtpFail() {
    
    
        Response signup = 
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "otpFail@mail.com",
                    "confirmEmail": "otpFail@mail.com",
                    "password": "Password0!",
                    "confirmPassword": "Password0!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .response();

        Map<String, String> extractedCookies = signup.getCookies();

        given()
            .cookies(extractedCookies)
            .contentType(ContentType.JSON)
            .body("""
                {
                    "otpPassword" : 54321,
                    "locale" : "en"
                }
                    """)
        .when()
            .post("/auth/verify_otp")
        .then()
            .statusCode(400);



        given()
            .cookies(extractedCookies)
        .when()
            .delete("/auth/delete")
        .then()
            .statusCode(200);
        }
}
