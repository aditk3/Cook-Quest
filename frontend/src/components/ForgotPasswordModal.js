import React, { useState } from 'react';
import { Form } from 'react-router-dom';

function ForgotPasswordModal() {
    const [resetEmail, setResetEmail] = useState('');

    const handleResetEmailSubmit = () => {
        const hiddenSubmitButton = document.getElementById('hidden-submit-button');
        if (hiddenSubmitButton) {
            hiddenSubmitButton.click();
        }
    };

    return (
        <div className="modal my-5 fade" id="forgot-password-modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" data-testid="forgot-password-modal">Forgot Password</h5>
                        <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    {/* <Form action={handleResetEmailSubmitForm} method="post" className="form-login text-center" id='reset-email-form' onSubmit={handleResetEmailSubmit}> */}
                    <Form className="form-login text-center" id='reset-email-form' onSubmit={handleResetEmailSubmit}>
                        <div className="modal-body d-flex flex-column align-items-center text-center">
                            <p>Check your email and follow the instructions to make a new password</p>
                            <input name="email" type="email" placeholder="Email" className="form-control mb-3" required
                                value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" id="hidden-submit-button" style={{ display: 'none' }} />
                    </Form>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleResetEmailSubmit}>Submit</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


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

export default ForgotPasswordModal;