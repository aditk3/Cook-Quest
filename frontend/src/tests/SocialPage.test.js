import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SocialPage from '../screens/SocialPage';
import { BrowserRouter } from 'react-router-dom';

describe(`social page`, ()=> {
it(`should render the social page`, () => {
    render(
    <BrowserRouter >
     <SocialPage />
    </BrowserRouter>
   );
    expect(screen.getByText(/socialpage/i)).toBeInTheDocument();
});
})