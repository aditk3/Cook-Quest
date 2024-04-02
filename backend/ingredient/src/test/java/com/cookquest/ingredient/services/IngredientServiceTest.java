package com.cookquest.ingredient.services;

import com.cookquest.ingredient.entities.Ingredient;
import com.cookquest.ingredient.repositories.IngredientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IngredientServiceTest {

    @InjectMocks
    private IngredientService ingredientService;

    @Mock
    private IngredientRepository ingredientRepository;

    String userId;
    Ingredient ingredient1;
    Ingredient ingredient2;
    List<Ingredient> ingredients;

    @BeforeEach
    void setUp() {
        userId = "user1";
        ingredient1 = new Ingredient(1L, "user1", "ingredient1", "Salt", 0.25, true);
        ingredient2 = new Ingredient(2L, "user1", "ingredient2", "Pepper", 0.1, true);

        ingredients = new ArrayList<>();
        ingredients.add(ingredient1);
        ingredients.add(ingredient2);

        MockitoAnnotations.openMocks(this);
    }

    // test to check saveIngredient
    @Test
    void saveIngredient() {
        when(ingredientRepository.save(ingredient1)).thenReturn(ingredient1);

        Ingredient returnedIngredient = ingredientService.saveIngredient(ingredient1);

        assertEquals(ingredient1, returnedIngredient);
        verify(ingredientRepository, times(1)).save(ingredient1);

    }

    // test to check findAllIngredients
    @Test
    void findAllIngredients() {
        when(ingredientRepository.findAll()).thenReturn(ingredients);

        List<Ingredient> returnedIngredients = ingredientService.findAllIngredients();

        assertEquals(ingredients, returnedIngredients);
        verify(ingredientRepository, times(1)).findAll();
    }

    // test to check findAllIngredientsByUserId
    @Test
    void findAllIngredientsByUserId() {

        when(ingredientRepository.findByUserId(userId)).thenReturn(ingredients);

        List<Ingredient> returnedIngredients = ingredientService.findAllIngredientsByUserId(userId);

        assertEquals(ingredients, returnedIngredients);
        verify(ingredientRepository, times(1)).findByUserId(userId);
    }

    // test to check findIngredientByEntryId
    @Test
    void findIngredientByEntryId() {
        when(ingredientRepository.findById(1L)).thenReturn(Optional.ofNullable(ingredient1));

        Optional<Ingredient> returnedIngredient = ingredientService.findIngredientByEntryId(1L);

        assertEquals(ingredient1, returnedIngredient.get());
        verify(ingredientRepository, times(1)).findById(1L);
    }

    // test to check hardDeleteIngredient
    @Test
    void hardDeleteIngredient() {
        ingredientService.hardDeleteIngredient(ingredient1.getEntryId());
        verify(ingredientRepository, times(1)).deleteById(ingredient1.getEntryId());
    }

    // test to check hardDeleteIngredientsByUser
    @Test
    void hardDeleteIngredientsByUser() {
        when(ingredientService.findAllIngredientsByUserId(userId)).thenReturn(ingredients);
        ingredientService.hardDeleteIngredientsByUser(ingredient1.getUserId());
        verify(ingredientRepository, times(1)).deleteAll(ingredients);
    }

    // test to check deleteIngredient
    @Test
    void deleteIngredient() {
        when(ingredientRepository.findById(ingredient1.getEntryId()))
                .thenReturn(Optional.ofNullable(ingredient1));

        Ingredient updatedIngredient = ingredient1;
        updatedIngredient.setIngredientActive(false);

        when(ingredientRepository.save(updatedIngredient)).thenReturn(updatedIngredient);

        ingredientService.deleteIngredient(ingredient1.getEntryId());

        verify(ingredientRepository, times(1)).save(updatedIngredient);
    }

    //test to check deleteIngredientsByUserId
//    @Test
//    void deleteIngredientsByUserId() {
//        when(ingredientService.findAllIngredientsByUserId(userId))
//                .thenReturn(ingredients);
//
//        ingredientService.deleteIngredientsByUserId(userId);
//
//        verify(ingredientService, times(ingredients.size())).deleteIngredient(any());
//    }

     // test to check activateIngredient
     @Test
     void activateIngredient() {
         when(ingredientRepository.findById(ingredient1.getEntryId()))
                 .thenReturn(Optional.ofNullable(ingredient1));

         Ingredient updatedIngredient = ingredient1;
         updatedIngredient.setIngredientActive(true);

         when(ingredientRepository.save(updatedIngredient)).thenReturn(updatedIngredient);

         ingredientService.deleteIngredient(ingredient1.getEntryId());

         verify(ingredientRepository, times(1)).save(updatedIngredient);
     }

     // test to check activateIngredientsByUserId
//     @Test
//     void activateIngredientsByUserId() {
//        when(ingredientService.findAllIngredientsByUserId(userId))
//                .thenReturn(ingredients);
//
//         ingredientService.activateIngredientsByUserId(userId);
//
//         verify(ingredientService, times(ingredients.size())).activateIngredient(any());
//     }
}