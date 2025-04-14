package com.example.demo.booking.bookingCMRS.repo;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.booking.bookingCMRS.model.BookingModel;


@Repository
public interface BookingRepo extends MongoRepository<BookingModel, ObjectId>, BookingTemplateRepository{
	List<BookingModel> findBookingByOwnerId(ObjectId ownerId);
	List<BookingModel> findBookingByGuestId(ObjectId guestId);

} 

