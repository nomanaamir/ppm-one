import React, { useState, useEffect } from 'react';
import logo from '../../assets/PPMone Logo Grey and Blue.png';
import visaLogo from '../../assets/visa.png';


import { connect } from 'react-redux';

import { signUp } from '../../Store/Middlewares/middlewares';
function PaymentDetailsScreen(props) {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postCode, setPostCode] = useState(null);
    const [country, setCountry] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState(null);




    const register = () => {
        const paymentDetails = {
            fullName,
            address,
            city,
            state,
            postCode,
            country,

            cardNumber,
            cardholderName,
            expiryDate,
            cvv,
        }
        if (fullName === '' || address === '' || city === '' || state === '' || postCode === null || country === '' || cardNumber === '' || cardholderName === '' || expiryDate === '' || cvv === null) {
            alert('All fields required!')
            return
        } else {
            props.signUpAction(paymentDetails)
        }
    }


    function typeCardNumber(e) {
        const { value } = e.target
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
        const onlyNumbers = value.replace(/[^\d]/g, '')

        const cardNum = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
            [$1, $2, $3, $4].filter(group => !!group).join(' ')
        )
        setCardNumber(cardNum)
        console.log(cardNum)

    }

    function typeExpiryDate(e) {
        const { value } = e.target
        const expiry = value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2');
        setExpiryDate(expiry)
        console.log(expiry)

    }

    return (
        <div className="paymentContainer">
            <div className="paymentContainer_card">
                <div className="paymentContainer_card-header">
                    <img src={logo} height="36px" alt="" />
                    <p>Maximise your Project Portfolio Success</p>
                </div>
                <h1 className="paymentContainer_heading">PAYMENT DETAILS</h1>

                <div className="paymentContainer_card-body">

                    <div className="paymentDetails_col">
                        <h4 className="paymentDetails_col-heading">BILLING INFO</h4>

                        <div className="paymentDetails_col_field-container">
                            <span className="label">Full Name</span>
                            <input className="textField" type="text" onChange={e => setFullName(e.target.value)} />
                        </div>

                        <div className="paymentDetails_col_field-container">
                            <span className="label">Address</span>
                            <input className="textField" type="text" onChange={e => setAddress(e.target.value)} />
                        </div>

                        <div className="paymentDetails_col_field-container">
                            <span className="label">City</span>
                            <input className="textField" type="text" onChange={e => setCity(e.target.value)} />
                        </div>

                        <div className="address-container">

                            <div className="paymentDetails_col_field-container">
                                <span className="label">State</span>
                                <input className="textField" type="text" onChange={e => setState(e.target.value)} />
                            </div>

                            <div className="paymentDetails_col_field-container">
                                <span className="label">Postcode</span>
                                <input className="textField" type="number" onChange={e => setPostCode(e.target.value)} />
                            </div>

                        </div>

                        <div className="paymentDetails_col_field-container">
                            <span className="label">Country</span>
                            <input className="textField" type="text" onChange={e => setCountry(e.target.value)} />
                        </div>

                    </div>

                    <div className="paymentDetails_col">
                        <h4 className="paymentDetails_col-heading">CREDIT CARD INFO</h4>

                        <div className="payment-container">

                            <div className="paymentDetails_col_field-container">
                                <span className="label">Card Number</span>
                                <input className="textField" value={cardNumber} maxLength="19" type="text" onChange={typeCardNumber} />
                            </div>

                            <div className="payment-container_icon">
                                <img src={visaLogo} alt="visa" />
                            </div>

                        </div>


                        <div className="paymentDetails_col_field-container">
                            <span className="label">Cardholder Name</span>
                            <input className="textField" type="text" onChange={e => setCardholderName(e.target.value)} />
                        </div>

                        <div className="paymentDetails_col_field-container">
                            <span className="label">Expiry Date</span>
                            <input className="textField" type="text" value={expiryDate} maxLength="5" onChange={typeExpiryDate} />
                        </div>

                        <div className="paymentDetails_col_field-container cvv-field">
                            <span className="label">CVV</span>
                            <input className="textField" min="3" type="number" onChange={e => { e.target.value = e.target.value.slice(0, 3); setCVV(e.target.value) }} />
                        </div>

                    </div>

                </div>

                <div className="widget-footer" style={{height: 'auto'}}>
                    <div className="widget-footer_actions">
                        <button className="widget-footer_actions--btn" onClick={() => props.history.push('/')}>Cancel</button>
                        {
                            props.isLoading === true ?
                                <button className="widget-footer_actions--btn">  <div className="loader"></div></button>
                                :
                                <button className="widget-footer_actions--btn" onClick={register}> Submit</button>
                        }
                    </div>
                </div>

            </div>



        </div>
    );
}

function mapStateToProps(state) {
    console.log('Redux State - Payment Detail Screen', state.root.signUp_success)
    return {
        isLoading: state.root.signUp_success
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        signUpAction: (paymentDetails) => { dispatch(signUp(paymentDetails)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsScreen);