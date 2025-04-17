package com.example.demo.bookingServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AcceptBookingTests {
    @Mock BookingRepo bookingRepo;
    @Mock PropertyRepo propertyRepo;
    @Mock UserRepository userRepository;
    @Mock IEmailService emailService;
    @InjectMocks BookingService bookingService;

    final String bookingIdAString = "67d19f119222aa4f889fa092";
    final String ownerId = ("67b877cbe8ddf130ce69924a");
    final ObjectId ownerObjectid = new ObjectId("67b877cbe8ddf130ce69924a");
    final String token = "JWT";
    final ObjectId propertyId = new ObjectId("67e54d57bd94997e8cd0450b");

    @Test
    void acceptBooking_NO_BOOKING(){
            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.empty());
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.acceptBooking(bookingIdAString,"jwt"));
            assertEquals("404 NOT_FOUND \"BOOKING_NOT_FOUND\"", exception.getMessage());

    }

    @Test
    void acceptBooking_NOT_THE_OWNER(){

        BookingModel booking = new BookingModel();
        booking.setOwnerId(ownerObjectid);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn("hi");

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.acceptBooking(bookingIdAString,token));

            assertEquals("403 FORBIDDEN \"not allowed\"", exception.getMessage());
        }
    }


    @Test
    void acceptBooking_PROPERTY(){
        BookingModel booking = new BookingModel();
        booking.setPropertyId(propertyId);
        booking.setOwnerId(ownerObjectid);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.empty());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.acceptBooking(bookingIdAString,token));

            assertEquals("404 NOT_FOUND \"PROPERTY_NOT_FOUND\"", exception.getMessage());
        }
    }

    @Test
    void acceptBooking_BLOCKED(){
        final String start = "2025-12-17";
        final String end = "2025-12-27";
        final Instant startInstant = Instant.parse(start + "T00:00:00.000Z");
        final Instant endInstant = Instant.parse(end+"T00:00:00.000Z");

        BookingModel booking = new BookingModel();
        booking.setPropertyId(propertyId);
        booking.setOwnerId(ownerObjectid);

        booking.setStartDate(startInstant);
        booking.setEndDate(endInstant);

        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        PropertyModel property = new PropertyModel();
        Instant _20th_dec_2025 = Instant.parse("2025-12-20T00:00:00.000Z");
        Instant _21st_dec_2025 = Instant.parse("2025-12-21T00:00:00.000Z");

        Set<Instant> blockedDates = new HashSet<>();
        blockedDates.add(_21st_dec_2025);
        blockedDates.add(_20th_dec_2025);
        property.setBlockedDates(blockedDates);
        
        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.of(property));

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.acceptBooking(bookingIdAString,token));

            assertEquals("409 CONFLICT \"DATE CONFLICT\"", exception.getMessage());
        }
    }

    @Test
    void acceptBooking(){
        final String start = "2025-12-22";
        final String end = "2025-12-27";
        final Instant startInstant = Instant.parse(start + "T00:00:00.000Z");
        final Instant endInstant = Instant.parse(end+"T00:00:00.000Z");
        BookingModel booking = new BookingModel();
        booking.setPropertyId(propertyId);
        booking.setOwnerId(ownerObjectid);
        booking.setId(new ObjectId(bookingIdAString));

        booking.setStartDate(startInstant);
        booking.setEndDate(endInstant);

        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        PropertyModel property = new PropertyModel();
        Instant _20th_dec_2025 = Instant.parse("2025-12-20T00:00:00.000Z");
        Instant _21st_dec_2025 = Instant.parse("2025-12-21T00:00:00.000Z");

        Set<Instant> blockedDates = new HashSet<>();
        blockedDates.add(_21st_dec_2025);
        blockedDates.add(_20th_dec_2025);
        property.setBlockedDates(blockedDates);
        
        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.of(property));

            bookingService.acceptBooking(bookingIdAString, token);

            verify(bookingRepo, times(1)).save(booking);
            verify(propertyRepo, times(1)).save(property);
        }
    }
}
