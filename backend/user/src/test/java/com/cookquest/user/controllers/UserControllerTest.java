package com.cookquest.user.controllers;

import com.cookquest.user.entities.User;
import com.cookquest.user.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Tag("omit-cloud-build")
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private static User testUser;

    @BeforeAll
    static void setUp() {
        testUser = new User("testUserId", "Test User", "test.jpg", true);
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void callingAll_getsAllUsersWithStatusOK() throws Exception {
        when(userService.findAllUsers()).thenReturn(Arrays.asList(testUser));
        mockMvc.perform(MockMvcRequestBuilders.get("/user/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").value("testUserId"))
                .andExpect(jsonPath("$[0].displayName").value("Test User"))
                .andExpect(jsonPath("$[0].profilePictureUrl").value("test.jpg"))
                .andExpect(jsonPath("$[0].accountActive").value(true));
        verify(userService, times(1)).findAllUsers();
    }

    @Test
    void callingUserId_getsUserForValidIdWithStatusOK() throws Exception {
        when(userService.findUserById("testUserId")).thenReturn(Optional.of(testUser));
        mockMvc.perform(MockMvcRequestBuilders.get("/user/testUserId"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("testUserId"))
                .andExpect(jsonPath("$.displayName").value("Test User"))
                .andExpect(jsonPath("$.profilePictureUrl").value("test.jpg"))
                .andExpect(jsonPath("$.accountActive").value(true));
        verify(userService, times(1)).findUserById("testUserId");
    }

    @Test
    void callingUserId_getsUserForInvalidIdWithStatusNotFound() throws Exception {
        when(userService.findUserById("invalidUserId")).thenReturn(Optional.empty());
        mockMvc.perform(MockMvcRequestBuilders.get("/user/invalidUserId"))
                .andExpect(status().isNotFound());
        verify(userService, times(1)).findUserById("invalidUserId");
    }

    @Test
    void addingUserWithNonNullId_postsUserWithStatusOK() throws Exception {
        when(userService.saveUser(any(User.class))).thenReturn(testUser);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("testUserId"))
                .andExpect(jsonPath("$.displayName").value("Test User"))
                .andExpect(jsonPath("$.profilePictureUrl").value("test.jpg"))
                .andExpect(jsonPath("$.accountActive").value(true));
        verify(userService, times(1)).saveUser(any(User.class));
    }

    @Test
    void addingUserWithNullId_postsUserWithStatusBadRequest() throws Exception {
        User userWithNullId = new User(null, "Test User", "test.jpg", true);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userWithNullId)))
                .andExpect(status().isBadRequest());
        verify(userService, never()).saveUser(any(User.class));
    }

    @Test
    void deactivatingUserWithValidId_deactivatesUserWithStatusOK() throws Exception {
        when(userService.findUserById("testUserId")).thenReturn(Optional.of(testUser));
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/delete/testUserId"))
                .andExpect(status().isOk());
        verify(userService, times(1)).findUserById("testUserId");
        verify(userService, times(1)).deleteUser("testUserId");
    }

    @Test
    void deactivatingUserWithInvalidId_returnsStatusBadRequest() throws Exception {
        when(userService.findUserById("testUserId")).thenReturn(Optional.empty());
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/delete/testUserId"))
                .andExpect(status().isBadRequest());
        verify(userService, times(1)).findUserById("testUserId");
        verify(userService, never()).deleteUser("testUserId");
    }

    @Test
    void activatingUserWithValidId_activatesUserWithStatusOk() throws Exception {
        when(userService.findUserById("testUserId")).thenReturn(Optional.of(testUser));
        mockMvc.perform(MockMvcRequestBuilders.put("/user/activate/testUserId"))
                .andExpect(status().isOk());
        verify(userService, times(1)).findUserById("testUserId");
        verify(userService, times(1)).activateUser("testUserId");
    }

    @Test
    void activatingUserWithInvalidId_returnsStatusBadRequest() throws Exception {
        when(userService.findUserById("testUserId")).thenReturn(Optional.empty());
        mockMvc.perform(MockMvcRequestBuilders.put("/user/activate/testUserId"))
                .andExpect(status().isBadRequest());
        verify(userService, times(1)).findUserById("testUserId");
        verify(userService, never()).activateUser("testUserId");
    }

}
