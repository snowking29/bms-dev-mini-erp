import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../../api/services/auth-services";

function PrivateRoute ({ component : Component}){
    return AuthService.getCurrentUser() ? <> <Component/> </> : <Link to="/login" />
};

export default PrivateRoute;