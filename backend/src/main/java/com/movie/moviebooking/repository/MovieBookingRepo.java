package com.movie.moviebooking.repository;

import com.movie.moviebooking.entity.MovieBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieBookingRepo extends MongoRepository<MovieBooking, String> {
    List<MovieBooking> findByUsername(String username);
    List<MovieBooking> findByMovieNameAndShowTime(String movieName, String showTime);
} 