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

const AdminPopUps = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {

        handleVerifyEmail();
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const handleVerifyEmail = () => {

        fetch('https://api.example.com/verify-email', {
            method: 'POST',

        })
            .then((response) => {
                if (response.ok) {

                    closePopup();
                } else {

                    alert('Email verification failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error verifying email:', error);
            });
    };

    const handleSubmit = () => {

        fetch('https://api.example.com/submit-form', {
            method: 'POST',

        })
            .then((response) => {
                if (response.ok) {

                    alert('Form submitted successfully.');
                } else {

                    alert('Form submission failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div>
            <IconButton color="error" onClick={openPopup}>
                <Delete />
            </IconButton>
            <Popup
                open={isOpen}
                closeOnDocumentClick
                onClose={closePopup}
                modal
            >
                <div className="popup-content-admin">
                    <div className='row'>
                        <div className='col-12 info-col'>
                            <h3 style={{marginLeft: '5%'}}>Are you sure you want to delete this item?</h3>
                            </div>
                        <div className='col-12 buttons-col row'>
                            <div className='col-6'></div>
                            <div className='col-6'>
                                <Button onClick={handleSubmit} variant="outlined" style={{ marginRight: '10px'}} >
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
        </div>
    );
};

export default AdminPopUps;
