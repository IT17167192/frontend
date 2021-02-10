import React, {useEffect, useState} from "react";
import {MDBDataTable} from "mdbreact";
import {columns} from "../../config";
import swal from "sweetalert";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import CircularProgress from "@material-ui/core/CircularProgress";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {faRedoAlt} from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import {isLoggedIn} from "../../helpers";
import {addPackage, deletePackageById, getAllPackages, updatePackage} from "../../services/admin/package_service";

const ManageCategories = (props) => {

    const {token} = isLoggedIn();

    //table data generated
    const [tableData, setTableData] = useState([]);

    const [packageDetails, setPackageDetails] = useState({
        _id: '',
        packageName: '',
        packageData: '',
        price: 0.00,
        maxOutstanding: 0.00,
        pricePerExtendUnit: 0.00,
        error: false,
        loading: false
    });

    const {
        _id,
        packageName,
        packageData,
        price,
        maxOutstanding,
        pricePerExtendUnit,
        error,
        loading
    } = packageDetails;

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllPackages();
    }, []);


    const fetchAllPackages = () => {
        setPackageDetails({...packageDetails, _id: '', packageName: '', packageData: '', price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: true});
        getAllPackages(token)
            .then(data => {
                if(!data.error){
                    setPackageDetails({...packageDetails, loading: false});
                    let newData = [];
                    data.message.forEach(p => {
                        newData.push({
                            packageId : p._id,
                            packageName : p.packageName,
                            packageData : p.packageData,
                            price : parseFloat(p.price).toFixed(2),
                            maxOutstanding : parseFloat(p.maxOutstanding).toFixed(2),
                            pricePerExtendUnit : parseFloat(p.pricePerExtendUnit).toFixed(2),
                            action :<div>
                                <IconButton onClick={() => onClickEdit(p._id, p.packageName, p.packageData
                                                , p.price, p.maxOutstanding, p.pricePerExtendUnit)}>
                                    <EditIcon fontSize="default" className = "text-primary"/>
                                </IconButton>
                                <IconButton onClick={() => onClickDelete(p._id)}>
                                    <DeleteIcon fontSize="default"  className = "text-danger"/>
                                </IconButton>
                            </div>
                        })

                        let table_data = {
                            columns : columns.package_table_columns,
                            rows : newData
                        }

                        setTableData(table_data);
                    });
                }
            })
            .catch(err => console.error(err));
    }

    const onClickEdit = (packId, packageName, packageData, price, maxOutstanding, pricePerExtendUnit ) => {
        setPackageDetails({...packageDetails, packageName: packageName, _id: packId, packageData: packageData
                            , pricePerExtendUnit: pricePerExtendUnit, price: price, maxOutstanding: maxOutstanding});
    };

    const onClickDelete = (packId) => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to reverse this transaction!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPackageDetails({...packageDetails, _id: '', packageName: '', packageData: '',
                        price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: true});
                    deletePackageById(token, packId)
                        .then(data => {
                            if(!data.error){
                                setPackageDetails({...packageDetails, _id: '', packageName: '', packageData: '',
                                    price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: false});
                                swal("Successful!", "Package deleted Successfully!", "success");
                                fetchAllPackages();
                            }
                        })
                } else {
                    swal("You cancelled the transaction!");
                }
            });
    }

    const handleOnChange = (name) => (event) => {
        const value = event.target.value;
        setPackageDetails({...packageDetails, [name]: value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setPackageDetails({...packageDetails, error: false, loading: true});
        if(packageName === '' || packageData === '' || price === 0.00 || maxOutstanding === 0.00 || pricePerExtendUnit === 0.00){
            setPackageDetails({...packageDetails, error: true, loading: false});
            setErrorMessage("Please fill all fields!");
        }else {
            if(_id === ''){
                addPackage(token, {packageName: packageName, packageData: packageData, price: price,
                           maxOutstanding: maxOutstanding, pricePerExtendUnit: pricePerExtendUnit})
                    .then(data => {
                        if(!data.error){
                            setPackageDetails({_id: '', packageName: '', packageData: '',
                                price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: false});
                            swal("Successful!", "Package Successfully Created!", "success");
                            fetchAllPackages();
                        }
                    })
                    .catch(err => console.error(err));
            }else{
                updatePackage(token, {_id: _id, packageName: packageName, packageData: packageData, price: price,
                    maxOutstanding: maxOutstanding, pricePerExtendUnit: pricePerExtendUnit}, _id)
                    .then(data => {
                        if(!data.error){
                            setPackageDetails({...packageDetails, _id: '', packageName: '', packageData: '',
                                price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: false});
                            swal("Successful!", "Package Successfully Updated!", "success");
                            fetchAllPackages();
                        }
                    })
                    .catch(err => console.error(err));
            }
        }
    };

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    const clearAll = (event) => {
        event.preventDefault();
        setPackageDetails({...packageDetails, _id: '', packageName: '', packageData: '',
            price: 0.00, maxOutstanding: 0.00, pricePerExtendUnit: 0.00, error: false, loading: false});
    }

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Manage Packages</h3>
            </div>
            <div className="col-12">
                <div className="row mt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="inputName" className="sr-only">Package Name</label>
                        <input type="text" id="inputName" className="form-control" placeholder="Enter Package Name"
                               value={packageName}
                               onChange={handleOnChange('packageName')}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="inputPackageData" className="sr-only">Package Data</label>
                        <input type="text" id="inputPackageData" className="form-control" placeholder="Enter Data Limit of the Package"
                               value={packageData === 0 ? '': packageData}
                               onChange={handleOnChange('packageData')}/>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="inputPrice" className="sr-only">Package Price</label>
                        <input type="text" id="inputPrice" className="form-control" placeholder="Enter Package Price"
                               value={price === 0 ? '': price}
                               onChange={handleOnChange('price')}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="inputCreditLimit" className="sr-only">Credit Limit</label>
                        <input type="text" id="inputCreditLimit" className="form-control" placeholder="Enter Credit Limit of the Package"
                               value={maxOutstanding === 0 ? '': maxOutstanding}
                               onChange={handleOnChange('maxOutstanding')}/>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="inputPricePerExtendUnit" className="sr-only">Price per Extension Unit</label>
                        <input type="text" id="inputPricePerExtendUnit" className="form-control" placeholder="Enter the Price per Extension"
                               value={pricePerExtendUnit === 0 ? '': pricePerExtendUnit}
                               onChange={handleOnChange('pricePerExtendUnit')}/>
                    </div>
                </div>

                <div className="row mt-5 mb-5">
                    <div className="col-auto">
                        <button className="btn btn-success" onClick={onSubmit} disabled={loading}>
                            <FontAwesomeIcon size={"1x"} icon={faPlane}/> {' '}{_id === '' ? 'Save': 'Update'}
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-warning" style={{color: '#ffffff'}} onClick={clearAll}><FontAwesomeIcon size={"1x"}
                                                                                                                           icon={faRedoAlt}/> {' '}Clear
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
        </div>
    );
};

export default ManageCategories;
