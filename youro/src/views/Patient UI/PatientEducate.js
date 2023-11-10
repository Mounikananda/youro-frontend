import { React, useState,useEffect } from 'react';
import Youroheader from "../Youro-header";

const PatientEducate = (props) => {

    const [step, setStep] = useState(0);
    const [viewVal, setViewVal] = useState(0);
    const navToProfile = () => {
        props.changeView(4);
    }

    useEffect(() => {
        if (viewVal == 4) {
            navToProfile();
        }
    }, [viewVal]);


    return (
        <div className="educate-container">
            <Youroheader  setView={setViewVal}/>
            <h1 style={{ marginTop: '80px',color:'black'}}>Educate Yourself</h1>
            <div className="educate-container-main">
                <div className="educate-column-one">
                    <div className={`educate-column-one-name ${step === 0 && 'educate-column-one-name-active'}`} onClick={() => setStep(0)}>Diagnosis1</div>
                    <div className={`educate-column-one-name ${step === 1 && 'educate-column-one-name-active'}`} onClick={() => setStep(1)}>Diagnosis2</div>
                    <div className={`educate-column-one-name ${step === 2 && 'educate-column-one-name-active'}`} onClick={() => setStep(2)}>Diagnosis1</div>
                    <div className={`educate-column-one-name ${step === 3 && 'educate-column-one-name-active'}`} onClick={() => setStep(3)}>Diagnosis2</div>
                    <div className={`educate-column-one-name ${step === 4 && 'educate-column-one-name-active'}`} onClick={() => setStep(4)}>Diagnosis1</div>
                    <div className={`educate-column-one-name ${step === 5 && 'educate-column-one-name-active'}`} onClick={() => setStep(5)}>Diagnosis2</div>
                    <div className={`educate-column-one-name ${step === 6 && 'educate-column-one-name-active'}`} onClick={() => setStep(6)}>Diagnosis1</div>
                    <div className={`educate-column-one-name ${step === 7 && 'educate-column-one-name-active'}`} onClick={() => setStep(7)}>Diagnosis2</div>
                </div>
                <div className="educate-column-two">
                    <h1>Diagnosis1</h1>
                    <p>Have you ever wondered why this happend to you? Watch this video down below</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>

                    <p>Next watch this video...</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default PatientEducate;