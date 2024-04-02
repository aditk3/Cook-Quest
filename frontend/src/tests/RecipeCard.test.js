import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../entities/Recipe';
import AuthContext from '../contexts';

const recipe = new Recipe(1, "Chicken", "chicken ingredients", "chicken instructions", false);

const fakeContext = {
    isLoggedIn: true,
    user: {
        email: "fake@email.com",
        credential: "fakeToken"
    }
};

it(`should display the recipe information that is passed in as a prop`, () => {
    // const imgPath = "https://upload.wikimedia.org/wikipedia/commons/6/64/Barnevelder_Cock.png?20140823191128";
    // const sitePath = "https://cafedelites.com/kung-pao-chicken/";
    // const recipe = new Recipe(1, sitePath, "Chicken", imgPath, "20 minutes", "Cook the chicken", "4.1/5", ["chicken", "bird"], false);
    render(<RecipeCard recipe={recipe} />);
    // expect(screen.getByRole("img").src).toBe(imgPath);
    expect(screen.getByText(recipe.title)).toBeInTheDocument();
    expect(screen.getByText(recipe.ingredients)).toBeInTheDocument();
    // expect(screen.getByText(`Time to cook: ${recipe.timeToCook}`)).toBeInTheDocument();
    // expect(screen.getByText(`Reviews: ${recipe.reviews}`)).toBeInTheDocument();
    // expect(screen.getAllByRole("button").length).toBe(recipe.tagsList.length);
});

it("should call fetch when favorites are toggled", () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                text: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    render(
        <AuthContext.Provider value={fakeContext}>
            <RecipeCard recipe={recipe} />
        </AuthContext.Provider>
    );
    fireEvent.click(screen.getByTestId("icon"));
    expect(fetchSpy).toBeCalled();
});