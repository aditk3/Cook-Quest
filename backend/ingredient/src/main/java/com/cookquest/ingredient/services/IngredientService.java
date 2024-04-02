package com.cookquest.ingredient.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cookquest.ingredient.entities.Ingredient;
import com.cookquest.ingredient.repositories.IngredientRepository;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient saveIngredient(Ingredient ingredient) {
        // Check if an ingredient with the same userId and ingredientId already exists
        List<Ingredient> existingIngredients = this.ingredientRepository.findByUserIdAndIngredientId(
                ingredient.getUserId(), ingredient.getIngredientId());

        if (existingIngredients.isEmpty()) {
            return this.ingredientRepository.save(ingredient);
        } else {
            return existingIngredients.get(0);
        }
    }

    public List<Ingredient> findAllIngredients() {
        return this.ingredientRepository.findAll();
    }

    public List<Ingredient> findAllIngredientsByUserId(String id) {
        return this.ingredientRepository.findByUserId(id);
    }

    public Optional<Ingredient> findIngredientByEntryId(Long id) {
        return this.ingredientRepository.findById(id);
    }

    public void hardDeleteIngredient(Long id) {
        this.ingredientRepository.deleteById(id);
    }

    public void hardDeleteIngredientsByUser(String userId) {
        List<Ingredient> ingredientList = this.findAllIngredientsByUserId(userId);
        this.ingredientRepository.deleteAll(ingredientList);
    }

    // Soft Delete
    public void deleteIngredient(Long id) {
        Ingredient ingredient = this.ingredientRepository.findById(id).get();
        ingredient.setIngredientActive(false);
        this.ingredientRepository.save(ingredient);
    }

    // Soft Delete
    public void deleteIngredientsByUserId(String userId) {
        List<Ingredient> ingredientList = this.findAllIngredientsByUserId(userId);
        for (Ingredient ingredient : ingredientList) {
            this.deleteIngredient(ingredient.getEntryId());
        }
    }

    // Account reactivation
    public void activateIngredient(Long id) {
        Ingredient ingredient = this.ingredientRepository.findById(id).get();
        ingredient.setIngredientActive(true);
        this.ingredientRepository.save(ingredient);
    }

    // Reactivates all recipes when an account is reactivated
    public void activateIngredientsByUserId(String userId) {
        List<Ingredient> ingredientList = this.findAllIngredientsByUserId(userId);
        for (Ingredient ingredient : ingredientList) {
            this.activateIngredient(ingredient.getEntryId());
        }
    }
}