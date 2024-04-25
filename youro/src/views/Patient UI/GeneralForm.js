import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";

const GeneralForm = (props) => {
  const [userResponse, setUserResponse] = useState([]);
  const [ques, setQues] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [qId, setQId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentChildQuestionIndex, setCurrentChildQuestionIndex] = useState(0);
  const [openModal, setOpenModal] = useState(props.open);
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleNext = () => {
    console.log("====^^^===");
    console.log("handleNext START");
    setSelectedOption(0);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    fetchQuestion();
    if (ques.length === 0) {
      setOpenModal(false);
      const now = new Date();
      const temp = {
        questionData: userResponse,
        patientId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
      };
      saveNewSymptomScore(temp);
    }

    console.log("handleNext END");
    console.log("====^^^===");
  };
  const handleNextQuestion = () => {
    setSelectedOption(0);
    setCurrentChildQuestionIndex(currentChildQuestionIndex + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const currentQuestion = ques[currentChildQuestionIndex];
  const fetchQuestion = async () => {
    const temp = {
      questionnaire_type: "General Form",
      last_question_id: qId,
      selected_option_id: selectedOption,
    };
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getQuestionsByQuestionnaireType`;
    axios
      .post(url, temp)
      .then((res) => {
        setQues(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    setSelectedOption(0);
  };
  const onClickHandler = () => {
    if (ques.length > 1 && currentChildQuestionIndex !== ques.length - 1) {
      handleNextQuestion();
    } else {
      handleNext();
    }
  };

  const saveNewSymptomScore = async (data) => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/saveSymptomScore`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(url, data, config);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserName(value);
    validateEmail(name, value);
  };

  const validateEmail = (name, value) => {
    const maxLength = 32;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!value.trim()) {
      newErrors.required = true;
    } else {
      delete newErrors.required;
    }

    // Check maxLength
    if (value.length > maxLength) {
      newErrors.maxLength = true;
    } else {
      delete newErrors.maxLength;
    }

    // Check email pattern
    if (!pattern.test(value)) {
      newErrors.pattern = true;
    } else {
      delete newErrors.pattern;
    }

    setErrors(newErrors);
  };

  return (
    <>
      <Popup
        open={openModal}
        closeOnDocumentClick={false}
        onClose={() => {
          props.setOpen(false);
          setSelectedOption(0);
          setErrors(null);
          setUserName("");
        }}
        className="congrats-popup"
        contentStyle={{
          width: "70%",
          height: "70vh",
          overflowY: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "relative",
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
              setSelectedOption(0);
            }}
          >
            <span class="material-symbols-outlined">close</span>
          </div>
          <div style={{ padding: "30px 11px" }}>
            <div style={{ textAlign: "center" }}>
              {
                <>
                  <h2>General Form</h2>
                </>
              }
            </div>
            <div>
              {ques.length === 1 && (
                <>
                  {ques.map((question) => (
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
                                  option.oName
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
              {ques.length > 1 && (
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
                                  option.oName
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
              {ques.length === 0 && (
                <div style={{ textAlign: "center" }}>
                  Thank You for taking this survey!!!
                  <br />
                </div>
              )}
            </div>

            {ques.length !== 0 && (
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
            {ques.length === 0 && (
              <>
                <div>
                  <label>Email</label>
                  <input
                    className="input-field input-border"
                    type="text"
                    value={userName}
                    onChange={handleChange}
                  />
                  {errors.required && (
                    <p className="error-text">This field is required</p>
                  )}
                  {errors.maxLength && (
                    <p className="error-text">
                      Email cannot exceed 32 characters
                    </p>
                  )}
                  {errors.pattern && (
                    <p className="error-text">Please enter a valid email</p>
                  )}
                </div>
                <div
                  className={
                    userName === "" || Object.keys(errors).length !== 0
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
              </>
            )}
          </div>
        </div>
      </Popup>
    </>
  );
};
export default GeneralForm;
