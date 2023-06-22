import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import * as rs from "reactstrap";

const Topbar = ({ toggleSidebar }) => {

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
        </rs.Navbar>
    );
};

export default Topbar;
