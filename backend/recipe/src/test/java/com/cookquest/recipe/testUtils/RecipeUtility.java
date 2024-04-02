package com.cookquest.recipe.testUtils;

import com.cookquest.recipe.entities.Recipe;

import java.util.ArrayList;
import java.util.List;

public class RecipeUtility {
    public static List<Recipe> getRecipes(){
        List<Recipe> recipes = new ArrayList<>();
        Recipe recipe1 = Recipe.builder()
                .recipeName("Chicken Parmesan")
                .recipeIngredients("Chicken, Parmesan, Tomato Sauce")
                .recipeInstructions("Cook Chicken, add sauce, add cheese, bake")
                .userId("ravi.kumar.ceo@cognizant.com")
                .build();
        Recipe recipe2 = Recipe.builder()
                .recipeName("Philly Cheesesteak")
                .recipeIngredients("Ground Beef, Cheese, Onions, Peppers")
                .recipeInstructions("Cook Beef, add cheese, add onions, add peppers, serve on bun")
                .userId("brain.humphries.ex_ceo@cognizant.com")
                .build();
        recipes.add(recipe1);
        recipes.add(recipe2);

        return recipes;
    }

    public static void main(String[] args) {
        getRecipes().forEach(System.out::println);
    }
}
