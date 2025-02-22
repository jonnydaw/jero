package com.example.demo.user.userCMRS.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.user.userCMRS.model.RefreshModel;

@Repository
public interface RefreshRepository extends MongoRepository<RefreshModel,ObjectId> {
    RefreshModel findRefreshById(ObjectId id);
}