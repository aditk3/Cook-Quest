import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer id='footer-style' className='d-flex ' data-testid='footer-element'>
                <div className='container' id='footer-heading'>
                    {/* Table Row - Main Section */}
                    <div className='row justify-content-center align-items-center' id='footer-table'>
                    
                        {/* Column 1 - Short Blurb, maybe tagline */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <p className='footer-heading'>Cook Quest</p>
                            <p className='footer-text'>Our mission is to inspire people to cook, eat better, and waste less by providing them with a comprehensive and user-friendly platform to discover, save, and share recipes.</p>
                        </div>

                        {/* Column 2 - Info Links */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <p id='footer-header-center' className='footer-heading'>Quick Links</p>
                            <ul className="list-unstyled" >
                                <li><a id='footer-text-center' className='footer-text' href="#">About Us</a></li>
                                <li><a id='footer-text-center' className='footer-text' href="#">Contact Us</a></li>
                                <li><a id='footer-text-center' className='footer-text' href="#">Subscribe</a></li>
                                <li><a id='footer-text-center' className='footer-text' href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        

                        {/* Column 3 - Newsletter */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <p className='footer-heading'>News Letter</p>
                            <p className='footer-text'>Subscribe to our news letter to get our latest updates</p>
                            <div className="input-group mb-3" >
                                <input
                                    placeholder="E-Mail"
                                    className="form-control"
                                    id='footer-email'
                                />
                                <button className="btn btn-success" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg>
                                </button> 
                            </div>
                        </div>


                    </div>

                    {/* Table Row - Copyright Section*/}
                    <div className='row'>
                        <p id='copyright' className='text-center'>
                            <svg id='copyright' xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" className="bi bi-c-circle" viewBox="0 0 16 16">
                                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
                            </svg>
                            &nbsp;Copyright 2023 Cognizant Technology Solutions. All Right Reserved.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;