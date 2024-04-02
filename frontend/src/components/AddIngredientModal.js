import React, { useState, useEffect } from 'react';
import { Camera, Image, LightningCharge } from 'react-bootstrap-icons';
import Ingredient from '../entities/Ingredient';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { searchIngredient, addIngredient } from '../apiCalls/cqAPI';

const AddIngredientModal = (props) => {
    const [usePhotoEntry, setUsePhotoEntry] = useState(true);
    const [ingredientsInputText, setIngredientsInputText] = useState('');
    // const [userIngredients, setUserIngredients] = useState([]);
    const [quickAddActive, setQuickAddActive] = useState(false);
    const [error, setError] = useState(false);
    const [transformedInput, setTransformedInput] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        if (transformedInput != ''){
            // console.log(transformedInput)
            searchIngredient(transformedInput)
            .then((data) => {
                // console.log("api resp:" + data);
                setError('');
                // console.log(data)
                // return redirect('/ingredient-results');
                // navigate(`/ingredient-results`, { state: { ...data } });
                props.setIngredientsListCallback(data)
                
            })
            .catch((err) => {
                console.log("error fetching from endpoint\n" + err.message);
                setError('Error fetching from API, please try again later');
            });
        }
    }, [transformedInput]);


    return (
        <div className="container mb-n4" id='my-fridge-modal-container'>
            <div className="row justify-content-between" id='count-and-add-ingr-btn-container'>
                <div className="col-8">
                    <h3 className="subheading">Total Ingredients</h3>
                    {/* <p className="super-subheading">{props.ingredientsList.length}</p> */}
                    <p className="super-subheading">{props.filteredIngredientsCount}</p>
                    <div className="input-group w-50">
                        <input type="text" className="form-control" data-testid="ingredient-filter-input" placeholder="filter by ingredient" aria-label="input-box" aria-describedby="filter-by-food" onChange={(e) => props.setFilteringCallback(e)} />
                    </div>
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-success rounded-pill px-3 float-end subheading"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add-ingredient-modal"
                        id="add-ingr-btn"
                        data-testid="add-ingr-btn-test"
                        style={{ boxShadow: "0 0 0 0", "width": "45px", "height": "45px" }}
                    >
                        +
                    </button>
                    <button
                        className="btn btn-danger rounded-pill px-3 mx-2 float-end super-subheading"
                        disabled={!Object.keys(props.rowsSelected).length}
                        style={{ "width": "45px", "height": "45px", color: 'white' }}
                        onClick={props.deleteIngredientsCallback}
                        data-testid="delete-ingr-btn"
                    >
                        {/* {console.log(Object.keys(props.rowsSelected).length)} */}
                        -
                    </button>
                    <br></br>
                    <br></br>
                    <button
                        className="btn btn-primary rounded-pill super-subheading float-end text-nowrap"
                        style={{ color: 'white', "marginTop": '35px' }}
                        disabled={!Object.keys(props.rowsSelected).length}
                        data-testid="generate-recipes-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            const foodNames = props.rowObjArray.map((rowObj) => rowObj.original.label);
                            console.log(foodNames)
                            navigate('/search', { state: { ...foodNames } });
                        }}
                    >
                        Generate Recipes
                    </button>
                </div>
            </div>
            <div className="modal my-5fade" id="add-ingredient-modal" tabIndex="-1">
                <div className="modal-dialog ">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <h5 className="modal-title" data-testid="add-ingredient-modal">Add Ingredient</h5>
                            <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                            <button className="btn btn-primary w-50 mb-3"
                                data-testid="toggle-input-btn"
                                onClick={() => setUsePhotoEntry(!usePhotoEntry)}
                            >

                                {!usePhotoEntry ? 'Use Photo' : 'Enter Manually'}
                            </button>
                            {
                                usePhotoEntry
                                    ?
                                    <div className='row'>
                                        <div className='col-md-6 text-center'>
                                            <a href="">
                                                <Camera className='ingredient-modal-icon' />
                                                <p>Take a photo of your ingredient</p>
                                            </a>

                                        </div>
                                        <div className='col-md-6 text-center'>
                                            <a href="">
                                                <Image className='ingredient-modal-icon' />
                                                <p>Upload a photo of your ingredient</p>
                                            </a>
                                        </div>
                                    </div>
                                    :
                                    <button className="btn btn-primary w-50 mb-3"
                                        data-testid="toggle-text-input-btn"
                                        onClick={() => setQuickAddActive(!quickAddActive)}
                                    >

                                        {!quickAddActive
                                            ?
                                            <>
                                                Quick-Add On <LightningCharge />
                                            </>
                                            :
                                            'Quick-Add Off'}
                                    </button>

                            }

                            {

                                quickAddActive && !usePhotoEntry
                                    ?
                                    <div>
                                        <form action="" className='w-100'>
                                            <div className="mb-3">
                                                <p>Enter comma-separated list of ingredients</p>
                                            </div>
                                            {error && <div className="alert alert-danger col-mb-6 w-100">{error}</div>}
                                            <div className="mb-3">
                                                <textarea className="form-control"
                                                    name=""
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    placeholder="banana, apple, yogurt, cookie, cherry..."
                                                    value={ingredientsInputText}
                                                    data-testid="ingredient-form-textarea"
                                                    onChange={(e) => setIngredientsInputText(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    !quickAddActive && !usePhotoEntry
                                        ?
                                        <div>
                                            <form action="" className='w-100' >
                                                <div className="mb-3">
                                                    <p>Enter an ingredient</p>
                                                </div>
                                                {error && <div className="alert alert-danger col-mb-6 w-100">{error}</div>}
                                                <div className="mb-3">
                                                    <input className="form-control"
                                                        name=""
                                                        id=""
                                                        cols="30"
                                                        rows="10"
                                                        placeholder="banana"
                                                        value={ingredientsInputText}
                                                        data-testid="ingredient-form-input"
                                                        onChange={(e) => setIngredientsInputText(e.target.value)}
                                                    ></input>
                                                </div>
                                            </form>
                                        </div>
                                        :
                                        <div></div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                setTransformedInput(ingredientsInputText.replaceAll(/,/g, " and"));
                                setIngredientsInputText('');
                            }
                            } data-bs-dismiss="modal" data-testid="ingredient-submit-btn">Submit</button>
                            <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {console.log(props.rowsSelected)} */}
        </div>
     
    );
};

AddIngredientModal.propTypes = {
    setIngredientsListCallback: PropTypes.func,
    ingredientsList: PropTypes.arrayOf(Ingredient),
    filteredIngredientsCount: PropTypes.number,
    setFilteringCallback: PropTypes.func,
    deleteIngredientsCallback: PropTypes.func,
    // rowsSelected: PropTypes.arrayOf(PropTypes.object),
    rowsSelected: PropTypes.any,
    rowObjArray: PropTypes.arrayOf(PropTypes.object)
};

export default AddIngredientModal;
