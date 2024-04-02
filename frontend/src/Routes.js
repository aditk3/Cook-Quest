import React from 'react';
// import App from './App';
import Navbar from './components/Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';

//importing screens to use as routes
import MyFridgePage from './screens/MyFridgePage';
import SearchPage from './screens/SearchPage';
import SettingsPage from './screens/SettingsPage';
import SignupPage from './screens/SignupPage';
import SocialPage from './screens/SocialPage';
import FavoritesPage from './screens/FavoritesPage';
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import { handleSignUp } from './screens/SignupPage';
import Footer from './components/Footer';
import IngredientListContainer from './components/IngredientListContainer';
// import IngredientSearchResultsContainer from './components/IngredientSearchResultsContainer';



const Layout = () => {
    return (
        <>
            <div className="page-container">
                <Navbar />
                <div className="content-wrap">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                element: <MyFridgePage />,
                children: [
                    {
                        path: '/my-fridge',
                        element: <IngredientListContainer />
                    },
                    // {
                    //     path: '/ingredient-results',
                    //     element: <IngredientSearchResultsContainer />
                    // }
                ]
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '/social',
                element: <SocialPage />
            },
            {
                path: '/favorites',
                element: <FavoritesPage />
            },
            {
                path: '/settings',
                element: <SettingsPage />
            },
            {
                path: '/signup',
                element: <SignupPage />,
                action: handleSignUp
            },
            {
                path: '/landing',
                element: <LandingPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/favorites',
                element: <FavoritesPage />
            }
        ]
    }


]);

export default router;