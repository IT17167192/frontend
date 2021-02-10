import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import { isLoggedIn } from "./index";
import {ROUTES} from "../config";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isLoggedIn() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: ROUTES.login_page, state: {from: props.location}}} />
    )}/>
);

export default PrivateRoute;
