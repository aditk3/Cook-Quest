import React from 'react';
import { RECIPE_URL, EDAMAM_URL, BASE_URL_RECIPE, BASE_URL_USER, BASE_URL_INGREDIENT, searchBotRecipes, searchIngredient, addRecipe, getRecipesByUserId, deleteRecipeForUser, addUser, getUser, deactivateUser, addIngredient, getIngredientsByUserId, deleteIngredientForUser, updateIngredient } from '../apiCalls/cqAPI';
import Recipe from "../entities/Recipe";
import User from "../entities/User";
import Ingredient from "../entities/Ingredient";

const token = "test";

beforeEach(() => {
    jest.resetAllMocks();
});

/***            Recipe Bot          ***/
it("should fetch a response from the bot API when searchBotRecipes is called", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                text: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const query = "Give me 2 recipes to make grilled cheese. I don't want links.";

    searchBotRecipes(query);
    expect(fetchSpy).toHaveBeenCalledWith(RECIPE_URL, {
        method: "POST",
        body: JSON.stringify({ prompt: query, temp: 0.2, max_tokens: 1024, top_p: 0.9, top_k: 40 }),
        headers: { 'Content-Type': 'application/json' }
    });
});

/***            Edamam          ***/
it("should fetch a response from the Edamam API when searchIngredients is called", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const inputValue = 'banana';

    searchIngredient(inputValue);
    expect(fetchSpy).toHaveBeenCalledWith(`${EDAMAM_URL}${inputValue}`);
});

/***            Recipe Endpoint         ***/
it("should be able to add recipes to the recipe database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";
    const mockRecipe = new Recipe(0, "test", "testIngredients", "testInstructions", false);

    addRecipe(mockEmail, mockRecipe, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_RECIPE}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                recipeName: mockRecipe.title,
                recipeIngredients: mockRecipe.ingredients,
                recipeInstructions: mockRecipe.instructions,
                userId: mockEmail
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
});

it("should be able to get recipes from the recipe database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";

    getRecipesByUserId(mockEmail, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_RECIPE}/${mockEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
});

it("should be able to delete recipes from the recipe database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve())
        );
    const mockRecipe = new Recipe(0, "test", "testIngredients", "testInstructions", false);

    deleteRecipeForUser(mockRecipe.id, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_RECIPE}/delete/${mockRecipe.id}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
});

/***            User Endpoint           ***/
it("should be able to add user to the user database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockUser = new User("test@test.com", "test", "test.img", true);

    addUser(mockUser, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_USER}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                userId: mockUser.id,
                displayName: mockUser.name,
                profilePictureUrl: mockUser.pictureUrl,
                accountActive: mockUser.activeStatus
            }),
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` }
        }
    );
});

it("should be able to get user from the user database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";

    getUser(mockEmail, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_USER}/${mockEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
});

it("should be able to deactivate user from the user database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve())
        );
    const mockEmail = "test@test.com";

    deactivateUser(mockEmail, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_USER}/delete/${mockEmail}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
});

/***            Ingredient Endpoint           ***/
it("should be able to add ingredient to the ingredient database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";
    const mockIngredient = new Ingredient("test", "test", "test", "test.img");
    const mockAmount = 1.3;

    addIngredient(mockEmail, mockIngredient, mockAmount, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_INGREDIENT}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                userId: mockEmail,
                ingredientId: mockIngredient.id,
                ingredientLabel: mockIngredient.label,
                ingredientAmount: mockAmount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
});

it("should be able to get ingredient from the ingredient database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";

    getIngredientsByUserId(mockEmail, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_INGREDIENT}/${mockEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
});

it("should be able to delete ingredient from the ingredient database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve())
        );
    const mockEmail = "test@test.com";
    const mockIngredientId = "test";

    deleteIngredientForUser(mockEmail, mockIngredientId, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_INGREDIENT}/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            userId: mockEmail,
            ingredientId: mockIngredientId,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
});

it("should be able to update ingredient in the ingredient database using endpoint", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                json: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    const mockEmail = "test@test.com";
    const mockIngredientId = "test";
    const mockIngredientLabel = "test";
    const mockAmount = 2.0;

    updateIngredient(mockEmail, mockIngredientId, mockIngredientLabel, mockAmount, token);
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL_INGREDIENT}/update`,
        {
            method: "PUT",
            body: JSON.stringify({
                userId: mockEmail,
                ingredientId: mockIngredientId,
                ingredientLabel: mockIngredientLabel,
                ingredientAmount: mockAmount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
});