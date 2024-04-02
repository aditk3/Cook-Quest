import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchPage from '../screens/SearchPage';
import { BrowserRouter } from 'react-router-dom';

it(`should render the search bar and recipe container`, () => {
    render(
    <BrowserRouter >
     <SearchPage />
    </BrowserRouter>
   );
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-container")).toBeInTheDocument();
});

it(`should toggle search type when recipe or ingredients button is pressed`, () => {
    render(
        <BrowserRouter >
         <SearchPage />
        </BrowserRouter>
       );
    const recipeBtn = screen.getByTestId("recipe-toggle");
    const ingredientsBtn = screen.getByTestId("ingredient-toggle");

    fireEvent.click(recipeBtn);
    expect(recipeBtn.className.includes("btn-success")).toBe(true);
    expect(ingredientsBtn.className.includes("btn-inactive")).toBe(true);

    fireEvent.click(ingredientsBtn);
    expect(recipeBtn.className.includes("btn-inactive")).toBe(true);
    expect(ingredientsBtn.className.includes("btn-success")).toBe(true);
});