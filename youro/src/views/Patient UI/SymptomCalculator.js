import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";

const SymptomCalculator = (props) => {
  const [chooseDiagnosis, setChooseDiagnosis] = useState(true);

  const [questionnaire, setquestionnaire] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [selDiag, setDiagName] = useState("");
  const [diagId, setDiagId] = useState("");
  const [diagnosisNames, setDiagnoses] = useState([]);
  const [symptomScore, setSymptomScore] = useState(-1);
  const [symptomScorePage, setSymptomScorePage] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [qId, setQId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentChildQuestionIndex, setCurrentChildQuestionIndex] = useState(0);
  const [initialCondition, setInitialCondition] = useState(true);

  useEffect(() => {
    fetchAllDiagnoses();
  }, []);

  const fetchQuesByDiagId = async () => {
    const temp = {
      questionnaire_type: selDiag,
      last_question_id: qId,
      selected_option_id: selectedOption,
    };
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      "/getQuestionsByQuestionnaireType";
    axios
      .post(url, temp)
      .then((res) => {
        console.log(res);

        setquestionnaire(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setSelectedOption(0);
  };

  const fetchAllDiagnoses = async () => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getAllDiagnoses`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      setDiagnoses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [newScore, setNewScoreInfo] = useState({});
  const saveNewSymptomScore = async (data) => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/saveSymptomScore`;
    setSymptomScorePage(true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, data, config);
      setDiagnoses(res.data);
      console.log(res.data);
      setNewScoreInfo(res.data);
    } catch (err) {
      console.error(err);
    }
    if (props.fetchSymptomScore) {
      props.fetchSymptomScore(true);
    }
  };

  const handleNext = () => {
    console.log("====^^^===");
    console.log("handleNext START");

    setSelectedOption(0);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    fetchQuesByDiagId();

    if (questionnaire.length === 0) {
      const now = new Date();
      const temp = {
        diagnosisId: diagId,
        questionData: userResponse,
        patientId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
      };
      saveNewSymptomScore(temp);
    }

    console.log("handleNext END");
    console.log("====^^^===");
  };

  const handleResponse = (qId, question, oId, option) => {
    setSelectedOption(oId);
    setQId(qId);
    var userResponses = [...userResponse];
    console.log(userResponses);
    console.log(userResponse[currentQuestionIndex]);
    if (userResponse[currentQuestionIndex]) {
      console.log("data in questionNum index already exists");
      userResponses.pop();
      userResponses.push({
        qId: qId,
        question: question,
        optionsData: [option],
      });
    } else {
      userResponses.push({
        qId: qId,
        question: question,
        optionsData: [option],
      });
    }
    setUserResponse(userResponses);
    console.log(userResponses);
  };

  const handleDiagChange = (event) => {
    console.log(event.target.value);
    const selectedDiagnosis = JSON.parse(event.target.value);
    const { id, name } = selectedDiagnosis;
    setDiagId(id);
    setDiagName(name);
  };
  const onClickHandler = () => {
    if (initialCondition) {
      fetchQuesByDiagId();
      setInitialCondition(false);
    } else if (
      questionnaire.length > 1 &&
      currentChildQuestionIndex !== questionnaire.length - 1
    ) {
      handleNextQuestion();
    } else {
      handleNext();
    }
  };
  const handleNextQuestion = () => {
    setSelectedOption(0);
    setCurrentChildQuestionIndex(currentChildQuestionIndex + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const currentQuestion = questionnaire[currentChildQuestionIndex];

  return (
    <Popup
      open={props.open}
      modal
      closeOnDocumentClick={false}
      onClose={() => {
        props.setOpen(false);
      }}
      className="symptom-popup"
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.setOpen(false);
        }}
      >
        <span class="material-symbols-outlined">close</span>
      </div>
      <div style={{ padding: "30px 50px" }}>
        <div style={{ textAlign: "center" }}>
          {!symptomScorePage && (
            <>
              <h2>Symptom Calculator</h2>
              {questionnaire.length === 0 && (
                <>{initialCondition ? <p>Choose the diagnosis</p> : <p></p>}</>
              )}
            </>
          )}
          <br />
        </div>

        <div style={{ textAlign: "start" }}>
          {initialCondition && chooseDiagnosis && (
            <div
              style={{ display: "flex", flexWrap: "wrap", maxHeight: "30vh" }}
            >
              {diagnosisNames.map((diagnosis) => {
                return (
                  <div style={{ width: "200px" }}>
                    <input
                      type="radio"
                      id="html"
                      name="diagnosis"
                      value={JSON.stringify({
                        id: diagnosis.diagId,
                        name: diagnosis.name,
                      })}
                      onChange={handleDiagChange}
                    />
                    <label for="html" style={{ marginLeft: "10px" }}>
                      {diagnosis.name}
                    </label>
                    <br />
                    <br />
                  </div>
                );
              })}
            </div>
          )}
          {chooseDiagnosis ? (
            symptomScorePage ? (
              <div style={{ textAlign: "center" }}>
                <h2>Your Symptom Score</h2>
                <h4>
                  <h1 style={{ display: "inline-block" }}>{newScore.score}</h1>
                </h4>
                <br></br>
                <p>
                  Diagnosis Name: <strong>{newScore.diagName}</strong>
                </p>
              </div>
            ) : (
              <div>
                <div>
                  {questionnaire.length === 1 && (
                    <>
                      {questionnaire.map((question) => (
                        <div key={question.questionId}>
                          <p>{question.question}</p>

                          {question.options.map((option) => {
                            return (
                              <div style={{ marginLeft: "0px" }}>
                                <input
                                  type="radio"
                                  id={`option-${option.oId}`}
                                  name={`question-${question.questionId}`}
                                  value={option.oId}
                                  onChange={() =>
                                    handleResponse(
                                      question.questionId,
                                      question.question,
                                      option.oId,
                                      option
                                    )
                                  }
                                />
                                <label
                                  style={{ marginLeft: "10px" }}
                                  htmlFor={`option-${option.oId}`}
                                >
                                  {option.oName}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </>
                  )}
                  {questionnaire.length > 1 && (
                    <>
                      {
                        <div key={currentQuestion?.questionId}>
                          <p>{currentQuestion?.question}</p>

                          {currentQuestion.options.map((option) => {
                            return (
                              <div style={{ marginLeft: "0px" }}>
                                <input
                                  type="radio"
                                  id={`option-${option.oId}`}
                                  name={`question-${currentQuestion.questionId}`}
                                  value={option.oId}
                                  onChange={() =>
                                    handleResponse(
                                      currentQuestion.questionId,
                                      currentQuestion.question,
                                      option.oId,
                                      option
                                    )
                                  }
                                />
                                <label
                                  style={{ marginLeft: "10px" }}
                                  htmlFor={`option-${option.oId}`}
                                >
                                  {option.oName}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      }
                    </>
                  )}
                  {!initialCondition && questionnaire.length === 0 && (
                    <div style={{ textAlign: "center" }}>
                      Thank You for taking this survey!!!
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>

        {(initialCondition || questionnaire.length !== 0) && (
          <div
            className={
              selectedOption === 0 ? "btn-filled-disabled" : "btn-filled"
            }
            style={{
              width: "fit-content",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            onClick={onClickHandler}
          >
            Next
          </div>
        )}
        {!initialCondition &&
          questionnaire.length === 0 &&
          !symptomScorePage && (
            <div
              className={
                !questionnaire.length === 0
                  ? "btn-filled-disabled"
                  : "btn-filled"
              }
              style={{
                width: "fit-content",
                margin: "20px auto",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              onClick={handleNext}
            >
              Submit
            </div>
          )}
      </div>
    </Popup>
  );
};

export default SymptomCalculator;
