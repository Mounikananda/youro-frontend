import axios from 'axios';
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

const PatientSymptomChart = (props) => {
  const [render, canRender] = useState(false)
  const [data, setData] = useState([]);
  const [selectedScore, setSelectedScore] = useState([]);
  const [diagnosisNames, setDiagnoses] = useState([]);
  let usrId = props.uId;


  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (event) => {
    // console.log(event.target.value);
    // console.log("symptom score data :: " + JSON.stringify(data));
    setSelectedOption(event.target.value);
    showScoreForSelectedDiagnosis(event.target.value);
  };

  const showScoreForSelectedDiagnosis = (value) => {
    // console.log("showScoreForSelectedDiagnosis :: " + value);
    if (value !== '') {
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].diagnosisId == value) {
          temp.push(data[i]);
        }
      }
      // console.log(temp);
      setSelectedScore(temp);
    }
  }

  useEffect(() => {
    fetchAllDiagnoses();
    fetchPrevSymptomScore();
  }, []);

  const fetchPrevSymptomScore = () => {
    const url = `http://localhost:9092/youro/api/v1/symptomScore/${usrId}`;
    axios.get(url).then((res) => {
      // console.log("got symptom score :: " + JSON.stringify(res.data));
      setData(res.data);
      canRender(true);
    }).catch((err) => {
      console.error(err);
    });
  }

  const fetchAllDiagnoses = async () => {
    // console.log("====^^^===");
    // console.log("fetchAllDiagnoses START");
    const url = `http://localhost:9092/youro/api/v1/getAllDiagnoses`;
    try {
      const res = await axios.get(url);
      setDiagnoses(res.data);
    }
    catch (err) {
      console.error(err);
    }
    // console.log("fetchAllDiagnoses END");
    // console.log("====^^^===");
  };

  return (
    <div>
      {
        render == true && <>
          <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '30vh', display: 'flex', alignItems: 'end', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '3px', left: '15px' }}>
              <h3 style={{ display: 'inline-block' }}>Prev Symptom Scores</h3>

              <select id="d" name="d" className='dropdown-chart' value={selectedOption} onChange={handleSelectChange}>
                <option>Select Diagnosis</option>
                {
                  diagnosisNames.map((result) => (<option value={result.diagId}>{result.name}</option>))
                }
              </select>
            </div>
            <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '12px', padding: '10px 5px' }} className='btn-outlined' onClick={() => props.retakeSymptomScore(true)}>Retake symptom score</div>

            {data.length == 0 && <>
          {/* <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '30vh', display: 'flex', alignItems: 'end', position: 'relative' }}> */}
            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <h3 >No Record of Symptom Score</h3>
            </div>
          {/* </div> */}
        </>
      }

          {data.length > 0 && <>
{
              selectedOption == '' && <>
                <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <h3><i>Please select a diagnosis to view the score</i></h3>
                </div>
              </>
            }
            {
              selectedOption != '' && selectedScore.length > 0 && <>
                <ResponsiveContainer width="100%" height="75%">
                  <LineChart
                    width={500}
                    height={200}
                    data={selectedScore}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateTime" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="symptomScore" stroke="#8884d8" fill="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            }
            {
              selectedOption != '' && selectedScore.length == 0 && <>
                <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <h3><i>No Record of Symptom Score for this diagnosis</i></h3>
                </div>
              </>
            }
</>}
            
          </div>
        </>
      }
      
    </div >
  );

};

export default PatientSymptomChart;
