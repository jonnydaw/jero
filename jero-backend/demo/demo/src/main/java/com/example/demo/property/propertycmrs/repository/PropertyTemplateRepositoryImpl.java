package com.example.demo.property.propertycmrs.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import static org.springframework.data.mongodb.core.query.Criteria.*;
import org.springframework.data.mongodb.core.query.Query;

import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

public class PropertyTemplateRepositoryImpl implements PropertyTemplateRepository {
    
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<PropertyModel> basicFilter(String location, Instant startDate, Instant endDate, int numGuests, boolean searchContainsChildren, boolean searchContainsPets){
        // https://stackoverflow.com/questions/26176548/spring-data-mongodb-date-range-query
        List<Criteria> criteria = new ArrayList<>();
        Query query = new Query();


        DBObject c1 = new BasicDBObject("blockedDates", null);
        DBObject c2 = BasicDBObjectBuilder.start().push("blockedDates").push("$not").
                                push("$elemMatch").add("$gte", startDate).add("$lte", endDate).get();
        Criteria dateCriterion = where("$or").is(Arrays.asList(c1, c2));
        criteria.add(dateCriterion);

        DBObject loc1 = new BasicDBObject("townId", location);
        DBObject loc2 = new BasicDBObject("cityDistrictId", location);
        DBObject loc3 = new BasicDBObject("cityId", location);
        DBObject loc4 = new BasicDBObject("countyId", location);
        DBObject loc5 = new BasicDBObject("stateId", location);
        DBObject loc6 = new BasicDBObject("countryId", location);
        Criteria locationCriterion = where("$or").is(Arrays.asList(loc1, loc2,loc3,loc4,loc5,loc6));
        criteria.add(locationCriterion);

        DBObject minGuests = BasicDBObjectBuilder.start().push("minGuests").
                                add("$lte", numGuests).get();
        DBObject maxGuests = BasicDBObjectBuilder.start().push("maxGuests").
                                add("$gte", numGuests).get();
        Criteria guestCriterion = where("$and").is(Arrays.asList(minGuests, maxGuests));
        criteria.add(guestCriterion);
        System.out.println("contains childre" + searchContainsChildren);

        if(searchContainsChildren){
            DBObject acC = new BasicDBObject("acceptsChildren", true);
            Criteria acceptChildren = where("$and").is(Arrays.asList(acC));
            criteria.add(acceptChildren);
        }

        if(searchContainsPets){
            DBObject acP = new BasicDBObject("acceptsPets", true);
            Criteria acceptPets = where("$and").is(Arrays.asList(acP));
            criteria.add(acceptPets);
        }



//https://stackoverflow.com/questions/45719225/specify-multiple-criterias-in-spring-mongo-db-query
        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        List<PropertyModel> properties = mongoTemplate.find(query, PropertyModel.class);
        System.out.println(properties.toString());
        return properties;

    }
}
