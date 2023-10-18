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

const AdminViewDoctorProfile = () => {


    const TodayAppointmentList = () => {
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
                    <div className='doctor-div'>
                        <div>
                            <h3 style={{ textDecoration: 'underline' }}>{item.name}</h3>
                        </div>
                        <ul key={item.id}>
                            <li>Date : {item.time}</li>
                            <li>Time : {item.patientstime}</li>
                            <li>Diagnosisname: {item.diagnosisname}</li>
                            <li>Symptom score: {item.symptomscore}</li>
                            <li>Meet-type: {item.meetup}</li>
                            {/* <p>{item.meetup}</p> */}
                        </ul>
                        <button className='join-now-button'>Join Now</button>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div>
            <div className='hm'>
                <div className='sidebar'>
                    <AdminSideBar data={'admin-doctors'} />
                </div>
                <div className="admin-view-doctor-container">
                    <div className='admin-view-doctor-header'>
                        <h1>youro</h1>
                    </div>
                    <div className='admin-view-doctor-body'>
                        <div className='all-plans-patient'>
                            <div className='care-plan-details-doctor-apt'>
                                <h2>Today's Appointments</h2>
                                <TodayAppointmentList /></div>
                            <div className='care-plan-details-doctor-apt'>
                                <h2>Previous Appointments</h2>
                                <PreviousAppointments />
                            </div>
                            <div className='care-plan-details-doctor-apt'>
                                <h2>Incomplete Encounters</h2>
                                <IncompleteEncounters />
                            </div>
                            <div className='care-plan-details-doctor-apt'>
                                <h2>Profile</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default AdminViewDoctorProfile;
