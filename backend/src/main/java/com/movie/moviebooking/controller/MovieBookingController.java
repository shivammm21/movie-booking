package com.movie.moviebooking.controller;

import com.movie.moviebooking.entity.MovieBooking;
import com.movie.moviebooking.service.MovieBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MovieBookingController {

    @Autowired
    private MovieBookingService movieBookingService;

    @PostMapping("/book")
    public Map<String, Object> bookMovie(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            MovieBooking booking = movieBookingService.bookMovie(
                (String) request.get("movieName"),
                (List<String>) request.get("selectedSeats"),
                (String) request.get("showTime"),
                Double.parseDouble(request.get("totalAmount").toString()),
                (String) request.get("username")
            );
            
            response.put("success", true);
            response.put("message", "Booking successful");
            response.put("booking", booking);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Booking failed: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/bookings/{username}")
    public Map<String, Object> getUserBookings(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<MovieBooking> bookings = movieBookingService.getUserBookings(username);
            response.put("success", true);
            response.put("bookings", bookings);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to get bookings: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/bookings")
    public Map<String, Object> getAllBookings() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<MovieBooking> bookings = movieBookingService.getAllBookings();
            response.put("success", true);
            response.put("bookings", bookings);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to get bookings: " + e.getMessage());
        }
        
        return response;
    }
} 