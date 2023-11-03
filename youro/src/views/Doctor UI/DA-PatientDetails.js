// import React, { useState } from 'react';
// import "../../styles/Doctor-ui/Doctor-appointment/Doctor-patient-data.css";

// const PatientDetails = (props) => {

//   const [overviewtab,setoverviewtab]=useState(false);
//   const [personalinfo,setpersonalinfo]= useState(false);
//   const [results,setresults]=useState(false);
//   const [notes,setnotes]=useState(false);
//   const [orders,setorders]=useState(false);
//   const [followup,setfollowup]=useState(false);


//   const handleoverview= (data)=>
// {
//   setoverviewtab('overview'==data);
// }


 
//   console.log("printing data", props.data[0]);
//   return (
//       <div className='p-data'>
//       <div className='p-data-row'>
//         <div className='p-data-col'>
//         <label>Patient Id:{props.data[0].patientId}</label>
//         <label>Patient first name: {props.data[0].firstName}</label>
//         </div>
//         <div className='p-data-col'> 
//         <label>Patient last name: {props.data[0].lastName}</label>
//         <label>Patient email: {props.data[0].email}</label>
//         </div>
//       </div>
//       <div className='p-div-row'>
//         <div className='p-tabs' onClick={handleoverview('overview')}>OverView</div>
//         <div className='p-tabs' onClick={handleoverview('personinfo')}>Personal Info</div>
//         <div className='p-tabs' onClick={handleoverview('results')}>Results</div>
//         <div className='p-tabs' onClick={handleoverview('notes')}>Notes</div> 
//         <div className='p-tabs' onClick={handleoverview('orders')}>Orders</div>
//         <div className='p-tabs' onClick={handleoverview('follow-up')}>Follow-up</div>  
//       </div>

//       <div>
//       </div>
//       </div>
//   );
// }

// export default PatientDetails;



import React, { useState,useEffect} from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-patient-data.css";
import PreviousAppointments from './PreviousAppointments';
import IncompleteEncounters from './IncompleteEncounters';
import PersonalInfo from './DA-personal-info';
import FileUpload from './DA-Results';
import Notes from './DA-notes';
import Orders from './DA-orders';
import ReactQuillWrapper from './DA-takenote';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../utils/loader';

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
  let {apptId, patientId} = useParams();
  const [patDetails, setPatDetails] = useState();

  const handleOverview = (data) => {
    setActiveTab(data);
  }

  useEffect(() => {

    fetchAppointments();
    getPatientDetails();
  }, []);

  const getPatientDetails = async() => {
    const url = `http://52.14.33.154:9093/youro/api/v1/getUser/${patientId}`;
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
    const url = `http://52.14.33.154:9093/youro/api/v1/appointments/${patientId}`;
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
              <h3>{item.patientName}</h3>
            </div>
            <ul key={item.apptId}>
              <li>Diagnosisname: {item.diagnosisname}</li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              <li>Symptom score: N/A</li>
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
          <div>Schedule Appointment</div>
          <div onClick={handleCreateNoteClick}>Create Note</div>
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
        <div
          className={`p-tabs ${activeTab === 'orders' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('orders')}
        >
          Orders
        </div>
        <div
          className={`p-tabs ${activeTab === 'follow-up' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('follow-up')}
        >
          Follow-up
        </div>
       </div>
       {activeTab === 'overview' && (
           <div className='all-plans-patient'>
          <div className='care-plan-details-doctor-apt'>
          <h2>Today's Appointments</h2>
          <TodayAppointmentList/></div>
           <div className='care-plan-details-doctor-apt'>
           <h2>Previous Appointments</h2>
           <PreviousAppointments/>
           </div>
          <div className='care-plan-details-doctor-apt'>
          <h2>Incomplete Encounters</h2>
           <IncompleteEncounters/>
          </div>
          </div>
           )}

      {activeTab === 'personalinfo' && (
        // <div className="tab-content">
         <PersonalInfo/>
      //  </div>
      )}

      {activeTab === 'results' && (
        // <div className="tab-content">Results Content Goes Here</div>
        <FileUpload/>
      )}
     
      {activeTab === 'notes' && (
       <Notes/>
      )}

      {activeTab === 'orders' && (
        <Orders apptId={apptId} patId={patientId}/>
      )}

      {activeTab === 'follow-up' && (
        <div className="tab-content">follow -up Content Goes Here</div>
      )}

        {showEditor && (
        <div className="floating-editor">
            {/* <button >Minimize</button>
            <button >Maximize</button> */}
            <div className='notes-title'>
            <label>Notes</label>
            <button>X</button>
           </div>
          {/* <ReactQuillWrapper /> */}
            <ReactQuillWrapper />
        </div> )}
      
    <Loader active={isLoading} />
    </div>
  );
}

export default PatientDetails;
