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


  
  const createMeetLink = (e, confirm) => {
    if (!confirm) {
      console.log(e);
    }
    else {
      console.log('button click');
      console.log(e);
    }
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
      console.log(res);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
      console.log('upcoming appts::::  ');
      console.log(res.data.upComingAppointments);
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

    const openLinkPopUp = (item) => {
      console.log('openLinkPopUp');
      console.log(item.link == null);
      props.openPopUp(true);
    }

    const openZoomLink = (link) => {
      // window.open(link, '_blank');
    }

    return (
      // <div>
      //   {data && data.length> 0 && data.map((item) => (
      //     <div className='doctor-div'>
      //       <div>
      //         <h3 onClick={toggleVisibility} style={{ textDecoration: 'underline' }}>{item.name}</h3>
      //       </div>
      //       <ul key={item.apptId}>
      //         <li>Date : {item.apptDate}</li>
      //         <li>Time : {item.apptStartTime}</li>
      //         {/* <li>Diagnosisname: {item.diagnosisname}</li> */}
      //         {/* <li>Symptom score: {item.symptomscore}</li> */}
      //         <li>Meet-type: {item.link}</li>
      //         {/* <p>{item.meetup}</p> */}
      //       </ul>
      //       <button className='join-now-button'>Join Now</button>
      //     </div>
      //   ))}
      // </div>
      <div>
        {
          (data == null || data.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

        {data && data.length != 0 && data.map((item) => (
          <div className='previous-appointment'>
            <div>
              <h3>{new Date(item.apptDate).toLocaleDateString()}, {item.apptStartTime.split(':').slice(0, 2).join(":")}</h3>
              <h3>{item.patientName}</h3>
            </div>
            <ul key={item.apptId}>
              <li>Diagnosisname: {item.diagnosisname}</li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              <li>Symptom score: N/A</li>
              <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`/doctor-view-profile/${item.patientId}/${item.apptId}`}>Take me to care plan</Link></li>
              {/* <p>{item.meetup}</p> */}
            </ul>
            <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}>Join Now</button>
            {
              item?.link && item?.link != null && item?.link != '' && <>
                {/* <button className='join-now-button' >Join Now</button> */}
                <button className='join-now-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}
                  onClick={openZoomLink(item.link)}>Join Now</button>
              </>
            }
            {
              (!item?.link || item?.link == null || item?.link == '') && <>
                <button className='create-link-button' style={{ width: 'fit-content', margin: '0px auto 10px auto', cursor: 'pointer' }}
                  onClick={() =>openLinkPopUp(item)} >Create Meeting</button>
              </>
            }
            {
              isOpenCreatePopUp &&
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
                      <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} onChange={(e) => createMeetLink(e, false)} />
                    </div>

                  </div>

                  <div>
                    <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={(e) => createMeetLink(e, true)}>Create Link</div>
                  </div>


                </Popup>
              </>
            }

          </div>
        ))

        }
      </div>
    );
  };


  // const PreviousAppointments=()=>
  // {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {

  //     const mockData = [
  //       { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
  //       { id: 1, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
  //       { id: 1, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
  //       { id: 1, name: 'John Doe', time: "12-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis4', symptomscore: '40', meetup: 'follow-up' },
  //       { id: 1, name: 'John Doe', time: "13-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis5', symptomscore: '50', meetup: 'follow-up'},
  //     ];

  //     setTimeout(() => {
  //       setData(mockData);
  //     }, 1000);
  //   }, []);

  //   return (
  //     <div>
  //         {data.map((item) => (
  //           <div className='previous-appointment'> 
  //            <div>
  //             <h3 >{item.time} - {item.name}</h3>
  //            </div>
  //              <ul key={item.id}>
  //              <li>Diagnosisname: {item.diagnosisname}</li>
  //              <li style={ {textDecoration:'underline',color:'#9CB189'}}>view careplan and note provided</li>
  //              <li>Symptom score: {item.symptomscore}</li>
  //               {/* <p>{item.meetup}</p> */}
  //              </ul>
  //           </div> 
  //         ))}
  //     </div>
  //   ); 
  // }


  // const IncompleteEncounters=()=>
  // {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const mockData = [
  //       { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
  //       { id: 1, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
  //       { id: 1, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },

  //     ];

  //     setTimeout(() => {
  //       setData(mockData);
  //     }, 1000);
  //   }, []);

  //   return (
  //     <div>
  //         {data.map((item) => (
  //           <div className='incomplete-appt-div'> 
  //            <div>
  //             <h3 >{item.time} - {item.name}</h3>
  //               <ul className='list-type'>
  //               <li><div><FaCheckCircle/> Note</div></li> 
  //               <li><div><FaCheck/> Care plan</div></li>
  //               <li><div><FaCheckCircle/> Orders</div></li>
  //               <li><div><FaCheck/> Follow-up</div></li>
  //               <li><div><FaCheckCircle/> Billing</div></li>
  //              </ul>
  //             </div>
  //           </div> 
  //         ))}
  //     </div>
  //   ); 
  // }



  return (
    <div className='hm-doctor'>
      <Loader active={isLoading} />
      <div className='sidebar'>
        <DoctorSideBar data={'doctor-ui'} />
      </div>
      <div className='care-plan-doctor'>
        <Youroheader />
        {/* <h1>youro</h1> */}
        <div className='all-details-doctor'>
          <div className='care-plan-details-doctor'>
            <h2>Today's Appointments</h2>
            <TodayAppointmentList openPopUp= {setOpenCreatePopUp}/>
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
    </div>
  )
}

export default DoctorHomePage;