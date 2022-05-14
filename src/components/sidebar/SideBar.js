import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {SideBarData} from './SideBarData';
import * as rs from "reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../api/services/auth-services";
import "../../css/Sidebar.css";
import { useNavigate  } from 'react-router-dom';

function SideBar ({isOpen, toggle}) {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const defaultUser = require('../../assets/user.png');

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      console.log(currentUser)
      setUser(currentUser.name)
      setRole(currentUser.role)
    }
  },[])

  const logOutHandler = async() => {
    await AuthService.logout();
    window.location.reload(false);
  }
  const navigate = useNavigate();

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>VisionSW</h3>
      </div>
      <div className="d-flex flex-nowrap">
        <div className="sidebar-user-pic" onClick={() => navigate("/perfil") }>
          <img className="img-responsive img-rounded" src={defaultUser} alt={defaultUser} />
        </div>
        <div className="sidebar-user-info">
          <div><span className='user-name' onClick={() => navigate("/perfil") }>{user} <FontAwesomeIcon icon={icon.faGear}/></span></div>
          <div><span className='user-role'>{role}</span></div>
        </div>
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
                    &nbsp;&nbsp;
                    {item.title}
                  </rs.NavLink>
                </rs.NavItem>
              )
            }
          )}
          <hr/>
          <rs.NavItem className='logOut'>
            <rs.Button color='danger' onClick={logOutHandler}><FontAwesomeIcon icon={icon.faSignOut} className="mr-2"/> Salir</rs.Button>
          </rs.NavItem>
        </rs.Nav>
      </div>
    </div>
  )
};

export default SideBar;