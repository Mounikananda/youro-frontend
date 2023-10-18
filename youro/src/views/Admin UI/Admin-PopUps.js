import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/Admin-ui/Admin-PopUps.css";
import {
    IconButton,
} from '@mui/material';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from '@mui/icons-material';

const AdminPopUps = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(props.data.step);

    const openPopup = () => {
        console.log((props.data));
        // { 'action': 'delete-doctor', 'step': 1 , 'rowData': row}
        setIsOpen(true);
    };

    const closePopup = () => {
        setStep(1);
        setIsOpen(false);
    };

    const handleSubmit = () => {
        let temp = step == 1 ? 2 : (step == 2 ? 3 : -1);
        console.log(temp);
        setStep(temp);
        console.log(step);
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
                                        <Button onClick={handleSubmit} variant="contained" color="error" startIcon={<DeleteIcon />}>
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
        </div>
    );
};

export default AdminPopUps;
