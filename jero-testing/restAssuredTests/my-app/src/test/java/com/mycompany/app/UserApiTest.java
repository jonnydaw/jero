package com.mycompany.app;
import static org.hamcrest.Matchers.equalTo;
import org.junit.jupiter.api.Test;

import io.restassured.http.ContentType;

import static io.restassured.RestAssured.*;


class UserApiTest {

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
                "email": "boss@mail.com",
                "confirmEmail": "boss@mail.com",
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

    // /signup
}
