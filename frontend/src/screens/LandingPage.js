import React from 'react';
import { Lightbulb, PiggyBank, Trash } from 'react-bootstrap-icons';
import landingCarImage from '../images/landingCar2.png';
import landingSpreadImage from '../images/landingSpread.jpg';

const LandingPage = () => {
    return (
        <div data-testid="landing-page">
            <div>
                <img className="img-fluid" src={landingSpreadImage} width="100%" />
            </div>
            <h2 className="text-center my-3">
                Why Cook Quest?
            </h2>

            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div className="rounded-circle">
                                <Lightbulb className='landing-icon'/>
                            </div>

                            <div className='landing-subtitle'>Get Inspired</div>
                            <div className='w-75'>
                                <p>Turn cooking into a fun and adventurous hobby, not a stressful chore</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div className="rounded-circle">
                                <Trash className='landing-icon' id='trash-icon'/>
                            </div>
                            <div className='landing-subtitle'>Waste Less</div>
                            <div className='w-75'>
                                <p>Keep track of expiration dates, use leftover ingredients, and let your fridge stay clean</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div className="rounded-circle">
                                <PiggyBank className='landing-icon'/>
                            </div>
                            <div className='landing-subtitle'>Save More</div>
                            <div className='w-75'>
                                <p>Hold onto some extra cash while you eat out less, eat healthier, and toss less food</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <img className="img-fluid" src={landingCarImage} width="100%" />
            </div>
        </div>
    );
};

export default LandingPage;

