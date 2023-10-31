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
import axios from 'axios';

const AdminPopUps = ((props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(props.data.step);

    const openPopup = () => {
        console.log((props.data));
        // { 'action': 'delete-doctor', 'step': 1 , 'rowData': row}
        setIsOpen(true);
    };

    const closePopup = () => {
        // softDeleteUser();
        setStep(1);
        setIsOpen(false);
    };

    const softDeleteUser = async () => {
        console.log('in softDeleteUser::' + props.data.rowData['userId']);
        const url = `http://52.14.33.154:9092/youro/api/v1/provider/updateProfile`;
        try {
            // const temp = {
            //     userId: props.data.rowData['userId'],
            //     softDelete: true
            // };
            const temp = props.data.rowData;
            temp.softDelete = true;
            console.log(temp);
            const res = await axios.put(url, temp);
            console.log(res.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    const deletePrescription = async () => {
        // {medicineId: 2, medicineName: 'new vit', category: 'VITAMINS', diagnosis: 'Diag 103'}
        console.log('in deletePrescription::' + props.data.rowData['medicineId']);
        const url = `http://52.14.33.154:9092/youro/api/v1/deletePrescription/${props.data.rowData['medicineId']}`;
        try {
            const res = await axios.delete(url);
            console.log(res.data);
        }
        catch (err) {
            console.error(err);
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
        else if (props.data.action === 'delete-doctor') {
            let temp = step == 1 ? 2 : (step == 2 ? 3 : -1);
            console.log(temp);
            setStep(temp);
            console.log(step);
        }
    };

    return (
        <div>

            <IconButton color="error" onClick={openPopup}>
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
        </div>
    );
});

export default AdminPopUps;
