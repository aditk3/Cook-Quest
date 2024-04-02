import IndeterminateCheckbox from '../components/IndeterminateCheckbox';
import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

describe(`indeterminate checkbox`, () => {
    it(`should render itself on the screen`, () => {    
        render(
            <BrowserRouter>
                <IndeterminateCheckbox />
            </BrowserRouter>
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });
});