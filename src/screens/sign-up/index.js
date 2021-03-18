import React, { useState, useEffect } from 'react';
import logo from '../../assets/PPMone Logo Grey and Blue.png';

import { connect } from 'react-redux';

import { signUp } from '../../Store/Middlewares/middlewares';
function SignUpScreen(props) {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [isPasswordValidate, setIsPasswordValidate] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);



    const register = () => {
        const user = {
            name,
            company,
            email
        }
        console.log('name', name)
        console.log('company', company)
        console.log('email', email)
        console.log('password', password)
        console.log('repassword', repassword)
        if (name === '' || company === '' || email === '' || password === '' || repassword === '') {
            alert('All fields required!')
            return
        } else {
            if (password !== repassword) {
                alert('Password must match!')
            } else {
                props.signUpAction(user, email, password)

            }
        }
    }

    function typeEmail(e) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(e.target.value)) {
            // return 'Invalid Email';
            console.log('email is valid');
            setEmail(e.target.value)
            setIsEmailValidate(true)

        } else {
            setIsEmailValidate(false)
        }
    }

    function typePassword(e) {
        if (e.target.value.length > 3) {
            setPassword(e.target.value)
            setIsPasswordValidate(true)

        } else {
            setIsPasswordValidate(false)

        }
    }

    function typeRePassword(e) {
        setRePassword(e.target.value)
        if (password === e.target.value) {
            setIsPasswordMatch(true)

        } else {
            setIsPasswordMatch(false)

        }
    }

    return (
        <div className="signUpContainer">
            <div className="signUpContainer_card">
                <div className="signUpContainer_card-header">
                    <img src={logo} height="36px" alt="" />
                    <p>Maximise your Project Portfolio Success</p>
                </div>

                <div className="signUpContainer_card-body">

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Name</span>
                        <input className="textField" type="text" onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Company</span>
                        <input className="textField" type="text" onChange={e => setCompany(e.target.value)} />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Email</span>
                        <input className="textField email-field" type="email" data-active={isEmailValidate} onChange={typeEmail} />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Enter Password</span>
                        <input className="textField password-field" type="text" data-active={isPasswordValidate} onChange={typePassword} />
                    </div>

                    <div className="signUpContainer_card-body_field-container">
                        <span className="label">Re-enter Password</span>
                        <input className="textField rePassword-field" type="text" data-active={isPasswordMatch} onChange={typeRePassword} />
                    </div>
                </div>

                <div className="signUpContainer_card-footer">
                    <div className="signUp-actions">
                        <button className="signUp-actions_btn" onClick={() => props.history.push('/')}>Cancel</button>
                        {
                            props.isLoading === true ?
                                <button className="signUp-actions_btn">  <div className="loader"></div></button>
                                :
                                <button className="signUp-actions_btn" onClick={register}> Next</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

function mapStateToProps(state) {
    console.log('Redux State - SignUp Screen', state.root.signUp_success)
    return {
        isLoading: state.root.signUp_success
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        signUpAction: (user, email, password) => { dispatch(signUp(user, email, password)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);