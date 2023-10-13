import {React, useState ,useEffect} from 'react';
import SideBar from '../Doctor UI/Doctor-Sidebar';
import "../../styles/Doctor-ui/Doctorhomepage.css";
import "../../styles/Doctor-ui/doctor-appointment-div.css";
import { FaCheckCircle,FaCheck} from "react-icons/fa";

function DoctorHomePage()
{
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(true);
  };
  

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
            <h3 onClick={toggleVisibility} style={{textDecoration:'underline'}}>{item.name}</h3>
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


const PreviousAppointments=()=>
{
  const [data, setData] = useState([]);

  useEffect(() => {
 
    const mockData = [
      { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
      { id: 1, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
      { id: 1, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
      { id: 1, name: 'John Doe', time: "12-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis4', symptomscore: '40', meetup: 'follow-up' },
      { id: 1, name: 'John Doe', time: "13-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis5', symptomscore: '50', meetup: 'follow-up'},
    ];

    setTimeout(() => {
      setData(mockData);
    }, 1000);
  }, []);

  return (
    <div>
        {data.map((item) => (
          <div className='previous-appointment'> 
           <div>
            <h3 >{item.time} - {item.name}</h3>
           </div>
             <ul key={item.id}>
             <li>Diagnosisname: {item.diagnosisname}</li>
             <li style={ {textDecoration:'underline',color:'#9CB189'}}>view careplan and note provided</li>
             <li>Symptom score: {item.symptomscore}</li>
              {/* <p>{item.meetup}</p> */}
             </ul>
          </div> 
        ))}
    </div>
  ); 
}


const IncompleteEncounters=()=>
{
  const [data, setData] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
      { id: 1, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
      { id: 1, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
     
    ];

 
    setTimeout(() => {
      setData(mockData);
    }, 1000);
  }, []);

  return (
    <div>
        {data.map((item) => (
          <div className='incomplete-appt-div'> 
           <div>
            <h3 >{item.time} - {item.name}</h3>
              <ul className='list-type'>
              <li><div><FaCheckCircle/> Note</div></li> 
              <li><div><FaCheck/> Care plan</div></li>
              <li><div><FaCheckCircle/> Orders</div></li>
              <li><div><FaCheck/> Follow-up</div></li>
              <li><div><FaCheckCircle/> Billing</div></li>
             </ul>
            </div>
          </div> 
        ))}
    </div>
  ); 
}

  

  return (
     <div className='hm-doctor'>
        <div className='sidebar'>
         <SideBar/>
       </div>
       <div className='care-plan-doctor'>
        <h1>youro</h1>
        <div className='all-details-doctor'>
        <div className='care-plan-details-doctor'>
          <h2>Today's Appointments</h2>
          <TodayAppointmentList/>
        </div>
        {isVisible && 
         <div className='care-plan-details-doctor'>
           <h2>Previous Appointments</h2>
           <PreviousAppointments/>
        </div>}
        <div className='care-plan-details-doctor'>
          <h2>Incomplete Encounters</h2>
           <IncompleteEncounters/>
        </div>
        </div>  
       </div>
      </div>
  )
}

export default DoctorHomePage;