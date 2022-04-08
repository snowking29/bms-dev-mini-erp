import React from 'react';
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {SideBarData, SideBarDataAdmin} from './SideBarData';
import * as rs from "reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ isOpen, toggle }) => {
    const user = localStorage.getItem("name");
    return(
        <div className={classNames("sidebar", { "is-open": isOpen })}>
          <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
              &times;
            </span>
            <h3>VISION SOFTWARE</h3>
            <hr/>
          </div>
          <div className='sidebar-menu'>
            <h6>General</h6>
            <rs.Nav vertical className='list-unstyled pb-3'>
              {SideBarData.map((item,index) => {
                  return (
                    <rs.NavItem>
                      <rs.NavLink className='nav-item-link' tag={Link} to={item.path}>
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
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
                    <rs.NavItem>
                      <rs.NavLink className='nav-item-link' tag={Link} to={item.path}>
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        {' '}
                        {item.title}
                      </rs.NavLink>
                    </rs.NavItem>
                  )
                }
              )}
            </rs.Nav>
          </div>
          
          <div className='sidebar-footer'>
            <hr/>
            <h6>Bienvenido {user}</h6>
            <br/>
            <rs.Button color="primary" value='Buscar'><FontAwesomeIcon icon={icon.faSignOut}/> Salir</rs.Button>
          </div>
        </div>
    )
};
export default SideBar;