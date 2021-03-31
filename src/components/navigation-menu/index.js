import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { logOut } from '../../Store/Middlewares/middlewares';
import { NavLink, useLocation } from 'react-router-dom'
function NavigationMenu(props) {
    const location = useLocation();

    const routes = [
        {
            name: 'home',
            header: 'portfolio dashboard',
            path: '/home/dashboard',
        },
        {
            name: 'projects',
            header: 'project list',
            path: '/home/projects'
        },
        {
            name: 'finance',
            header: 'finance',
            path: '/home/finance'
        },
        {
            name: 'reporting',
            header: 'reporting',
            path: '/home/reporting'
        },
        {
            name: 'add new project',
            header: 'add new project',
            path: '/home/add-new-project/add'
        }
    ]
    useEffect(() => {

        console.log('props-=-=-', props);
    }, []);
    return (
        <div className="menu-container">
            <div className="menu-container_col">
                {
                    routes.map((item, index) => {
                        return (

                            // <div key={index} className="navigation-link">
                            <NavLink
                                key={index}
                                className="navigation-link"
                                activeStyle={{ background: '#f7f8fa' }}
                                to={{ pathname: item.path, state: item.header }}
                            >
                                {item.name}
                            </NavLink>
                            // {/* <span className="navigation-link--text">{item.name}</span> */}
                            // </div>
                        )
                    })
                }
            </div>
            <div className="menu-container_col">
                <div className="navigation-link" onClick={() => props.logOutAction()}>
                    <span className="navigation-link--text">log out</span>
                </div>
            </div>
        </div>
    );
}



function mapDispatchToProps(dispatch) {
    return ({
        logOutAction: () => { dispatch(logOut()) },
    })
}
export default connect(null, mapDispatchToProps)(NavigationMenu);