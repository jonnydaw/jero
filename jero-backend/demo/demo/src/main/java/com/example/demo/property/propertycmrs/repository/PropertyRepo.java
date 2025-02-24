package com.example.demo.property.propertycmrs.repository;

import org.springframework.stereotype.Repository;

import com.example.demo.property.propertycmrs.model.PropertyModel;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


@Repository
public interface PropertyRepo extends MongoRepository<PropertyModel,ObjectId> {
    
}
