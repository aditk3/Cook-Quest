package com.cookquest.recipe.services;

import com.cookquest.recipe.entities.Recipe;
import com.cookquest.recipe.repositories.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeService recipeService;

    private Recipe activeRecipe;
    private Recipe inactiveRecipe;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        activeRecipe = Recipe.builder()
                .recipeId(1L)
                .recipeName("Test Recipe")
                .recipeIngredients("Ingredient 1, Ingredient 2")
                .recipeInstructions("Step 1, Step 2")
                .userId("user123")
                .recipeActive(true)
                .build();

        inactiveRecipe = Recipe.builder()
                .recipeId(2L)
                .recipeName("Inactive Recipe")
                .recipeIngredients("Ingredient A, Ingredient B")
                .recipeInstructions("Step A, Step B")
                .userId("user456")
                .recipeActive(false)
                .build();

        when(recipeRepository.findById(1L)).thenReturn(Optional.of(activeRecipe));
        when(recipeRepository.findById(2L)).thenReturn(Optional.of(inactiveRecipe));
        when(recipeRepository.findAll()).thenReturn(List.of(activeRecipe, inactiveRecipe));
        when(recipeRepository.save(any(Recipe.class))).thenReturn(activeRecipe);
        when(recipeRepository.findByUserId("user123")).thenReturn(List.of(activeRecipe));
        when(recipeRepository.findByUserId("user456")).thenReturn(List.of(inactiveRecipe));
    }

    @Test
    void shouldFindAllRecipes() {
        List<Recipe> returnedRecipes = recipeService.findAllRecipes();

        assertNotNull(returnedRecipes);
        assertTrue(returnedRecipes.contains(activeRecipe));
        assertTrue(returnedRecipes.contains(inactiveRecipe));
    }

    @Test
    void shouldSaveRecipe() {
        Recipe savedRecipe = recipeService.saveRecipe(activeRecipe);

        assertNotNull(savedRecipe);
        assertEquals(activeRecipe, savedRecipe);
        verify(recipeRepository).save(activeRecipe);
    }

    @Test
    void shouldFindAllRecipesByUserId() {
        List<Recipe> recipesByUserId = recipeService.findAllRecipesByUserId("user123");

        assertNotNull(recipesByUserId);
        assertTrue(recipesByUserId.contains(activeRecipe));
        assertFalse(recipesByUserId.contains(inactiveRecipe));
    }

    @Test
    void shouldFindRecipeById() {
        Optional<Recipe> foundRecipe = recipeService.findRecipeById(1L);

        assertTrue(foundRecipe.isPresent());
        assertEquals(activeRecipe, foundRecipe.get());
    }

    @Test
    void shouldHardDeleteRecipe() {
        recipeService.hardDeleteRecipe(1L);

        verify(recipeRepository).deleteById(1L);
    }

    @Test
    void shouldHardDeleteRecipesByUserId() {
        recipeService.hardDeleteRecipesByUserId("user456");

        verify(recipeRepository, times(1)).delete(inactiveRecipe);
    }

    @Test
    void shouldSoftDeleteRecipe() {
        recipeService.deleteRecipe(1L);

        verify(recipeRepository).save(activeRecipe);
        assertFalse(activeRecipe.isRecipeActive());
    }

    @Test
    void shouldSoftDeleteRecipesByUserId() {
        recipeService.deleteRecipesByUserId("user123");

        verify(recipeRepository, times(1)).save(activeRecipe);
        assertFalse(activeRecipe.isRecipeActive());
    }

    @Test
    void shouldActivateRecipe() {
        recipeService.activateRecipe(1L);

        verify(recipeRepository).save(activeRecipe);
        assertTrue(activeRecipe.isRecipeActive());
    }

    @Test
    void shouldActivateRecipesByUserId() {
        recipeService.activateRecipesByUserId("user456");

        verify(recipeRepository, times(1)).save(inactiveRecipe);
        assertTrue(inactiveRecipe.isRecipeActive());
    }
}
