package com.cookquest.recipe.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cookquest.recipe.entities.Recipe;
import com.cookquest.recipe.services.RecipeService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@Controller
@RequestMapping("recipe")
@RequiredArgsConstructor
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    /**
     * Gets all recipes in the database
     * 
     * @return ResponseEntity of all recipes in the database
     */
    @GetMapping("all")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        logger.info("Fetching all recipes");
        List<Recipe> recipes = this.recipeService.findAllRecipes();
        logger.debug("Found {} recipes.", recipes.size());
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    /**
     * Gets a recipe by its id
     * 
     * @param recipeId - Long
     * @return ResponseEntity of a recipe
     */
    @GetMapping("{userId}")
    public ResponseEntity<List<Recipe>> getRecipes(@PathVariable String userId) {
        logger.info("Fetching recipes for user: {}", userId);
        List<Recipe> resp = this.recipeService.findAllRecipesByUserId(userId);
        if (!resp.isEmpty()) {
            logger.debug("Found {} recipes for user: {}", resp.size(), userId);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } else {
            logger.warn("No recipes found for user: {}", userId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Adds a recipe to the database
     * 
     * @param recipe - Recipe object of format {
     *               recipeName: String,
     *               recipeIngredients: String,
     *               recipeIngredients: String,
     *               userId: String
     *               }
     * @return ResponseEntity
     */
    @PostMapping("add")
    public ResponseEntity<Recipe> postRecipe(@RequestBody Recipe recipe) {
        logger.info("Attempting to add recipe: {}", recipe);
        if (recipe.getRecipeId() == null) {
            Recipe savedRecipe = this.recipeService.saveRecipe(recipe);
            logger.debug("Recipe saved with ID: {}", savedRecipe.getRecipeId());
            return new ResponseEntity<>(savedRecipe, HttpStatus.OK);
        } else {
            logger.warn("Failed to add recipe with existing recipe ID: {}", recipe.getRecipeId());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Hard deletes a recipe from the database
     * 
     * @param recipeId - Long
     * @return ResponseEntity
     */
    @DeleteMapping("delete/{recipeId}")
    public ResponseEntity deleteRecipe(@PathVariable Long recipeId) {
        logger.info("Attempting to delete recipe with ID: {}", recipeId);
        if (recipeService.findRecipeById(recipeId).isPresent()) {
            recipeService.hardDeleteRecipe(recipeId);
            logger.debug("Deleted recipe with ID: {}", recipeId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("Failed to delete recipe with ID: {}", recipeId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Soft deletes all of a user's recipes after deactivation
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @DeleteMapping("delete/user/{userId}")
    public ResponseEntity deleteRecipe(@PathVariable String userId) {
        logger.info("Attempting to soft delete all recipes for user: {}", userId);
        recipeService.deleteRecipesByUserId(userId);
        logger.debug("Soft deleted all recipes for user: {}", userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Reactivates all of a user's recipes after reactivation
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @PutMapping("activate/user/{userId}")
    public ResponseEntity activateRecipesByUser(@PathVariable String userId) {
        logger.info("Attempting to reactivate all recipes for user: {}", userId);
        recipeService.activateRecipesByUserId(userId);
        logger.debug("Reactivated all recipes for user: {}", userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
