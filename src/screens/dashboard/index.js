import React from 'react';
import { connect } from 'react-redux';

import { logOut } from '../../Store/Middlewares/middlewares';

function DashboardScreen() {
    return (
        <div className="dashboardContainer">
            <h2>Dashboard Screen</h2>
            
        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return ({
        logOutAction: () => { dispatch(logOut()) },
    })
}
export default connect(null, mapDispatchToProps)(DashboardScreen);