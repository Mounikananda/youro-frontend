import { React, useState, useEffect } from 'react';
import SideBar from '../Doctor UI/Doctor-Sidebar';
import "../../styles/Doctor-ui/Doctorhomepage.css";
import "../../styles/Doctor-ui/doctor-appointment-div.css";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import DoctorSideBar from '../Doctor UI/Doctor-Sidebar';
import PreviousAppointments from './PreviousAppointments';
import IncompleteEncounters from './IncompleteEncounters';
import Youroheader from '../Youro-header';
import { API_DETAILS, USER_TYPES } from '../../App';

import Cookies from "js-cookie";
import { COOKIE_KEYS } from '../../App';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../utils/loader';
import { ToastContainer, toast } from 'react-toastify';

import Popup from 'reactjs-popup';


function DoctorHomePage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    // if(Cookies.get(COOKIE_KEYS.userType) != 'PROVIDER')
    //   {
    //      navigate("/");  
    //   }
    fetchPrevAndUpcomingAppointments();
    // setOpenCreatePopUp(false);
  }, []);


  const uId = Cookies.get(COOKIE_KEYS.userId);//1; 
  const [prevAppts, setPrevAppts] = useState([]);
  const [upComingAppts, setUpcomingAppts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenCreatePopUp, setOpenCreatePopUp] = useState(false);
  const [meetLink, setMeetLink] = useState(null);
  const [meetingId, setMeetingId] = useState(null);


  
  const createMeetLink = () => {

      axios.put(API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension + "/updateAppointment/" + `${meetingId}` + `?link=${meetLink}`, {}).then((res) => {
        toast.success("Uploaded meet link successfully");fetchPrevAndUpcomingAppointments(); setOpenCreatePopUp(false) }).catch(e => toast.error('Error uploading meet link'))
    
  };

  const fetchPrevAndUpcomingAppointments = async () => {
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/appointments/${uId}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(url, config);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
      setIsLoading(false);
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const TodayAppointmentList = () => {

    const openLinkPopUp = (item) => {
      setMeetingId(item.apptId)
      
      setOpenCreatePopUp(true);
    }

    const openZoomLink = (link) => {
      // window.open(link, '_blank');
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
              <h3>{new Date(item.apptDate).toLocaleDateString()}, {item.apptStartTime.split(':').slice(0, 2).join(":")}</h3>
              <h3>{item.patientName}</h3>
            </div>
            <ul key={item.apptId}>
              <li>Diagnosisname: {item.diagnosisname}</li>
              <li>Symptom score: N/A</li>
              <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`/doctor-view-profile/${item.patientId}`}>Take me to care plan</Link></li>
            </ul>
            {
              item.link && <>
                {/* <button className='join-now-button' >Join Now</button> */}
                <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}
                  onClick={() => window.open(`${item.link}`,'_blank', 'rel=noopener noreferrer')}>Join Now</button>
              </>
            }
            {
              !item.link && <>
                <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}
                  onClick={() =>openLinkPopUp(item)} >Upload Link</button>
              </>
            }
            

          </div>
        ))

        }
        
      </div>
    );
  };




  return (
     <div className='hm-doctor'>
        {/* <Loader active={isLoading} /> */}
        <div className='sidebar'>
         <DoctorSideBar data={'doctor-ui'} />
       </div>
       <div className='care-plan-doctor'>
         <Youroheader />
         {/* <h1>youro</h1> */}
        <div className='all-details-doctor'>
          <div className='care-plan-details-doctor'>
            <h2>Today's Appointments</h2>
            <TodayAppointmentList/>
          </div>
          {isVisible &&
            <div className='care-plan-details-doctor'>
              <h2>Previous Appointments</h2>
              <PreviousAppointments data={prevAppts} />
            </div>}
          <div className='care-plan-details-doctor'>
            <h2>Incomplete Encounters</h2>
            <IncompleteEncounters />
          </div>
        </div>
      </div>
      {isOpenCreatePopUp && 
              <>
                <Popup open={isOpenCreatePopUp} modal closeOnDocumentClick={false} onClose={() => setOpenCreatePopUp(false)} className="congrats-popup">
                  <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpenCreatePopUp(false) }}>
                    <span class="material-symbols-outlined">
                      close
                    </span>
                  </div>

                  <div style={{ padding: '50px 20px' }}>
                    <div style={{ width: '300px' }}>

                    </div>
                    <div className="">
                      <label>Zoom meeting link:</label>
                      <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} value={meetLink} onChange={e => {setMeetLink(e.target.value)}} />
                    </div>

                  </div>

                  <div>
                    <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={() => createMeetLink()}>Upload</div>
                  </div>


                </Popup>
              </>
            }
            <ToastContainer />
    </div>
  )
}

export default DoctorHomePage;