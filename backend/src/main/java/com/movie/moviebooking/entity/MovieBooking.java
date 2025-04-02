package com.movie.moviebooking.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movieBookings")
public class MovieBooking {
    @Id
    private String id;
    private String movieName;
    private List<String> selectedSeats;
    private String showTime;
    private double totalAmount;
    private String username; // to track who made the booking

    public MovieBooking() {
    }

    public MovieBooking(String movieName, List<String> selectedSeats, String showTime, double totalAmount, String username) {
        this.movieName = movieName;
        this.selectedSeats = selectedSeats;
        this.showTime = showTime;
        this.totalAmount = totalAmount;
        this.username = username;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

    public void setSelectedSeats(List<String> selectedSeats) {
        this.selectedSeats = selectedSeats;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
} 