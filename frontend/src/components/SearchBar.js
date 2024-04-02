import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../entities/Recipe';
import { searchBotRecipes } from '../apiCalls/cqAPI';

const SearchBar = (props) => {
  // console.log(Object.values(props.myFridge))
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState(props.myFridge ? Object.values(props.myFridge).join(", ") : "");
  let response = [];         // array of parts of the response
  let results = [];

  // just 2 recipes for testing purposes
  const recipePrompt = "Give me 2 recipes to make ";
  const ingredientsPrompt = "Give me 2 recipes that use the following ingredients:";
  const recipePrompt2 = "Give me 1 more recipe to make ";
  const ingredientsPrompt2 = "Give me 1 more recipe that use the following ingredients:";
  const endPrompt = ". I don't want links.";

  const processResponses = () => {
    results = [];
    results.push(new Recipe(0, response[1], response[4], response[6], false));
    results.push(new Recipe(1, response[8], response[11], response[13], false));
    results.push(new Recipe(2, response[15], response[18], response[20], false));

    props.resultsFunc(results);
    response = [];

    setLoading(false);
  };

  const handleSubmit = (e) => {
    props.resultsFunc([]);

    let query = "";
    let query2 = "";
    if (props.searchMode) {
      // Search by recipe
      query = recipePrompt + searchValue + endPrompt;
      query2 = recipePrompt2 + searchValue + endPrompt;
    }
    else {
      // Search by ingredients
      query = ingredientsPrompt + searchValue.split(/\s*,\s*/).map(ingredient => " " + ingredient) + endPrompt;
      query2 = ingredientsPrompt2 + searchValue.split(/\s*,\s*/).map(ingredient => " " + ingredient) + endPrompt;
    }

    e.preventDefault();
    setLoading(true);
    searchBotRecipes(query)
      .then((answer => { response = [...response, ...answer.split("##")[1].split("**").map(block => block.trim()), ...answer.split("##")[2].split("**").map(block => block.trim())]; }))
      .then(() => searchBotRecipes(query2))
      .then((answer => { response = [...response, ...answer.split("##")[1].split("**").map(block => block.trim())]; }))
      .then(() => processResponses())
      .catch(err => console.error(err));
  };

  const updateSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <form className='form-outline' onSubmit={handleSubmit}>
        <input
          type="search"
          className='form-control'
          placeholder='Search by recipe or ingredients'
          onChange={updateSearch}
          value={searchValue}
          data-testid="search-bar" />
      </form>

      {loading && <div className="pt-4 d-flex justify-content-center">
        <div className="spinner"></div>
      </div>}

    </div>
  );
};

SearchBar.propTypes = {
  searchMode: PropTypes.bool,
  resultsFunc: PropTypes.func,
  myFridge: PropTypes.object
};

export default SearchBar;