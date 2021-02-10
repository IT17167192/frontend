import React from "react";
import {isLoggedIn} from "../../helpers";
import {logout} from "../../services/authentication_service";
import {Link} from "react-router-dom";
import {ROUTES} from "../../config";

const Header = (props) => {
    //use isAuthenticate route for get user details
    const {user} = isLoggedIn();
    //used props to work with toogle button
    return (
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
            <div className="container-fluid">
                <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button" onClick={props.collapseClass}><i
                    className="fas fa-bars"></i></button>
                <ul className="nav navbar-nav flex-nowrap ml-auto">

                    {/*if the user is logged in user, display name*/}
                    {!isLoggedIn() && (
                        <li className="nav-item">
                            <div className="nav-item">
                                <Link to={ROUTES.login_page} classMame=" d-none d-lg-inline mr-2 text-gray-600 small" style={{textDecoration: 'none'}}>LOGIN</Link>
                            </div>
                        </li>
                    )}

                    {!isLoggedIn() && (
                        <div className="d-none d-sm-block topbar-divider"></div>
                    )}

                    {!isLoggedIn() && (
                        <li className="nav-item">
                            <div className="nav-item" id="signupLink">
                                <Link to={ROUTES.sign_up_page} classMame=" d-none d-lg-inline mr-2 text-gray-600 small" style={{textDecoration: 'none'}}>SIGNUP</Link>
                            </div>
                        </li>
                    )}

                    {isLoggedIn() && (
                        <div className="d-none d-sm-block topbar-divider"></div>
                    )}

                    {isLoggedIn() && (
                        <li className="nav-item dropdown no-arrow" role="presentation">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link"
                                                                           data-toggle="dropdown" aria-expanded="false"
                                                                           href="#">
                                {/*Show logged in user name using the user variable*/}
                                <span className="d-none d-lg-inline mr-2 text-gray-600 small">{user.name}</span>
                                <i className="fas fa-user"></i>
                            </a>
                                <div
                                    className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu">
                                    {/*onclick event will trigger sign out */}
                                    <a className="dropdown-item" style={{cursor: 'pointer'}} role="presentation" onClick={() => {
                                        logout(() => {
                                        })
                                        window.location.reload();
                                    }}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" >
                                        </i>&nbsp;<span>Logout</span></a>
                                </div>
                            </div>
                        </li>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default Header;
