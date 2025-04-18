// package com.example.demo.updateTests;

// import static org.mockito.Mockito.when;

// import java.util.ArrayList;
// import java.util.List;

// import org.bson.types.ObjectId;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// import com.example.demo.booking.bookingCMRS.model.BookingModel;
// import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
// import com.example.demo.property.propertycmrs.repository.PropertyRepo;
// import com.example.demo.user.userCMRS.repository.UserRepository;
// import com.example.demo.user.userCMRS.service.update.UserUpdateService;

// @ExtendWith(MockitoExtension.class)
// public class Anonymise {
    
//     @Mock private UserRepository userRepository;
//     @Mock private PropertyRepo propertyRepo;
//     @Mock private BookingRepo bookingRepo;
//     @InjectMocks UserUpdateService userUpdateService;

//     final ObjectId userId = new ObjectId("67b85d62e8ddf130ce699241");

//     @Test
//     void anonymiseReviews(){
//         BookingModel booking1 = new BookingModel();
//         //BookingModel booking2 = new BookingModel();

//         List<BookingModel> bookings =  new ArrayList<>();

//         bookings.add(booking1);

//         when(bookingRepo.findBookingByGuestId(userId)).thenReturn(bookings);

//         userUpdateService.anonymiseReviews(userId);

        
        

        
//     }
// }
