import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_DETAILS, COOKIE_KEYS } from "../../App";


const SymptomCalculator = (props) => {
    const [chooseDiagnosis, setChooseDiagnosis] = useState(true);

    const [questionnare, setQuestionnare] = useState([{ question: 'How are you?', options: ['Good', 'Bad', 'Neutral', 'None'], questionId: '1' },
    { question: 'What is your name?', options: ['Alan Hunt', 'Farah', 'Both', 'None'], questionId: '2' }])
    const [questionNum, setQuestionNum] = useState(0);

    const [userResponse, setUserResponse] = useState([]);

    const [selDiag, setDiagId] = useState('');
    const [diagnosisNames, setDiagnoses] = useState([]);
    const [symptomScore, setSymptomScore] = useState(-1);
    const [symptomScorePage, setSymptomScorePage] = useState(false);

    useEffect(() => {
        fetchAllDiagnoses();
        // setQuestionnare([
        //     {
        //         "questionId": 3003,
        //         "question": "Question 1",
        //         "options": [
        //             {
        //                 "oId": 1,
        //                 "oName": "Option 1"
        //             },
        //             {
        //                 "oId": 2,
        //                 "oName": "Option 2"
        //             }
        //         ]
        //     },
        //     {
        //         "questionId": 3004,
        //         "question": "Question 2",
        //         "options": [
        //             {
        //                 "oId": 3,
        //                 "oName": "Option 1"
        //             },
        //             {
        //                 "oId": 4,
        //                 "oName": "Option 2"
        //             }
        //         ]
        //     },
        //     {
        //         "questionId": 3005,
        //         "question": "Question 3",
        //         "options": [
        //             {
        //                 "oId": 5,
        //                 "oName": "Option 1"
        //             },
        //             {
        //                 "oId": 6,
        //                 "oName": "Option 2"
        //             },
        //             {
        //                 "oId": 7,
        //                 "oName": "Option 3"
        //             }
        //         ]
        //     }
        // ])
    }, [])

    const fetchQuesByDiagId = async () => {
        console.log("====^^^===");
        console.log("fetchQuesByDiagId START");
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getQuestionsBydiagId/${selDiag}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            console.log(res);
            setQuestionnare(res.data);
        }
        catch (err) {
            console.error(err);
        }
        console.log("fetchQuesByDiagId END");
        console.log("====^^^===");
    };

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

    const [newScore, setNewScoreInfo] = useState({});
    const saveNewSymptomScore = async (data) => {
        // console.log("====^^^===");
        // console.log("saveNewSymptomScore START");
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/saveSymptomScore`;
        setSymptomScorePage(true);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            // console.log(data);
            const res = await axios.post(url, data, config);
            setDiagnoses(res.data);
            console.log(res.data);
            setNewScoreInfo(res.data);

            // setSymptomScorePage(true)
        }
        catch (err) {
            console.error(err);
        }
        // console.log("saveNewSymptomScore END");
        // console.log("====^^^===");
    };


    const handleNext = () => {
        console.log("====^^^===");
        console.log("handleNext START");
        if (chooseDiagnosis) {
            setChooseDiagnosis(false);
            fetchQuesByDiagId();
        } else {
            if (questionNum + 1 < questionnare.length) {
                setQuestionNum(questionNum + 1)
            } else {
                const now = new Date();
                const temp = {
                    diagnosisId: parseInt(selDiag),
                    questionData: userResponse,
                    patientId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
                }
                saveNewSymptomScore(temp);
                // props.setOpen(false)
            }
        }
        console.log("handleNext END");
        console.log("====^^^===");
    }

    const handleResponse = (questionNum, option) => {
        console.log("====^^^===");
        console.log("handleResponse START");
        var userResponses = [...userResponse];
        console.log(userResponses);
        console.log(userResponse[questionNum]);
        if (userResponse[questionNum]) {
            console.log('data in questionNum index already exists');
            userResponses.pop();
            userResponses.push({ qId: questionnare[questionNum].questionId, question: questionnare[questionNum].question, optionsData: [option] });
        }
        else {
            userResponses.push({ qId: questionnare[questionNum].questionId, question: questionnare[questionNum].question, optionsData: [option] });
        }
        setUserResponse(userResponses);
        console.log(userResponses);
        console.log("handleResponse END");
        console.log("====^^^===");
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
            onClose={() => { props.setOpen(false) }}
            className="symptom-popup">

            <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { props.setOpen(false) }}>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>
            <div style={{ padding: '30px 50px' }}>

                <div style={{ textAlign: 'center' }}>
                    {!symptomScorePage && <><h2>Symptom Calculator</h2>
                        {questionnare.length == 0 &&
                            <>
                                <div>
                                    No questions related to this Diagnosis
                                </div>
                            </>
                        }
                        {questionnare.length > 0 && <>
                            {chooseDiagnosis ? <p>Choose the diagnosis</p> : <p>Question {questionNum + 1} out of {questionnare.length}</p>}
                        </>
                        }</>}
                    <br />
                </div>

                <div style={{ textAlign: 'start' }}>
                    {chooseDiagnosis && <div style={{ display: "flex", flexWrap: 'wrap', maxHeight: '30vh', overflowY: 'scroll' }}>
                        {diagnosisNames.map((diagosis) => {
                            return (
                                <div style={{ maxWidth: '200px', minWidth: '150px' }}>
                                    <input type="radio" id="html" name="diagnosis" value={diagosis.diagId}
                                        onChange={handleDiagChange} />
                                    <label for="html" style={{ marginLeft: '10px' }}>{diagosis.name}</label><br /><br />
                                </div>
                            )
                        })}

                    </div>}
                    {(!chooseDiagnosis) ? (symptomScorePage ? <div style={{ textAlign: 'center' }}>
                        <h2>Your Symptom Score</h2>
                        <h4><h1 style={{ display: 'inline-block' }}>{newScore.score}</h1 ></h4><br>
                        </br>
                        <p>Diagnosis Name: <strong>{newScore.diagName}</strong></p>
                    </div> :
                        <>
                            <p>{questionnare[questionNum]?.question}</p>
                            {questionnare[questionNum]?.options.map((option) => {
                                return (
                                    <>
                                        <input type="radio" id="html"
                                            name={questionnare[questionNum].questionId}
                                            checked={userResponse[questionNum] && (userResponse[questionNum]['optionsData'][0].oName === option.oName)}
                                            onChange={() => handleResponse(questionNum, option)} />

                                        <label for="html" style={{ marginLeft: '10px' }}>{option.oName}</label><br /><br />
                                    </>
                                )
                            })}

                        </>) : ''}
                </div>

                {!symptomScorePage && <div className={!chooseDiagnosis && !userResponse[questionNum] ? "btn-filled-disabled" : "btn-filled"}
                    style={{ width: 'fit-content', marginLeft: 'auto', marginTop: '20px' }}
                    onClick={handleNext}>
                    {chooseDiagnosis || questionNum + 1 < questionnare.length ? 'Next' : 'Submit'}
                </div>
                }


            </div>


        </Popup>
    )
}

export default SymptomCalculator;