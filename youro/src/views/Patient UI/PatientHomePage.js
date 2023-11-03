import { React, useState,useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import "../../styles/Patient-ui/Patient-Homepage.css";
import SideBar from './SideBar';
import PatientSymptomChart from './Patient-symptom-chart';
import Loader from '../../utils/loader';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Popmenu from './Popupmenu';
import SymptomCalculator from './SymptomCalculator';
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from '../../App';
import Youroheader from '../Youro-header';
import CarePlan from './PatientCareplan';


const PatientHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const uId = Cookies.get(COOKIE_KEYS.userId);//1; 
  const [prevAppts, setPrevAppts] = useState([]);
  const [upComingAppts, setUpcomingAppts] = useState([]);
  useEffect(() => {
    fetchPrevAndUpcomingAppointments();
  }, []);

  const fetchPrevAndUpcomingAppointments = async () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/appointments/${uId}`;
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
    }
    catch (err) {
      console.error(err);
    }
  }

  // const CarePlan = () => {
  //   const [data, setData] = useState([]);
  //   const [activeLoader, setActiveLoader] = useState(false);

  //   useEffect(() => {
      
  //     const mockData = [
  //       {
  //         "Prescription": {
  //           "Dolo":
  //             "take one in the morning and 1 in the evening",
  //           "Paracetamol": "take 1 after dinner"
  //         },
  //         "Supplements": {
  //           "Dolo": "take one in the morning and 1 in the evening",
  //           "Paracetamol": "take 1 after dinner"
  //         },
  //         "Lifestylemodifications": [
  //           "Make sure to drink 3 - 5 liters of water daily",
  //           "Spend at least an hour in the sun",
  //           "Don't drink coffee",
  //           "Don't smoke",
  //           "Don't consume alcohol"
  //         ]
  //       }
  //     ];
  //     setData(mockData);
  //     // const fetchData = async () => {
  //     //   try {

  //     //     // const response = await fetch('any-api');
  //     //     // const result = await response.json();
  //     //     setData(mockData);
  //     //     setIsLoading(false);
  //     //   } catch (error) {
  //     //     console.error('Error fetching data:', error);
  //     //     setIsLoading(false);
  //     //   }
  //     // };

  //     // fetchData();

  //   }, []);


  //   return (
  //     <div>
  //       {data.map((item, index) => (
  //         <div className='patient-div' key={index}>
  //           <h3 >Reduce your symptom score by 'x' points before your next follow-up.</h3>

  //           {Object.keys(item).map((category, categoryIndex) => (
  //             <div key={categoryIndex + 1}>
  //               <h4>{category}</h4>
  //               <ul>
  //                 {Object.entries(item[category]).map(([medication, instruction], i) => (
  //                   <li key={i}>
  //                     {/* {medication}: {instruction} */}
  //                     {category !== 'Lifestylemodifications' ? `${medication}: ${instruction}` : `${instruction}`}
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const PreviousAppointments = () => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   const mockData1 = [
    //     {
    //       patientName: "Mr. Mandava",
    //       doctorName: "Ms. asdf",
    //       patientId: "1",
    //       doctorId: "10",
    //       apptStartTime: "00:00:00",
    //       link: "ZOOM LINK",
    //       apptId: "1",
    //       apptEndTime: "02:00:00",
    //       apptDate: "2023-11-01",
    //       status: "SCHEDULED"
    //     },
    //     {
    //       patientName: "Mr. Mandava",
    //       doctorName: "Ms. asdf",
    //       patientId: "1",
    //       doctorId: "9",
    //       apptStartTime: "08:00:00",
    //       link: "ZOOM LINK",
    //       apptId: "7",
    //       apptEndTime: "10:00:00",
    //       apptDate: "2023-12-03",
    //       status: "SCHEDULED"
    //     },
    //     {
    //       patientName: "Mr. Mandava",
    //       doctorName: "Mr. asdf",
    //       patientId: "1",
    //       doctorId: "8",
    //       apptStartTime: "11:45:00",
    //       link: "ZOOM LINK",
    //       apptId: "9",
    //       apptEndTime: "14:00:00",
    //       apptDate: "2023-12-07",
    //       status: "SCHEDULED"
    //     },
    //     {
    //       patientName: "Mr. Mandava",
    //       doctorName: "Ms. asdf",
    //       patientId: "1",
    //       doctorId: "9",
    //       apptStartTime: "08:50:00",
    //       link: "ZOOM LINK",
    //       apptId: "18",
    //       apptEndTime: "10:50:00",
    //       apptDate: "2021-12-03",
    //       status: "CANCELED"
    //     },
    //     {
    //       patientName: "Mr. Mandava",
    //       doctorName: "Mr. asdf",
    //       patientId: "1",
    //       doctorId: "8",
    //       apptStartTime: "11:45:00",
    //       link: "ZOOM LINK",
    //       apptId: "20",
    //       apptEndTime: "14:40:00",
    //       apptDate: "2022-12-07",
    //       status: "COMPLETED"
    //     }
    //   ]

    //   setData(mockData1);
    // }, []);

    return (
      <div className="previous-appointment-wrapper">
        {
          (prevAppts==null || prevAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

        {prevAppts && prevAppts.length!= 0 &&  prevAppts.map((item) => (
          <div className='previous-appointment' >
            <div>
              <h3 >{item.apptDate} - {item.doctorName}</h3>
            </div>
            <ul key={item.apptId}>
              {/* <li>Diagnosisname: {item.diagnosisname}</li> */}
              <li style={{ textDecoration: 'underline', color: '#9CB189' }}>view careplan and note provided</li>
              <li>Status: {item.status}</li>
              {/* <p>{item.meetup}</p> */}
            </ul>
          </div>
        ))
        }
      </div>
    );
  }

  const UpcomingAppointments = () => {
    const [data, setData] = useState([]);

    useEffect(() => {

      const mockData = [
        { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
        { id: 2, name: 'John Doe', time: "10-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },]

      setData(mockData);
    }, []);

    return (
      <div>
        {
          (upComingAppts==null || upComingAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

          {upComingAppts && upComingAppts.length!= 0 && upComingAppts.map((item) => (
            <div className='previous-appointment'> 
             <div>
             <h3>{new Date(item.apptDate).toLocaleDateString()}, {item.apptStartTime.split(':').slice(0, 2).join(":")}</h3>
              <h3>{item.doctorName}</h3>
            </div>
            <ul key={item.apptId}>
              {/* <li>Diagnosisname: {item.diagnosisname}</li> */}
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setOpen(true)}>Fill out symptom calculator</li>
              {/* <p>{item.meetup}</p> */}
            </ul>
            <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}>Join Now</button>
          </div>
        ))
        
        }
      </div>
    );
  };


  const [open, setOpen] = useState(false);

  return (
    //  <div className='hm'>

    <div className='care-plan'>
      {/* <div className='header'>
        <h1 style={{ marginLeft: '50px' }}>youro</h1>
         <Popmenu/> 
         </div>  */}
        <div style={{width:"100%",margin:"0% 2%"}}>
      <Youroheader/>
       </div>
       
      <div className='all-details'>
        <div className='care-plan-details-patient'>
          <h2>Your Care Plan</h2>
          {/* {isLoading? (
           <div className="loader-container">
            <div className="loader"></div>
             <div>Loading...</div>
           </div>
         ) : ( <CarePlan/>)} */}
          <CarePlan/>
        </div>
        <div className='column-data'>
          <PatientSymptomChart uId={uId} retakeSymptomScore={setOpen} />
          <div className='row-data'>
            <div className='care-plan-details-patient-1'>
              <h3>Upcoming Appointments </h3>
              <UpcomingAppointments />

            </div>
            <div className='care-plan-details-patient-1'>
              <h3>Previous Appointments</h3>
              <PreviousAppointments />
            </div>
          </div>
        </div>
      </div>

      {/* </div>   */}
      {open && <SymptomCalculator open={open} setOpen={setOpen} />}
    </div>
    // </div>
  );

}

export default PatientHomePage;

