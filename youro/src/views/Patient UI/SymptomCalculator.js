import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import { USER_TYPES } from '../../App';
import axios from 'axios';


const SymptomCalculator = (props) => {

    const diagnosisNames1 = [{ diagosisId: '1', diagnosisName: 'Diagnosis 1' },
                            { diagosisId: '2', diagnosisName: 'Diagnosis 2' },
                            { diagosisId: '3', diagnosisName: 'Diagnosis 3' },
                            { diagosisId: '4', diagnosisName: 'Diagnosis 4' },
                            { diagosisId: '5', diagnosisName: 'Diagnosis 5' },
                            { diagosisId: '6', diagnosisName: 'Diagnosis 6' },
                            { diagosisId: '7', diagnosisName: 'Diagnosis 7' },
                            { diagosisId: '8', diagnosisName: 'Diagnosis 8' }];
    const [chooseDiagnosis, setChooseDiagnosis] = useState(true);

    const [questionnare, setQuestionnare] = useState([{ question: 'How are you?', options: ['Good', 'Bad', 'Neutral', 'None'], questionId: '1' },
    { question: 'What is your name?', options: ['Alan Hunt', 'Farah', 'Both', 'None'], questionId: '2' }])
    const [questionNum, setQuestionNum] = useState(0);

    const [userResponse, setUserResponse] = useState({});

    const [selDiag, setDiagId] = useState('');
    const [diagnosisNames, setDiagnoses] = useState([]);
    const [radioChecked, setChecked] = useState(false);

    useEffect(() => {
        fetchAllDiagnoses();
    }, [])

    const fetchQuesByDiagId = async () => {
        // console.log(selDiag);
        console.log("====^^^===");
        console.log("fetchQuesByDiagId START");
        const url = `http://localhost:9092/youro/api/v1/getQuestionsBydiagId/${selDiag}`;
        try {
            const res = await axios.get(url);
            console.log("res : " + "  =>  " + JSON.stringify(res));
            setQuestionnare(res.data);
        }
        catch (err) {
            console.error(err);
        }
        console.log("fetchQuesByDiagId END");
        console.log("====^^^===");
    };

    const fetchAllDiagnoses = async () => {
        console.log("====^^^===");
        console.log("fetchAllDiagnoses START");
        const url = `http://localhost:9092/youro/api/v1/getAllDiagnoses`;
        try {
            const res = await axios.get(url);
            console.log("res : " + "  =>  " + JSON.stringify(res.data));
            setDiagnoses(res.data);
        }
        catch (err) {
            console.error(err);
        }
        console.log("fetchAllDiagnoses END");
        console.log("====^^^===");
    };

    const handleNext = () => {
        console.log("====^^^===");
        console.log("handleNext START");
        if (chooseDiagnosis) {
            console.log("daig true : ");
            setChooseDiagnosis(false);
            fetchQuesByDiagId();

        } else {
            console.log("daig false : ");
            console.log("user Res: " + JSON.stringify(userResponse));
            if (questionNum + 1 < questionnare.length) {
                setQuestionNum(questionNum + 1)
            } else {
                // Post user response data
                // axios.post()
                console.log(radioChecked);
                console.log(userResponse);
                console.log(selDiag);
                const now = new Date();
                console.log(now);
                const temp = {
                    dateTime: now,
                    diagnosisID: selDiag,
                    questionData: userResponse,
                    patientId: '1',
                }
                props.setOpen(false)
            }
        }
        console.log("handleNext END");
        console.log("====^^^===");
    }

    const handleResponse = (questionNum, option) => {
        console.log("====^^^===");
        console.log("handleResponse START");
        console.log("hand res : " + selDiag);
        var userResponses = { ...userResponse }
        userResponses[questionnare[questionNum].questionId] = {option: option, weight: questionnare[questionNum].weight};
        setChecked(false);
        setUserResponse(userResponses);
        console.log("handleResponse END");
        console.log("====^^^===");
    }

    const handleDiagChange = (event) => {
        console.log("====^^^===");
        console.log("handleDiagChange START");
        console.log("hand diag chng : ");
        console.log(event.target.value);
        setDiagId(event.target.value);
        console.log("handleDiagChange END");
        console.log("====^^^===");
    }

    return (
        <Popup
            open={props.open}
            modal
            closeOnDocumentClick={false}
            onClose={() => props.setOpen(false)}
            className="symptom-popup">

            <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { props.setOpen(false) }}>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>
            <div style={{ padding: '30px 50px' }}>

                <div style={{ textAlign: 'center' }}>
                    <h2>Symptom Calculator</h2>
                    {chooseDiagnosis ? <p>Choose the diagnosis</p> : <p>Question {questionNum + 1} out of {questionnare.length}</p>}
                    <br />
                </div>

                <div style={{ textAlign: 'start' }}>
                    {chooseDiagnosis && <div style={{ display: "flex", flexWrap: 'wrap' }}>
                        {diagnosisNames.map((diagosis) => {
                            return (
                                <div style={{ width: '200px' }}>
                                    <input type="radio" id="html" name="diagnosis" value={diagosis.diagId}
                                        onChange={handleDiagChange} />
                                    <label for="html" style={{ marginLeft: '10px' }}>{diagosis.name}</label><br /><br />
                                </div>
                            )
                        })}

                    </div>}
                    {(!chooseDiagnosis) ? <>
                        <p>{questionnare[questionNum].question}</p>
                        {questionnare[questionNum].options.map((option) => {
                            return (
                                <>
                                    <input type="radio" id="html"
                                        name={questionnare[questionNum].questionId}
                                        checked = { userResponse[questionnare[questionNum].questionId] && userResponse[questionnare[questionNum].questionId][option] && (userResponse[questionnare[questionNum].questionId][option] === option) }
                                        onChange={() => handleResponse(questionNum, option)} />

                                    <label for="html" style={{ marginLeft: '10px' }}>{option}</label><br /><br />
                                </>
                            )
                        })}

                    </> : ''}
                </div>


                <div className={!chooseDiagnosis && !userResponse[questionnare[questionNum].questionId] ? "btn-filled-disabled" : "btn-filled"}
                    style={{ width: 'fit-content', marginLeft: 'auto', marginTop: '20px' }}
                    onClick={handleNext}>
                    {chooseDiagnosis || questionNum + 1 < questionnare.length ? 'Next' : 'Submit'}
                </div>

            </div>


        </Popup>
    )
}

export default SymptomCalculator;