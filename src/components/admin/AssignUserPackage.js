import React, {useEffect, useState} from "react";
import {getUsersWithNullPackage, updateUserPackage} from "../../services/admin/assign_package_service";
import {isLoggedIn} from "../../helpers";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {columns} from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MDBDataTable} from "mdbreact";
import {getAllPackages} from "../../services/admin/package_service";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import swal from "sweetalert";

const AssignUserPackages = (props) => {

    const {token} = isLoggedIn();

    const [selectedPackage, setSelectedPackage] = useState("");
    const [packages, setPackages] = useState([]);

    const [userData, setUserData] = useState({
        userId: '',
        error: false,
        errorMessage: ''
    });

    const {
        userId,
        error,
        errorMessage
    } = userData;

    //table data generated
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsersWithNullPackages();
        fetchAllPackages();
    }, []);

    const fetchAllPackages = () => {
        getAllPackages(token)
            .then(data => {
                if(!data.error){
                    setPackages(data.message);
                }
            })
            .catch(err => console.error(err));
    };

    const onSelect = (id) => {
        setUserData({...userData, userId: id});
    };

    const onPackageChangeHandler = (value) => {
        setSelectedPackage(value);
    };

    const clickOnSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setUserData({...userData, error: false, errorMessage: ''})
        if(userId === '' || selectedPackage === ''){
            setLoading(false);
            setUserData({...userData, error: true, errorMessage: 'Please select required details!'})
        }else{
            console.log(selectedPackage._id, userId)
            updateUserPackage(token, {packageId: selectedPackage._id}, userId)
                .then(data => {
                    setLoading(false);
                    console.log(data);
                    if(!data.error){
                        setUserData({...userData, userId: '', packageId: '', error: false, errorMessage: ''});
                        setSelectedPackage('');
                        swal("Successful!", "User's package updated Successfully!", "success");
                        fetchUsersWithNullPackages();
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const fetchUsersWithNullPackages = () => {
        setLoading(true);
        getUsersWithNullPackage(token)
            .then(data => {
                setLoading(false);
                if(!data.error){
                    let newData = [];
                    data.message.forEach(u => {
                        newData.push({
                            id : u._id,
                            email : u.email,
                            name : u.name,
                            action :<div>
                                <IconButton onClick={() => onSelect(u._id)}>
                                    <AddIcon fontSize="default" className = "text-primary"/>
                                </IconButton>
                            </div>
                        })
                    });

                    let table_data = {
                        columns : columns.assgign_table_columns,
                        rows : newData
                    }

                    setTableData(table_data);
                }
            })
            .catch(err => console.error(err))
    }

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Assign Package to a User</h3>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                    <Autocomplete
                        onChange={(event, value) => onPackageChangeHandler(value)}
                        freeSolo
                        value={selectedPackage}
                        id="free-solo-2-demo"
                        disableClearable
                        options={packages.map((option) => option)}
                        getOptionLabel={options => options.packageName? options.packageName: options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="package"
                                placeholder="Select Package"
                                label="Search Package"
                                margin="normal"
                                variant="outlined"
                                InputProps={{...params.InputProps, type: 'search'}}
                            />
                        )}
                    />
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12 mt-4">
                    <label htmlFor="inputName" className="sr-only">Package Name</label>
                    <input type="text" id="inputName" className="form-control" disabled={true} placeholder="Select Package from Table"
                           value={userId}/>
                </div>
            </div>

            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <button className="btn btn-lg btn-primary btn-block mt-5" onClick={clickOnSubmit} disabled={loading}>
                        { loading ? <CircularProgress size={20}/> : 'Assign Package' }
                    </button>
                </div>
            </div>
            {showError()}

            <div className="row mt-5">
                <div className="col-12 text-center">
                    {loading && (<CircularProgress size={30} className="mt-3" />)}
                    {!loading && (
                        <MDBDataTable className='shadow p-3 mb-5 bg-white rounded'
                                      bordered
                                      small
                                      hover
                                      data={tableData}
                                      responsive
                        >
                        </MDBDataTable>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignUserPackages;
