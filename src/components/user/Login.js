import React, {useState} from "react";
import {login} from "../../services/authentication_service";
import {storeCredentials, isLoggedIn} from "../../helpers";
import {Redirect} from "react-router-dom";
import * as Constants from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = (props) => {

    const {user} = isLoggedIn();

    const [errorMessage, setErrorMessage] = useState("");

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
        redirect: false
    });

    const {
        email,
        password,
        error,
        loading,
        redirect
    } = loginDetails;

    const handleOnChange = (name) => (event) => {
        const value = event.target.value;
        setLoginDetails({...loginDetails, [name]: value});
    };

    const onClickSubmit = (event) => {
        event.preventDefault();
        setLoginDetails({...loginDetails, error: false, loading: true});
        setErrorMessage("");
        //check values empty?
        if(email === "" || password === ""){
            setLoginDetails({...loginDetails, error: true, loading: false});
            setErrorMessage("Fields cannot be empty!");
        }else{
            login({email: email, password: password})
                .then(response => {
                    if(response.error){
                        //show error message
                        setLoginDetails({...loginDetails, error: true, loading: false});
                        if(Array.isArray(response.message)){
                            if(response.message[0].param === "email")
                                setErrorMessage(response.message[0].msg);
                        }else{
                            setErrorMessage(response.message)
                        }
                    }else{
                        //Add authentication
                        //redirect user to home
                        storeCredentials({token: response.token, user: response.user}, () => {
                            setLoginDetails({...loginDetails, redirect: true, error: false, loading: false});
                        });
                    }
                })
        }
    }

    const showError = () => (
        <div id="errorMessage" className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    const redirectUser = () => {
        if (redirect) {
            if (user && (user.role === 1)) {
                return <Redirect to={Constants.ROUTES.landing_page}/>
            } else {
                return <Redirect to={Constants.ROUTES.landing_page}/>
            }
        }

        if (isLoggedIn()) {
            return <Redirect to={Constants.ROUTES.landing_page}/>
        }
    };

    return (
        <div className="text-center container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">
                    <div className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                        <label htmlFor="inputEmail" className="sr-only mt-5">Email address</label>

                        <input type="email" id="emailInputId" className="form-control mt-5" placeholder="Email address"
                               value={email}
                               onChange={handleOnChange('email')}/>

                        <label htmlFor="inputPassword" className="sr-only mt-2">Password</label>

                        <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Password"
                               value={password}
                               onChange={handleOnChange('password')}/>

                        <button id="loginButton" className="btn btn-lg btn-primary btn-block mt-5" onClick={onClickSubmit} disabled={loading}>
                            { loading ? <CircularProgress size={20}/> : 'Login' }
                        </button>
                        {showError()}
                        <p className="mt-5 mb-3 text-muted">© 2021-2022</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
            </div>
            {redirectUser()}
        </div>
    );
};

export default Login;
