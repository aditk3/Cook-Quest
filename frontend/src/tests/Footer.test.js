import Footer from '../components/Footer';
import React from 'react';
import router from '../Routes';
import { render, screen, waitFor} from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';


describe('Footer component', () => {

    //Test 1 - showing up on screen
    it('renders itself on the screen', () => {
        render(<Footer />);
        const footer = screen.getByTestId('footer-element');
        expect(footer).toBeInTheDocument();
    });

    
    //Test 2 - links show up
    it(`should have links for About Us, Contact Us, Subscribe, and Terms of Service`, () => {
    
    //take out comments once routes are added to the links
    render(<Footer />);

    // const allLinks = screen.getAllByRole('link');
    // const aboutUsLink = allLinks[0];
    // const contactUsLink = allLinks[1];
    // const subscribeLink = allLinks[2];
    // const termsLink = allLinks[3];

    //text rendering
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();

    //expect link to go somewhere

    // expect(aboutUsLink.getAttribute('href')).toBe('/');
    // expect(contactUsLink.getAttribute('href')).toBe('/');
    // expect(subscribeLink.getAttribute('href')).toBe('/');
    // expect(termsLink.getAttribute('href')).toBe('/');


    });

});