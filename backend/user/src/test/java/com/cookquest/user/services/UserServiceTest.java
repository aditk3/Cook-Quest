package com.cookquest.user.services;

import com.cookquest.user.entities.User;
import com.cookquest.user.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User activeUser;
    private User inactiveUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        activeUser = new User("test@example.com", "DisplayName", "http://profile.url", true);
        inactiveUser = new User("test@example.com", "DisplayName", "http://profile.url", false);

        when(userRepository.findById("test@example.com")).thenReturn(Optional.of(activeUser));
        when(userRepository.findAll()).thenReturn(Arrays.asList(activeUser, inactiveUser));
        when(userRepository.save(any(User.class))).thenReturn(activeUser);
    }

    @Test
    void shouldFindAllUsers() {
        Iterable<User> returnedUsers = userService.findAllUsers();

        assertNotNull(returnedUsers);
        assertTrue(((List<User>) returnedUsers).contains(activeUser));
        assertTrue(((List<User>) returnedUsers).contains(inactiveUser));
    }

    @Test
    void shouldSaveUser() {
        userService.saveUser(activeUser);

        verify(userRepository).save(activeUser);
    }

    @Test
    void shouldFindUserById() {
        Optional<User> foundUser = userService.findUserById("test@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getUserId());
    }

    @Test
    void shouldSoftDeleteUser() {
        when(userRepository.findById("test@example.com")).thenReturn(Optional.of(inactiveUser));

        userService.deleteUser("test@example.com");
        verify(userRepository).save(inactiveUser);
        assertFalse(inactiveUser.isAccountActive());
    }

    @Test
    void shouldReactivateUser() {
        userService.activateUser("test@example.com");

        verify(userRepository).save(activeUser);
        assertTrue(activeUser.isAccountActive());
    }

    @Test
    void shouldHardDeleteUser() {
        userService.hardDeleteUser("test@example.com");

        verify(userRepository).deleteById("test@example.com");
    }
}
