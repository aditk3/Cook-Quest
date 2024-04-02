package com.cookquest.user.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cookquest.user.entities.User;
import com.cookquest.user.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> findAllUsers() {
        return this.userRepository.findAll();
    }

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }

    public Optional<User> findUserById(String userId) {
        return this.userRepository.findById(userId);
    }

    // Soft Delete
    public void deleteUser(String userId) {
        User account = this.userRepository.findById(userId).get();
        account.setAccountActive(false);
        this.userRepository.save(account);
    }

    // Account reactivation
    public void activateUser(String userId) {
        User account = this.userRepository.findById(userId).get();
        account.setAccountActive(true);
        this.userRepository.save(account);
    }

    // Hard Delete
    public void hardDeleteUser(String userId) {
        this.userRepository.deleteById(userId);
    }

    // Possibly add update user?
}
