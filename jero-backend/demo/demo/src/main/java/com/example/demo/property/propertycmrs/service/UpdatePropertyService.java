package com.example.demo.property.propertycmrs.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.booking.bookingCMRS.service.IBookingService;
import com.example.demo.property.propertycmrs.DTO.types.AmentiesHandler;
import com.example.demo.property.propertycmrs.DTO.types.OverviewData;
import com.example.demo.property.propertycmrs.DTO.types.Step3Data;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;


@Service
public class UpdatePropertyService implements IUpdatePropertyService{

    @Autowired private PropertyRepo propertyRepo;
    @Autowired private IBookingService bookingService;
    @Autowired private IPropertyService propertyService;
    @Autowired private BookingRepo bookingRepo;

    @Override
    public List<String> getPropertyImages(String token, String propertyId) {
        PropertyModel property = getProperty(token, propertyId);
        return property.getImageUrls();
    }

    @Override
    public void updatePropertyImages(String token, String propertyId, List<String> newImgs, PropertyModel property ) {
        property = getProperty(token, propertyId);

        property.setImageUrls(newImgs);
        propertyRepo.save(property);
    }

    @Override
    public Step3Data getGuestManagement(String token, String propertyId){
        PropertyModel property = getProperty(token, propertyId);
        Step3Data data = new Step3Data();
        System.out.println(property.getPricePerNight());
        BeanUtils.copyProperties(property, data);
        System.out.println("ppn " + data.getPricePerNight());
        return data;
    }

    @Override
    public void updateStep3Data( String token, String propertyId, Step3Data newStep3, PropertyModel property){
        property = getProperty(token, propertyId);

        BeanUtils.copyProperties(newStep3, property);
        propertyRepo.save(property);
        //System.out.println(property.getPricePerNight());
    }

    @Override
    public AmentiesHandler getAmenties(String token, String propertyId, AmentiesHandler res){
        PropertyModel property = getProperty(token, propertyId);

        BeanUtils.copyProperties(property, res);
        System.out.println("menties " + res.toString());
        return res;
    }

    @Override
    public void updateAmenities(String token, String propertyId, AmentiesHandler newAmenities, PropertyModel propertyModel){
        PropertyModel property = getProperty(token, propertyId);

        BeanUtils.copyProperties(newAmenities, property);
        //property.setBeautyData(null);
        propertyRepo.save(property);

    }


    @Override
        public OverviewData getDescriptions(String token, String propertyId,  OverviewData res){
            PropertyModel property = getProperty(token, propertyId);
            System.out.println(property.getDescription());
            res.setPropertyDescription(property.getDescription());
            res.setPropertyGuide(property.getGuide());
            res.setPropertyRules(property.getRules());
            res.setPropertyTitle(property.getTitle());
            // BeanUtils.copyProperties(property, res);
            //System.out.println("description " + res.toString());
            return res;
        }



    @Override
    public void updateDescriptions(String token, String propertyId,  OverviewData res, PropertyModel propertyModel){
        PropertyModel property = getProperty(token, propertyId);
        property.setDescription(res.getPropertyDescription());
        System.out.println("desc " + res.getPropertyDescription());
        property.setGuide(res.getPropertyGuide());
        property.setTitle(res.getPropertyTitle());
        property.setRules(res.getPropertyRules());
        propertyRepo.save(property);
    }

    @Override
    public void deleteProperty(String token, String propertyId){
        PropertyModel property = getProperty(token, propertyId);
        Map<String,List<BookingModel>> bookings = bookingRepo.getBookingsFromPropertyId(propertyId);
        List<BookingModel> currentBookings = bookings.get("present");
        if(currentBookings != null && currentBookings.size() > 0){
         throw new ResponseStatusException(HttpStatus.CONFLICT, "ongoing booking" );
        }
        List<BookingModel> futureBookings = bookings.get("future");
        for(BookingModel futureBooking : futureBookings){
         if(futureBooking.isAccepted() && !futureBooking.isCancelled()){
             throw new ResponseStatusException(HttpStatus.CONFLICT, "cancel booking before deletion" );
         }
        }

        List<BookingModel> combinedBookings = Stream.concat(bookings.get("past").stream(), bookings.get("future").stream())
        .collect(Collectors.toList());
      //  System.out.println("hit here urgent");
        bookingService.deletedPropertyBooking(token, combinedBookings);
        propertyService.handlePropertiesDeletion(property);
          


    }

    private PropertyModel getProperty(String token, String propertyId) {
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        Optional<PropertyModel> optionalProperty = propertyRepo.findById(new ObjectId(propertyId));
        if(optionalProperty.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }

        PropertyModel property = optionalProperty.get();
        if(!property.getOwnerId().equals(new ObjectId(ownerId))){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "NOT_THE_OWNER");
        }
        return property;
    }


    
}
