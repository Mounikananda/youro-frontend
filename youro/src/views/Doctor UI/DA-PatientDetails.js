import React, { useState,useEffect, useRef } from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-patient-data.css";
import IncompleteEncounters from './IncompleteEncounters';
import PersonalInfo from './DA-personal-info';
import FileUpload from './DA-Results';
import Notes from './DA-notes';
import Orders from './DA-orders';
import ReactQuillWrapper from './DA-takenote';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../utils/loader';
import { API_DETAILS } from '../../App';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { COOKIE_KEYS, USER_TYPES } from "../../App";
import Cookies from "js-cookie";

const PatientDetails = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewTab, setOverviewTab] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [results, setResults] = useState(false);
  const [notes, setNotes] = useState(false);
  const [orders, setOrders] = useState(false);
  const [followup, setFollowup] = useState(false);
  const [prevAppts, setPrevAppts] = useState([]);
  const [upComingAppts, setUpcomingAppts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let {patientId, apptId} = useParams();
  const [patDetails, setPatDetails] = useState();
  const [isOpenCreatePopUp, setOpenCreatePopUp] = useState(false);


  const handleOverview = (data) => {
    setActiveTab(data);
  }

  useEffect(() => {
    fetchAppointments();
    getPatientDetails();
  }, []);

  useEffect(() => {
    if (apptId){
      setOpenCreatePopUp(true)
    }
    
  }, [apptId])

  const getPatientDetails = async() => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getUser/${patientId}`;
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      setPatDetails(res.data)
      setIsLoading(false)
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const fetchAppointments = async() => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/appointments/${patientId}?timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    console.log(url)
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
      setIsLoading(false)
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const TodayAppointmentList = () => {
  

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
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`${item.apptId}`}>View/edit the care plan</Link></li>
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setShowEditor(item)}>Add note for doctors</li>
              <li>Diagnosisname: <strong>{item.diagName}</strong></li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              <li>Symptom score: <strong>{item.symptomScore}</strong></li>
              {/* <p>{item.meetup}</p> */}
            </ul>
          </div>
        ))
        
        }
      </div>
  );
};

const PreviousAppointmentList = () => {
  

  return (
    <div>
        {
          (prevAppts==null || prevAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of previous appointments</i></h3>
            </div>
          </>
        }

          {prevAppts && prevAppts.length!= 0 && prevAppts.map((item) => (
            <div className='previous-appointment'> 
             <div>
              <h3>{new Date(item.apptDate).toLocaleDateString()}, {item.apptStartTime.split(':').slice(0, 2).join(":")}</h3>
              <h3>{item.doctorName}</h3>
            </div>
            <ul key={item.apptId}>
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`${item.apptId}`}>View/edit the care plan</Link></li>
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setShowEditor(item)}>Add note for doctors</li>
              <li>Diagnosisname: <strong>{item.diagName}</strong></li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              <li>Symptom score: <strong>{item.symptomScore}</strong></li>
              {/* <p>{item.meetup}</p> */}
            </ul>
          </div>
        ))
        
        }
      </div>
  );
};

  const [showEditor, setShowEditor] = useState(false);

  const handleCreateNoteClick = () => {
    setShowEditor(!showEditor);
  };

 const handlenoteclickclose =()=> {
   setShowEditor(false);
  }

  const handleToast = (val) => {
    if (val) toast.success('Prescription saved successfully')
    if(!val) toast.error('Error saving prescription')
  }

  const navigate = useNavigate();
  const closeElement = React.useRef();

  const handleNotesSubmit = () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/saveNotes`;
    var data = {};
    data['apptId'] = showEditor.apptId;
    data['patientId'] = showEditor.patientId;
    data['doctorId'] = Cookies.get(COOKIE_KEYS.userId);
    data['notes'] = notes
    console.log(data)
    axios.post(url, data).then(res => {
      toast.success('Notes saved successfully')
      setShowEditor(null)
    }).catch(err => {     
      toast.error("Error saving Notes")    
    })
  }


  return (
    <div className='p-data'>

      <div className='p-all-data'>
        <div className='p-data-col'>
          {patDetails && <><label className='label-p-data' >Name: {patDetails.firstName + ' ' + patDetails.lastName}</label>
          <label className='label-p-data'>DOB: {'12/12/1999'}</label>
          <label className='label-p-data'>Patient id: {'12346'}</label></> }
        </div>
        <div className='p-data-row'>
          <div >Message</div>
          {/* {showEditor && (
        <div className="floating-editor">
            <ReactQuillWrapper/>
        </div> */}
      {/* )} */}
        </div>
      </div>
      <div className='p-div-row'>
        <div
          className={`p-tabs ${activeTab === 'overview' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('overview')}
        >
          Overview
        </div>
        <div
          className={`p-tabs ${activeTab === 'personalinfo' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('personalinfo')}
        >
          Personal Info
        </div>
        <div
          className={`p-tabs ${activeTab === 'results' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('results')}
        >
          Results
        </div>
        <div
          className={`p-tabs ${activeTab === 'notes' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('notes')}
        >
          Notes
        </div>
        {/* <div
          className={`p-tabs ${activeTab === 'orders' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('orders')}
        >
          Orders
        </div> */}
       </div>
       {activeTab === 'overview' && (
           <div className='all-plans-patient'>
          <div className='care-plan-details-doctor-apt'>
          <h2>Today's Appointments</h2>
          <TodayAppointmentList/></div>
           <div className='care-plan-details-doctor-apt'>
           <h2>Previous Appointments</h2>
           <PreviousAppointmentList/>
           </div>
          <div className='care-plan-details-doctor-apt'>
          <h2>Incomplete Encounters</h2>
           <IncompleteEncounters/>
          </div>
          </div>
           )}

      {activeTab === 'personalinfo' && (
        // <div className="tab-content">
         <PersonalInfo data={patDetails}/>
      //  </div>
      )}

      {activeTab === 'results' && (
        // <div className="tab-content">Results Content Goes Here</div>
        <FileUpload/>
      )}
     
      {activeTab === 'notes' && (
       <Notes patId={patientId}/>
      )}

      {/* {activeTab === 'orders' && (
        <Orders patId={patientId}/>
      )} */}




        {showEditor && (
        <div className="floating-editor">
            {/* <button >Minimize</button>
            <button >Maximize</button> */}
            <div className='notes-title'>
            <label>Notes</label>
            <button onClick={() => handleNotesSubmit()}>Submit</button>
            <button onClick={() => setShowEditor(null)}>X</button>
           </div>
          {/* <ReactQuillWrapper /> */}
            <ReactQuillWrapper val={setNotes}/>
        </div> )}
      
        <Popup open={isOpenCreatePopUp} modal closeOnDocumentClick={false} onClose={() => setOpenCreatePopUp(false)} className="congrats-popup">
                  <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpenCreatePopUp(false); navigate("..", { relative: "path" })}}>
                    {/* <Link to='..' relative="path"> */}
                      <span class="material-symbols-outlined">
                      close
                    </span>
                    {/* </Link> */}
                  </div>

                  <div style={{ padding: '50px 20px' }}>
                    
                  <Orders patId={patientId} apptId={apptId} closePopup={setOpenCreatePopUp} handleToast={handleToast} nav={() => {navigate("..", { relative: "path" })}}/>
                  </div>



                </Popup>

    <Loader active={isLoading} />
    <ToastContainer />
    </div>
  );
}

export default PatientDetails;
