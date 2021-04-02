import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
// screens
import AddProjectScreen from '../add-project/index'
// components

//middlewares
// import { getCurrentUserData, setNavigationProps } from '../../Store/Middlewares/middlewares';

function AddNewProjectScreen() {
    useEffect(() => {

    }, []);
    return (
        <div className="add-new-project-container">
            <Router>

                <Route path="/" render={() => <Redirect to="/home/add-new-project/add" />} />
                <Route path="/home/add-new-project/add" component={AddProjectScreen} />

            </Router>
        </div>
    );
}


// function mapStateToProps(state) {
//     console.log('Redux State - Home Screen', state.root.user_data)
//     return {
//         userData: state.root.user_data
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return ({
//         getCurrentUserDataAction: () => { dispatch(getCurrentUserData()) },
//         setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },

//     })
// }
export default connect(null, null)(AddNewProjectScreen);
