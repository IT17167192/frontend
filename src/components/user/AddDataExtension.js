import React, {useEffect, useState} from "react";
import {isLoggedIn} from "../../helpers";
import {getUserInfoByUserId} from "../../services/home_service";
import {checkOutstanding, updateDataByUserId} from "../../services/add_data_service";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Redirect} from "react-router-dom";
import * as Constants from "../../config";

const AddDataExtension = ({history}) => {
    const {token, user} = isLoggedIn();

    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

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


    const initialPackages = [
        {
            id: '1',
            packageGb: 1,
            checked: false,
            quantity: 0
        },
        {
            id: '2',
            packageGb: 5,
            checked: false,
            quantity: 0
        },
        {
            id: '3',
            packageGb: 10,
            checked: false,
            quantity: 0
        },
        {
            id: '4',
            packageGb: 15,
            checked: false,
            quantity: 0
        },
        {
            id: '5',
            packageGb: 20,
            checked: false,
            quantity: 0
        }
    ];

    const [packages, setPackages] = useState(initialPackages);

    const [packageDetails, setPackageDetails] = useState({
        pricePerExtendUnit: 0,
        extendedData: 0
    });

    const {
        pricePerExtendUnit,
        extendedData
    } = packageDetails;

    useEffect(() => {
        checkOutstanding(token, user._id)
            .then(data => {
                setOutstandingState({...outstandingState, message: '', buttonLoading: false, buttonDisable: true})
                if(data.error){
                    setOutstandingState({...outstandingState, message: data.message, buttonLoading: false, buttonDisable: true})
                }else{
                    setOutstandingState({...outstandingState, message: '', buttonLoading: false, buttonDisable: false})
                }
            })
            .catch(err => console.error(err));
        getUserPackageDetails();
    }, [])

    const getUserPackageDetails = () => {
        setLoading(true);
        getUserInfoByUserId(token, user._id)
            .then(data => {
                setLoading(false);
                if(!data.error){
                    const p = data.message.package;
                    setPackageDetails({...packageDetails, pricePerExtendUnit: p.pricePerExtendUnit,
                        extendedData: data.message.extendedData});
                }
            })
            .catch(err => console.error(err));
    }

    const checkboxOnClick = (index) => (e) => {
        const newPackageSelection = [...packages];
        newPackageSelection[index].checked = e.target.checked;
        newPackageSelection[index].checked ? newPackageSelection[index].quantity = 1 : newPackageSelection[index].quantity = 0;
        setPackages(newPackageSelection);

    };

    const handleValueChange = (index) => (e) => {
        const newPackageSelection = [...packages];
        newPackageSelection[index].quantity = e.target.value;
        setPackages(newPackageSelection);

    }

    const calculateAmount = () => {
        let amount = 0;
        packages.forEach(p => {
            if(p.checked)
                amount += (p.quantity * pricePerExtendUnit * p.packageGb);
        })

        return (
            <span>
                {parseFloat(amount).toFixed(2)}
            </span>
        );
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setOutstandingState({...outstandingState, message: '', buttonDisable: true, buttonLoading: true});

        let dataExtension = 0;
        packages.forEach(p => {
            if(p.checked) {
                dataExtension += (p.quantity * p.packageGb)
            }
        })

        if(dataExtension <= 0){
            setOutstandingState({...outstandingState, buttonDisable: false, buttonLoading: false, message: 'Please Select at least one package'});
            //error message
        }else{
            dataExtension += extendedData
            updateDataByUserId(token, {extendedData: dataExtension}, user._id)
               .then(data => {
                   setOutstandingState({...outstandingState, message: '', buttonDisable: false, buttonLoading: false});
                   if(data.error){
                       setOutstandingState({...outstandingState, message: data.message});
                   }else{
                       //success message and redirect to home
                       setRedirect(true);
                   }
               })
               .catch(err => console.error(err));
        }
    }

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to={Constants.ROUTES.landing_page}/>
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Add Data Extension</h3>
            </div>
            {loading && (
                <div className="row mt-5 text-center">
                    <div className="col-12 mt-5">
                        <CircularProgress size={40}/>
                    </div>
                </div>
            )}
            {!loading && packages.map((p , index)=> (
                <div className="row mt-2" key={p.id}>
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-lg-2 col-md-2 col-sm-12">
                                        <input type="checkbox" value={p.checked} onClick={checkboxOnClick(index)}/>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12">
                                        {`${p.packageGb} GB`}
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                        {`For Unit : Rs. ${parseFloat(pricePerExtendUnit).toFixed(2)}`}
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-12">
                                        <input type="number" min={0} value={p.quantity} onChange={handleValueChange(index)} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="row mt-5">
                <div className="col-lg-2 col-md-2 col-sm-12">
                    Total amount to pay:
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12 text-left" style={{color: "red"}}>
                    {'Rs. '}{calculateAmount()}
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 text-right">
                    <button className="btn btn-success" disabled={buttonDisable} onClick={onSubmit}>
                        { buttonLoading ? <CircularProgress size={20}/> : 'Add extension' }
                    </button>
                </div>
            </div>
            <div className="row mt-2 mb-5">
                <div className="col-lg-2 col-md-2 col-sm-12">

                </div>
                <div className="col-lg-2 col-md-2 col-sm-12 text-left" style={{color: "red"}}>

                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 text-right" style={{color: "red"}}>
                    {message}
                </div>
            </div>
            {redirectUser()}
        </div>
    );
};

export default AddDataExtension;
