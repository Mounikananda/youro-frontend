
import { React, useState, useEffect } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientHomePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const uId = Cookies.get(COOKIE_KEYS.userId);//1; 
  const [prevAppts, setPrevAppts] = useState([]);
  const [upComingAppts, setUpcomingAppts] = useState([]);
  const [viewVal, setViewVal] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCareplan, setSelectedCareplan] = useState(null);
  const [activeLoader, setActiveLoader] = useState(false);
  const [fetchSymptomScore, setFetchSymptomScore] = useState(false);
  const [cancelPopupOpen, setcancelPopupOpen] = useState(false);

  const navigate = useNavigate();

  const navToProfile = () => {
    props.changeView(4);
  }

  useEffect(() => {
    fetchPrevAndUpcomingAppointments();
    if (viewVal == 4) {
      navToProfile();
    }
  }, [viewVal]);

  const fetchPrevAndUpcomingAppointments = async () => {
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/appointments/${uId}?timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    setActiveLoader(true)
    try {
      const res = await axios.get(url, config);
      setActiveLoader(false)
      console.log(res);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
    }
    catch (err) {
      console.error(err);
      setActiveLoader(false);
    }
  }

  const [deleteItem, setDeleteItem] = useState('');

  const handleSubmit = () => {
    cancelAppointment(deleteItem);
    setcancelPopupOpen(false);
  };


  const cancelAppointment = async (data) => {

    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/cancelAppointment/${data.apptId}/${data.doctorId}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(url, config);
      fetchPrevAndUpcomingAppointments()
      toast.success("Appointment cancelled successfully");
    }
    catch (err) {
      toast.error("Error cancelling appointment");
      console.error(err);
    }
  }



  const PreviousAppointments = () => {

    return (
      <div className="previous-appointment-wrapper">
        {
          (prevAppts == null || prevAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

        {prevAppts && prevAppts.length != 0 && prevAppts.map((item) => (
          <div className='previous-appointment' >
            <div>
              <h3 style={{ display: 'inline-block' }}>{new Date(item.apptStartTime).toLocaleDateString()}, {item.apptStartTime.split(' ')[4].split(':').slice(0, 2).join(":")}</h3>{item.status == 'CANCELED' && <div className='cancel-tag'>cancelled</div>}
              <div style={{ display: 'flex', flexDirection: 'row', height: '30px', marginTop: '4.5%', alignItems: 'center' }}>
                <img
                  // src={item.picture? `data:image/png;base64,${item.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                  src={item.picture != null ? `data:image/png;base64,${item.picture}` : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                  className="profile-pic" alt="Patient Image" width="25" height="25" />
                {/* {item.picture[0] && (
                <img
                  src={arrayBufferToBase64(item.picture[0])}
                  alt="Patient"
                  style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                /> */}
                {/* )} */}
                <h3 style={{ marginTop: '0.1%', marginLeft: '2%' }}>{item.doctorName}</h3> </div>
            </div>
            <ul key={item.apptId}>
              
              {item.status != 'CANCELED' && <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => {setPopupOpen(true); setSelectedCareplan(item)}}>View careplan and notes</li>}
              <li>Diagnosis: {item.diagName}</li>
              {/* <li>Status: {item.status}</li> */}
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



    const openCancelConfirmPopUp = (item) => {
      // alert('test');
      setcancelPopupOpen(true);
      setDeleteItem(item);
    }



    return (
      <div>
        {
          (upComingAppts == null || upComingAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

        {upComingAppts && upComingAppts.length != 0 && upComingAppts.map((item) => (
          <div className='previous-appointment'>
            <div>
              <h3 style={{ display: 'inline-block' }}>{new Date(item.apptStartTime).toLocaleDateString()}, {item.apptStartTime.split(' ')[4].split(':').slice(0, 2).join(":")}</h3>{item.status == 'CANCELED' && <div className='cancel-tag'>cancelled</div>}
              <div style={{ display: 'flex', flexDirection: 'row', height: '30px', marginTop: '4.5%', alignItems: 'center' }}>
                <div>
                  <img
                    // src={item.picture? `data:image/png;base64,${item.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                    src={item.picture != null ? `data:image/png;base64,${item.picture}` : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                    className="profile-pic" alt="Patient Image" width="25" height="25" /></div>

                <h3 style={{ marginTop: '0.1%', marginLeft: '2%' }}>{item.doctorName}</h3> </div>
            </div>
            <ul key={item.apptId}>
              {item.status != 'CANCELED' && <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setOpen(true)}>Fill out symptom calculator</li>}
              <li>Diagnosis: {item.diagName}</li>
            </ul>

            {
              item.status != 'CANCELED' ? 
              <div className='row' style={{ display: 'flex', justifyContent: 'space-around'}}>
                <div className='col-6'>
                  {
                  item.link ? 
                  <button className='join-now-button' onClick={() => window.open(`${item.link}`,'_blank', 'rel=noopener noreferrer')} style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}>Join Now</button> 
                  : 
                  <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'not-allowed', pointerEvents: 'none', backgroundColor: '#888' }}>Join Now</button>
                  }
                </div>
                <div className='col-6'>
                  <button className='join-now-button' onClick={() => cancelAppointment(item)} style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
            </div> : <></>
            }

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
      <ToastContainer />
      {/* <div className='header'>
        <h1 style={{ marginLeft: '50px' }}>youro</h1>
         <Popmenu/> 
         </div>  */}
      <div style={{ width: "100%", margin: "0% 2%" }}>
        <Youroheader setView={setViewVal} />
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
          <CarePlan />
        </div>
        <div className='column-data'>
          <PatientSymptomChart uId={uId} retakeSymptomScore={setOpen} fetchSymptomScore={fetchSymptomScore} setFetchSymptomScore={setFetchSymptomScore} doctorView={false} />
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
        <Loader active={activeLoader} />
      </div>

      {open && <SymptomCalculator open={open} setOpen={setOpen} fetchSymptomScore={setFetchSymptomScore} />}

      <Popup open={popupOpen} modal closeOnDocumentClick={false} onClose={() => setPopupOpen(false)} className="congrats-popup">
        <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setPopupOpen(false); props.changeView(0) }}>
          <span class="material-symbols-outlined">
            close
          </span>
        </div>
        <div style={{ padding: '50px 20px' }}>
          <CarePlan apptId={selectedCareplan && selectedCareplan.apptId} />
        </div>
      </Popup>

      {/* <div className="notification-popup-overlay" > */}
        <Popup
          open={cancelPopupOpen}
          closeOnDocumentClick
          onClose={() => setcancelPopupOpen(false)}
          modal
          className="notification-popup-overlay" 
        >
          <div className="popup-content-admin">
            <div className='row'>
              <div className='col-12 info-col'>
                <h3 style={{ marginLeft: '5%' }}>Are you sure you want to cancel the appointment?</h3>
              </div>
              <div className='col-12 buttons-col row'>
                <div className='col-6'></div>
                <div className='col-6'>
                  <Button className='btn-outlined' onClick={() => setcancelPopupOpen(false)} variant="outlined" style={{ marginRight: '10px' }} >
                    Back
                  </Button>
                  <Button className='btn-filled' onClick={handleSubmit} variant="contained" startIcon={<DeleteIcon />}>
                    Cancel
                  </Button>
                </div>
              </div>
              {/* <div className='col-12'></div> */}
            </div>
          </div>
        </Popup>
      </div>
    // </div>
  );

}

export default PatientHomePage;



