import React, { useContext, useEffect, useState } from 'react';
import Recipe from '../entities/Recipe';
import RecipeContainer from '../components/RecipeContainer';
import { getRecipesByUserId } from '../apiCalls/cqAPI';
import AuthContext from '../contexts';

const FavoritesPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      getRecipesByUserId(user.email, user.credential)
        .then(resp => {
          setRecipeList(resp.map(recipe => {
            return new Recipe(recipe.recipeId, recipe.recipeName, recipe.recipeIngredients, recipe.recipeInstructions, true);
          }));
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center" id='favorites-container'>
      <h2 className="mb-1 text-center">Favorites</h2>
      {loading && <div className="pt-4 d-flex justify-content-center">
        <div className="spinner"></div>
      </div>}
      {/* Filtering the recipes as favorites will be left to a GET request */}
      <RecipeContainer recipes={recipeList} />
    </div>
  );
};

export default FavoritesPage;