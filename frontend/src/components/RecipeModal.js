import React from 'react';
import PropTypes from 'prop-types';
import Recipe from '../entities/Recipe';

const RecipeModal = (props) => {
    return (
        <div className="modal fade" role="dialog" id="recipe-modal" >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="recipe-modal-title" data-testid="recipe-title">
                            {props.recipe.title}
                        </h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <h4 data-testid="ingredients-label">Ingredients:</h4>
                        <p id="description">{props.recipe.ingredients}</p>
                        <h4 data-testid="instructions-label">Instructions:</h4>
                        <p id="description">{props.recipe.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

RecipeModal.propTypes = {
    recipe: PropTypes.instanceOf(Recipe)
};

export default RecipeModal;
