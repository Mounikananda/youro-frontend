import axios from 'axios';
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Container,
    Tooltip,
    Switch
} from '@mui/material';

import { Delete } from '@mui/icons-material';
// import "../../styles/Admin-ui/Admin-HomePage.css";
import { USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom';
import PreviousAppointments from '../Doctor UI/PreviousAppointments';
import IncompleteEncounters from '../Doctor UI/IncompleteEncounters';

const AdminViewPatientProfile = () => {


    const TodayAppointmentList = (props) => {
        const [data, setData] = useState([]);

        useEffect(() => {

            const mockData = [
                { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
                { id: 2, name: 'John Doe', time: "10-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
                { id: 3, name: 'John Doe', time: "11-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
                { id: 4, name: 'John Doe', time: "12-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis4', symptomscore: '40', meetup: 'follow-up' },
                { id: 5, name: 'John Doe', time: "13-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis5', symptomscore: '50', meetup: 'follow-up' },
                { id: 6, name: 'John Doe', time: "14-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis6', symptomscore: '60', meetup: 'new meet' },
                { id: 7, name: 'John Doe', time: "15-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis7', symptomscore: '70', meetup: 'follow-up' },
                { id: 8, name: 'John Doe', time: "16-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis8', symptomscore: '80', meetup: 'new meet' },
            ];

            setTimeout(() => {
                setData(mockData);
            }, 1000);
        }, []);

        return (
            <div>
            {data.map((item) => (
                <div className='previous-appointment'> 
                <div>
                <h3 >{item.time.split(',')[0]}, {item.patientstime} - {item.name}</h3>
                </div>
                <ul key={item.id}>
                <li>Diagnosisname: {item.diagnosisname}</li>
                {/* <li>Symptom score: {item.symptomscore}</li> */}
                <li style={ {textDecoration:'underline',color:'#9CB189', cursor: 'pointer'}} >Symptom score: {item.symptomscore}</li>
                    {/* <p>{item.meetup}</p> */}
                </ul>
                </div> 
            ))}
        </div>
        );
    };


    return (
        <div>
            <div className='hm'>
                <div className='sidebar'>
                    <AdminSideBar data={'admin-patients'} />
                </div>
                <div className="admin-view-doctor-container" style={{width: '100%'}}>
                    <div className='admin-view-doctor-header'>
                    <div className='header'>
                                <h1 style={{marginLeft: '15px'}}>youro</h1>
                            </div>
                    </div>
                    <div className='admin-view-doctor-body'>
                        <div className='all-plans-patient'>
                            <div className='admin-details-view'>
                                <h2>Upcoming Appointments</h2>
                                <TodayAppointmentList/></div>
                            <div className='admin-details-view'>
                                <h2>Previous Appointments</h2>
                                <PreviousAppointments />
                            </div>
                            <div className='admin-details-view'>

                                <img  style={{margin: '15px auto 30px auto', borderRadius: '5px', display: 'block'}} src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Preview" width="150" height="150" />
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <div style={{width: '45%'}}>
                                        <p>First Name:</p>
                                        <p>Last Name:</p>
                                        <p>Email</p>
                                        <p>Mobile Number:</p>
                                        <p>Gender:</p>
                                        <p>Date of Birth:</p>
                                        <p>Subscription Plan: </p>
                                        <p>Subscription Ends On:</p>
                                        <p>Address: </p>

                                    </div>
                                    <div style={{width: '50%'}}>
                                        <p><strong>Mr. Alan Hunt</strong></p>
                                        <p><strong>XXXXXXXX</strong></p>
                                        <p><strong>Farah2000@gmail.com</strong></p>
                                        <p><strong>716-819-9000</strong></p>
                                        <p><strong>Male</strong></p>
                                        <p><strong>12/12/2000</strong></p>
                                        <p><strong>Yearly plan</strong></p>
                                        <p><strong>12/12/2023</strong></p>
                                        <p><strong>XXXXXXXXXXXXXXXX</strong></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default AdminViewPatientProfile;
