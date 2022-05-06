import React from 'react';
import {Link} from 'react-router-dom';
import {SideBarData, SideBarDataAdmin} from './SideBarData';
import * as rs from "reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user = localStorage.getItem("name");

const SideBar = ({isOpen, toggle}) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>VisionSW</h3>
    </div>
    <hr/>
    <div className="side-menu">
      <rs.Nav vertical className="nav-li list-unstyled pb-3">
        <h6>General</h6>
          {SideBarData.map((item,index) => {
              return (
                <rs.NavItem key={item.title}>
                  <rs.NavLink className='li-a li-a-links_name' tag={Link} to={item.path} disabled={item.disabled}>
                    <FontAwesomeIcon icon={item.icon} className="mr-2"/>
                    &nbsp;
                    {item.title}
                  </rs.NavLink>
                </rs.NavItem>
              )
            }
          )}
        <hr/>
        <h6>Admininistrador</h6>
          {SideBarDataAdmin.map((item,index) => {
              return (
                <rs.NavItem key={item.title}>
                  <rs.NavLink className='li-a li-a-links_name' tag={Link} to={item.path}>
                    <FontAwesomeIcon icon={item.icon} className="mr-2"/>
                    &nbsp;
                    {item.title}
                  </rs.NavLink>
                </rs.NavItem>
              )
            }
          )}
        <hr/>
        <h6>Bienvenido {user}</h6>
      </rs.Nav>
    </div>
  </div>
);

export default SideBar;