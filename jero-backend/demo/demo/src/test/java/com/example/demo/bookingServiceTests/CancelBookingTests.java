package com.example.demo.bookingServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
public class CancelBookingTests {
    
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
    void cancelBookingTest_NOT_OWNER(){
        BookingModel booking = new BookingModel();
        booking.setOwnerId(ownerObjectid);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn("hi");

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.empty());

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.deleteBooking(bookingIdAString,token));

            assertEquals("404 NOT_FOUND \"BOOKING_NOT_FOUND\"", exception.getMessage());
        }
    }

    @Test
    void cancelBookingTest_NOT_ALLOWED_NOT_THE_HOST(){
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
            () -> bookingService.deleteBooking(bookingIdAString,token));

            assertEquals("403 FORBIDDEN \"not allowed\"", exception.getMessage());
        }
    }

    @Test
    void cancelBookingTest_NOT_ALLOWED_NOT_THE_GUEST(){
        BookingModel booking = new BookingModel();
        booking.setOwnerId(guestObjectId);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn("hi");

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            // when(propertyRepo.find)

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.deleteBooking(bookingIdAString,token));

            assertEquals("403 FORBIDDEN \"not allowed\"", exception.getMessage());
        }
    }

    @Test
    void cancelBookingTest_PROPERTY_NOT_FOUND(){
        BookingModel booking = new BookingModel();
        booking.setOwnerId(ownerObjectid);
        booking.setPropertyId(propertyId);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.empty());

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.deleteBooking(bookingIdAString,token));

            assertEquals("404 NOT_FOUND \"PROPERTY_NOT_FOUND\"", exception.getMessage());
        }
    }

    @Test
    void cancelBookingTest(){
        BookingModel booking = new BookingModel();
        booking.setOwnerId(ownerObjectid);
        booking.setPropertyId(propertyId);
        Instant _10th_dec_2025 = Instant.parse("2025-12-10T00:00:00.000Z");
        Instant _17th_dec_2025 = Instant.parse("2025-12-17T00:00:00.000Z");
        Instant _21st_dec_2025 = Instant.parse("2025-12-21T00:00:00.000Z");
        booking.setEndDate(_21st_dec_2025);
        booking.setStartDate(_17th_dec_2025);
        UserModel owner = new UserModel();
        owner.setId(ownerObjectid);

        PropertyModel property = new PropertyModel();
        Set<Instant> range = populateInstantRange(_10th_dec_2025, _21st_dec_2025);
        property.setBlockedDates(new HashSet<>(range));


        

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(token))
            .thenReturn(ownerId);

            when(bookingRepo.findById(new ObjectId(bookingIdAString)))
            .thenReturn(Optional.of(booking));

            when(propertyRepo.findById(booking.getPropertyId())).thenReturn(Optional.of(property));

            assertEquals(property.getBlockedDates(), range);
            bookingService.deleteBooking(bookingIdAString,token);
            assertNotEquals(property.getBlockedDates(), range);
        }
    }

        private Set<Instant> populateInstantRange(Instant start, Instant end) {
        Set<Instant> range = new HashSet<>();
        long days = ChronoUnit.DAYS.between(start, end);
        for(long day = 0; day < days; day++){
            range.add(start.plus(day, ChronoUnit.DAYS));
        }
        return range;
    }
}
