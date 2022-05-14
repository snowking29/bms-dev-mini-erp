import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import * as rs from "reactstrap";
import { Link } from "react-router-dom";
import {SideBarData} from '../sidebar/SideBarData';
import { useLocation } from 'react-router-dom'

const Topbar = ({ toggleSidebar }) => {
    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
    const { pathname } = useLocation();

    return (
        <rs.Navbar
            color="light"
            light
            className="navbar shadow-sm p-3 mb-3 bg-white rounded"
            expand="md"
        >
        <rs.Button color="primary" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAlignJustify} />
        </rs.Button>
        <rs.NavbarToggler onClick={toggleTopbar} />
        <rs.Collapse isOpen={topbarIsOpen} navbar>
            <rs.Nav className="ml-auto" navbar>
                {SideBarData.map((item,index) => {
                    if (item.path === pathname){
                        return (
                            <rs.NavItem key={item.title}>
                                <rs.NavLink tag={Link} to={item.path}>
                                    {item.title}
                                </rs.NavLink>
                            </rs.NavItem>
                        )
                    }
                })}
            </rs.Nav>
        </rs.Collapse>
        </rs.Navbar>
    );
};

export default Topbar;
