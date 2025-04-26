package com.example.demo.bookingServiceTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
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
import com.example.demo.booking.DTO.AddBookingHandler;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.booking.bookingCMRS.service.BookingService;
import com.example.demo.email.IEmailService;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AddBookingTests {
    @Mock BookingRepo bookingRepo;
    @Mock PropertyRepo propertyRepo;
    @Mock UserRepository userRepository;
    @Mock IEmailService emailService;
    @InjectMocks BookingService bookingService;


    @Test
    void AddBookingTest_HOST_BOOKING(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-03-15");
        newBooking.setEnd("2025-03-16");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",1);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("host");

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("403 FORBIDDEN \"HOSTS_CANNOT_BOOK\"", exception.getMessage());

        }
    }

    @Test
    void AddBookingTest_START_DATE_IN_THE_PAST(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-03-15");
        newBooking.setEnd("2025-03-16");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",1);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("425 TOO_EARLY \"START_DATE_IS_IN_PAST\"", exception.getMessage());

        }
    }

    @Test
    void AddBookingTest_END_DATE_IS_BEFORE_START(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-12-25");
        newBooking.setEnd("2025-12-24");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",1);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("425 TOO_EARLY \"END_DATE_IS_BEFORE_START\"", exception.getMessage());

        }
    }

    @Test
    void AddBookingTest_TOO_MANY_GUESTS(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-12-25");
        newBooking.setEnd("2025-12-27");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",2);
        guests.put("childCount",1);
        newBooking.setGuests(guests);

        PropertyModel property = new PropertyModel();
        property.setMaxGuests(2);
        

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            when(propertyRepo.findById(new ObjectId(newBooking.getPropertyId()))).thenReturn(Optional.of(property));
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("400 BAD_REQUEST \"TOO_MANY\"", exception.getMessage());

        }
    }


    @Test
    void AddBookingTest_TOO_FEW_GUESTS(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-12-25");
        newBooking.setEnd("2025-12-27");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",2);
        guests.put("childCount",1);
        newBooking.setGuests(guests);

        PropertyModel property = new PropertyModel();
        property.setMinGuests(4);
    
        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            when(propertyRepo.findById(new ObjectId(newBooking.getPropertyId()))).thenReturn(Optional.of(property));
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("400 BAD_REQUEST \"TOO_FEW\"", exception.getMessage());

        }
    }

    @Test
    void AddBookingTest_PRICE_MISMATCH(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-12-25");
        newBooking.setEnd("2025-12-27");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",2);
        guests.put("childCount",1);
        newBooking.setGuests(guests);
        newBooking.setFrontendPrice(5);

        PropertyModel property = new PropertyModel();
        property.setMinGuests(3);
        property.setMaxGuests(3);
        property.setPricePerNight(50);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            when(propertyRepo.findById(new ObjectId(newBooking.getPropertyId()))).thenReturn(Optional.of(property));
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("409 CONFLICT \"PRICE_MISMATCH\"", exception.getMessage());

        }
    }

    @Test
    void AddBookingTest_DATE_CONFLICT(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart("2025-12-17");
        newBooking.setEnd("2025-12-27");
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",2);
        guests.put("childCount",1);
        newBooking.setGuests(guests);
        newBooking.setFrontendPrice(50*10);

        PropertyModel property = new PropertyModel();
        property.setMinGuests(3);
        property.setMaxGuests(3);
        property.setPricePerNight(50);
        Instant _20th_dec_2025 = Instant.parse("2025-12-20T00:00:00.000Z");
        Instant _21st_dec_2025 = Instant.parse("2025-12-21T00:00:00.000Z");

        Set<Instant> blockedDates = new HashSet<>();
        blockedDates.add(_21st_dec_2025);
        blockedDates.add(_20th_dec_2025);
        property.setBlockedDates(blockedDates);

        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
            .thenReturn("customer");

            when(propertyRepo.findById(new ObjectId(newBooking.getPropertyId()))).thenReturn(Optional.of(property));
            Throwable exception = assertThrows(ResponseStatusException.class, 
            () -> bookingService.addBooking(newBooking,"jwt"));
            assertEquals("409 CONFLICT \"BOOKING_CONFLICT\"", exception.getMessage());

        }
    }


    @Test
    void AddBookingTest(){
        final ObjectId propertyId = new ObjectId("67d19f119222aa4f889fa092");
        final ObjectId ownerId = new ObjectId("67b877cbe8ddf130ce69924a");
        final String ownerIdString = "67b877cbe8ddf130ce69924a";
        final String guestIdString = "67b85d62e8ddf130ce699241";
        final ObjectId guestId = new ObjectId("67b85d62e8ddf130ce699241");
        final String start = "2025-12-22";
        final String end = "2025-12-27";
        final Instant startInstant = Instant.parse(start + "T00:00:00.000Z");
        final Instant endInstant = Instant.parse(end+"T00:00:00.000Z");

        final String propertyIdString = "67d19f119222aa4f889fa092";
        AddBookingHandler newBooking = new AddBookingHandler();
        newBooking.setPropertyId(propertyIdString);
        newBooking.setStart(start);
        newBooking.setEnd(end);
        Map<String, Integer> guests = new HashMap<>();
        guests.put("adultCount",2);
        guests.put("childCount",1);
        guests.put("petCount",0);
        newBooking.setGuests(guests);
        newBooking.setFrontendPrice(50*5);

        UserModel userOwner = new UserModel();
        userOwner.setEmail("email@email.com");


        PropertyModel property = new PropertyModel();
        property.setOwnerId(ownerId);
        property.setMinGuests(3);
        property.setMaxGuests(3);
        property.setPricePerNight(50);
        Instant _20th_dec_2025 = Instant.parse("2025-12-20T00:00:00.000Z");
        Instant _21st_dec_2025 = Instant.parse("2025-12-21T00:00:00.000Z");

        Set<Instant> blockedDates = new HashSet<>();
        blockedDates.add(_21st_dec_2025);
        blockedDates.add(_20th_dec_2025);
        property.setBlockedDates(blockedDates);

        BookingModel bm = new BookingModel();
        bm.setPropertyId(new ObjectId(newBooking.getPropertyId()));
        bm.setGuestId(guestId);
        bm.setOwnerId(ownerId);
        bm.setStartDate(startInstant);
        bm.setEndDate(endInstant);
        bm.setNumChildren(newBooking.getGuests().get("childCount"));
        bm.setNumAdults(newBooking.getGuests().get("adultCount"));
        bm.setNumPets(newBooking.getGuests().get("petCount"));
        bm.setTotalCost(50*5);
        bm.setAccepted(false);
        bm.setCancelled(false);
        bm.setReviewed(false);


        try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
            jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken(guestIdString))
            .thenReturn("customer");
            jwtProvider.when(() -> JwtProvider.getIdFromJwtToken(guestIdString))
            .thenReturn(guestIdString);

            when(propertyRepo.findById(new ObjectId(newBooking.getPropertyId()))).thenReturn(Optional.of(property));
            when(userRepository.findById(ownerId)).thenReturn(Optional.of(userOwner));
            bookingService.addBooking(newBooking, guestIdString);
            verify(bookingRepo, times(1)).save(bm);

        }
    }
    
    
}
