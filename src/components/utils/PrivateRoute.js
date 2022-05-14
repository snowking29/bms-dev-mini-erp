import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from "../../api/services/auth-services";
import SideBar from '../sidebar/SideBar';
import classNames from "classnames";
import TopBar from '../topbar/TopBar';

function PrivateRoute ({component : Component}){
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    return AuthService.getCurrentUser() ? <>
        <div className='App wrapper'>
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen}/>
            <div className={classNames("content", { "is-open": sidebarIsOpen })}>
                <TopBar toggleSidebar={toggleSidebar} />
                <Component />
            </div>
        </div>
    </> : <Navigate to="/login" />
};

export default PrivateRoute;