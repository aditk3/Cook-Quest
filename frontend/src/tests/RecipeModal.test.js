import { fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter } from 'react-router-dom';
import RecipeModal from "../components/RecipeModal";
import Recipe from "../entities/Recipe";

const testRecipe = new Recipe(1, "test title", "test ingredients", "test instructions", false);

beforeEach(() => {
    render(
        <BrowserRouter>
            <RecipeModal recipe={testRecipe} />
        </BrowserRouter>
    );
});

it('will render on the screen', () => {
    const title = screen.getByTestId("recipe-title");
    const ingredientsLabel = screen.getByTestId("ingredients-label");
    const ingredientsText = screen.getByText(testRecipe.ingredients)
    const instructionsLabel = screen.getByTestId("instructions-label");
    const instructionsText = screen.getByText(testRecipe.instructions)

    expect(title).toBeInTheDocument();
    expect(ingredientsLabel).toBeInTheDocument();
    expect(ingredientsText).toBeInTheDocument();
    expect(instructionsLabel).toBeInTheDocument();
    expect(instructionsText).toBeInTheDocument();
});