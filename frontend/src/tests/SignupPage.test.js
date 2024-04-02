import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SignupPage from '../screens/SignupPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
        const [firstArg] = args;
        if (
            typeof firstArg === 'string' &&
            firstArg.includes('Warning: An update to RouterProvider inside a test was not wrapped in act(...).')
        ) {
            return;
        }
        console.error(...args);
    });
});

afterAll(() => {
    console.error.mockRestore();
});

describe('SignupPage component', () => {
    beforeEach(() => {
        const routes = [
            {
                path: "/signup",
                element: <SignupPage />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/signup"]
        });

        act(() => {
            render(<RouterProvider router={router} />);
        });
    });

    it('should submit the form when valid data is provided', () => {
        // Fill in the form inputs
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
            fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'test123' } });
        });

        // Select an age from the dropdown
        act(() => {
            fireEvent.click(screen.getByText('Age'));
            fireEvent.click(screen.getByText('18-25'));
        });

        // Submit the form
        act(() => {
            fireEvent.click(screen.getByText("Let's get cooking!"));
        });

        // Expect the form to be submitted
        expect(screen.queryByTestId('signup-form')).toBeNull();
    });

    it('should toggle password visibility when the eye icon is clicked', () => {
        // Password input should initially be of type 'password'
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput.type).toBe('password');

        // Click on the eye icon to toggle password visibility
        act(() => {
            fireEvent.click(screen.getByTestId('toggle-password'));
        });

        // Password input should now be of type 'text'
        expect(passwordInput.type).toBe('text');

        // Click on the eye icon again to toggle password visibility back to 'password'
        act(() => {
            fireEvent.click(screen.getByTestId('toggle-password'));
        });

        // Password input should now be of type 'password' again
        expect(passwordInput.type).toBe('password');
    });

    it('should display an error message for passwords less than six characters', () => {
        // Fill in the form inputs
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'test' } });
        });

        // Submit the form
        act(() => {
            fireEvent.click(screen.getByText("Let's get cooking!"));
        });

        // Ensure that an error message is displayed for passwords less than six characters
        expect(screen.getByText('Password must be at least six characters long.')).toBeInTheDocument();
    });

    it('should display an error message for passwords without both letters and numbers', () => {
        // Fill in the form inputs
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });
        });

        // Submit the form
        act(() => {
            fireEvent.click(screen.getByText("Let's get cooking!"));
        });

        // Ensure that an error message is displayed for passwords without both letters and numbers
        expect(screen.getByText('Password must contain at least one letter and one number.')).toBeInTheDocument();
    });

    it('should display an error message for mismatched passwords', () => {
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'wrongpassword' } });
        });

        act(() => {
            fireEvent.click(screen.getByText("Let's get cooking!"));
        });

        // Ensure that an error message is displayed for mismatched passwords
        expect(screen.getByText('Passwords do not match. Please try again.')).toBeInTheDocument();
    });

    it('should display an error message when an age range is not selected', () => {
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'test123' } });
        });

        act(() => {
            fireEvent.click(screen.getByText("Let's get cooking!"));
        });

        // Ensure that an error message is displayed for the unselected age range
        expect(screen.getByText('Please select an age range.')).toBeInTheDocument();
    });
});
