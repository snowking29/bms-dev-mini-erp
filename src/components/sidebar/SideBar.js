import React from 'react';
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {SideBarData, SideBarDataAdmin} from './SideBarData';
import * as rs from "reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const user = localStorage.getItem("name");
    return(
        <div className="sidebar">
          <div className="logo-details">
            <i><FontAwesomeIcon icon={icon.faEye}/></i>
            <h6 className='logo-name'>VisionSW</h6>
          </div>
          <hr/>
          <div className='nav-list'>
            <h6>General</h6>
              <rs.Nav vertical className='nav-li' >
                {SideBarData.map((item,index) => {
                    return (
                      <rs.NavItem >
                        <rs.NavLink  className='li-a li-a-links_name'  tag={Link} to={item.path}>
                          <div className='li-icon'><FontAwesomeIcon icon={item.icon}/></div>
                          {' '}
                          {item.title}
                        </rs.NavLink>
                      </rs.NavItem>
                    )
                  }
                )}
              <hr/>
              <h6>Administracion</h6>
                {SideBarDataAdmin.map((item,index) => {
                    return (
                      <rs.NavItem >
                        <rs.NavLink  className='li-a li-a-links_name'  tag={Link} to={item.path}>
                          <div className='li-icon'><FontAwesomeIcon icon={item.icon}/></div>
                          {' '}
                          {item.title}
                        </rs.NavLink>
                      </rs.NavItem>
                    )
                  }
                )}
            <hr/>
              <h6>Bienvenido {user}</h6>
              <rs.NavItem >
                <rs.NavLink className='li-a li-a-links_name' tag={Link} to='/logout'>
                  <div className='li-icon'><FontAwesomeIcon icon={icon.faSignOut}/>{' '}Salir</div>
                </rs.NavLink>
              </rs.NavItem>
            </rs.Nav>
          </div>
        </div>
    )
};
export default SideBar;