import { API_DETAILS, COOKIE_KEYS } from '../../App';
import Cookies from 'js-cookie';
import axios from 'axios';
import {React, useState ,useEffect} from 'react';
import { FaCheckCircle,FaCheck,FaTimesCircle} from "react-icons/fa";
import { IoIosCloseCircle } from 'react-icons/io';

const IncompleteEncounters=()=>
{
  const [data, setData] = useState([]);
  
   const fetchData = async () => {
   const doctor_id = Cookies.get(COOKIE_KEYS.userId);

  const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension+`/getCheckList/${doctor_id}`;

      try {
        const res = await axios.get(url);
        // console.log('careplan data for apptId', apptId, 'and diagId', diagId);
        console.log('res  incomplete encounters data', res.data);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
  };
  useEffect(() => {
    // const mockData = [
    //   { id: 1, name: 'John Doe', time: "9-sept,2023", patientstime: '4:30 am', diagnosisname: 'Diagnosis1', symptomscore: '10', meetup: 'new meet' },
    //   { id: 1, name: 'John Doe', time: "10-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis2', symptomscore: '20', meetup: 'follow-up' },
    //   { id: 1, name: 'John Doe', time: "11-sept,2023",patientstime: '4:30 am', diagnosisname: 'Diagnosis3', symptomscore: '30', meetup: 'new meet' },
     
    // ];

    // setTimeout(() => {
    //   setData(mockData);
    // }, 1000);
    fetchData();
  }, []);

  return (
    <div>
         { data.length==0 ?
            <div style={{textAlign:'center',marginTop:'42%'}}> No IncompleteEncounters</div> 
              : <div>
        {data.map((item) => (
          <div className='incomplete-appt-div'> 
           <div>
            <h3 >{item.apptDate}-{item.patientName}</h3>
              <ul className='list-type'>
              <li><div>{item.orders ?<FaCheckCircle/> : <FaTimesCircle />} Orders</div></li>
              <li><div>{item.followUp ?<FaCheckCircle/> : <FaTimesCircle />} followUp</div></li>
              <li><div>{item.notes ?<FaCheckCircle/> : <FaTimesCircle />} Notes</div></li>  
              {/* <li><div><FaCheck/> Care plan</div></li>
              <li><div><FaCheckCircle/> Orders</div></li>
              <li><div><FaCheck/> Follow-up</div></li>
              <li><div><FaCheckCircle/> Billing</div></li> */}
             </ul>
            </div>
          </div> 
        ))}
        </div>
       }
    </div>
  ); 
}

export default IncompleteEncounters;