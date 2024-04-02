// URLs hidden for security
export const RECIPE_URL = "...";
export const EDAMAM_URL = "...";
export const BASE_URL_RECIPE = "...";
export const BASE_URL_USER = "...";
export const BASE_URL_INGREDIENT = "...";

/***        Recipe Bot        ***/
export const searchBotRecipes = (query) => {
    return fetch(RECIPE_URL,
        {
            method: "POST",
            body: JSON.stringify({ prompt: query, temp: 0.2, max_tokens: 1024, top_p: 0.9, top_k: 40 }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => resp.text());
};

/***        Edamam API      ***/
export const searchIngredient = (transformedInput) => {
    return fetch(`${EDAMAM_URL}${transformedInput}`)
        .then((response) => response.json());
};

/***        Recipe Database Endpoint        ***/
export const addRecipe = (userEmail, recipe, token) => {
    return fetch(`${BASE_URL_RECIPE}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                recipeName: recipe.title,
                recipeIngredients: recipe.ingredients,
                recipeInstructions: recipe.instructions,
                userId: userEmail
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json());
};

export const getRecipesByUserId = (userEmail, token) => {
    return fetch(`${BASE_URL_RECIPE}/${userEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json());
};

export const deleteRecipeForUser = (recipeId, token) => {
    return fetch(`${BASE_URL_RECIPE}/delete/${recipeId}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
};

// Not sure if this needs to be handled by react, should likely be an API client cascading call when user deactivate endpoint is called
// export const deactivateAllRecipesForUser = (userEmail) => {
//     return fetch(`${BASE_URL_RECIPE}/delete/user/${userEmail}`,
//         {
//             method: "DELETE"
//         })
//         .then(resp => resp.json());
// };

/***        User Database Endpoint      ***/
export const addUser = (user, token) => {
    return fetch(`${BASE_URL_USER}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
                displayName: user.name,
                profilePictureUrl: user.pictureUrl,
                accountActive: user.activeStatus
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json());
};

export const getUser = (userEmail, token) => {
    return fetch(`${BASE_URL_USER}/${userEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json());
};

export const deactivateUser = (userEmail, token) => {
    return fetch(`${BASE_URL_USER}/delete/${userEmail}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
};

/***        Ingredient Database Endpoint        ***/
export const addIngredient = (userEmail, ingredient, amount, token) => {
    return fetch(`${BASE_URL_INGREDIENT}/add`,
        {
            method: "POST",
            body: JSON.stringify({
                userId: userEmail,
                ingredientId: ingredient.id,
                ingredientLabel: ingredient.label,
                ingredientAmount: amount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .catch((err) => {
            console.log('hi' + err.message)
        })
};

export const getIngredientsByUserId = async (userEmail, token) => {
    return fetch(`${BASE_URL_INGREDIENT}/${userEmail}`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .catch((err)=> console.log(err.message))
};

export const deleteIngredientForUser = (userEmail, id, token) => {
    return fetch(`${BASE_URL_INGREDIENT}/delete`,
        {
            method: "DELETE",
            body: JSON.stringify({
                userId: userEmail,
                ingredientId: id,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
};

export const updateIngredient = (userEmail, ingredientId, label, amount, token) => {
    return fetch(`${BASE_URL_INGREDIENT}/update`,
        {
            method: "PUT",
            body: JSON.stringify({
                userId: userEmail,
                ingredientId: ingredientId,
                ingredientLabel: label,
                ingredientAmount: amount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json());
};