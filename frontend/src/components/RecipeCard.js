import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import Recipe from '../entities/Recipe';
import { addRecipe, deleteRecipeForUser } from '../apiCalls/cqAPI';
import AuthContext from '../contexts';

// const RecipeTags = (props) => {
//     return (
//         props.tagsList.map(tag => <button key={tag} type="button" className="btn btn-sm btn-outline-dark me-1">{tag}</button>)
//     );
// };
const RecipeCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(props.recipe.favorite);
    const { user, isLoggedIn } = useContext(AuthContext);

    const toggleFavorites = () => {
        if (!isFavorited) {
            if (isLoggedIn) {
                setIsFavorited(true);
                addRecipe(user.email, props.recipe, user.credential)
                    .then(resp => { console.log(resp); props.recipe.id = resp.recipeId; })
                    .catch(err => { setIsFavorited(false); console.log(err); });
            }
            else {
                alert("You need to log in to save a favorite recipe");
            }
        }
        else {
            deleteRecipeForUser(props.recipe.id, user.credential)
                .then(resp => console.log(resp))
                .then(setIsFavorited(false))
                .catch(err => console.log(err));
        }
    };

    const toggleDesc = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="card" className="card text-start" >
            {/* <div id="cardImg" className="img-fluid card-img-top">
                <img src={props.recipe.imgLink} />
            </div> */}
            <div className="card-body">
                <h1
                    id="title"
                    className="card-title"
                    data-bs-toggle="modal"
                    data-bs-target="#recipe-modal"
                    onClick={() => props.modalFunc(props.recipe)}
                >{props.recipe.title}</h1>
                {/* <h6 id="cookTime" className="card-subtitle">Time to cook: {props.recipe.timeToCook}</h6> */}
                <h6 id="ingredients" className="card-subtitle">Ingredients:</h6>
                <p className={"card-text text-muted " + (isOpen ? "openDesc" : "closedDesc")} onClick={toggleDesc}>{props.recipe.ingredients}</p>
            </div>
            <div id="footer" className="card-footer">
                <div id="footerRow" className="row">
                    {/* <p className="col">Reviews: {props.recipe.reviews} </p> */}
                    <div id="icon" data-testid="icon" className="col text-end" onClick={toggleFavorites}>
                        {isFavorited ? <HeartFill size={30} /> : <Heart size={30} />}
                    </div>
                </div>
                {/* <div id="tags">
                    <RecipeTags tagsList={props.recipe.tagsList} />
                </div> */}
            </div>
        </div>
    );
};

RecipeCard.propTypes = {
    modalFunc: PropTypes.func,
    recipe: PropTypes.instanceOf(Recipe)
};

export default RecipeCard;