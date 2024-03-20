import React, { useState } from 'react';
import logo from '../assets/Group.svg'
import dashboard from '../assets/Frame 6.svg'

import content from '../assets/Frame 9.svg'
// import coloredContent from '../assets/Frame 9.svg'

import avatar from '../assets/Ellipse 133.svg'
import notification from '../assets/Notification.svg'
import { useNavigate } from 'react-router-dom';

const MainSidebar = (data) => {
    const navigate = useNavigate();
    return (
        <div className="sidebar d-flex bg-light flex-column justify-content-between ">
            <div className="top">
            <img   src={logo} alt="" srcSet="" />
            <img   src={dashboard} alt="" srcSet="" />
            <img   src={content} alt="" srcSet="" onClick={()=>navigate('/createpage')} />
            </div>
            <div className="bottom">
            <img   src={notification} alt="" srcSet="" />
            <img  src={avatar} alt="" srcSet="" />
            </div>
        </div>
    );
};

export default MainSidebar;
