import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import axios from 'axios';


const SymptomCalculator = (props) => {
    const [chooseDiagnosis, setChooseDiagnosis] = useState(true);

    const [questionnare, setQuestionnare] = useState([{ question: 'How are you?', options: ['Good', 'Bad', 'Neutral', 'None'], questionId: '1' },
    { question: 'What is your name?', options: ['Alan Hunt', 'Farah', 'Both', 'None'], questionId: '2' }])
    const [questionNum, setQuestionNum] = useState(0);

    const [userResponse, setUserResponse] = useState({});

    const [selDiag, setDiagId] = useState('');
    const [diagnosisNames, setDiagnoses] = useState([]);

    useEffect(() => {
        fetchAllDiagnoses();
        setQuestionnare([
            {
                "questionId": 3003,
                "question": "Question 1",
                "options": [
                    "Option 1",
                    "Option 2"
                ]
            },
            {
                "questionId": 3004,
                "question": "Question 2",
                "options": [
                    "Option 1",
                    "Option 2"
                ]
            },
            {
                "questionId": 3005,
                "question": "Question 3",
                "options": [
                    "Option 1",
                    "Option 2",
                    "Option 3"
                ]
            }
        ])
    }, [])

    const fetchQuesByDiagId = async () => {
        // console.log("====^^^===");
        // console.log("fetchQuesByDiagId START");
        const url = `http://localhost:9092/youro/api/v1/getQuestionsBydiagId/${selDiag}`;
        try {
            const res = await axios.get(url);
            setQuestionnare(res.data);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("fetchQuesByDiagId END");
        // console.log("====^^^===");
    };

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

    const saveNewSymptomScore = async (data) => {
        // console.log("====^^^===");
        // console.log("saveNewSymptomScore START");
        const url = `http://localhost:9092/youro/api/v1/saveNewSymptomScore`;
        try {
            const res = await axios.post(url, data);
            setDiagnoses(res.data);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("saveNewSymptomScore END");
        // console.log("====^^^===");
    };


    const handleNext = () => {
        // console.log("====^^^===");
        // console.log("handleNext START");
        if (chooseDiagnosis) {
            setChooseDiagnosis(false);
            fetchQuesByDiagId();

        } else {
            if (questionNum + 1 < questionnare.length) {
                setQuestionNum(questionNum + 1)
            } else {
                const now = new Date();
                const temp = {
                    takenDate: now,
                    diagnosisId: selDiag,
                    questionData: userResponse,
                    patientId: 1,
                }
                saveNewSymptomScore(temp);
                props.setOpen(false)
            }
        }
        // console.log("handleNext END");
        // console.log("====^^^===");
    }

    const handleResponse = (questionNum, option) => {
        // console.log("====^^^===");
        // console.log("handleResponse START");
        var userResponses = { ...userResponse }
        userResponses[questionnare[questionNum].questionId] = {option: option, weight: questionnare[questionNum].weight};
        setUserResponse(userResponses);
        // console.log("handleResponse END");
        // console.log("====^^^===");
    }

    const handleDiagChange = (event) => {
        // console.log("====^^^===");
        // console.log("handleDiagChange START");
        console.log(event.target.value);
        setDiagId(event.target.value);
        // console.log("handleDiagChange END");
        // console.log("====^^^===");
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
                                        checked = { userResponse[questionnare[questionNum].questionId] && userResponse[questionnare[questionNum].questionId]['option'] && (userResponse[questionnare[questionNum].questionId]['option'] === option) }
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