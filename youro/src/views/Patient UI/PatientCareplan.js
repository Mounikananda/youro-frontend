

import React, { useState, useEffect } from 'react';
import { API_DETAILS, COOKIE_KEYS } from '../../App';
import Cookies from 'js-cookie';
import axios from 'axios';

const CarePlan = () => {
  const [data, setData] = useState([]);
  const [activeLoader, setActiveLoader] = useState(false);


  const fetchData = async (props) => {
    const patientId = Cookies.get(COOKIE_KEYS.userId);

      let url = '';
      if(props?.apptId){
      url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getLatestCarePlanByPatient?apptId=${props.apptId}&patientId=${patientId}`;
      } else{
       url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getLatestCarePlanByPatient?patientId=${patientId}`;
      }

      try {
        const res = await axios.get(url);
        console.log('res data', res.data);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div>
    <>
      {data && data['carePlan'] ? <>{Object.keys(data['carePlan']).map(category => (
        <div key={category}>
          {data['carePlan'][category].filter(item => item.indicator)[0] && <h4 style={{margin: '15px 0px'}}>{category}</h4>}
          <ul style={{margin: '0px'}}>
            {data['carePlan'][category].map(item => (
              item.indicator && <>
                <li key={item.presId}>
                {item.presName}
                {item.dosage ? ` - ${item.dosage}` : ''}
                {/* {item.indicator ? ' (Indicator)' : ''} */}
              </li>
                </>
              
            ))}
          </ul>
      
        </div>       
      ))}<br /><br />{data.followUp ? <div style={{display: 'flex', alignItems: 'center'}}><span class="material-symbols-outlined">
      sync
      </span><strong>&nbsp;&nbsp;Follow-up required</strong></div> :
       <div style={{display: 'flex', alignItems: 'center'}}><span class="material-symbols-outlined">
       select_check_box
       </span><strong>&nbsp;&nbsp;Follow-up not required</strong></div>} <br /> <br />
       { data && data.notes && data.notes.length!=0 ? (<div><strong>Notes : </strong><p style={{wordWrap: 'break-word'}}>{data.notes}</p></div>):<div/>}
      <br /><br /><br />
      </> : <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h3><i>See a doctor for your careplan</i></h3>
    </div>}
    
    </>
    // </div>
  );
};

export default CarePlan;

