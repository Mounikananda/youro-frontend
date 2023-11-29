import axios from 'axios';
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import { API_DETAILS } from '../../App';

const PatientSymptomChart = (props) => {
  const [render, canRender] = useState(false)
  const [data, setData] = useState([]);
  const [selectedScore, setSelectedScore] = useState([]);
  const [diagnosisNames, setDiagnoses] = useState([]);
  const [prevDIag, setPrevDiag] = useState([]);
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
    fecthPrevDiag();
    fetchPrevSymptomScore();
  }, []);

  const fetchPrevSymptomScore = () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/symptomScore/${usrId}`;
    const config = {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    axios.get(url, config).then((res) => {
      // console.log("got symptom score :: " + JSON.stringify(res.data));
      setData(res.data);
      canRender(true);
    }).catch((err) => {
      console.error(err);
    });
  }

  const fecthPrevDiag = async () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDiagnosisByCustomer/${usrId}`;
    const config = {
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/json'
      }
  };
    try {
      const res = await axios.get(url, config);
      setPrevDiag(res.data)
    }
    catch (err) {
      console.error(err);
    }
  }

  if(props.fetchSymptomScore){
    fetchPrevSymptomScore();
    fecthPrevDiag();
    props.setFetchSymptomScore(false)
  }

  const fetchAllDiagnoses = async () => {
    // console.log("====^^^===");
    // console.log("fetchAllDiagnoses START");
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getAllDiagnoses`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(url, config);
      setDiagnoses(res.data);
    }
    catch (err) {
      console.error(err);
    }
    // console.log("fetchAllDiagnoses END");
    // console.log("====^^^===");
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, stroke, payload } = props;  
    var date = new Date(payload.value)
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end">
        {date.toLocaleString('default', { month: 'long', day: 'numeric', timeZone: 'UTC'}) + ", " + date.toLocaleString('default', { year: 'numeric', timeZone: 'UTC' })}
        </text>
      </g>
    );
  }

  return (
    <div>
      {
        render == true && <>
          <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '30vh', display: 'flex', alignItems: 'end', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '3px', left: '15px' }}>
              <h3 style={{ display: 'inline-block' }}>Prev Symptom Scores</h3>

              {prevDIag && prevDIag[0] && <select id="d" name="d" className='dropdown-chart' value={selectedOption} onChange={handleSelectChange}>
                <option>Select Diagnosis</option>
                {
                  prevDIag.map((result) => (<option value={result.diagId}>{result.diagName}</option>))
                }
              </select>}
            </div>
            {!props.doctorView && prevDIag && !prevDIag[0] && <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '12px', padding: '10px 5px' }} className='btn-outlined' onClick={() => props.retakeSymptomScore(true)}>
              Calculate symptom score
            </div>}

            {data.length == 0 && <>
              {/* <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '30vh', display: 'flex', alignItems: 'end', position: 'relative' }}> */}
              {/* <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <h3 >No Record of Symptom Score</h3>
            </div> */}
              <div style={{ width: "98%", borderRadius: '10px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <div style={{ position: 'absolute', top: '3px', left: '15px' }}> */}
                <h3 style={{ display: 'inline-block', fontStyle: 'italic' }}>No Record of Symptom Score</h3>
                {/* </div> */}
              </div>
              {/* </div> */}
            </>
            }

            {data.length > 0 && <>
              {
                selectedOption == '' && <>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      <XAxis dataKey="dateTime" tick={<CustomizedAxisTick />}/>
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="symptomScore" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              }
              {
                selectedOption != '' && selectedScore.length == 0 && <>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
