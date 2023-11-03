import {React,useState,useEffect} from 'react';
import { COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import axios from 'axios';

const CarePlan = () => {
    const [data, setData] = useState([]);
    const [activeLoader, setActiveLoader] = useState(false);
  const fetchData= async()=>
  {
    const patient_id= Cookies.get(COOKIE_KEYS.userId);
    const url=`http://52.14.33.154:9093/youro/api/v1/getCarePlanDetailsByPatientID/${patient_id}`;
    try {
      const res = await axios.get(url);
      console.log("careplan data"+"id "+patient_id+" "+res);
//       setPrevAppts(res.data.previousAppointments);
//       setUpcomingAppts(res.data.upComingAppointments);
    }
    catch (err) {
      console.error(err);
    }
    
    
  }



    useEffect(() => {
     fetchData(); 
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
              <div key={categoryIndex + 1}>
                <h4>{category}</h4>
                <ul>
                  {Object.entries(item[category]).map(([medication, instruction], i) => (
                    <li key={i}>
                      {/* {medication}: {instruction} */}
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
export default CarePlan;