import React from 'react';
import { render } from '@testing-library/react';
import FavoritesPage from '../screens/FavoritesPage';
import AuthContext from '../contexts';
import { BrowserRouter } from 'react-router-dom';

const fakeContext = {
    isLoggedIn: true,
    user: {
        email: "fake@email.com",
        credential: "fakeToken"
    }
};
// Temp test
// Will later need to check if the page makes a call to the database
it(`should make fetch call to the recipe database`, () => {
    let fetchSpy = jest.spyOn(global, 'fetch')
        .mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                text: () => Promise.resolve({ data: 'mocked data' })
            }
            ))
        );
    render(
        <AuthContext.Provider value={fakeContext}>
            <BrowserRouter>
                <FavoritesPage />
            </BrowserRouter>
        </AuthContext.Provider>
    );
    expect(fetchSpy).toBeCalled();
});