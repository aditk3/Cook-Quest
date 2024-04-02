import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../screens/LoginPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation((...args) => {
        // Suppressing console.log messages during test runs
    });

    jest.spyOn(console, 'error').mockImplementation((...args) => {
        // Suppressing console.error messages during test runs
    });
});

afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
});

const renderWithProviders = (ui) => {
    return render(<GoogleOAuthProvider clientId="390674933302-il7iu62arpjpv0aeshbc1fjoronvds0v.apps.googleusercontent.com" >
        {ui}
    </GoogleOAuthProvider>)
}

describe('LoginPage component', () => {
    //test 1
    it('should submit the form when valid data is provided', () => {
        const routes = [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"]
        });
        renderWithProviders(<RouterProvider router={router} />);

        
        // Fill in the form inputs
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });


        // Submit the form
        fireEvent.click(screen.getByText("Let's get cooking!"));

        // Expect the form to be submitted
        expect(screen.queryByTestId('login-form')).toBeNull();
    });

    //test 2
    it('should toggle password visibility when the eye icon is clicked', () => {
        const routes = [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"]
        });
        renderWithProviders(<RouterProvider router={router} />);

        // Password input should initially be of type 'password'
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput.type).toBe('password');

        // Click on the eye icon to toggle password visibility
        fireEvent.click(screen.getByTestId('toggle-password'));

        // Password input should now be of type 'text'
        expect(passwordInput.type).toBe('text');

        // Click on the eye icon again to toggle password visibility back to 'password'
        fireEvent.click(screen.getByTestId('toggle-password'));

        // Password input should now be of type 'password' again
        expect(passwordInput.type).toBe('password');
    });

    //test 3
    it('should display an error message for incorrect password', () => {
        const routes = [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"]
        });
        renderWithProviders(<RouterProvider router={router} />);

        // Fill in the form inputs
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'test' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test' } });

        // Submit the form
        fireEvent.click(screen.getByText("Let's get cooking!"));

        // Ensure that an error message is displayed for incorrect username or password
        expect(screen.getByText('Wrong username or password')).toBeInTheDocument();
    });




});