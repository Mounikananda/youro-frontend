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
    setIsVisible(!isVisible);
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

const appointments_image = (arrayBuffer) => {
   
     const arrayBuffer1 = new Uint8Array(arrayBuffer);
     if(arrayBuffer1.length!=0)
       {
        const base64String = btoa(new Uint8Array(arrayBuffer1).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '')
        );
      return `data:image/png;base64,${base64String}`;
       }
      return null;
  };
  
  const createMeetLink = () => {

      axios.put(API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension + "/updateAppointment/" + `${meetingId}` + `?link=${meetLink}`, {}).then((res) => {
        toast.success("Uploaded meet link successfully");fetchPrevAndUpcomingAppointments(); setOpenCreatePopUp(false) }).catch(e => toast.error('Error uploading meet link'))
    
  };

  const fetchPrevAndUpcomingAppointments = async () => {
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/appointments/${uId}?timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
        //  'responseType': 'arraybuffer' 
        'responseType': 'arraybuffer' 
      }
    };
    try {
      const res = await axios.get(url, config);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
      console.log("checking uid",res.data);
      setIsLoading(false);
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const ImagePrev = (data) => {
    const arrayBuffer = new Uint8Array(data);
        if(arrayBuffer.length!=0)
        {
        const base64Image = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
      //    const base64Image = btoa(
      //   String.fromCharCode.apply(null, arrayBuffer)
      // );
        //  const contentType = response.headers['content-type'];
        return `data:image/png;base64,${base64Image}`;
        // return `data:image/png;base64,${base64Image}`;
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
          <div className='previous-appointment' onClick={toggleVisibility}>
            <div> 
            <h3 style={{display: 'inline-block'}}>{new Date(item.apptDate).toLocaleDateString()}, {item.apptStartTime.split(' ')[4].split(':').slice(0, 2).join(":")}</h3>{item.status == 'CANCELED' && <div className='cancel-tag'>cancelled</div>}
              
                <div style={{ display: 'flex',flexDirection:'row',height:'30px',marginTop:'1.5%'}}>
                  <img
                src={item.picture? `data:image/png;base64,${item.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                // src={item.picture!=null ? ImagePrev(item.picture): 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                className="profile-pic" alt="Patient Image" width="15" height="15"/>
              <h3 style={{marginTop:'3%',marginLeft:'2%'}}>
                <Link style={{ textDecoration: 'none' }} to={`/doctor-view-profile/${item.patientId}`}>{item.patientName}</Link>
              </h3>
            </div>
                {/* {item.patientName}</h3> */}
            </div>
            <ul key={item.apptId}>
              <li>Diagnosisname: {item.diagName}</li>
              <li>Symptom score: {item.symptomScore}</li>
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
              !item.link && item.status != 'CANCELED' && <>
                <button className='btn-gray' style={{ width: 'fit-content', margin: '0px auto 10px auto', padding: '0px 5px', cursor: 'pointer' }}
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