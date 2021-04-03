import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'

import { connect } from 'react-redux';
// screens
import DashboardScreen from '../../screens/dashboard/index';
import ProjectsScreen from '../../screens/projects/index';
import FinanceScreen from '../..//screens/finance/index';
import ReportingScreen from '../..//screens/reporting/index';
import AddNewProjectScreen from '../..//screens/add-new-project/index'
// components
import NavigationMenu from '../../components/navigation-menu/index'
import Header from '../../components/header/index';

//middlewares
import { getCurrentUserData, setNavigationProps } from '../../Store/Middlewares/middlewares';

function HomeScreen(props) {
    const { history } = props
    useEffect(() => {
        props.setNavigationPropsAction(history)
        props.getCurrentUserDataAction()
    }, []);
    return (
        <div className="Home">
            <Router>
                <Header user={props.userData}/>
                <div style={{ display: 'flex', minHeight: 'calc(100vh - 75px)' }}>
                    <NavigationMenu />
                    <div style={{
                        width: '100%',
                        background: '#f7f8fa',
                        padding: '20px'
                    }}>
                        <Route path="/" render={() => <Redirect to="/home/dashboard" />} />
                        <Route path="/home/dashboard" component={DashboardScreen} />

                        <Route path="/home/projects" component={ProjectsScreen} />
                        <Route path="/home/finance" component={FinanceScreen} />
                        <Route path="/home/reporting" component={ReportingScreen} />
                        <Route path="/home/add-new-project/add-project" component={AddNewProjectScreen} />

                    </div>
                </div>
            </Router>
        </div>
    );
}


function mapStateToProps(state) {
    console.log('Redux State - Home Screen', state.root.user_data)
    return {
        userData: state.root.user_data
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        getCurrentUserDataAction: () => { dispatch(getCurrentUserData()) },
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
