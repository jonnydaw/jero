package com.example.demo.user.userCMRS.service.update;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.model.ReviewsType;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.user.DTO.UpdatePrivacyHandler;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;
import com.example.demo.user.userCMRS.service.authentication.IUserAuthService;

@Service
public class UserUpdateService  implements IUserUpdateService{
    @Autowired private UserRepository userRepository;
    @Autowired private PropertyRepo propertyRepo;
    @Autowired private BookingRepo bookingRepo;

    @Override
    public void updateUserFirstName(String firstName, String token) {
        UserModel user = getUser(token);
        user.setFirstName(firstName);
        userRepository.save(user);
    }

    @Override
    public void updateUserLastName(String lastName, String token) {
        UserModel user = getUser(token);
        //dry violation???
        user.setLastName(lastName);
        userRepository.save(user);
    }

    @Override
    public void updateUserIntroduction(String introduction, String token) {
        UserModel user = getUser(token);
        user.setIntroduction(introduction);
        userRepository.save(user);
    }

    @Override
    public void updateImageUrl(String imageUrl, String token) {
        UserModel user = getUser(token);
        user.setProfileImgUrl(imageUrl);
        userRepository.save(user);
    }

    private UserModel getUser(String token) {
        String id =  JwtProvider.getIdFromJwtToken(token);
        UserModel user = userRepository.findById(new ObjectId(id)).get();
        return user;
    }

    @Override
    public Map<String,String> getUpdatableFields(String token){
        UserModel user = getUser(token);
        Map<String, String> fieldsToVal = new HashMap<>();
        fieldsToVal.put("firstName",user.getFirstName());
        fieldsToVal.put("lastName", user.getLastName());
        fieldsToVal.put("introduction",user.getIntroduction());
        fieldsToVal.put("profileImgUrl",user.getProfileImgUrl());
        return fieldsToVal;
        // user.getFirstName();
        // user.getLastName();
        // user.getIntroduction();
        // user.getProfileImgUrl();

    }

    @Override
    public Map<String, Boolean> getPrivacySettings(String token) {
        UserModel user = getUser(token);
        return user.getPrivacy();
        //return user.getPrivacy();
    }

    @Override
    public void updatePrivacySettings(String token, UpdatePrivacyHandler newSettings) {
        UserModel user = getUser(token);
        Map<String ,Boolean> newSettingMaps = new HashMap<>();
       if(user.getPrivacy().get("review") && !newSettings.isShowNameOnReviews() ){
            anonymiseReviews(user.getId());
        }
        newSettingMaps.put("review",newSettings.isShowNameOnReviews());
        newSettingMaps.put("profile",newSettings.isShowProfileAfterBooking());
        newSettingMaps.put("analysis",newSettings.isAllowAnalysisOnBookings());
        user.setPrivacy(newSettingMaps);
        userRepository.save(user);
        
    }
            
    private void anonymiseReviews(ObjectId userID) {
        List<BookingModel> bookings = bookingRepo.findBookingByGuestId(userID);
        // System.out.println("bookings: " + bookings.size());
        //Set<PropertyModel> propertiesGuestHasReviewed = new HashSet<>();
        //  = new ArrayList<>();
        Set<ObjectId> uniqueProperties = new HashSet<>();
        for(BookingModel booking : bookings){
            if(booking.isReviewed()){
                ObjectId propertyID = booking.getPropertyId();
               Optional<PropertyModel> property = propertyRepo.findById(propertyID);
                // System.out.println("hit1");
                if(!property.isPresent()){
                    continue;
                }
                else{
                    if(uniqueProperties.contains(property.get().getId())) continue;
                    PropertyModel propertyRealised = property.get();
                    List<ReviewsType> reviews = propertyRealised.getReviews().get(userID.toHexString());
                    for(ReviewsType review : reviews){
                        review.setUserName("anonymous");
                    }
                    Map<String, List<ReviewsType>> currentReviews = propertyRealised.getReviews();
                    currentReviews.put(userID.toHexString(), reviews);
                    propertyRealised.setReviews(currentReviews);
                    propertyRepo.save(propertyRealised);

                }
                //propertiesGuestHasReviewed.add()
            }
        }
        // if(!reviews.isEmpty() && property.isPresent()){
        //     PropertyModel prop = property.get();

        //     propertyRepo.save(property.get());

        // }
    }



}
