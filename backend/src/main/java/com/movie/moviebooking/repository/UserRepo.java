package com.movie.moviebooking.repository;

import com.movie.moviebooking.entity.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserData,String> {
    Optional<UserData> findByEmail(String email);
    Optional<UserData> findByUsername(String username);
    Optional<UserData> findByUsernameOrEmail(String username, String email);
}
