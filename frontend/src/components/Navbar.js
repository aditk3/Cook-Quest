import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { useContext } from 'react';
import AuthContext from '../contexts';

const Navbar = () => {
    // const [currWindowWidth, setCurrWindowWidth] = useState(window.innerWidth);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: change to false when done testing
    const [showLogoutInToggleMenu, setShowLogoutInToggleMenu] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handler = () => {
        setIsLoggedIn(false);
    };

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         setCurrWindowWidth(window.innerWidth);
    //         if (window.innerWidth < 576) {
    //             setShowLogoutInToggleMenu(true);
    //         } else {
    //             setShowLogoutInToggleMenu(false);
    //         }
    //     });
    // });
    return (
        <nav className="navbar navbar-expand-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <svg className="cookQuestLogo" xmlns="http://www.w3.org/2000/svg" width="59" height="50" viewBox="0 0 59 50" fill="none">
                        <rect width="5.80666" height="29.1883" rx="2.90333" transform="matrix(0.763215 0.646145 -0.562863 0.82655 53.7437 0)" fill="#CCC9A1" />
                        <path d="M0 17.1533H57.2813V21.3594C57.2813 37.1771 44.4584 50 28.6406 50C12.8229 50 0 37.1771 0 21.3594V17.1533Z" fill="#4C230A" />
                    </svg>
                    <div className=""><span className="cookQuestFont">CookQuest</span></div>

                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto" data-testid="nav-list">
                        {isLoggedIn &&
                            <li className="nav-item"><Link className="nav-link" to="/my-fridge">My Fridge</Link></li>
                        }

                        <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>

                        {isLoggedIn &&
                            <li className="nav-item"><Link className="nav-link" to="/favorites">Favorites</Link></li>
                        }

                        {isLoggedIn &&
                            <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
                        }
                        {/* <li className="nav-item"><a className="nav-link" href="#">Logout</a></li> */}

                        {/* Show logout button only if user is logged in */}

                    </ul>

                    {
                        isLoggedIn &&
                        <button data-testid="logout-btn-dropdown" className="btn btn-outline-warning float-end logout-btn mt-2" type="button" >
                            <Link className="nav-link" onClick={handler} to="/"><BoxArrowInRight /> Logout</Link>
                        </button>
                    }


                    {
                        !isLoggedIn &&
                        <button data-testid="logout-btn-nondropdown" className="btn btn-outline-warning float-end logout-btn mt-2" type="button" >
                            <Link className="nav-link" to="/login"><BoxArrowInRight /> Login</Link>
                        </button>
                    }
                </div>

            </div>

        </nav>
    );
};

export default Navbar;