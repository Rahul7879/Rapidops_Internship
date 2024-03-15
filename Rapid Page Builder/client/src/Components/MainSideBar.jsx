import React, { useState } from 'react';
import logo from '../assets/Group.png'
import dashboard from '../assets/dashboard.png'
import content from '../assets/content.png'
import avatar from '../assets/avatar.png'
import notification from '../assets/notification.png'


const MainSidebar = () => {
    return (
        <div className="sidebar d-flex bg-light flex-column justify-content-between ">
            <div className="top">
            <img  src={logo} alt="" srcSet="" />
            <img  src={dashboard} alt="" srcSet="" />
            <img  src={content} alt="" srcSet="" />
            </div>
            <div className="bottom">
            <img  src={notification} alt="" srcSet="" />
            <img  src={avatar} alt="" srcSet="" />
            </div>
        </div>
    );
};

export default MainSidebar;
