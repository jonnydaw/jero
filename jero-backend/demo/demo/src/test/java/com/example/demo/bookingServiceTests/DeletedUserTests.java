package com.example.demo.bookingServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
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
public class DeletedUserTests {
    
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
    void handleDeletedUserBooking_HOST(){

        BookingModel booking = new BookingModel();
        booking.setOwnerId(ownerObjectid);
        booking.setPropertyId(propertyId);

        List<BookingModel> bookings = new ArrayList<>();
        bookings.add(booking);
        

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken(token))
            .thenReturn("host");


            bookingService.handleDeletedUserBooking(token, bookings);

            assertNotEquals(booking.getOwnerId(), ownerObjectid);
            assertNotEquals(booking.getPropertyId(), propertyId);
            assertEquals(booking.getPropertyId(), new ObjectId("67f6ae5881ebbd6dc69897e1"));
            assertEquals(booking.getOwnerId(), new ObjectId("67f6b00b81ebbd6dc69897e5"));

        
        }
    }

    @Test
    void handleDeletedUserBooking_CUSTOMER(){

        BookingModel booking = new BookingModel();
        booking.setGuestId(guestObjectId);
        //booking.setPropertyId(propertyId);

        List<BookingModel> bookings = new ArrayList<>();
        bookings.add(booking);
        

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken(token))
            .thenReturn("customer");


            bookingService.handleDeletedUserBooking(token, bookings);

            assertNotEquals(booking.getGuestId(), guestObjectId);
            assertEquals(booking.getGuestId(), new ObjectId("67f6b00b81ebbd6dc69897e5"));

        
        }
    }
}
