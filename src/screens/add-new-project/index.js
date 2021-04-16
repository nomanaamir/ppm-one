import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
// screens
import AddProjectScreen from '../add-project/index';
import AddBucketScreen from '../add-bucket/index';
import AddTaskScreen from '../add-task/index';
import EditFinanceScreen from '../edit-finance/index'
//middlewares
// import { getCurrentUserData, setNavigationProps } from '../../Store/Middlewares/middlewares';

function AddNewProjectScreen() {
    useEffect(() => {

    }, []);
    return (
        <div className="add-new-project-container" style={{ height: '100%' }}>
            {/* <Router> */}
            {/* <Route path="/" render={() => <Redirect to="/home/add-new-project/add-project" />} /> */}
            <Route path="/home/add-new-project/add-project" component={AddProjectScreen} />
            <Route path="/home/add-new-project/add-bucket" component={AddBucketScreen} />
            <Route path="/home/add-new-project/add-task" component={AddTaskScreen} />
            <Route path="/home/add-new-project/edit-finance" component={EditFinanceScreen} />


            {/* </Router> */}
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
