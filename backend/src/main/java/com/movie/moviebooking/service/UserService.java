package com.movie.moviebooking.service;

import com.movie.moviebooking.entity.UserData;
import com.movie.moviebooking.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public UserData registerUser(String username, String email, String password) {
        // Check if username already exists
        if (userRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Check if email already exists
        if (userRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user with plain password
        UserData user = new UserData(username, email, password);
        return userRepo.save(user);
    }

    public UserData loginUser(String usernameOrEmail, String password) {
        // Find user by username or email
        UserData user = userRepo.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if password matches directly
        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
