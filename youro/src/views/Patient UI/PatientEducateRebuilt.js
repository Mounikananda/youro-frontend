import { React, useState, useEffect } from 'react';
import Youroheader from "../Youro-header";
import { API_DETAILS } from '../../App';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const PatientEducateRebuilt = (props) => {

    const [step, setStep] = useState(0);
    const [viewVal, setViewVal] = useState(0);
    const [diagnosisData, setDiagnosisData] = useState([]);
    const [pageContext, setPageContext] = useState('SYSMPTOMS');

    const navToProfile = () => {
        props.changeView(4);
    }

    useEffect(() => {
        if (viewVal == 4) {
            navToProfile();
        }
        fetchAllDiagnoses();
    }, [viewVal]);

    const fetchAllDiagnoses = async () => {
        // console.log("====^^^===");
        // console.log("fetchAllDiagnoses START");
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllDiagnoses`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            setDiagnosisData(res.data);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("fetchAllDiagnoses END");
        // console.log("====^^^===");
    };

    const renderActiveDiagnosisName = () => {
        return <div>{diagnosisData[step].name}</div>;
    }

    const handlePageContextChange = (event, newAlignment) => {

        // symptoms, causes, treatment, surgical options
        if (newAlignment == null || newAlignment == 'SYSMPTOMS') {
            setPageContext('SYSMPTOMS');
        }
        else if (newAlignment == null || newAlignment == 'CAUSES') {
            setPageContext('CAUSES');
        }
        else if (newAlignment == null || newAlignment == 'TREATMENT') {
            setPageContext('TREATMENT');
        }
        else if (newAlignment == null || newAlignment == 'SURGICAL_OPTIONS') {
            setPageContext('SURGICAL_OPTIONS');
        }
    }

    return (
        <div className="educate-container">
            <div style={{width:"100%",margin:"0% 2%"}}>
            <Youroheader setView={setViewVal} />
            <h1 style={{marginTop: '0px', marginBottom: '50px', color: 'black' }}>Educate Yourself</h1>
            <div className="educate-container-main">
                <div className="educate-column-one">
                    {diagnosisData && diagnosisData.length != 0 && diagnosisData.map((item, index) => (
                        <div className='diagnosis-list' >
                            <div className={`educate-column-one-name ${step === index && 'educate-column-one-name-active'}`} onClick={() => setStep(index)}>{item.name}</div>
                        </div>
                    ))
                    }
                </div>
                {/* <div className="educate-column-two">
                    <h1>{renderActiveDiagnosisName()}</h1>
                    <p>Have you ever wondered why this happend to you? Watch this video down below</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>

                    <p>Next watch this video...</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div> */}
                <div className="educate-column-two">
                    <ToggleButtonGroup
                        value={pageContext}
                        exclusive
                        onChange={handlePageContextChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="SYSMPTOMS">Symptoms</ToggleButton>
                        <ToggleButton value="CAUSES">Causes</ToggleButton>
                        <ToggleButton value="TREATMENT">Treatment</ToggleButton>
                        <ToggleButton value="SURGICAL_OPTIONS">Surgical Options</ToggleButton>
                    </ToggleButtonGroup>
                    {/* <div style={{margin:'3%',height:'40vh'}}>
                        {
                            pageContext === "SYSMPTOMS" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].symptoms }} />
                        }
                        {
                            pageContext === "CAUSES" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].causes }} />
                        }
                        {
                            pageContext === "TREATMENT" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].treatment }} />
                        }
                        {
                            pageContext === "SURGICAL_OPTIONS" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].surgical_options }} />
                        }
                    </div> */}
                </div>

            </div>
            </div>
        </div>
    )
}

export default PatientEducateRebuilt;