import React from "react";
import * as Constants from '../../config';
import Home from "../user/Home";
import Login from "../user/Login";
import Page404 from "../common/Page404";
import AddDataExtension from "../user/AddDataExtension";
import ManagePackages from "../admin/ManagePackages";
import SignUp from "../user/SignUp";
import AssignUserPackages from "../admin/AssignUserPackage";

const appendView = (history) => {
    if (history.location.pathname === Constants.ROUTES.landing_page) {
        return (
            <Home pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.login_page) {
        return (
            <Login pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.add_data_extension) {
        return (
            <AddDataExtension pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.manage_package) {
        return (
            <ManagePackages pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.sign_up_page) {
        return (
            <SignUp pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.assign_user_package) {
        return (
            <AssignUserPackages pathname={history.location.pathname}/>
        );
    }else{
        return (
            <Page404 pathname={history.location.pathname} />
        );
    }
};

const WebLayout = (props) => {
    return (
        appendView(props.history)
    );
};

export default WebLayout;
