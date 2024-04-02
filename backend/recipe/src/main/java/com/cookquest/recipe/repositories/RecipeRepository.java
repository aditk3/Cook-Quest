package com.cookquest.recipe.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cookquest.recipe.entities.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    public List<Recipe> findByUserId(String userId);
}
