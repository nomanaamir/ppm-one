import React, { useState, useEffect } from 'react';

import './scss/index.scss';
import './App.scss'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';


// screens
import SignInScreen from './screens/sign-in/index';
import SignUpScreen from './screens/sign-up/index';
import PaymentDetailsScreen from './screens/payment-details/index';
import HomeScreen from './screens/home/index'
function App(props) {

  console.log('propsssss', props)
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={SignInScreen} />
        <Route path="/signUp" component={SignUpScreen} />
        <Route path="/paymentDetails" component={PaymentDetailsScreen} />
        <Route path="/home" component={HomeScreen} />
      </Router>
    </div>
  );
}


export default App;
