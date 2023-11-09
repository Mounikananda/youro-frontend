// import {React,useState,useEffect} from 'react';
// import { COOKIE_KEYS } from "../../App";
// import Cookies from "js-cookie";
// import axios from 'axios';

// const CarePlan = () => {
//     const [data, setData] = useState([]);
//     const [activeLoader, setActiveLoader] = useState(false);
//   const fetchData= async()=>
//   {
//     const patient_id= Cookies.get(COOKIE_KEYS.userId);
//     const url=`http://52.14.33.154:9093/youro/api/v1/getCarePlanDetailsByPatientID/${patient_id}`;
//     try {
//       const res = await axios.get(url);
//       console.log("careplan data"+"id "+patient_id+" ");
//       console.log("res data",res.data);
// //       setPrevAppts(res.data.previousAppointments);
// //       setUpcomingAppts(res.data.upComingAppointments);
//     }
//     catch (err) {
//       console.error(err);
//     }
    
    
//   }



//     useEffect(() => {
//      fetchData(); 
//       const mockData = [
//         {
//           "Prescription": {
//             "Dolo":
//               "take one in the morning and 1 in the evening",
//             "Paracetamol": "take 1 after dinner"
//           },
//           "Supplements": {
//             "Dolo": "take one in the morning and 1 in the evening",
//             "Paracetamol": "take 1 after dinner"
//           },
//           "Lifestylemodifications": [
//             "Make sure to drink 3 - 5 liters of water daily",
//             "Spend at least an hour in the sun",
//             "Don't drink coffee",
//             "Don't smoke",
//             "Don't consume alcohol"
//           ]
//         }
//       ];
//       setData(mockData);
//       // const fetchData = async () => {
//       //   try {

//       //     // const response = await fetch('any-api');
//       //     // const result = await response.json();
//       //     setData(mockData);
//       //     setIsLoading(false);
//       //   } catch (error) {
//       //     console.error('Error fetching data:', error);
//       //     setIsLoading(false);
//       //   }
//       // };

//       // fetchData();

//     }, []);


//     return (
//       <div>
//         {data.map((item, index) => (
//           <div className='patient-div' key={index}>
//             <h3 >Reduce your symptom score by 'x' points before your next follow-up.</h3>

//             {Object.keys(item).map((category, categoryIndex) => (
//               <div key={categoryIndex + 1}>
//                 <h4>{category}</h4>
//                 <ul>
//                   {Object.entries(item[category]).map(([medication, instruction], i) => (
//                     <li key={i}>
//                       {/* {medication}: {instruction} */}
//                       {category !== 'Lifestylemodifications' ? `${medication}: ${instruction}` : `${instruction}`}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   };
// export default CarePlan;


// import React, { useState, useEffect } from 'react';
// import { COOKIE_KEYS } from '../../App';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const CarePlan = () => {
//   const [data, setData] = useState([]);
//   const [activeLoader, setActiveLoader] = useState(false);

//   const fetchData = async (apptId, diagId) => {
//     const patient_id = Cookies.get(COOKIE_KEYS.userId);
//     const url = `http://52.14.33.154:9093/youro/api/v1/getCarePlanDetails?apptId=${apptId}&diagId=${diagId}&patientId=${patient_id}`;

//     try {
//       const res = await axios.get(url);
//       console.log('careplan data for apptId', apptId, 'and diagId', diagId);
//       console.log('res data', res.data);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch care plan details for initial apptId and diagId when the component mounts.
//   useEffect(() => {
    
//     fetchData(1, 1); // Replace with actual apptId and diagId values you want to fetch.
//   }, []);

//   return (
//     <div>
//       {Object.keys(data).map(category => (
//         <div key={category}>
//           <h4>{category}</h4>
//           <ul>
//             {data[category].map(item => (
//               <li key={item.presId}>
//                 {item.name}
//                 {item.dosage ? ` - Dosage: ${item.dosage}` : ''}
//                 {item.indicator ? ' (Indicator)' : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarePlan;

// import React, { useState, useEffect } from 'react';
// import { COOKIE_KEYS } from '../../App';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const CarePlan = () => {
//   const [data, setData] = useState([]);
//   const [activeLoader, setActiveLoader] = useState(false);

//   const fetchAppointments = async (patientId) => {
//     const url = `http://52.14.33.154:9093/youro/api/v1/getAppointmentsByPatientID/${patientId}`;

//     try {
//       const res = await axios.get(url);
//       return res.data[0]; // Assuming you want the first appointment, you can adjust this as needed.
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   };

//   const fetchCarePlan = async (apptId, diagId, patientId) => {
//     const url = `http://52.14.33.154:9093/youro/api/v1/getCarePlanDetails?apptId=${apptId}&diagId=${diagId}&patientId=${patientId}`;

//     try {
//       const res = await axios.get(url);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const patientId = Cookies.get(COOKIE_KEYS.userId);

//     const getAppointments = async () => {
//       const appointmentData = await fetchAppointments(patientId);

//       if (appointmentData) {
//         const { apptId, diagId } = appointmentData;
//         const carePlanData = await fetchCarePlan(apptId, diagId, patientId);
//         setData(carePlanData);
//       }
//     };

//     getAppointments();
//   }, []);

//   return (
//     <div>
//       {Object.keys(data).map(category => (
//         <div key={category}>
//           <h4>{category}</h4>
//           <ul>
//             {data[category].map(item => (
//               <li key={item.presId}>
//                 {item.name}
//                 {item.dosage ? ` - Dosage: ${item.dosage}` : ''}
//                 {item.indicator ? ' (Indicator)' : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarePlan;
// ----------------

import React, { useState, useEffect } from 'react';
import { API_DETAILS, COOKIE_KEYS } from '../../App';
import Cookies from 'js-cookie';
import axios from 'axios';

const CarePlan = () => {
  const [data, setData] = useState([]);
  const [activeLoader, setActiveLoader] = useState(false);

  const fetchAppointments = async (patientId) => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/youro/api/v1/getCarePlanDetailsByPatientID/${patientId}`;

    try {
      const res = await axios.get(url);
      return res.data[0]; // Assuming you want the first appointment, you can adjust this as needed.
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchData = async () => {
    const patientId = Cookies.get(COOKIE_KEYS.userId);
    const appointmentData = await fetchAppointments(patientId);

    if (appointmentData) {
      const { apptId, diagId } = appointmentData;
      const url = `http://52.14.33.154:9093/youro/api/v1/getCarePlanDetails?apptId=${apptId}&diagId=${diagId}&patientId=${patientId}`;

      try {
        const res = await axios.get(url);
        console.log('careplan data for apptId', apptId, 'and diagId', diagId);
        console.log('res data', res.data);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div>
    <>
      {data.length ? Object.keys(data).map(category => (
        <div key={category}>
          <h4>{category}</h4>
          <ul>
            {data[category].map(item => (
              item.indicator && <>
                <li key={item.presId}>
                {item.name}
                {item.dosage ? ` - Dosage: ${item.dosage}` : ''}
                {/* {item.indicator ? ' (Indicator)' : ''} */}
              </li>
                </>
              
            ))}
          </ul>
        </div>
      )) : <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h3><i>See a doctor for your careplan</i></h3>
    </div>}
    
    </>
    // </div>
  );
};

export default CarePlan;

