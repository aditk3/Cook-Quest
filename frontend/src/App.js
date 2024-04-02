import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import './styles/styles.scss';
import React from 'react';
import AuthContextProvider from './contexts/AuthContextProvider';

function App() {
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}

export default App;
