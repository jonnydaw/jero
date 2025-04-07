package com.example.demo.user.DTO;

import lombok.Data;

@Data
public class UpdateHostPrivacyHandler {
    private boolean showProfileOnPropertyPage;
    private boolean showProfileAfterBooking;
    private boolean allowAnalysisOnBookings;
}
