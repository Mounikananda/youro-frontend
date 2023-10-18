import React, {useState} from "react";
import Popup from 'reactjs-popup';

const SymptomCalculator = (props) => {

    const diagnosisNames = ['Diagnosis 1', 'Diagnosis 2', 'Diagnosis 3', 'Diagnosis 4', 'Diagnosis 5', 'Diagnosis 6', 'Diagnosis 7', 'Diagnosis 8']
    const [chooseDiagnosis, setChooseDiagnosis] = useState(true);
    const [questionnare, setQuestionnare] = useState([{question: 'How are you?', options: ['Good', 'Bad', 'Neutral', 'None'], questionId: '1'},
                                                     {question: 'What is your name?', options: ['Alan Hunt', 'Farah', 'Both', 'None'],  questionId: '2'}])
    const [questionNum, setQuestionNum] = useState(0);
    const [userResponse, setUserResponse] = useState({})

    const handleNext = () => {
        if(chooseDiagnosis){
            setChooseDiagnosis(false)

            // Get questionnare after user selecting the Diagnosis
            // axios.post()
        } else {
            if(questionNum + 1 < questionnare.length) {
                setQuestionNum(questionNum + 1)
            } else{
                // Post user response data
                // axios.post()
                console.log(userResponse)
                props.setOpen(false)
            }
        }
    }

    const handleResponse = (questionNum, option) => {
        var userResponses = {...userResponse}
        userResponses[questionnare[questionNum].questionId] = option;
        setUserResponse(userResponses);
    }

    return (
            <Popup open={props.open} modal closeOnDocumentClick={false} onClose={() => props.setOpen(false)} className="symptom-popup">
                <div style={{position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}} onClick={() => {props.setOpen(false)}}>
                    <span class="material-symbols-outlined">
                    close
                    </span>
                </div>
                <div style={{padding: '30px 50px'}}>
                    <div style={{textAlign: 'center'}}>
                        <h2>Symptom Calculator</h2>
                        {chooseDiagnosis ? <p>Choose the diagnosis</p> : <p>Question {questionNum+1} out of {questionnare.length}</p>}<br/>
                    </div>

                    <div style={{textAlign: 'start'}}>
                        {chooseDiagnosis &&  <div style={{display: "flex", flexWrap: 'wrap'}}>
                            {diagnosisNames.map((name) => {
                                return (
                                    <div style={{width: '200px'}}>
                                    <input type="radio" id="html" name="diagnosis" value={name}/>
                                    <label for="html" style={{marginLeft: '10px'}}>{name}</label><br/><br/>
                                    </div>
                                )
                            })}

                        </div> }
                        {(!chooseDiagnosis) ? <>
                            <p>{questionnare[questionNum].question}</p>
                            {questionnare[questionNum].options.map((option) => {
                                return (
                                    <>
                                        <input type="radio" id="html" name={questionnare[questionNum].questionId} checked={userResponse[questionnare[questionNum].questionId] === option} onChange={() => handleResponse(questionNum, option)}/>
                                        <label for="html" style={{marginLeft: '10px'}}>{option}</label><br/><br/>
                                    </>
                                )
                            })}

                        </>: ''}
                    </div>


                    <div className={!chooseDiagnosis && !userResponse[questionnare[questionNum].questionId] ? "btn-filled-disabled" : "btn-filled"} style={{width: 'fit-content', marginLeft: 'auto', marginTop: '20px'}} onClick={handleNext}>{chooseDiagnosis || questionNum + 1 < questionnare.length ? 'Next' : 'Submit'}</div>
                
                </div>
                
                
            </Popup>
    )
}

export default SymptomCalculator;