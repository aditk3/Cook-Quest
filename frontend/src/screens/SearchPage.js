import React, { useState } from "react";
import SearchBar from '../components/SearchBar'
import RecipeContainer from "../components/RecipeContainer";
import { useLocation } from "react-router-dom";

const SearchPage = () => {

    const location = useLocation();
    // console.log(location.state)
    const [searchResults, setSearchResults] = useState([]);
    const [recipeMode, setRecipeMode] = useState(location.state ? false : true);

    return (
        <div data-testid="search-page" className="container mb-5">
            <div className="d-flex flex-column align-items-center">
                <h2 className="mb-1 text-center">Cook Quest</h2>
                <p id="search-subtitle" className="mb-0">The app for food lovers</p>
                <svg width="260" height="223" viewBox="0 0 260 223" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(0.75)">
                    <rect width="25.8977" height="130.18" rx="12.9489" transform="matrix(0.763215 0.646145 -0.562863 0.82655 239.697 0)" fill="#CCC9A1"/>
                    <path d="M0 76.5036H255.474V95.2627C255.474 165.81 198.285 223 127.737 223C57.1899 223 0 165.81 0 95.2627V76.5036Z" fill="#4C230A"/>
                </svg>

                <div id="toggle-switch" className="mb-5 pb-0 pt-1 rounded-pill align-items-center">
                    <p 
                    className={"d-inline my-0 h-100 px-3 rounded-pill btn " + (recipeMode ? "btn-success" : "btn-inactive")}
                    data-testid="recipe-toggle"
                    onClick={() => setRecipeMode(true)}>
                        Recipe
                    </p>
                    <p 
                    className={"d-inline my-0 h-100 px-3 rounded-pill btn " + (recipeMode ? "btn-inactive" : "btn-success")}
                    data-testid="ingredient-toggle"
                    onClick={() => setRecipeMode(false)}>
                        Ingredients
                    </p>
                </div>
                <div className="mb-5 w-75">
                    <SearchBar searchMode={recipeMode} resultsFunc={setSearchResults} myFridge={location.state}/>
                </div>
                <div className="w-100">
                    <RecipeContainer recipes={searchResults}/>
                </div>
                
            </div>
        </div>
    );
};

export default SearchPage;