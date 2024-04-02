import React, { useState } from 'react';
import { CaretDownFill} from 'react-bootstrap-icons';
import { Form } from 'react-router-dom';

const SettingsPage = () => {

    const [selectedPreference, setSelectedPreference] = useState(0);


    const handlePreferenceSelect = (preference) => {
        setSelectedPreference(preference);
    };





    return (
        <div className='settings-form'>
        <h2 className='mb-4' style={{textAlign:'center', marginTop:20}}>Settings</h2>
            {/* start of form */}
           
                {/* Preference Dropdown Menu */}
                <p>Subscription Preferences</p>
                <div className="dropdown mb-4 rounded" >
                    <button
                        className={`btn d-flex justify-content-between w-100 text-start align-items-center`}
                        type="button"
                        id="preferenceDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{backgroundColor:'white'}}
                    >
                        {selectedPreference ? selectedPreference : '--'}
                        <CaretDownFill color="#4C230A" />
                    </button>
                    <ul className="dropdown-menu w-100" aria-labelledby="preferenceDropdown">
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handlePreferenceSelect('Cook Quest Standard')}
                            >
                                Cook Quest Standard
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handlePreferenceSelect('Cook Quest Pro')}
                            >
                                Cook Quest Pro
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handlePreferenceSelect('Cook Quest Business')}
                            >
                                Cook Quest Business
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Email Subscription Preferences */}
                <p>Email Subscription Preferences</p>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultTips" />
                    <label className="form-check-label" htmlFor="flexCheckDefaultTips">
                        Daily Tips
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultSpecials" />
                    <label className="form-check-label" htmlFor="flexCheckDefaultSpecials">
                        Weekly Chef Specials
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultNewsletter" />
                    <label className="form-check-label" htmlFor="flexCheckDefaultNewsletter">
                        Monthly Newsletter
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultUnsubscribe" />
                    <label className="form-check-label" htmlFor="flexCheckDefaultUnsubscribe">
                        Unsubscribe from all marketing emails
                    </label>
                </div>

                
           
            {/* Submit Button */}
            <div className='d-flex justify-content-center'>
                <button className="rounded-pill px-4 btn btn-primary " id='signup-btn' style={{marginTop:40, marginBottom:150, alignItems:'center'}}>
                    Save
                </button>
            </div>    
            
        </div>
    );
};

export default SettingsPage;