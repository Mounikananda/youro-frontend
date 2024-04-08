import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";

const IntakeForm = (props) => {
  const [questionnare, setQuestionnare] = useState([
    {
      question: "How are you?",
      options: ["Good", "Bad", "Neutral", "None"],
      questionId: "1",
    },
    {
      question: "What is your name?",
      options: ["Alan Hunt", "Farah", "Both", "None"],
      questionId: "2",
    },
  ]);
  const [questionNum, setQuestionNum] = useState(0);

  const [userResponse, setUserResponse] = useState([]);
  const [selDiag, setDiagId] = useState("1000");
  const [showTextField, setShowTextField] = useState(false);
  const [listText, setListText] = useState("");

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getQuestionsBydiagId/${selDiag}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      console.log(res);
      setQuestionnare(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    console.log("====^^^===");
    console.log("handleNext START");

    if (questionNum + 1 < questionnare.length) {
      setQuestionNum(questionNum + 1);
    } else {
      const now = new Date();
      const temp = {
        questionData: userResponse,
        patientId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
      };
      //saveNewSymptomScore(temp);
    }

    console.log("handleNext END");
    console.log("====^^^===");
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setListText(newText);
  };
  const handleResponse = (questionNum, option) => {
    var userResponses = [...userResponse];
    console.log(userResponses);
    console.log(userResponse[questionNum]);
    if (option.oName === "Yes") {
      setShowTextField(true);
    } else if (option.oName === "No") {
      setShowTextField(false);
    }
    if (userResponse[questionNum]) {
      console.log("data in questionNum index already exists");
      userResponses.pop();
      userResponses.push({
        qId: questionnare[questionNum].questionId,
        question: questionnare[questionNum].question,
        optionsData: [option],
        list_text: listText,
      });
    } else {
      userResponses.push({
        qId: questionnare[questionNum].questionId,
        question: questionnare[questionNum].question,
        optionsData: [option],
        list_text: listText,
      });
    }
    setUserResponse(userResponses);
    console.log(userResponses);
  };

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
          {
            <>
              <h2>Intake Form</h2>
              {questionnare.length > 0 && (
                <>
                  <p>
                    Question {questionNum + 1} out of {questionnare.length}
                  </p>
                </>
              )}
            </>
          }
        </div>
        <div>
          {
            <>
              <p>{questionnare[questionNum]?.question}</p>
              {questionnare[questionNum]?.options.map((option) => {
                return (
                  <>
                    <input
                      type="radio"
                      id="html"
                      name={questionnare[questionNum].questionId}
                      checked={
                        userResponse[questionNum] &&
                        userResponse[questionNum]["optionsData"][0].oName ===
                          option.oName
                      }
                      onChange={() => handleResponse(questionNum, option)}
                    />

                    <label for="html" style={{ marginLeft: "10px" }}>
                      {option.oName}
                    </label>
                    {showTextField &&
                    userResponse[questionNum]["optionsData"][0].oName ===
                      "Yes" &&
                    option.oName === "Yes" ? (
                      <div style={{ marginTop: "20px" }}>
                        <label>List them here:</label> <br /> <br />
                        <input
                          type="text"
                          placeholder="Enter your list here"
                          value={listText}
                          onChange={handleTextChange}
                          style={{
                            marginLeft: "2px",
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "lightgrey",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        {option.oName === "No" && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                      </>
                    )}

                    <br />
                    <br />
                  </>
                );
              })}
            </>
          }
        </div>

        {
          <div
            className={
              !userResponse[questionNum] ? "btn-filled-disabled" : "btn-filled"
            }
            style={{
              width: "fit-content",
              marginLeft: "150px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleNext}
          >
            {questionNum + 1 < questionnare.length ? "Next" : "Submit"}
          </div>
        }
      </div>
    </Popup>
  );
};
export default IntakeForm;
