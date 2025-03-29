package com.example.demo.property.propertycmrs.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import static org.springframework.data.mongodb.core.query.Criteria.*;
import org.springframework.data.mongodb.core.query.Query;

import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
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

    @Override
    public Set<PropertyModel> smartFilter(Instant startDate, Instant endDate, int numAdults, int numChildren,
            int numPets, List<String> attractions, String holidayType, String tourismLevels, int minTemp, int maxTemp) {
        
        
        
        List<Criteria> locCriteria = new ArrayList<>();
        Query locQuery = new Query();


        List<Criteria> criteria = new ArrayList<>();
        Query query = new Query();

        DBObject minTempDb = BasicDBObjectBuilder.start().push("temperature.8").
        add("$gte", minTemp).get();
        DBObject maxTempDb = BasicDBObjectBuilder.start().push("temperature.8").
                add("$lte", maxTemp).get();
        System.out.println(minTemp);
        System.out.println(maxTemp);
        Criteria tempCriterion = where("$and").is(Arrays.asList(minTempDb, maxTempDb));
        locCriteria.add(tempCriterion);
                System.out.println(attractions.toString());
        if(attractions != null && !attractions.isEmpty()){
                
            DBObject attractionsDb = BasicDBObjectBuilder.start().push("attractions").
                add("$all",attractions).get();
                Criteria attractionsCriterion = where("$and").is(Arrays.asList(attractionsDb));
                locCriteria.add(attractionsCriterion);
            }
            System.out.println(holidayType);
        if(holidayType != null && !holidayType.equals("any")){
            DBObject holidayTypeDb = new BasicDBObject("holidayType", holidayType);
            Criteria holidayTypeDbCriterion = where("$and").is(Arrays.asList(holidayTypeDb));
            locCriteria.add(holidayTypeDbCriterion);
        }
        System.out.println(tourismLevels);
        if(tourismLevels != null && !tourismLevels.equals("any") ){
            DBObject tourismLevelsDb = new BasicDBObject("tourismLevels", tourismLevels);
            Criteria tourismLevelsDbCriterion = where("$and").is(Arrays.asList(tourismLevelsDb));
            locCriteria.add(tourismLevelsDbCriterion);
        }
        
        

        // https://www.baeldung.com/mongodb-return-specific-fields
        locQuery.fields().include("_id");
        locQuery.addCriteria(new Criteria().andOperator(locCriteria.toArray(new Criteria[locCriteria.size()])));
        List<LocationModel> locations = mongoTemplate.find(locQuery, LocationModel.class);
        List<String> locationIds = new ArrayList<>();
        for(LocationModel location : locations){
            locationIds.add(location.getId());
            System.out.println(location.getId());
        }

        DBObject loc1 = BasicDBObjectBuilder.start().push("townId").
        add("$in",locationIds).get();
        DBObject loc2 = BasicDBObjectBuilder.start().push("cityDistrictId").
        add("$in",locationIds).get();
        DBObject loc3 = BasicDBObjectBuilder.start().push("cityId").
        add("$in",locationIds).get();
        DBObject loc4 = BasicDBObjectBuilder.start().push("countyId").
        add("$in",locationIds).get();
        DBObject loc5 = BasicDBObjectBuilder.start().push("stateId").
        add("$in",locationIds).get();
        DBObject loc6 = BasicDBObjectBuilder.start().push("countryId").
        add("$in",locationIds).get();




        // DBObject loc2 = new BasicDBObject("cityDistrictId", location);
        // DBObject loc3 = new BasicDBObject("cityId", location);
        // DBObject loc4 = new BasicDBObject("countyId", location);
        // DBObject loc5 = new BasicDBObject("stateId", location);
        // DBObject loc6 = new BasicDBObject("countryId", location);
        Criteria locationCriterion = where("$or").is(Arrays.asList(loc1, loc2,loc3,loc4,loc5,loc6));
        criteria.add(locationCriterion);



        DBObject c1 = new BasicDBObject("blockedDates", null);
        DBObject c2 = BasicDBObjectBuilder.start().push("blockedDates").push("$not").
                                push("$elemMatch").add("$gte", startDate).add("$lte", endDate).get();
        Criteria dateCriterion = where("$or").is(Arrays.asList(c1, c2));
        criteria.add(dateCriterion);

        DBObject minGuests = BasicDBObjectBuilder.start().push("minGuests").
                add("$lte", (numAdults + numChildren)).get();
        DBObject maxGuests = BasicDBObjectBuilder.start().push("maxGuests").
                add("$gte", numAdults + numChildren).get();
        Criteria guestCriterion = where("$and").is(Arrays.asList(minGuests, maxGuests));
        criteria.add(guestCriterion);

    
        if(numChildren > 0){
            DBObject acC = new BasicDBObject("acceptsChildren", true);
            Criteria acceptChildren = where("$and").is(Arrays.asList(acC));
            criteria.add(acceptChildren);
        }

        if(numPets > 0){
            DBObject acP = new BasicDBObject("acceptsPets", true);
            Criteria acceptPets = where("$and").is(Arrays.asList(acP));
            criteria.add(acceptPets);
        }



        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        List<PropertyModel> properties = mongoTemplate.find(query, PropertyModel.class);
        Set<PropertyModel> uniqueProperties = new HashSet<>(properties);
        System.out.println(properties.toString());
        return uniqueProperties;
    }
}
