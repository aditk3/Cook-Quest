import IngredientListItem from '../components/IngredientListItem';
import React from 'react';
import router from '../Routes';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, getAllByRole } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';

describe('IngredientListItem', ()=> {
    it('should render on the page', ()=> {
        render(
                <IngredientListItem />

        )
        expect(screen.getByText("IngredientListItem")).toBeInTheDocument();
    })
})