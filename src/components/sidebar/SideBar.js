import React, {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {SideBarData} from './SideBarData';
import * as rs from "reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../api/services/auth-services";
import "../../css/Sidebar.css";

function SideBar ({isOpen, toggle}) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  var modules = [];
  const defaultUser = require('../../assets/user.png');

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.name)
      //setRole(currentUser.role)
      setRole('Administrador')
      setRoles(['Clientes','Entradas','Proveedores'])
    }
  },[])

  const logOutHandler = async() => {
    await AuthService.logout();
    navigate("/dashboard")
  }
  
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>VisionSW</h3>
      </div>
      <div className="d-flex flex-nowrap">
        <div className="sidebar-user-pic" onClick={() => navigate("/dashboard") }>
          <img className="img-responsive img-rounded" src={defaultUser} alt={defaultUser} />
        </div>
        <div className="sidebar-user-info">
          <div><span className='user-name' onClick={() => navigate("/dashboard") }>{user} <FontAwesomeIcon icon={icon.faGear}/></span></div>
          <div><span className='user-role'>{role}</span></div>
        </div>
      </div>
      <hr/>
      <div className="side-menu">
        <rs.Nav vertical className="nav-li list-unstyled pb-3">
          <h6>General</h6>
          {SideBarData.map((item,index) => {
            if (role === "Administrador") {
              modules.push(<rs.NavItem key={item.title}>
                <rs.NavLink className='li-a li-a-links_name' tag={Link} to={item.path} disabled={item.disabled}>
                  <FontAwesomeIcon icon={item.icon} className="mr-2"/>
                  &nbsp;&nbsp;
                  {item.title}
                </rs.NavLink>
              </rs.NavItem>)
            } else {
              roles.forEach( r => {
                if (r === item.title) {
                  modules.push(<rs.NavItem key={item.title}>
                    <rs.NavLink className='li-a li-a-links_name' tag={Link} to={item.path} disabled={item.disabled}>
                      <FontAwesomeIcon icon={item.icon} className="mr-2"/>
                      &nbsp;&nbsp;
                      {item.title}
                    </rs.NavLink>
                  </rs.NavItem>)
                }
              })
            }
          })}
          {modules}
          <hr/>
          <rs.NavItem className='logOut'>
            <rs.Button color='danger' onClick={logOutHandler}><FontAwesomeIcon icon={icon.faSignOut} className="mr-2"/> Salir</rs.Button>
          </rs.NavItem>
        </rs.Nav>
      </div>
    </div>
  )
}

export default SideBar;