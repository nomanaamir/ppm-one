import React, { useState, useEffect } from 'react';
import logo from '../../assets/PPMone Logo Grey and Blue.png'
import avatar from '../../assets/avatar.png'

import { NavLink, useLocation } from 'react-router-dom'
function Header(props) {
    const { user } = props
    const location = useLocation();
    const [screenName, setScreenName] = useState('portfolio dashboard')

    useEffect(() => {
        const { state } = location
        console.log('header', location);
        setScreenName(state)
    }, [location]);
    return (
        <div className="header-container">
            <div className="header-container_col">
                <div>
                    <img src={logo} height="40px" alt="" />
                </div>
                <div>
                    <span className="screen-indicator">{screenName}</span>
                </div>
            </div>

            <div className="header-container_col">
                <div className="user-widget">
                    <div className="user-widget_icon-frame">
                        <img src={avatar} alt="user-avatar" className="user-widget_icon-frame--img" />
                    </div>

                    <div className="user-widget_info">
                        <p className="user-widget_info--name">{user?.name}</p>
                        <p className="user-widget_info--profession">Portfolio Manager</p>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;

