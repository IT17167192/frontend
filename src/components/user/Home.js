import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Constants from "../../config";
import {isLoggedIn} from "../../helpers";
import {getUserInfoByUserId} from "../../services/home_service";
import {ROUTES} from "../../config";
import {checkOutstanding} from "../../services/add_data_service";

const Home = (props) => {
    const {token, user} = isLoggedIn();

    const [outstandingState, setOutstandingState] = useState({
        buttonLoading: false,
        buttonDisable: false,
        message: ''
    });

    const {
        buttonLoading,
        buttonDisable,
        message
    } = outstandingState;

    const [packageDetails, setPackageDetails] = useState({
        packageName: 'No Package Found',
        packageData: 0,
        price: 0,
        maxOutstanding: 0,
        pricePerExtendUnit: 0,
        currentUsage: 0,
        extendedData: 0
    });

    const {
        packageName,
        packageData,
        price,
        maxOutstanding,
        pricePerExtendUnit,
        currentUsage,
        extendedData
    } = packageDetails;

    useEffect(() => {
        if(isLoggedIn()){
            checkOutstanding(token, user._id)
                .then(data => {
                    setOutstandingState({...outstandingState, message: '', buttonLoading: false, buttonDisable: true})
                    if(data.error){
                        setOutstandingState({...outstandingState, message: data.message, buttonLoading: false, buttonDisable: true})
                        if(data.message !== 'No package was found!'){
                            getUserUsageDetails();
                        }
                    }else{
                        setOutstandingState({...outstandingState, message: '', buttonLoading: false, buttonDisable: false})
                        getUserUsageDetails();
                    }
                })
                .catch(err => console.error(err));
        }
    }, []);

    const getUserUsageDetails = () => {
        getUserInfoByUserId(token, user._id)
            .then(data => {
                if(!data.error){
                    const p = data.message.package;
                    setPackageDetails({...packageDetails, packageName: p.packageName,
                        packageData: p.packageData, price: p.price,
                        maxOutstanding: p.maxOutstanding, pricePerExtendUnit: p.pricePerExtendUnit,
                        currentUsage: data.message.currentUsage, extendedData: data.message.extendedData});
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Home</h3>
            </div>

            {!isLoggedIn() && (
                <div className="row">
                    <div className="col-12" style={{fontSize: "20px"}}>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                Please <Link to={ROUTES.login_page}>Login</Link> Now
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isLoggedIn() && (
                <div>
                    <div className="row">
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-primary py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-primary font-weight-bold text-xs mb-1"><span>{packageName}</span>
                                            </div>
                                            <div className="text-dark font-weight-bold h5 mb-0"><span>{`Rs. ${price} - ${packageData}GB`}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-calendar fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-success py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-success font-weight-bold text-xs mb-1"><span>Credit Limit</span>
                                            </div>
                                            <div className="text-dark font-weight-bold h5 mb-0"><span>{`Rs. ${maxOutstanding}`}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-info py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-info font-weight-bold text-xs mb-1">
                                                <span>Used</span></div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="text-dark font-weight-bold h5 mb-0 mr-3"><span>{`${(currentUsage / packageData) ? Math.ceil((currentUsage / (packageData + extendedData)) * 100): '0'} %`}</span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm">
                                                        <div className="progress-bar bg-info" aria-valuenow={(currentUsage / packageData) ? (currentUsage / (packageData + extendedData)) * 100: 0}
                                                             aria-valuemin="0" aria-valuemax="100" style={{width: `${ (currentUsage / packageData) ?  (currentUsage / (packageData + extendedData)) * 100: 0}%`}}><span
                                                            className="sr-only">{`${(currentUsage / packageData) ? Math.ceil((currentUsage / (packageData + extendedData)) * 100) : 0} %`}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-chart-bar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-left-warning py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col mr-2">
                                            <div className="text-uppercase text-warning font-weight-bold text-xs mb-1"><span>Extended Data</span>
                                            </div>
                                            <div className="text-dark font-weight-bold h5 mb-0"><span>{`${extendedData}GB`}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-info-circle fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12" style={{color: "red", fontSize: "25px"}}>
                            Bills & Payments
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="card shadow-sm">
                                <div className="card-header" style={{backgroundColor: "#8DC63F"}}>
                                    <div className="card-title" style={{color: "#FFFFFF", fontSize: "20px"}}>
                                        Current Outstanding
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <span className="font-weight-bold" style={{fontSize: "20px"}}>{`Payment : Rs ${parseFloat(price + (pricePerExtendUnit * extendedData)).toFixed(2)}`}</span>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <button className="btn btn-danger">Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mb-5 mt-3">
                            <div className="card shadow-sm">
                                <div className="card-header">
                                    <div className="card-title" style={{fontSize: "20px"}}>
                                        Data Usage
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="font-weight-bold">{`Anytime Data Used`}</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span className="font-weight-bold">{currentUsage <= packageData ? `: ${currentUsage}GB/${packageData}GB`: `: ${packageData}GB/${packageData}GB`}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-gradient-secondary" aria-valuenow={(currentUsage / packageData) * 100}
                                                     aria-valuemin="0" aria-valuemax="100" style={{width: `${(currentUsage / packageData) * 100}%`}}><span
                                                    className="sr-only">{`${Math.ceil((currentUsage / packageData) * 100)} %`}</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-6">
                                            <span className="font-weight-bold">{`Extended Data Used `}</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span className="font-weight-bold">
                                                {
                                                    extendedData > 0 && (currentUsage - packageData) > 0 && (
                                                        <span>{`: ${currentUsage - packageData}GB`}/{`${extendedData}GB`}</span>
                                                )}

                                                {
                                                    (currentUsage - packageData) <= 0 && (
                                                        <span>{`: 0GB`}/{`${extendedData}GB`}</span>

                                                )}

                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-gradient-secondary" aria-valuenow={((currentUsage - packageData) / extendedData) * 100}
                                                     aria-valuemin="0" aria-valuemax="100" style={{width: `${((currentUsage - packageData) / extendedData) * 100}%`}}><span
                                                    className="sr-only">{`${Math.ceil(((currentUsage - packageData) / extendedData) * 100)} %`}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 text-center">
                                            <hr/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-12">
                                            {!buttonDisable && (
                                                <Link to={ROUTES.add_data_extension} className="btn btn-dark">
                                                    Add Data Add-On
                                                </Link>
                                            )}

                                            {buttonDisable && (
                                                <button className="btn btn-dark" style={{cursor: 'no-drop'}} disabled={buttonDisable}>
                                                    Add Data Add-On
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12" style={{color: "red"}}>
                                            {message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
