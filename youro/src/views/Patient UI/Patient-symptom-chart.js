import axios from 'axios';
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

let data = [
  { dateTime: 'Page A', symptomScore: 4000 },
  { dateTime: 'Page B', symptomScore: 3000 },
  { dateTime: 'Page C', symptomScore: 2000 },
  { dateTime: 'Page D', symptomScore: 1000 },
  { dateTime: 'Page E', symptomScore: 1890 },
  { dateTime: 'Page F', symptomScore: 2390 },
  { dateTime: 'Page G', symptomScore: 3490 },
];

const PatientSymptomChart = (props) => {
  const [render, canRender] = useState(false)
  let usrId = props.uId;
  // console.clear();
  // console.log("usr data :: ");
  // console.log(usrId);
  const url = `http://localhost:9092/youro/api/v1/symptomScore/${usrId}`;
  axios.get(url).then((res) => {
    console.log("got symptom score :: " + JSON.stringify(res.data));
    data = res.data;

    canRender(true);
  }).catch((res) => {
    console.error(res.response.data.errorMessage)
  });

  return (
    <div>
      {
        render == true && data.length > 0 && <>
          <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={500}
                height={200}
                data={data}
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
          </div>
        </>
      }
      {
        render == true && data.length == 0 && <>
          <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
              No Data Found!
          </div>
        </>
      }
    </div>
  );

};

export default PatientSymptomChart;
