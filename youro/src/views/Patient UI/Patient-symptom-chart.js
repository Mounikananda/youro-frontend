import React from 'react';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D', uv: 1000 },
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
];

const PatientSymptomChart = (props) => {
 return (
      <div style={{width: "98%", backgroundColor:'white', borderRadius: '10px', height: '30vh', display: 'flex', alignItems: 'end', position: 'relative'}}>
        <h3 style={{position: 'absolute', top: '3px', left: '15px'}}>Prev Symptom Scores</h3>
        <div style={{position: 'absolute', top: '10px', right: '20px', fontSize: '12px', padding: '10px 5px'}} className='btn-outlined' onClick={() => props.retakeSymptomScore(true)}>Retake symptom score</div>
        <ResponsiveContainer width="100%" height="75%">
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>


      </div>
    );
   
};

export default PatientSymptomChart;
