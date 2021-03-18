import React from 'react';
import { connect } from 'react-redux';

import { logOut } from '../../Store/Middlewares/middlewares';

function DashboardScreen(props) {

    return (
        <div className="dashboardContainer">
            <h2>Dashboard</h2>
            <button onClick={() => props.logOutAction()}>Log Out</button>
        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return ({
        logOutAction: () => { dispatch(logOut()) },
    })
}
export default connect(null, mapDispatchToProps)(DashboardScreen);