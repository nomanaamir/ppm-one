import React, { useState, useEffect } from 'react';

import MicrosoftLogo from '../../assets/microsoft.png'
import logo from '../../assets/PPMone Logo Grey and Blue.png'
import { connect } from 'react-redux';

import { microsoftLogIn, setNavigationProps, signIn } from '../../Store/Middlewares/middlewares';

function SignInScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { history } = props
    const MSlogin = () => {
        props.microsoftLoginAction()
    }
    const login = () => {
        props.signInAction(email, password)
    }
    useEffect(() => {
        props.setNavigationPropsAction(history)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="signInContainer">
            <div className="signInContainer_card">
                <div className="signInContainer_card-header">
                    <img src={logo} height="36px" alt="" />
                    <p>Maximise your Project Portfolio Success</p>
                </div>

                <div className="signInContainer_card-body">
                    <p className="signIn-text">Sign in</p>
                    <input className="signInContainer_card-body_field" placeholder="My username" type="email" onChange={e => setEmail(e.target.value)} />
                    <input className="signInContainer_card-body_field" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                    {
                        props.isLoading === true ?
                            <button className="signIn-btn"><div className="loader"></div></button>
                            :
                            <button className="signIn-btn" onClick={login}>Sign In</button>
                    }

                    <p className="signIn-dont">Don't have an account? <span className="signUpLink" onClick={() => props.history.push('/signup')}>Sign Up</span> </p>

                    <span className="signInContainer_card-body_OR">or</span>

                    <div className="signInContainer_card-body_microsoft-login" onClick={MSlogin}>
                        <img src={MicrosoftLogo} alt="microsoft-icon" /> <span>Sign in with Microsoft</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: state.root.signIn_success
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        microsoftLoginAction: () => { dispatch(microsoftLogIn()) },
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },
        signInAction: (email, password) => { dispatch(signIn(email, password)) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

