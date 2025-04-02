package com.movie.moviebooking.controller;

import com.movie.moviebooking.entity.UserData;
import com.movie.moviebooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserData user = userService.registerUser(
                request.get("username"),
                request.get("email"),
                request.get("password")
            );
            
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", user);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }
        
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserData user = userService.loginUser(
                request.get("usernameOrEmail"),
                request.get("password")
            );
            
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", user);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
        }
        
        return response;
    }
} 