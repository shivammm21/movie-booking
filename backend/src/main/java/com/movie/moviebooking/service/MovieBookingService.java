package com.movie.moviebooking.service;

import com.movie.moviebooking.entity.MovieBooking;
import com.movie.moviebooking.repository.MovieBookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieBookingService {

    @Autowired
    private MovieBookingRepo movieBookingRepo;

    public MovieBooking bookMovie(String movieName, List<String> selectedSeats, String showTime, double totalAmount, String username) {
        // Check if seats are already booked for this movie and show time
        List<MovieBooking> existingBookings = movieBookingRepo.findByMovieNameAndShowTime(movieName, showTime);
        
        for (MovieBooking booking : existingBookings) {
            for (String seat : booking.getSelectedSeats()) {
                if (selectedSeats.contains(seat)) {
                    throw new RuntimeException("Seat " + seat + " is already booked");
                }
            }
        }

        // Create new booking
        MovieBooking booking = new MovieBooking(movieName, selectedSeats, showTime, totalAmount, username);
        return movieBookingRepo.save(booking);
    }

    public List<MovieBooking> getUserBookings(String username) {
        return movieBookingRepo.findByUsername(username);
    }

    public List<MovieBooking> getAllBookings() {
        return movieBookingRepo.findAll();
    }
} 