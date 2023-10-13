import {React, useState ,useEffect} from 'react';

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

export default PreviousAppointments;