package com.cookquest.ingredient.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.cookquest.ingredient.entities.Ingredient;
import com.cookquest.ingredient.services.IngredientService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@Controller
@RequestMapping("ingredient")
@RequiredArgsConstructor
public class IngredientController {
    private static final Logger logger = LoggerFactory.getLogger(IngredientController.class);

    @Autowired
    private IngredientService ingredientService;

    /**
     * Gets all ingredients in the database
     * 
     * @return ResponseEntity of all ingredients in the database
     */
    @GetMapping("all")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        logger.info("Fetching all ingredients");
        List<Ingredient> ingredients = this.ingredientService.findAllIngredients();
        logger.debug("Found {} ingredients.", ingredients.size());
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    /**
     * Gets all ingredients for a user
     * 
     * @param userId - String
     * @return ResponseEntity of all ingredients for a user
     */
    @GetMapping("{userId}")
    public ResponseEntity<List<Ingredient>> getIngredientById(@PathVariable String userId) {
        logger.info("Fetching ingredients for user: {}", userId);
        List<Ingredient> userIngredients = this.ingredientService.findAllIngredientsByUserId(userId);
        if (!userIngredients.isEmpty()) {
            logger.debug("Found {} ingredients for user: {}", userIngredients.size(), userId);
            return new ResponseEntity<>(userIngredients, HttpStatus.OK);
        } else {
            logger.warn("No ingredients found for user: {}", userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Adds an ingredient to the database
     * 
     * @param ingredient - Ingredient
     * @return ResponseEntity of the added ingredient
     */
    @PostMapping("add")
    public ResponseEntity<Ingredient> postIngredient(@RequestBody Ingredient ingredient) {
        logger.info("Attempting to add ingredient: {}", ingredient);
        if (ingredient.getEntryId() == null) {
            Ingredient savedIngredient = this.ingredientService.saveIngredient(ingredient);
            logger.debug("Ingredient saved with ID: {}", savedIngredient.getEntryId());
            return new ResponseEntity<>(savedIngredient, HttpStatus.OK);
        } else {
            logger.warn("Failed to add ingredient with existing entry ID: {}", ingredient.getEntryId());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Updates an ingredient in the database
     * 
     * @param updatedIngredient - Ingredient
     * @return ResponseEntity of the updated ingredient
     */
    @PutMapping("update")
    public ResponseEntity<Ingredient> updateIngredient(@RequestBody Ingredient updatedIngredient) {
        logger.info("Attempting to update ingredient with ID: {}", updatedIngredient.getIngredientId());
        Optional<Ingredient> oldIngredient = this.ingredientService
                .findAllIngredientsByUserId(updatedIngredient.getUserId()).stream()
                .filter(item -> item.getIngredientId().equals(updatedIngredient.getIngredientId())).findFirst();
        if (oldIngredient.isPresent()) {
            Ingredient putIngredient = oldIngredient.get();
            putIngredient.setIngredientAmount(updatedIngredient.getIngredientAmount());
            putIngredient.setIngredientLabel(updatedIngredient.getIngredientLabel());
            logger.debug("Updated ingredient with ID: {}", updatedIngredient.getIngredientId());
            return new ResponseEntity<>(this.ingredientService.saveIngredient(putIngredient), HttpStatus.OK);
        } else {
            logger.warn("No ingredient found to update with ID: {}", updatedIngredient.getIngredientId());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Hard deletes an ingredient from the database
     * 
     * @param body - Map<String, String> of format {
     *             userId: String,
     *             ingredientId: String
     *             }
     * @return ResponseEntity
     */
    @DeleteMapping("delete")
    public ResponseEntity deleteIngredient(@RequestBody Map<String, String> body) {
        String userId = body.get("userId");
        String ingredientId = body.get("ingredientId");
        logger.info("Attempting to delete ingredient with ID: {} for user: {}", ingredientId, userId);
        List<Ingredient> userIngredients = this.ingredientService.findAllIngredientsByUserId(userId);
        Optional<Ingredient> optionalIngredient = userIngredients.stream()
                .filter(ingredient -> ingredient.getIngredientId().equals(ingredientId)).findFirst();
        if (optionalIngredient.isPresent()) {
            this.ingredientService.hardDeleteIngredient(optionalIngredient.get().getEntryId());
            logger.debug("Deleted ingredient with ID: {}", ingredientId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("Failed to delete ingredient with ID: {} for user: {}", ingredientId, userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Soft deletes all of a user's ingredients
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @DeleteMapping("delete/user/{userId}")
    public ResponseEntity deleteIngredientsForUser(@PathVariable String userId) {
        logger.info("Attempting to soft delete all ingredients for user: {}", userId);
        if (!ingredientService.findAllIngredientsByUserId(userId).isEmpty()) {
            ingredientService.deleteIngredientsByUserId(userId);
            logger.debug("Soft deleted all ingredients for user: {}", userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("No ingredients found to soft delete for user: {}", userId);
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Reactivates all of a user's ingredients
     * 
     * @param userId - String
     * @return ResponseEntity
     */
    @PutMapping("activate/user/{userId}")
    public ResponseEntity activateIngredientsByUser(@PathVariable String userId) {
        logger.info("Attempting to reactivate all ingredients for user: {}", userId);
        if (!ingredientService.findAllIngredientsByUserId(userId).isEmpty()) {
            ingredientService.activateIngredientsByUserId(userId);
            logger.debug("Reactivated all ingredients for user: {}", userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            logger.warn("No ingredients found to reactivate for user: {}", userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
