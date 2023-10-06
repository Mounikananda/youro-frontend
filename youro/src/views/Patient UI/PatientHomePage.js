import {React, useState,useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import "../../styles/Patient-ui/Patient-Homepage.css";
import SideBar from './SideBar';
import PatientSymptomChart from './Patient-symptom-chart';
import Loader from '../../utils/loader';
import Popup from 'reactjs-popup';
import Popmenu from './Popupmenu';


const PatientHomePage =()=>
{
  const [isLoading, setIsLoading] = useState(true);
  
  const CarePlan = () => {
  const [data, setData] = useState([]);
   const [activeLoader, setActiveLoader] = useState(false);

  useEffect(() => {
    const mockData = [
      {
        "Prescription": {
          "Dolo": 
          "take one in the morning and 1 in the evening",
          "Paracetamol": "take 1 after dinner"
        },
        "Supplements": {
          "Dolo": "take one in the morning and 1 in the evening",
          "Paracetamol": "take 1 after dinner"
        },
        "Lifestylemodifications": [
          "Make sure to drink 3 - 5 liters of water daily",
          "Spend at least an hour in the sun",
          "Don't drink coffee",
          "Don't smoke",
          "Don't consume alcohol"
        ]
      }
    ];
    setData(mockData);
    // const fetchData = async () => {
    //   try {
       
    //     // const response = await fetch('any-api');
    //     // const result = await response.json();
    //     setData(mockData);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setIsLoading(false);
    //   }
    // };

    // fetchData();
     
  }, []);

  return (
   <div>
      {data.map((item, index) => (
        <div className='patient-div' key={index}>
          <h3 >Reduce your symptom score by 'x' points before your next follow-up.</h3>

          {Object.keys(item).map((category, categoryIndex) => (
            <div key={categoryIndex+1}>
              <h4>{category}</h4>
              <ul>
                {Object.entries(item[category]).map(([medication, instruction], i) => (
                  <li key={i}>
                    {category !== 'Lifestylemodifications' ? `${medication}: ${instruction}` : `${instruction}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
      { id: 2, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
      { id: 3, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
      { id: 4, name: 'John Doe', time: "12-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis4', symptomscore: '40', meetup: 'follow-up' },
      { id: 5, name: 'John Doe', time: "13-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis5', symptomscore: '50', meetup: 'follow-up'},
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


 
   return (
     <div className='hm'>
        <div className='sidebar'>
         <SideBar/>
       </div>
       <div className='care-plan'>
        <div className='header'>
          <h1>youro</h1>
          <Popmenu/>
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
               <PatientSymptomChart/>
               <div className='row-data'>
                 <div className='care-plan-details-patient-1'>
                     <h3>PlaceHolder for a component </h3>
                    
                  </div>
                  <div className= 'care-plan-details-patient-1'>
                     <h3>Previous Appointments</h3>
                     <PreviousAppointments/>
               </div>
             </div>
        </div> 
        </div>  
       </div>
      </div>
  );
  
}

export default PatientHomePage;

