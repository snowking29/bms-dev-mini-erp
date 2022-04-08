import React from 'react';
import { Route, Link } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            <Link to="/principal" />
        )} />
    );
};

export default PublicRoute;