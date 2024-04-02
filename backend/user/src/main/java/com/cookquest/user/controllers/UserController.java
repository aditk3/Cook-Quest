package com.cookquest.user.controllers;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cookquest.user.entities.User;
import com.cookquest.user.services.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@Controller
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    /**
     * Gets all users in the database
     * 
     * @return ResponseEntity of all users in the database
     */
    @GetMapping("all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        logger.info("Fetching all users");
        Iterable<User> users = this.userService.findAllUsers();
        logger.debug("Returning all users");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Gets a user by its id
     * 
     * @param userId - Long
     * @return ResponseEntity of a user
     */
    @GetMapping("{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        logger.info("Fetching user with ID: {}", userId);
        Optional<User> resp = this.userService.findUserById(userId);
        if (resp.isPresent()) {
            logger.debug("Found user with ID: {}", userId);
            return new ResponseEntity<>(resp.get(), HttpStatus.OK);
        } else {
            logger.warn("No user found with ID: {}", userId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Adds a user to the database
     * 
     * @param user - User
     * @return ResponseEntity of the added user
     */
    @PostMapping("add")
    public ResponseEntity<User> postUser(@RequestBody User user) {
        logger.info("Attempting to add user");
        if (user.getUserId() != null) {
            User savedUser = this.userService.saveUser(user);
            logger.debug("User saved with ID: {}", savedUser.getUserId());
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } else {
            logger.warn("Failed to add user with missing user ID");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Soft deletes a user by its id
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @DeleteMapping("delete/{userId}")
    public ResponseEntity deactivateUser(@PathVariable String userId) {
        logger.info("Attempting to deactivate user with ID: {}", userId);
        if (userService.findUserById(userId).isPresent()) {
            userService.deleteUser(userId);
            logger.debug("Deactivated user with ID: {}", userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("Failed to deactivate user with ID: {}", userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Activates a user by its id
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @PutMapping("activate/{userId}")
    public ResponseEntity activateUser(@PathVariable String userId) {
        logger.info("Attempting to activate user with ID: {}", userId);
        if (userService.findUserById(userId).isPresent()) {
            userService.activateUser(userId);
            logger.debug("Activated user with ID: {}", userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("Failed to activate user with ID: {}", userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // No hard delete endpoint ...yet
}
