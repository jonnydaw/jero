package com.example.demo.authServiceTests.deleteUserPrecursor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.example.demo.booking.bookingCMRS.service.BookingService;
import com.example.demo.property.propertycmrs.service.PropertyService;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.UserAuthService;

@ExtendWith(MockitoExtension.class)
public class DeleteUserPrecursorTests {
    
    @InjectMocks UserAuthService mockUserAuthService;

    @Mock BookingService bookingService;

    @Mock PropertyService propertyService;

    @Mock UserRepository userRepository;

    @Test
    void testDeleteUserPrecursor_Customer_ExpectFailOnCurrentBookings(){
        // https://www.baeldung.com/mockito-mock-static-methods
    try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
        jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
          .thenReturn("customer");
          jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
          .thenReturn("id");

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        List<BookingModel> currentBookings = new ArrayList<>();
        currentBookings.add(new BookingModel());
            
        bookings.put("present", currentBookings);
        bookings.put("past", new ArrayList<>());
        bookings.put("future", new ArrayList<>());

        when(bookingService.getBookings("jwt")).thenReturn(bookings);
        Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> mockUserAuthService.deleteUserPrecursor("jwt"));
        assertEquals("400 BAD_REQUEST \"ongoing booking\"", exception.getMessage());
        //https://stackoverflow.com/questions/12862659/how-to-verify-that-a-specific-method-was-not-called-using-mockito
        verify(userRepository, never()).deleteById(new ObjectId());
    }
    }

    @Test
    void testDeleteUserPrecursor_Host_ExpectFailOnCurrentBookings(){
        // https://www.baeldung.com/mockito-mock-static-methods
    try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
        jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
          .thenReturn("host");
          jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
          .thenReturn("id");

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        List<BookingModel> currentBookings = new ArrayList<>();
        currentBookings.add(new BookingModel());
            
        bookings.put("present", currentBookings);
        bookings.put("past", new ArrayList<>());
        bookings.put("future", new ArrayList<>());

        when(bookingService.getBookings("jwt")).thenReturn(bookings);
                Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> mockUserAuthService.deleteUserPrecursor("jwt"));
        assertEquals("400 BAD_REQUEST \"ongoing booking\"", exception.getMessage());
        verify(userRepository, never()).deleteById(new ObjectId());
    }
}

    @Test
    void testDeleteUserPrecursor_Customer_ExpectFailOnFutureBookings(){
        // https://www.baeldung.com/mockito-mock-static-methods
    try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
        jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
          .thenReturn("customer");
          jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
          .thenReturn("id");

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        BookingModel bm = new BookingModel();
        bm.setAccepted(true);
        bm.setCancelled(false);
        List<BookingModel> futureBookings = new ArrayList<>();
        futureBookings.add(bm);
            
        bookings.put("present", new ArrayList<>());
        bookings.put("past", new ArrayList<>());
        bookings.put("future", futureBookings);

        when(bookingService.getBookings("jwt")).thenReturn(bookings);
                Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> mockUserAuthService.deleteUserPrecursor("jwt"));
        assertEquals("400 BAD_REQUEST \"cancel booking before deletion\"", exception.getMessage());
        verify(userRepository, never()).deleteById(new ObjectId());
    }
    }

    @Test
    void testDeleteUserPrecursor_Host_ExpectFailOnFutureBookings(){
        // https://www.baeldung.com/mockito-mock-static-methods
    try(MockedStatic<JwtProvider> jwtProvider = Mockito.mockStatic(JwtProvider.class)) {
        jwtProvider.when(() -> JwtProvider.getRoleFromJwtToken("jwt"))
          .thenReturn("host");
          jwtProvider.when(() -> JwtProvider.getIdFromJwtToken("jwt"))
          .thenReturn("id");

        Map<String, List<BookingModel>> bookings = new HashMap<>();
        BookingModel bm = new BookingModel();
        bm.setAccepted(true);
        bm.setCancelled(false);
        List<BookingModel> futureBookings = new ArrayList<>();
        futureBookings.add(bm);
            
        bookings.put("present", new ArrayList<>());
        bookings.put("past", new ArrayList<>());
        bookings.put("future", futureBookings);

        when(bookingService.getBookings("jwt")).thenReturn(bookings);
                Throwable exception = assertThrows(ResponseStatusException.class, 
        () -> mockUserAuthService.deleteUserPrecursor("jwt"));
        assertEquals("400 BAD_REQUEST \"cancel booking before deletion\"", exception.getMessage());
        verify(userRepository, never()).deleteById(new ObjectId());
    }
    }
}
