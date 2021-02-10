import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as URL from './config';
import Container from "./components/layout/Container";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={URL.ROUTES.landing_page} exact component={Container}/>
                <Route path={URL.ROUTES.login_page} exact component={Container}/>
                <PrivateRoute path={URL.ROUTES.add_data_extension} exact component={Container}/>
                <AdminRoute path={URL.ROUTES.manage_package} exact component={Container}/>
                <AdminRoute path={URL.ROUTES.assign_user_package} exact component={Container}/>
                <Route path="" exact component={Container}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
