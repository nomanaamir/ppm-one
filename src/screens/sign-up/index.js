import React from 'react';
import logo from '../../assets/PPMone Logo Grey and Blue.png'
function SignUpScreen(props) {
    return (
        <div className="signUpContainer">
            <div className="signUpContainer_card">
                <div className="signUpContainer_card-header">
                <img src={logo} height="36px" alt=""/>
                    <p>Maximise your Project Portfolio Success</p>
                </div>

                <div className="signUpContainer_card-body">

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Name</span>
                        <input className="textField" type="text" />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Company</span>
                        <input className="textField" type="text" />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Email</span>
                        <input className="textField" type="email" />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Enter Password</span>
                        <input className="textField" type="text" />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Re-enter Password</span>
                        <input className="textField" type="text" />
                    </div>
                </div>

                <div className="signUpContainer_card-footer">
                    <div className="signUp-actions">
                        <button className="signUp-actions_btn" onClick={() => props.history.push('/')}>Cancel</button>
                        <button className="signUp-actions_btn">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUpScreen;
