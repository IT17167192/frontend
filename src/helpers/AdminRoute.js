import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import { isLoggedIn } from "./index";
import {ROUTES} from "../config";

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isLoggedIn() && parseInt(isLoggedIn().user.role) === 1  ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: ROUTES.login_page, state: {from: props.location}}} />
    )}/>
);

export default AdminRoute;
