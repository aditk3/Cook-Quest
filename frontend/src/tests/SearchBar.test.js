import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

beforeEach(() => {
    jest.resetAllMocks();
});

it(`should fetch a response from the bot API when a recipe search is done`, () => {
    const query = "Give me 2 recipes to make grilled cheese. I don't want links.";
    const mockResp = { text: "**Classic Grilled Cheeese**\n\nIngredients:\n\n* 2 slices bread ...\n\nInstructions:\n\n*instructions...\n\n**Classic Grilled Cheeese**\n\nIngredients:\n\n* 2 slices bread ...\n\nInstructions:\n\n*instructions..." };
    let fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(mockResp);

    const recipeMode = true;
    const funcProp = jest.fn();

    render(<SearchBar searchMode={recipeMode} resultsFunc={funcProp} />);
    const searchBar = screen.getByTestId("search-bar");

    fireEvent.change(searchBar, { target: { value: "grilled cheese" } });
    fireEvent.submit(searchBar);
    expect(fetchSpy).toHaveBeenCalledWith("...", {
        method: "POST",
        body: JSON.stringify({ prompt: query, temp: 0.2, max_tokens: 1024, top_p: 0.9, top_k: 40 }),
        headers: { 'Content-Type': 'application/json' }
    });
    // return waitFor(() =>
    //      expect(funcProp).toHaveBeenCalledTimes(1)   // work on why this doesnt work
    // );
});

it(`should log an error from the fetch if the POST request fails`, () => {
    const query = "Give me 2 recipes to make grilled cheese. I don't want links.";
    let fetchSpy = jest.spyOn(global, 'fetch').mockRejectedValue('500 Internal Server Error');
    let consoleSpy = jest.spyOn(console, 'error');

    const recipeMode = true;
    const funcProp = jest.fn();

    render(<SearchBar searchMode={recipeMode} resultsFunc={funcProp} />);
    const searchBar = screen.getByTestId("search-bar");

    fireEvent.change(searchBar, { target: { value: "grilled cheese" } });
    fireEvent.submit(searchBar);
    expect(fetchSpy).toHaveBeenCalledWith("...", {
        method: "POST",
        body: JSON.stringify({ prompt: query, temp: 0.2, max_tokens: 1024, top_p: 0.9, top_k: 40 }),
        headers: { 'Content-Type': 'application/json' }
    });

    return waitFor(() =>
        expect(consoleSpy).toHaveBeenCalledWith('500 Internal Server Error'));
});