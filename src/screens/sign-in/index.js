import React from 'react';
import MicrosoftLogo from '../../assets/microsoft.png'
import logo from '../../assets/PPMone Logo Grey and Blue.png'
function SignInScreen(props) {
    // const gotoSignUp = () => {
    //     props.history.push('/signup')
    // }
    return (
        <div className="signInContainer">
            <div className="signInContainer_card">
                <div className="signInContainer_card-header">
                    <img src={logo} height="36px" alt=""/>
                    {/* <h1>PPM.one</h1> */}
                    <p>Maximise your Project Portfolio Success</p>
                </div>

                <div className="signInContainer_card-body">
                    <p className="signIn-text">Sign in</p>
                    <input className="signInContainer_card-body_field" placeholder="My username" type="email" />
                    <input className="signInContainer_card-body_field" placeholder="Password" type="password" />
                    <button className="signIn-btn">Sign In</button>

                    <p className="signIn-dont">Don't have an account? <span className="signUpLink" onClick={() => props.history.push('/signup')}>Sign Up</span> </p>

                    <span className="signInContainer_card-body_OR">or</span>

                    <div className="signInContainer_card-body_microsoft-login" >
                        <img src={MicrosoftLogo} alt="microsoft-icon" /> <span>Sign in with Microsoft</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignInScreen;
