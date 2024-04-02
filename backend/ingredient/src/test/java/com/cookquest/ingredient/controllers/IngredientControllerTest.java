package com.cookquest.ingredient.controllers;

import com.cookquest.ingredient.entities.Ingredient;
import com.cookquest.ingredient.services.IngredientService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Tag("omit-cloud-build")
@WebMvcTest(IngredientController.class)
class IngredientControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IngredientService ingredientService;

    private static List<Ingredient> ingredients;

    @BeforeAll
    static void setUp() {
        ingredients = new ArrayList<>();
        ingredients.add(new Ingredient(1L, "user1", "ingredient1", "Salt", 0.25, true));
        ingredients.add(new Ingredient(2L, "user1", "ingredient2", "Pepper", 0.1, true));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void callingAll_getsAllIngredientsWithStatusOK() throws Exception {
        when(ingredientService.findAllIngredients()).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].ingredientLabel").value("Salt"))
                .andExpect(jsonPath("$[1].ingredientLabel").value("Pepper"));
        verify(ingredientService, times(1)).findAllIngredients();
    }

    @Test
    void callingUserId_getsIngredientsForUserIdWithStatusOK() throws Exception {
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/user1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].ingredientLabel").value("Salt"))
                .andExpect(jsonPath("$[1].ingredientLabel").value("Pepper"));
        verify(ingredientService, times(1)).findAllIngredientsByUserId("user1");
    }

    @Test
    void callingInvalidUserId_returnsStatusBadRequest() throws Exception {
        List<Ingredient> emptyList = new ArrayList<>();
        when(ingredientService.findAllIngredientsByUserId("invalidUser")).thenReturn(emptyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/invalidUser"))
                .andExpect(status().isBadRequest());
        verify(ingredientService, times(1)).findAllIngredientsByUserId("invalidUser");
    }

    @Test
    void addingIngredientWithNullId_postsIngredientWithStatusOK() throws Exception {
        Ingredient ingredient = new Ingredient(null, "user1", "newIngredient", "Sugar", 0.5, true);
        when(ingredientService.saveIngredient(any(Ingredient.class))).thenReturn(ingredient);
        mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(ingredient)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredientLabel").value("Sugar"));
        verify(ingredientService, times(1)).saveIngredient(any(Ingredient.class));
    }

    @Test
    void addingIngredientWithNonNullId_postsIngredientWithStatusBadRequest() throws Exception {
        Ingredient ingredient = new Ingredient(1L, "user1", "existingIngredient", "Salt", 0.25, true);
        mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(ingredient)))
                .andExpect(status().isBadRequest());
        verify(ingredientService, never()).saveIngredient(any(Ingredient.class));
    }

    @Test
    void updatingIngredient_updatesIngredientWithStatusOK() throws Exception {
        Ingredient updatedIngredient = new Ingredient(1L, "user1", "ingredient1", "Sea Salt", 0.2, true);
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        when(ingredientService.saveIngredient(any(Ingredient.class))).thenReturn(updatedIngredient);
        mockMvc.perform(MockMvcRequestBuilders.put("/ingredient/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(updatedIngredient)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredientLabel").value("Sea Salt"));
        verify(ingredientService, times(1)).saveIngredient(any(Ingredient.class));
    }

    @Test
    void updatingIngredientWithInvalidId_returnsStatusBadRequest() throws Exception {
        Ingredient updatedIngredient = new Ingredient(3L, "user1", "nonExistingIngredient", "New Ingredient", 0.1, true);
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.put("/ingredient/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(updatedIngredient)))
                .andExpect(status().isBadRequest());
        verify(ingredientService, never()).saveIngredient(any(Ingredient.class));
    }

    @Test
    void deletingIngredientWithValidId_hardDeletesIngredientWithStatusOK() throws Exception {
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.delete("/ingredient/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(Map.of("userId", "user1", "ingredientId", "ingredient1"))))
                .andExpect(status().isOk());
        verify(ingredientService, times(1)).hardDeleteIngredient(1L);
    }

    @Test
    void deletingIngredientWithInvalidId_returnsStatusBadRequest() throws Exception {
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.delete("/ingredient/delete")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(Map.of("userId", "user1", "ingredientId", "nonExistingIngredient"))))
                .andExpect(status().isBadRequest());
        verify(ingredientService, never()).hardDeleteIngredient(anyLong());
    }

    @Test
    void deletingAllIngredientsForUserId_softDeletesIngredientsWithStatusOK() throws Exception {
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.delete("/ingredient/delete/user/user1"))
                .andExpect(status().isOk());
        verify(ingredientService, times(1)).deleteIngredientsByUserId("user1");
    }

    @Test
    void activatingAllIngredientsForUserId_activatesIngredientsWithStatusOK() throws Exception {
        when(ingredientService.findAllIngredientsByUserId("user1")).thenReturn(ingredients);
        mockMvc.perform(MockMvcRequestBuilders.put("/ingredient/activate/user/user1"))
                .andExpect(status().isOk());
        verify(ingredientService, times(1)).activateIngredientsByUserId("user1");
    }
}