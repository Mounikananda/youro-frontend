import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/Admin-ui/Admin-PopUps.css";
import {
    IconButton,
} from '@mui/material';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { API_DETAILS } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

const AdminPopUps = ((props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(props.data.step);
    const [editCategoryName, setEditCategoryName] = useState('');

    const openPopup = () => {
        console.log((props.data));
        setIsOpen(true);
    };

    const closePopup = () => {
        setStep(1);
        setIsOpen(false);
    };

    const softDeleteUser = async () => {
        console.log('in softDeleteUser::' + props.data.rowData['userId']);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/provider/updateProfile`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            // const temp = {
            //     userId: props.data.rowData['userId'],
            //     softDelete: true
            // };
            const temp = props.data.rowData;
            temp.softDelete = true;
            console.log(temp);
            const res = await axios.put(url, temp, config);
            console.log(res.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    const deletePrescription = async () => {
        console.log('in deletePrescription::' + props.data.rowData['presId']);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/deletePrescription/${props.data.rowData['presId']}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.delete(url, config);
            console.log(res.data);
            toast.success('Deleted successfully!!');
            props.data.setParentRefreshStatus(true);
            props.data.postDeleteAction();
        }
        catch (err) {
            console.error(err);
            toast.error(err.response);
        }
    }


    const deleteCategory = async () => {
        // {presId: 2, medicineName: 'new vit', category: 'VITAMINS', diagnosis: 'Diag 103'}
        console.log('in deleteCategory:' + props.data.rowData['categoryID']);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/deleteCategory/${props.data.rowData['categoryID']}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.delete(url, config);
            console.log(res.data);
            toast.success('Deleted successfully!!');
            props.data.setParentRefreshStatus(true);
            //props.data.postDeleteAction();
        }
        catch (err) {
            console.error(" this is the error msg",err);
            toast.error(err.response.data.errorMessage);
        }
    }

    const deletePresType = async () => {
        // {medicineId: 2, medicineName: 'new vit', category: 'VITAMINS', diagnosis: 'Diag 103'}
        console.log('in deletePresType:' + props.data.rowData['presTypeID']);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/deletePresType/${props.data.rowData['presTypeID']}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.delete(url, config);
            console.log(res.data);
            toast.success('Deleted successfully!!');
            //props.data.postDeleteAction();
            props.data.setParentRefreshStatus(true);
            
        }
        catch (err) {
            console.error(" this is the error msg",err);
            toast.error(err.response.data.errorMessage);
        }
    }

    // const editCategory = async (newCategoryName) => {
    //     console.log('in editCategory::' + props.data.rowData['categoryID']);
    //     const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/editCategory/${props.data.rowData['categoryID']}`;
    //     const config = {
    //       headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Content-Type': 'application/json',
    //       },
    //     };
    //     try {
    //       const res = await axios.put(url, { newName: newCategoryName }, config);
    //       console.log(res.data);
    //       toast.success('Updated successfully!!');
    //       props.data.setParentRefreshStatus(true);
    //       props.data.postEditAction();
    //       setIsOpen(false); // Close the popup after successful edit
    //     } catch (err) {
    //       console.error(err);
    //       toast.error('Error updating category');
    //     }
    //   };
    

    const deleteDiagnosis = async () => {
        // {diagId: 9, name: 'tEST DIAG', info: 'Hardcoded info for now'}
        console.log('in deleteDiagnosis::' + props.data.rowData['diagId']);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/deleteDiagnosis/${props.data.rowData['diagId']}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.delete(url, config);
            console.log(res.data);
            toast.success('Deleted successfully!!');
            props.data.setParentRefreshStatus(true);
            props.data.postDeleteAction();
        }
        catch (err) {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        }
    }

    const handleConfirmDelete = () => {
        softDeleteUser();
        handleSubmit();
    }
    const handleSubmit = () => {
        console.log(props.data.rowData);
        if (props.data.action === 'delete-prescription') {
            console.log(props.data.rowData);

            deletePrescription();
            setIsOpen(false);
        }
        else if (props.data.action === 'delete-diagnosis') {
            console.log(props.data.rowData);
            deleteDiagnosis();
            setIsOpen(false);
        }
        else if (props.data.action === 'delete-doctor') {
            let temp = step == 1 ? 2 : (step == 2 ? 3 : -1);
            console.log(temp);
            setStep(temp);
            console.log(step);
        }
        else if (props.data.action === 'delete-category') {
            console.log(props.data.rowData);

            deleteCategory();
            setIsOpen(false);
        }
        else if (props.data.action === 'delete-pres_type') {
            console.log(props.data.rowData);

            deletePresType();
            setIsOpen(false);
        }
    };

    return (
        <div>
            <IconButton color="error" onClick={openPopup} className='delete-doctor-button'>
                <Delete />
            </IconButton>


            {
                props.data.action == 'delete-doctor' && step == 1 &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Are you sure you want to delete Dr. {props.data.rowData.firstName} {props.data.rowData.lastName}?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }
            {
                props.data.action == 'delete-doctor' && step == 2 &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Cofirm Delete?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleConfirmDelete} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }
            {
                props.data.action == 'delete-doctor' && step == 3 &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Delete Successful!</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </>
            }
            {
                props.data.action == 'delete-prescription' &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Are you sure you want to delete this prescription?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }

            {
                props.data.action == 'delete-category' &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Are you sure you want to delete this category?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }

            {
                props.data.action == 'delete-pres_type' &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Are you sure you want to delete this prescription type?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }


            {
                props.data.action == 'delete-diagnosis' &&
                <>
                    <Popup
                        open={isOpen}
                        closeOnDocumentClick
                        onClose={closePopup}
                        modal
                    >
                        <div className="popup-content-admin">
                            <div className='row'>
                                <div className='col-12 info-col'>
                                    <h3 style={{ marginLeft: '5%' }}>Are you sure you want to delete this Diagnosis?</h3>
                                </div>
                                <div className='col-12 buttons-col row'>
                                    <div className='col-6'></div>
                                    <div className='col-6'>
                                        <Button onClick={closePopup} variant="outlined" style={{ marginRight: '10px' }} >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className='col-12'></div> */}
                            </div>
                        </div>
                    </Popup>
                </>
            }
        </div>
    );
});

export default AdminPopUps;
