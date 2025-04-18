package com.example.demo.bookingServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.booking.bookingCMRS.service.BookingService;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class VerifyUserTests {
    
    @Mock BookingRepo bookingRepo;
    @Mock PropertyRepo propertyRepo;
    @Mock UserRepository userRepository;
    @Mock IEmailService emailService;
    @InjectMocks BookingService bookingService;

    final String bookingIdAString = "67d19f119222aa4f889fa092";
    final String ownerId = ("67b877cbe8ddf130ce69924a");
    final ObjectId ownerObjectid = new ObjectId("67b877cbe8ddf130ce69924a");
    final String guestId = ("67b8d989e8ddf130ce69926b");
    final ObjectId guestObjectId = new ObjectId("67b8d989e8ddf130ce69926b");
    final String token = "JWT";
    final ObjectId propertyId = new ObjectId("67e54d57bd94997e8cd0450b");

    @Test
    void verifyUser_NO_BOOKING(){

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn("hi");

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.empty());

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.verifyUser(token, bookingIdAString));

            assertEquals("404 NOT_FOUND \"BOOKING_NOT_FOUND\"", exception.getMessage());
        }
    }

    @Test
    void verifyUser_USER_IS_NOT_GUEST(){

        BookingModel booking = new BookingModel();
        booking.setGuestId(guestObjectId);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn("hi");

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.verifyUser(token, bookingIdAString));

            assertEquals("403 FORBIDDEN \"user not part of booking\"", exception.getMessage());
        }
    }


    @Test
    void verifyUser_BOOKING_NOT_ACCEPTED(){

        BookingModel booking = new BookingModel();
        booking.setGuestId(guestObjectId);
        booking.setAccepted(false);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(guestId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.verifyUser(token, bookingIdAString));

            assertEquals("400 BAD_REQUEST \"booking not accepted\"", exception.getMessage());
        }
    }

    @Test
    void verifyUser_BOOKING_CANCELLED(){

        BookingModel booking = new BookingModel();
        booking.setGuestId(guestObjectId);
        booking.setAccepted(true);
        booking.setCancelled(true);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(guestId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.verifyUser(token, bookingIdAString));

            assertEquals("400 BAD_REQUEST \"booking not accepted\"", exception.getMessage());
        }
    }

    @Test
    void verifyUser_TOO_LATE(){
         Instant _21st_jan_2025 = Instant.parse("2025-01-21T00:00:00.000Z");
        BookingModel booking = new BookingModel();
        booking.setGuestId(guestObjectId);
        booking.setEndDate(_21st_jan_2025);
        booking.setAccepted(true);
        booking.setCancelled(false);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(guestId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.verifyUser(token, bookingIdAString));

            assertEquals("451 UNAVAILABLE_FOR_LEGAL_REASONS \"booking in the past\"", exception.getMessage());
        }
    }
}
