import AddIngredientModal from '../components/AddIngredientModal';
import React from 'react';
import router from '../Routes';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, getAllByRole, act, cleanup } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import { Routes, Route, useParams, BrowserRouter } from 'react-router-dom';
import Ingredient from '../entities/Ingredient';
import IngredientListContainer from '../components/IngredientListContainer';

describe(`add ingredient modal`, () => {
    const setFilteringCallback = jest.fn();
    const setIngredientsListCallback = jest.fn();
    const rowObjArrayMock = [
        {
            "original": {
                "label": "Apple",
            }
        }
    ]
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AddIngredientModal
                    ingredientsList={[]}
                    setIngredientsListCallback={setIngredientsListCallback}
                    setFilteringCallback={setFilteringCallback}
                    rowsSelected={{"0": true}} 
                    rowObjArray = {rowObjArrayMock}
                    />
            </BrowserRouter>
        );
    });
    it(`renders itself on the screen`, () => {

        const takePhotoPrompt = screen.getByText(/take a photo of your ingredient/i);
        const uploadImagePrompt = screen.getByText(/upload a photo of your ingredient/i);
        const filterInput = screen.getByTestId('ingredient-filter-input');

        expect(takePhotoPrompt).toBeInTheDocument();
        expect(uploadImagePrompt).toBeInTheDocument();
        expect(filterInput).toBeInTheDocument();
    });
    it(`changes input type between photo/video upload and written text when its toggle button is clicked`, () => {

        const toggleBtn = screen.getByTestId('toggle-input-btn');

        //expect change to written input after toggle click
        fireEvent.click(toggleBtn);
        let writtenPrompt = screen.getByText(/enter an ingredient/i);
        expect(writtenPrompt).toBeInTheDocument();

        //expect change to textarea input after quick add click
        const quickAddBtn = screen.getByText(/quick-add/i);
        fireEvent.click(quickAddBtn);
        writtenPrompt = screen.getByText(/enter comma-separated list of ingredients/i);
        expect(writtenPrompt).toBeInTheDocument();

        //expect change back to photo upload after toggle click
        fireEvent.click(toggleBtn);
        const takePhotoPrompt = screen.getByText(/take a photo of your ingredient/i);
        const uploadImagePrompt = screen.getByText(/upload a photo of your ingredient/i);

        expect(takePhotoPrompt).toBeInTheDocument();
        expect(uploadImagePrompt).toBeInTheDocument();

    });
    it(`allows its text field to be edited`, () => {
        //render textarea field
        const toggleBtn = screen.getByTestId('toggle-input-btn');
        fireEvent.click(toggleBtn);
        const toggleTextInputBtn = screen.getByTestId('toggle-text-input-btn');
        fireEvent.click(toggleTextInputBtn);

        //edit text and check
        let textField = screen.getByTestId('ingredient-form-textarea');
        let inputValue = 'banana, apple, cookie, yogurt, cherry';
        fireEvent.change(textField, { target: { value: inputValue } });
        expect(textField).toHaveTextContent(inputValue);

        //repeat the above with input instead of textarea
        fireEvent.click(toggleTextInputBtn);
        textField = screen.getByTestId('ingredient-form-input');
        inputValue = "banana";
        fireEvent.change(textField, { target: { value: inputValue } });
        expect(textField.value).toBe(inputValue);
    });
    it(`fetches from the Edamam ingredient database API with the user-inputted query string`, () => {
        //mock fetch that returns resolved promise
        jest.spyOn(global, 'fetch')
            .mockImplementationOnce(
                jest.fn(() => Promise.resolve({
                    json: () => Promise.resolve({ data: 'mocked data' })
                }
                ))
            );
        //render text input field
        const toggleBtn = screen.getByTestId('toggle-input-btn');
        fireEvent.click(toggleBtn);
        const toggleTextInputBtn = screen.getByTestId('toggle-text-input-btn');
        fireEvent.click(toggleTextInputBtn);

        //fill out form with ingredients and submit
        const inputValue = 'banana, apple, cookie, yogurt, cherry';
        const expectedValue = inputValue.replaceAll(/,/g, " and");
        console.log(expectedValue);
        let textField = screen.getByTestId('ingredient-form-textarea');
        const ingredientSubmitBtn = screen.getByTestId('ingredient-submit-btn');
        fireEvent.change(textField, { target: { value: inputValue } });

        //expect fetch to have been called with proper query
        act(() => {
            fireEvent.click(ingredientSubmitBtn);
        });

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`...`));

        // ---------------------------------------

        //repeat process for individual input field
        //render textarea field
        fireEvent.click(toggleTextInputBtn);

        //fill out form with ingredients and submit
        textField = screen.getByTestId('ingredient-form-input');
        fireEvent.change(textField, { target: { value: inputValue } });

        //expect fetch to have been called with proper query
        fireEvent.click(ingredientSubmitBtn);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`...`));

        expect(screen.queryByText(/error fetching from API, please try again later/i)).not.toBeInTheDocument();

    });
    it(`handles API fetching errors from the Edamam ingredient database API with the user-inputted query string`, async () => {
        //mock fetch that returns rejected promise
        jest.spyOn(global, 'fetch')
            .mockImplementationOnce(
                jest.fn(() => Promise.reject(new Error('error fetching')))
            );

        //render text field
        const toggleBtn = screen.getByTestId('toggle-input-btn');
        fireEvent.click(toggleBtn);
        const toggleTextInputBtn = screen.getByTestId('toggle-text-input-btn');
        fireEvent.click(toggleTextInputBtn);

        //fill out form with ingredients and submit
        const inputValue = 'banana, apple, cookie, yogurt, cherry';
        const textField = screen.getByTestId('ingredient-form-textarea');
        const ingredientSubmitBtn = screen.getByTestId('ingredient-submit-btn');
        fireEvent.change(textField, { target: { value: inputValue } });

        //expect fetch to have failed and render error message
        act(() => {
            fireEvent.click(ingredientSubmitBtn);
        });
        const errorMessage = await screen.findByText(/error fetching from API, please try again later/i);
        expect(errorMessage).toBeInTheDocument();

        //switch from textarea to input and repeat
        fireEvent.click(toggleTextInputBtn);
        fireEvent.change(textField, { target: { value: inputValue } });
        expect(errorMessage).toBeInTheDocument();

    });
    it(`calls callback function after user inputs filter query`, () => {
        const filterInput = screen.getByTestId('ingredient-filter-input');
        fireEvent.change(filterInput, { target: { value: 'test' } });
        expect(setFilteringCallback).toHaveBeenCalledWith(expect.anything());
    });
    it(`redirects to search page on Generate Recipes button click`, async () => {
        // //setup table

        // const toggleInput = screen.getByTestId('toggle-input-btn');
        // expect(toggleInput).toBeInTheDocument();
        // fireEvent.click(toggleInput); //toggle to text input

        // const inputField = screen.getByTestId('ingredient-form-input');
        // const submitBtn = screen.getByTestId('ingredient-submit-btn');
        // expect(inputField).toBeInTheDocument();
        // expect(submitBtn).toBeInTheDocument();
        // fireEvent.change(inputField, { target: { value: "apple, banana" } }); //enter text

        // await waitFor(() => {
        //     fireEvent.click(submitBtn); //submit ingredient
        //     const appleThumbnail = screen.getByTestId("food_a1gb9ubb72c7snbuxr3weagwv0dd");
        //     expect(appleThumbnail).toBeInTheDocument(); //expect apple thumbnail to be in the table
        //     fireEvent.click(appleThumbnail); //click thumbnail
        // });
        const generateRecipesBtn = screen.getByTestId('generate-recipes-btn');
        expect(generateRecipesBtn).toBeInTheDocument();
        expect(generateRecipesBtn).toBeEnabled();
        fireEvent.click(generateRecipesBtn);
        // expect(screen.getByText(/food lovers/)).toBeInTheDocument();
    }); 
});