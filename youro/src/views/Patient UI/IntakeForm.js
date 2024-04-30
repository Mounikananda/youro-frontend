import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";

const IntakeForm = (props) => {
  const [userResponse, setUserResponse] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  const [listText, setListText] = useState("");
  const [ques, setQues] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [qId, setQId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentChildQuestionIndex, setCurrentChildQuestionIndex] = useState(0);
  const [openModal, setOpenModal] = useState(props.open);

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
        diagnosisId: 0,
        questionData: userResponse,
        email: props.email,
        questionnaire_type: "Intake Form",
      };
      saveNewSymptomScore(temp);
    }

    console.log("handleNext END");
    console.log("====^^^===");
  };
  const saveNewSymptomScore = async (data) => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/saveScore`;
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
  const handleNextQuestion = () => {
    setSelectedOption(0);
    setCurrentChildQuestionIndex(currentChildQuestionIndex + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setListText(newText);
  };
  const handleResponse = (qId, question, oId, option) => {
    setSelectedOption(oId);
    setQId(qId);
    var userResponses = [...userResponse];
    console.log(userResponses);
    console.log(userResponse[currentQuestionIndex]);
    // if (option.oName === "Yes") {
    //   setShowTextField(true);
    // } else if (option.oName === "No") {
    //   setShowTextField(false);
    // }
    if (userResponse[currentQuestionIndex]) {
      console.log("data in questionNum index already exists");
      userResponses.pop();
      userResponses.push({
        qId: qId,
        question: question,
        optionsData: [option],
        //list_text: listText,
      });
    } else {
      userResponses.push({
        qId: qId,
        question: question,
        optionsData: [option],
        //list_text: listText,
      });
    }
    setUserResponse(userResponses);
    console.log(userResponses);
  };
  const onClickHandler = () => {
    if (ques.length > 1 && currentChildQuestionIndex !== ques.length - 1) {
      handleNextQuestion();
    } else {
      handleNext();
    }
  };
  const currentQuestion = ques[currentChildQuestionIndex];
  const fetchQuestion = async () => {
    const temp = {
      questionnaire_type: "Intake Form",
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

  return (
    <Popup
      open={openModal}
      closeOnDocumentClick={false}
      onClose={() => {
        props.setOpen(false);
        setSelectedOption(0);
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
        <div style={{ padding: "30px 50px" }}>
          <div style={{ textAlign: "center" }}>
            {
              <>
                <h2>Intake Form</h2>
              </>
            }
          </div>
          <div>
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
              {ques.length === 0 && (
                <div style={{ textAlign: "center" }}>
                  Thank You for taking this survey!!!
                </div>
              )}
            </div>
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
            <div
              className={
                !ques.length === 0 ? "btn-filled-disabled" : "btn-filled"
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
      </div>
    </Popup>
  );
};
export default IntakeForm;
