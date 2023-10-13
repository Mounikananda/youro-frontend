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

const PatientDetails = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewTab, setOverviewTab] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [results, setResults] = useState(false);
  const [notes, setNotes] = useState(false);
  const [orders, setOrders] = useState(false);
  const [followup, setFollowup] = useState(false);

  const handleOverview = (data) => {
    setActiveTab(data);
  }

  const TodayAppointmentList = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {

    const mockData = [
      { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
      { id: 2, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
      { id: 3, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
      { id: 4, name: 'John Doe', time: "12-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis4', symptomscore: '40', meetup: 'follow-up' },
      { id: 5, name: 'John Doe', time: "13-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis5', symptomscore: '50', meetup: 'follow-up'},
      { id: 6, name: 'John Doe', time: "14-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis6', symptomscore: '60', meetup: 'new meet' },
      { id: 7, name: 'John Doe', time: "15-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis7', symptomscore: '70', meetup: 'follow-up' },
      { id: 8, name: 'John Doe', time: "16-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis8', symptomscore: '80', meetup: 'new meet' },
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
            <h3 style={{textDecoration:'underline'}}>{item.name}</h3>
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


  console.log("printing data", props.data[0]);
  return (
    <div className='p-data'>

      <div className='p-all-data'>
        <div className='p-data-col'>
          <label className='label-p-data' >Name: {'Sri Sai charan'}</label>
          <label className='label-p-data'>DOB: {'12/12/1999'}</label>
          <label className='label-p-data'>Patient id: {'123456'}</label> 
        </div>
        <div className='p-data-row'>
          <div>Message</div>
          <div>Schedule Appointment</div>
          <div>Create Note</div>
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
        <div className="tab-content"> notes Content Goes Here</div>
      )}

      {activeTab === 'orders' && (
        <div className="tab-content">orders Info Content Goes Here</div>
      )}

      {activeTab === 'follow-up' && (
        <div className="tab-content">follow -up Content Goes Here</div>
      )}

    
      

    </div>
  );
}

export default PatientDetails;
