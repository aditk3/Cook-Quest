import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
// import Recipe from '../entities/Recipe';
import PropTypes from 'prop-types';
import RecipeModal from './RecipeModal';
import Recipe from '../entities/Recipe';

const RecipeContainer = (props) => {
    const [recipeIn, setRecipeIn] = useState(new Recipe(-1, "", "", "", false));
    return (
        <div data-testid="recipe-container" className="container">
            <RecipeModal recipe={recipeIn} />
            <div className="row">
                {props.recipes.map(recipe =>
                    <div title="Card" key={recipe.id} id="cardContainer" className="col-md-4 col-xs-2 my-3">
                        <RecipeCard recipe={recipe} modalFunc={setRecipeIn}/>
                    </div>)}
            </div>
        </div>
    );
};

RecipeContainer.propTypes = {
    recipes: PropTypes.instanceOf(Array)
};

export default RecipeContainer;