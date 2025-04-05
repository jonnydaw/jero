package com.example.demo.user.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class UpdatePrivacyHandler {
    boolean showNameOnReviews;
    boolean showProfileAfterBooking;
    boolean allowAnalysisOnBookings;
}
