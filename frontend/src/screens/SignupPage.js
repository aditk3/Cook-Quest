import React, { useState } from 'react';
import { CaretDownFill, Eye, EyeSlash } from 'react-bootstrap-icons';
import { Form, Link, redirect } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAge, setSelectedAge] = useState(0);
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleAgeSelect = (age) => {
        setSelectedAge(age);
    };
    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = (e) => {
        // Check if the password is at least six characters long
        if (password.length < 6) {
            e.preventDefault();
            setError('Password must be at least six characters long.');
            return;
        }

        // Check if the password contains both letters and numbers
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            e.preventDefault();
            setError('Password must contain at least one letter and one number.');
            return;
        }

        // Check if the password and confirm password fields match
        if (password !== confirmPassword) {
            e.preventDefault();
            setError('Passwords do not match. Please try again.');
            return;
        }

        // Check if an age range is selected
        if (selectedAge === 0) {
            e.preventDefault();
            setError('Please select an age range.');
            return;
        }

        setError('');
    };

    return (
        <div className="container d-flex flex-column align-items-center mb-4" id='sign-up-container'>
            <h2 className='mb-4'>Sign Up</h2>
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

            <Form action={handleSignUp} method="post" className="form-login text-center" id='signup-form' onSubmit={handleSubmit}>
                {/* Email Input */}
                <input name="email" type="email" placeholder="Email" className="form-control mb-3" required
                    value={email} onChange={handleEmailChange}
                />

                {/* Name Inputs */}
                <input name="firstName" type="text" placeholder="First Name" className="form-control mb-3" required
                    value={firstName} onChange={handleFirstNameChange}
                />
                <input name="lastName" type="text" placeholder="Last Name" className="form-control mb-3" required
                    value={lastName} onChange={handleLastNameChange}
                />
                <input name="username" type="text" placeholder="Username" className="form-control mb-3" required
                    value={username} onChange={handleUsernameChange}
                />

                {/* Password Inputs */}
                <div className="input-group mb-3">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="form-control"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        data-testid="password-input"
                    />
                    <span
                        className="btn btn-outline-secondary h-100"
                        type="button"
                        onClick={handleTogglePassword}
                        data-testid="toggle-password"
                    >
                        {showPassword ? <EyeSlash color="#4C230A" /> : <Eye color="#4C230A" />}
                    </span>
                </div>

                <input type="password" placeholder="Confirm Password" className="form-control mb-3" required
                    value={confirmPassword} onChange={handleConfirmPasswordChange}
                />

                {/* Age Dropdown */}
                <div className="dropdown mb-4 rounded">
                    <button
                        className={`btn d-flex justify-content-between w-100 text-start align-items-center`}
                        type="button"
                        id="ageDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedAge ? selectedAge : 'Age'}
                        <CaretDownFill color="#4C230A" />
                    </button>

                    {/* Age Dropdown Menu */}
                    <ul className="dropdown-menu w-100" aria-labelledby="ageDropdown">
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleAgeSelect('18-25')}
                            >
                                18-25
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleAgeSelect('26-45')}
                            >
                                26-45
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleAgeSelect('46-59')}
                            >
                                46-59
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleAgeSelect('60+')}
                            >
                                60+
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-danger col-mb-6 w-100">{error}</div>}

                {/* Submit Button */}
                <button className="rounded-pill px-4 btn btn-primary " type="submit" id='signup-btn'>
                    Let&apos;s get cooking!
                </button>
            </Form>

            <div className="mb-3">
                <Link to='/login'>Already have an account?</Link>
            </div>
        </div>
    );
};

export const handleSignUp = async ({ request }) => {
    const loginDataObj = Object.fromEntries(await request.formData());
    console.log(JSON.stringify(loginDataObj));
    /*
    To do: 
    - POST request body currently missing ageGroup attribute from Form
    - Hook up to DB instead of logging to console
    */
    return redirect('/');
};

export default SignupPage;