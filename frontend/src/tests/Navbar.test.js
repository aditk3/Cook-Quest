import Navbar from '../components/Navbar';
import React from 'react';
import router from '../Routes';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, getAllByRole } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';

describe('Navbar', () => {
    it('renders itself on the screen', () => {
        render(<RouterProvider router={router}>
            <Navbar />
        </RouterProvider>
        );
        const navbar = screen.getByRole('navigation');
        expect(navbar).toBeInTheDocument();
    });

    // it(`renders the logout button within the nav dropdown menu when window width 
    //     size is adjusted below 576 px. If above that size, it renders logout button on screen outside of nav dropdown menu`, () => {
    //     render(<RouterProvider router={router}>
    //         <Navbar />
    //     </RouterProvider>
    //     );
    //     //logout button should not be in the nav menu when window width is above 576 px, but should still be on screen
    //     const defaultLogoutBtn = screen.getByTestId('logout-btn-nondropdown');
    //     expect(defaultLogoutBtn).toBeInTheDocument();
    //     const navList = screen.getByTestId('nav-list');
    //     expect(navList).not.toContainElement(defaultLogoutBtn);

    //     //logout button should only be in the nav menu when window width is below 576 px, not elsewhere

    //     // fireResize(575);
    //     // waitForElementToBeRemoved(defaultLogoutBtn).then(()=>{
    //     //     console.log('removed');
    //     //     const dropDownLogoutBtn = screen.getByTestId('logout-btn-dropdown');
    //     //     expect(navList).toContainElement(dropDownLogoutBtn);
    //     //     expect(defaultLogoutBtn).not.toBeInTheDocument();
    //     // })

    //     fireResize(575);
    //     const dropDownLogoutBtn = screen.getByTestId('logout-btn-dropdown');
    //     expect(navList).toContainElement(dropDownLogoutBtn);
    //     expect(defaultLogoutBtn).not.toBeInTheDocument();

    // });

    it(`has the appropriate routes for each nav element`, () => {
        render(<RouterProvider router={router}>
            <Navbar />
        </RouterProvider>
        );

        const navElems = screen.getAllByRole('link');
        // navElems.forEach(elem => console.log(elem));
        // expect(navElems[0]).toHaveAttribute('href', '/');
        // expect(navElems[1]).toHaveAttribute('href', '/my-fridge');
        // expect(navElems[2]).toHaveAttribute('href', '/search');
        // expect(navElems[3]).toHaveAttribute('href', '/social');
        // expect(navElems[4]).toHaveAttribute('href', '/settings');
        expect(navElems[0]).toHaveAttribute('href', '/');
        expect(navElems[1]).toHaveAttribute('href', '/search');

        fireEvent.click(navElems[0]);

        //change when page is edited
        // expect(screen.getByTestId("landing-page"));
        // fireEvent.click(navElems[1]);
        // expect(screen.getByTestId('my-fridge-title'));
        // fireEvent.click(navElems[2]);
        // expect(screen.getByTestId('search-page'));
        // fireEvent.click(navElems[3]);
        // expect(screen.getByText(/socialpage/i));
        // fireEvent.click(navElems[4]);

    });

    const fireResize = (width) => {
        window.innerWidth = width;
        fireEvent(window, new Event('resize'));
        fireEvent(window, new Event('resize'));
    };
});
