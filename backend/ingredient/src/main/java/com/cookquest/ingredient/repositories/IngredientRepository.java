package com.cookquest.ingredient.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cookquest.ingredient.entities.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    public List<Ingredient> findByUserId(String userId);

    public List<Ingredient> findByUserIdAndIngredientId(String userId, String ingredientId);

}
