package com.mycompany.app;
import static org.hamcrest.Matchers.equalTo;


import org.junit.jupiter.api.Test;

import io.restassured.http.ContentType;


import static io.restassured.RestAssured.*;


class StandaloneUserApiTest {

    // endpoint /signin
    @Test
    void assertInvalidAccount() {
    given()
        .contentType(ContentType.JSON)
        .body("""
            {
                "username": "mr@mail.com",
                "password": "Password201!"
            }
            """)
    
    .when()
        .post("/auth/signin")
    .then()
        .assertThat()
        .statusCode(403)
        .body("message", equalTo("Access Denied"));
    }

    @Test
    void assertValidEmailInvalidPassword() {
    given()
        .contentType(ContentType.JSON)
        .body("""
            {
                "username": "o@o.com",
                "password": "Password20regre1!"
            }
            """)
    
    .when()
        .post("/auth/signin")
    .then()
        .assertThat()
        .statusCode(403)
        .body("message", equalTo("Access Denied"));
    }

    @Test
    void assertValidLogin() {
    given()
        .contentType(ContentType.JSON)
        .body("""
            {
                "username": "o@o.com",
                "password": "Tuesday2015!"
            }
            """)
    
    .when()
        .post("/auth/signin")
    .then()
        .assertThat()
        .statusCode(200)
        .cookie("JWT")
        .cookie("RT")
        .body("message", equalTo("Login success"));
    }


    // endpoint /signin END

    // endpoint /signup

    @Test
    void assertEmailInUse() {
    given()
        .contentType(ContentType.JSON)
        .body("""
            {
                "firstName" : "firstName",
                "lastName" : "lastName",
                "dob" : "2025-02-06",
                "email": "o@o.com",
                "confirmEmail": "o@o.com",
                "password": "Password201!",
                "confirmPassword": "Password201!",
                "roles" : "host",
                "locale" : "en"
            }
            """)
    
    .when()
        .post("/auth/signup")
    .then()
        .assertThat()
        .statusCode(409)
        .body("message", equalTo("Email is already in use"));
    }

    @Test
    void assertEmailMismatch() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mis@mail.com",
                    "confirmEmail": "match@mail.com",
                    "password": "Password201!",
                    "confirmPassword": "Password201!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("[EMAIL_ERROR_MISMATCH]"));
        }


    @Test
    void assertInvalidEmail() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mismail.com",
                    "confirmEmail": "mismail.com",
                    "password": "Password201!",
                    "confirmPassword": "Password201!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("Validation failed for object='userSignupHandler'. Error count: 2"));
        }


    @Test
    void assertPasswordMismatch() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mis@mail.com",
                    "confirmEmail": "mis@mail.com",
                    "password": "Password201!",
                    "confirmPassword": "Password01!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("[PASSWORD_ERROR_MISMATCH]"));
        }


    @Test
    void assertPasswordMismatchAndEmailMismatch() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mis@mail.com",
                    "confirmEmail": "match@mail.com",
                    "password": "Password201!",
                    "confirmPassword": "Password01!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("[EMAIL_ERROR_MISMATCH, PASSWORD_ERROR_MISMATCH]"));
        }

    @Test
    void assertPasswordTooShort() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mis@mail.com",
                    "confirmEmail": "mis@mail.com",
                    "password": "Pass01!",
                    "confirmPassword": "Pass01!",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("PASSWORD_ERROR_TOO_SHORT"));
        }


    @Test
    void assertPasswordNoSpecial() {
        given()
            .contentType(ContentType.JSON)
            .body("""
                {
                    "firstName" : "firstName",
                    "lastName" : "lastName",
                    "dob" : "2025-02-06",
                    "email": "mis@mail.com",
                    "confirmEmail": "mis@mail.com",
                    "password": "Password01",
                    "confirmPassword": "Password01",
                    "roles" : "host",
                    "locale" : "en"
                }
                """)
        
        .when()
            .post("/auth/signup")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("PASSWORD_ERROR_NO_SPECIAL"));
        }



    // /signup end
}

