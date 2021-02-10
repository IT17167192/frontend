import React, {useState} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../config";
import {isLoggedIn} from "../../helpers";

const SideBar = (props) => {
    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return 'nav-link active';
        } else {
            return 'nav-link';
        }
    };

    return (
        <nav className={props.toggler}>
            <div className="container-fluid d-flex flex-column p-0">
                <Link to={ROUTES.landing_page} className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-tachometer-alt"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>Dashboard</span></div>
                </Link>
                <hr className="sidebar-divider my-0" />
                <ul className="nav navbar-nav text-light mt-3" id="accordionSidebar">
                    <li className="nav-item" role="presentation">
                        <Link className={isActive(props.history, ROUTES.landing_page)}
                              to={ROUTES.landing_page}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    {isLoggedIn() && (
                        <li className="nav-item" role="presentation">
                            <Link className={isActive(props.history, ROUTES.add_data_extension)}
                                  to={ROUTES.add_data_extension}>
                                <i className="fas fa-database"></i>
                                <span>Add Data Extension</span>
                            </Link>
                        </li>
                    )}

                    {isLoggedIn() && isLoggedIn().user.role === 1 && (
                        <li className="nav-item" role="presentation">
                            <Link className={isActive(props.history, ROUTES.assign_user_package)}
                                  to={ROUTES.assign_user_package}>
                                <i className="fas fa-user-check"></i>
                                <span>Assign Package to a User</span>
                            </Link>
                        </li>
                    )}

                    {isLoggedIn() && isLoggedIn().user.role === 1 && (
                        <li className="nav-item" role="presentation">
                            <Link className={isActive(props.history, ROUTES.manage_package)}
                                  to={ROUTES.manage_package}>
                                <i className="fas fa-edit"></i>
                                <span>Package Management</span>
                            </Link>
                        </li>
                    )}
                    {!isLoggedIn() && (
                        <li className="nav-item" role="presentation" id="testLogin">
                            <Link id="testClass" className={isActive(props.history, ROUTES.login_page)}
                                  to={ROUTES.login_page}>
                                <i className="fas fa-user-alt"></i>
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                    {!isLoggedIn() && (
                        <li className="nav-item" role="presentation">
                            <Link className={isActive(props.history, ROUTES.sign_up_page)}
                                  to={ROUTES.sign_up_page}>
                                <i className="fas fa-user-plus"></i>
                                <span>Create an Account</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="text-center d-none d-md-inline">
                    <button className="btn rounded-circle border-0" id="sidebarToggle" onClick={props.toggleClass} type="button"></button>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;


