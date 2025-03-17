package com.moviebooking.controller;

import com.moviebooking.model.User;
import com.moviebooking.repository.UserRepository;
import com.moviebooking.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

record LoginRequest(
    String username,
    String password
) {}

record RegisterRequest(
    String username,
    String email,
    String password
) {}

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        log.info("Attempting to register user: {}", request.username());
        try {
            // Check if username exists
            if (userRepository.existsByUsername(request.username())) {
                log.warn("Username already taken: {}", request.username());
                return ResponseEntity.badRequest().body("Username is already taken");
            }

            // Check if email exists
            if (userRepository.existsByEmail(request.email())) {
                log.warn("Email already registered: {}", request.email());
                return ResponseEntity.badRequest().body("Email is already registered");
            }

            // Create new user
            User user = new User();
            user.setUsername(request.username());
            user.setEmail(request.email());
            user.setPassword(passwordEncoder.encode(request.password()));
            user.setRole("USER");

            // Save user to MongoDB
            userRepository.save(user);
            log.info("Successfully registered user: {}", request.username());

            return ResponseEntity.ok("User registered successfully");
        } catch (DuplicateKeyException e) {
            log.error("Duplicate key error while registering user: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Username or email already exists");
        } catch (Exception e) {
            log.error("Error registering user: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtTokenUtil.generateToken(user);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login error: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }
} 