package com.example.demo.booking.bookingCMRS.repo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import static org.springframework.data.mongodb.core.query.Criteria.*;

import org.springframework.data.mongodb.core.query.Query;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

public class BookingTemplateRepositoryImpl implements BookingTemplateRepository {
    
    @Autowired MongoTemplate mongoTemplate;

    @Override
    public Map<String, List<BookingModel>>  getBookings(String token) {
        String role = JwtProvider.getRoleFromJwtToken(token);
        // System.out.println("role : " + role.length() + " - " + "customer".length() );
        String userTypeFieldName = role.equals("customer") ? "guestId" : "ownerId";
        // System.out.println("field name: " + role == "customer");
        String id = JwtProvider.getIdFromJwtToken(token);

        Map<String, List<BookingModel>> res = new HashMap<>();
        res.put("past", getPastBookings(userTypeFieldName, id));
        res.put("present", getCurrentBookings(userTypeFieldName, id));
        res.put("future", getFutureBookings(userTypeFieldName, id));


        return res;
    }

    private List<BookingModel> getPastBookings(String keyFieldName, String id) {
        List<Criteria> criteria = new ArrayList<>();
        Query query = new Query();

        DBObject pastBookings = BasicDBObjectBuilder.start().push("endDate").
                                add("$lt", LocalDate.now()).get();

                                // /67b8d989e8ddf130ce69926b
        Criteria pstCritierion = where("$and").is(Arrays.asList(pastBookings));
        criteria.add(pstCritierion);

        DBObject acP = new BasicDBObject(keyFieldName, new ObjectId(id));
            Criteria acceptPets = where("$and").is(Arrays.asList(acP));
            criteria.add(acceptPets);

        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        List<BookingModel> bookings = mongoTemplate.find(query, BookingModel.class);
        System.out.println("mongo template");
        System.out.println(bookings.toString());
        return bookings;
    }

    private List<BookingModel> getCurrentBookings(String keyFieldName, String id) {
        List<Criteria> criteria = new ArrayList<>();
        Query query = new Query();

        DBObject lower = BasicDBObjectBuilder.start().push("startDate").
                                add("$lte", LocalDate.now()).get();
        DBObject upper = BasicDBObjectBuilder.start().push("endDate").
          add("$gte", LocalDate.now()).get();
        
          DBObject status = new BasicDBObject("accepted", true);
          DBObject cancelled = new BasicDBObject("cancelled", false);

          Criteria isValid = where("$and").is(Arrays.asList(status, cancelled));
          criteria.add(isValid);


                                // /67b8d989e8ddf130ce69926b
        Criteria pstCritierion = where("$and").is(Arrays.asList(lower, upper));
        criteria.add(pstCritierion);

        DBObject underUser = new BasicDBObject(keyFieldName, new ObjectId(id));
            Criteria user = where("$and").is(Arrays.asList(underUser));
            criteria.add(user);

        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        List<BookingModel> bookings = mongoTemplate.find(query, BookingModel.class);
        System.out.println("mongo template");
        System.out.println(bookings.toString());
        return bookings;
    }

    private List<BookingModel> getFutureBookings(String keyFieldName, String id) {
        List<Criteria> criteria = new ArrayList<>();
        Query query = new Query();

        DBObject pastBookings = BasicDBObjectBuilder.start().push("startDate").
                                add("$gt", LocalDate.now()).get();
        System.out.println("user future: " + keyFieldName + " " + id);
        Criteria pstCritierion = where("$and").is(Arrays.asList(pastBookings));
        criteria.add(pstCritierion);

        DBObject acP = new BasicDBObject(keyFieldName, new ObjectId(id));
            Criteria acceptPets = where("$and").is(Arrays.asList(acP));
            criteria.add(acceptPets);

        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        List<BookingModel> bookings = mongoTemplate.find(query, BookingModel.class);
        System.out.println("mongo template");
        System.out.println(bookings.toString());
        return bookings;
    }

    

}
