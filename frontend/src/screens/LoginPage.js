import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import React, { useContext, useState } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import AuthContext from '../contexts/index';

//creatings users
const users = [{
    username: 'bananalicious',
    password: 'Chef1234'
}, {
    username: 'krabbypattyluver',
    password: 'mrkrabs'
}, {
    username: 'remy',
    password: 'ratato'
}];

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn } = useContext(AuthContext);

    // creating state for data
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    //creating change handler
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Remove logs later
    //finds username and password in users array and prints in console log
    const checkUser = (e) => {
        e.preventDefault();

        const usercheck = users.find(user => (user.username === data.username && user.password === data.password));
        if (usercheck) {
            setError('');
            console.log('Successful login. Welcome back, ' + usercheck.username);
        } else {
            setError('Wrong username or password');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Handle user profiles later
    const responseMessage = (response) => {
        console.log(response);
    };
    const handleGoogleSuccess = (user) => {
        setIsLoggedIn(true);

        const userDetails = jwt_decode(user.credential);
        const userObj = { ...userDetails, ...user };
        setUser(userObj);

        console.log(userObj);

        navigate("/my-fridge");
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    //actual design of login page
    return (
        <div className="container d-flex flex-column align-items-center mb-4" id='sign-up-container'>
            <h2 className='mb-4'>Login</h2>
            <div className="logo mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="255" height="146" viewBox="0 0 59 50" fill="none">
                    <rect
                        width="5.80666"
                        height="29.1883"
                        rx="2.90333"
                        transform="matrix(0.763215 0.646145 -0.562863 0.82655 53.7437 0)"
                        fill="#CCC9A1"
                    />
                    <path d="M0 17.1533H57.2813V21.3594C57.2813 37.1771 44.4584 50 28.6406 50C12.8229 50 0 37.1771 0 21.3594V17.1533Z" fill="#4C230A" />
                </svg>
            </div>

            <form action="" className="form-login text-center" id='signup-form' onSubmit={checkUser}>
                {/* Google Login */}
                <GoogleLogin
                    onSuccess={(user) => {
                        handleGoogleSuccess(user);
                    }}
                    onError={errorMessage}
                    width={'336px'}
                    height={'38px'}
                />

                <div className="divider">
                    <span className="divider-text">Or</span>
                </div>

                {/* Username Input */}
                <input type="text" placeholder="Username" className="form-control mb-3" required
                    name="username"
                    value={data.username}
                    onChange={changeHandler}
                />

                {/* Password Inputs */}
                <div className="input-group mb-3">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="form-control"
                        required
                        data-testid="password-input"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                    />
                    <span
                        className="btn btn-outline-secondary "
                        type="button"
                        onClick={handleTogglePassword}
                        data-testid="toggle-password"
                    >
                        {showPassword ? <EyeSlash color="#4C230A" /> : <Eye color="#4C230A" />}
                    </span>
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-danger col-mb-6 w-100">{error}</div>}

                {/* Submit Button */}
                <button className="btn btn-primary rounded-pill px-4" type="submit" id='signup-btn'>
                    Let&apos;s get cooking!
                </button>
            </form>

            <div className="mb-2">
                <Link to='/signup'>Don&apos;t have an account?</Link>
            </div>

            <div className="mb-2">
                <a
                    className=""
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#forgot-password-modal"
                >
                    Forgot password?
                </a>
            </div>

            <ForgotPasswordModal />
        </div>
    );
};

// export const handleResetEmailSubmitForm = async ({ request }) => {
//     const loginDataObj = Object.fromEntries(await request.formData());
//     console.log(JSON.stringify(loginDataObj));
//     /*
//     To do: 
//     - POST request body currently missing ageGroup attribute from Form
//     - Hook up to DB instead of logging to console
//     */
//     return redirect('/');
// };

export default LoginPage;


// another state that sees whether its sucessful or not, conditional render