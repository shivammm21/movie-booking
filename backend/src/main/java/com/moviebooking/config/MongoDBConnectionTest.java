package com.moviebooking.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MongoDBConnectionTest {

    private final MongoTemplate mongoTemplate;

    @EventListener(ApplicationReadyEvent.class)
    public void testConnection() {
        try {
            log.info("Testing MongoDB connection...");
            mongoTemplate.getDb().getName();
            log.info("Successfully connected to MongoDB database: {}", mongoTemplate.getDb().getName());
        } catch (Exception e) {
            log.error("Failed to connect to MongoDB: {}", e.getMessage());
            // Don't throw the exception, just log it
        }
    }
} 