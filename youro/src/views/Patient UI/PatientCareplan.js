

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
  console.log(data)
  console.log(data && data['carePlan'] && data['carePlan']['medicines'] && Object.entries(Object.groupBy(data['carePlan']['medicines'], ({ categoryName }) => categoryName)).map(([category, items]) => category))
  return (
    // <div>
    <>
      {data && data['carePlan'] ? <>{Object.keys(data['carePlan']).map(presType => (
        <></>
        // <div key={presType}>
        //   {data['carePlan'][presType].filter(item => item.indicator)[0] && <h4 style={{margin: '10px 0px'}}>{presType}</h4>}

        //   {Object.entries(Object.groupBy(data['carePlan'][presType], ({ categoryName }) => categoryName)).map(([category, items]) => (
        //     <>
        //     <h5 style={{margin: '10px 10px'}}>{category !== 'null' ? category : ''}</h5>
        //       <ul style={{margin: '0px'}}>
        //         {items.map(item => (
        //           item.indicator && <>
        //             <li key={item.presId} style={{ marginBottom: "10px" }}>
        //               {item.presName}
        //               {item.dosage ? ` - ${item.dosage}` : ''}

        //               {item.shortInfo && (
        //                 <>
        //                   <br/>
        //                     <span class="material-symbols-outlined" style={{ fontSize: "18px" }}>
        //                       subdirectory_arrow_right
        //                     </span>
        //                     {item.shortInfo}
        //                 </>
        //               )}
        //               {/* {item.indicator ? ' (Indicator)' : ''} */}
        //             </li>
        //             </>
                  
        //         ))}
        //       </ul>
        //     </>
        //   ))}
      
        // </div>       
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

