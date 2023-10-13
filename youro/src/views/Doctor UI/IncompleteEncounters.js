

import {React, useState ,useEffect} from 'react';
import { FaCheckCircle,FaCheck} from "react-icons/fa";

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

export default IncompleteEncounters;