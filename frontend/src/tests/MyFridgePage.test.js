import React from 'react';
import router from '../Routes';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, getAllByRole } from "@testing-library/react";
import { RouterProvider, BrowserRouter } from 'react-router-dom';
import MyFridgePage from '../screens/MyFridgePage';

describe('My Fridge', () => {
    it('renders itself on the screen', () => {
        render(<BrowserRouter>
            <MyFridgePage />
        </BrowserRouter>
        );
        const header = screen.getByText(/my fridge/i);
        expect(header).toBeInTheDocument();
    });
});