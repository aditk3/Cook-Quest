package com.cookquest.recipe.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cookquest.recipe.entities.Recipe;
import com.cookquest.recipe.repositories.RecipeRepository;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> findAllRecipes() {
        return this.recipeRepository.findAll();
    }

    public Recipe saveRecipe(Recipe recipe) {
        return this.recipeRepository.save(recipe);
    }

    public List<Recipe> findAllRecipesByUserId(String userId) {
        return this.recipeRepository.findByUserId(userId);
    }

    public Optional<Recipe> findRecipeById(Long id) {
        return this.recipeRepository.findById(id);
    }

    public void hardDeleteRecipe(Long id) {
        this.recipeRepository.deleteById(id);
    }

    // Hard Delete
    public void hardDeleteRecipesByUserId(String userId) {
        List<Recipe> recipeList = this.findAllRecipesByUserId(userId);
        for (Recipe recipe : recipeList) {
            this.recipeRepository.delete(recipe);
        }
    }

    // Soft Delete
    public void deleteRecipe(Long id) {
        Recipe recipe = this.recipeRepository.findById(id).get();
        recipe.setRecipeActive(false);
        this.recipeRepository.save(recipe);
    }

    // Soft Delete
    public void deleteRecipesByUserId(String userId) {
        List<Recipe> recipeList = this.findAllRecipesByUserId(userId);
        for (Recipe recipe : recipeList) {
            this.deleteRecipe(recipe.getRecipeId());
        }
    }

    // Account reactivation
    public void activateRecipe(Long id) {
        Recipe recipe = this.recipeRepository.findById(id).get();
        recipe.setRecipeActive(true);
        this.recipeRepository.save(recipe);
    }

    // Reactivates all recipes when an account is reactivated
    public void activateRecipesByUserId(String userId) {
        List<Recipe> recipeList = this.findAllRecipesByUserId(userId);
        for (Recipe recipe : recipeList) {
            this.activateRecipe(recipe.getRecipeId());
        }
    }
}
