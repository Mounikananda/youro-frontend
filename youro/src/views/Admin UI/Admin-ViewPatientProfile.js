import axios from 'axios';
import React, { useState, useEffect } from "react";

import AdminSideBar from './Admin-SideBar';
import PreviousAppointments from '../Doctor UI/PreviousAppointments';
import {  useLocation } from 'react-router-dom';
import { API_DETAILS } from '../../App';
import Loader from '../../utils/loader';

const AdminViewPatientProfile = () => {

    const [prevAppts, setPrevAppts] = useState([]);
    const [upComingAppts, setUpcomingAppts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [providerInfo, setProviderInfo] = useState(null);
    const location = useLocation();


    useEffect(() => {

        const temp = {
            userId: location.state.userId,
            firstName: location.state.firstName,
            lastName: location.state.lastName,
            email: location.state.email,
            phone1: location.state.phone1,
            address: location.state.address,
            city: location.state.city,
            zipCode: location.state.zipCode,
            specialty: location.state.specialty,
            status: location.state.status,
            userType: location.state.userType,
            state: location.state.state,
            profileImageURL: location.state.profileImageURL,
            license: location.state.license,
            username: location.state.username,
            gender: location.state.gender,
            dateOfBirth: location.state.dateOfBirth
        };
        setProviderInfo(temp);
        fetchPrevAndUpcomingAppointments();
    }, []);


    const fetchPrevAndUpcomingAppointments = async () => {
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/appointments/${location.state.userId}`;
        console.log(providerInfo);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            console.log(res);
            setPrevAppts(res.data.previousAppointments);
            setUpcomingAppts(res.data.upComingAppointments);
            console.log('upcoming appts::::  ');
            console.log(res.data.upComingAppointments);
            console.log('upcoming appts::::  ');
            console.log(res.data.previousAppointments);
            setIsLoading(false);
        }
        catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }


    const TodayAppointmentList = (props) => {
        const [data, setData] = useState([]);

        useEffect(() => {
            setData(upComingAppts);
        }, []);

        return (
            <div>
                {data.map((item) => (
                    <div className='previous-appointment'>
                        <div>
                            <h3 >{item.time.split(',')[0]}, {item.patientstime} - {item.name}</h3>
                        </div>
                        <ul key={item.id}>
                            <li>Date : {item.time}</li>
                            <li>Time : {item.patientstime}</li>
                            <li>Diagnosisname: {item.diagnosisname}</li>
                            <li>Symptom score: {item.symptomscore}</li>
                            <li>Meet-type: {item.meetup}</li>
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
                <div className="admin-view-doctor-container" style={{ width: '100%' }}>
                    <div className='admin-view-doctor-header'>
                        <div className='header'>
                            <h1 style={{ marginLeft: '15px' }}>youro</h1>
                        </div>
                    </div>
                    <div className='admin-view-doctor-body'>
                        <Loader active={isLoading} />
                        {
                            !isLoading && <>
                                <div className='all-plans-patient'>
                                    <div className='admin-details-view'>
                                        <h2>Upcoming Appointments</h2>
                                        <TodayAppointmentList /></div>
                                    <div className='admin-details-view'>
                                        <h2>Previous Appointments</h2>
                                        <PreviousAppointments data={prevAppts} />
                                    </div>
                                    <div className='admin-details-view'>

                                        <img style={{ margin: '15px auto 30px auto', borderRadius: '5px', display: 'block' }} src='https://demo.cherrytheme.com/gems/wp-content/uploads/2018/11/our-team-04.jpg' alt="Preview" width="150" height="150" />
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <div style={{ width: '35%' }}>
                                                <p>First Name:</p>
                                                <p>Last Name:</p>
                                                <p>Email</p>
                                                <p>Mobile Number:</p><br />
                                                <p>License Number:</p><br />
                                                <p>Gender:</p>
                                                <p>Date of Birth:</p>
                                                <p>Address: </p>

                                            </div>
                                            <div style={{ width: '60%' }}>
                                                <p><strong>{providerInfo.firstName}</strong></p>
                                                <p><strong>{providerInfo.lastName}</strong></p>
                                                <p><strong>{providerInfo.email}</strong></p>
                                                <p><strong>{providerInfo.phone1}</strong></p>
                                                <p><strong>{providerInfo.license}</strong></p>
                                                <p><strong>{providerInfo.gender}</strong></p>
                                                <p><strong>{providerInfo.dateOfBirth}</strong></p>
                                                <p><strong>{providerInfo.address}</strong></p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>
    );

};

export default AdminViewPatientProfile;
