import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";

const GeneralForm = (props) => {
  const [questionnare, setQuestionnare] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);

  const [userResponse, setUserResponse] = useState([]);
  const [selDiag, setDiagId] = useState("1001");
  const [showTextField, setShowTextField] = useState(false);
  const [listText, setListText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const symptoms = [
    "I am experiencing (or have experienced) urinary issues such as frequency, urgency, dribbling, or difficulty emptying my bladder.",
    "I am a male and am experiencing (or have experienced) sexual issues related to erections or orgasms.",
    "I am experiencing (or have experienced) symptoms such as flank pain (pain on either side of the lower back) that radiates to the groin or pain in the stomach that does not go away.",
    "I have had kidney stones in the past and would like to prevent future stones.",
    "I am experiencing (or have experienced) symptoms such as burning with urination, foul-smelling urine, or blood in the urine.",
    "I am a male and am having (or have had) difficulty achieving pregnancy with my female partner.",
    "I would like to speak to a urology-trained provider to figure out my diagnosis.",
  ];
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAdvisaryText, setShowAdvisaryText] = useState(false);
  const [showUnderstood, setShowUnderstood] = useState(false);
  const [selectedYes, setSelectedYes] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowUnderstood(event.target.checked);
  };

  useEffect(() => {
    //fetchAllQuestions();
  }, []);

  //   const fetchAllQuestions = async () => {
  //     const url =
  //       API_DETAILS.baseUrl +
  //       API_DETAILS.PORT +
  //       API_DETAILS.baseExtension +
  //       `/getQuestionsBydiagId/${selDiag}`;
  //     const config = {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "*",
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     try {
  //       const res = await axios.get(url, config);
  //       console.log(res);
  //       setQuestionnare(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const handleNext = () => {
    console.log("====^^^===");
    console.log("handleNext START");
    setSelectedYes(false);
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

  const handleConfirm = async (id) => {
    const category = "General Form Cat-" + id;
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getQuestionsByCategory/${category}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(url, config);
      if (id === "3") {
        setShowAdvisaryText(true);
      }
      console.log(res);
      setQuestionnare(res.data);
    } catch (err) {
      console.error(err);
    }
    //fetchAllQuestions();
    setShowQuestions(true);
  };

  const handleResponse = (questionNum, option) => {
    var userResponses = [...userResponse];
    console.log(userResponses);
    console.log(userResponse[questionNum]);
    if (userResponse[questionNum]) {
      console.log("data in questionNum index already exists");
      userResponses.pop();
      userResponses.push({
        qId: questionnare[questionNum].questionId,
        question: questionnare[questionNum].question,
        optionsData: [option],
        //list_text: listText,
      });
    } else {
      userResponses.push({
        qId: questionnare[questionNum].questionId,
        question: questionnare[questionNum].question,
        optionsData: [option],
        // list_text: listText,
      });
    }
    setUserResponse(userResponses);
    setSelectedYes(true);
    console.log(userResponses);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      <Popup
        open={props.open}
        modal
        closeOnDocumentClick={false}
        onClose={() => {
          props.setOpen(false);
          setShowQuestions(false);
          setShowUnderstood(false);
        }}
        className="congrats-popup"
        //   style={{ width: "800px" }}
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
            setSelectedCategory(null);
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </div>
        <div style={{ padding: "30px 50px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {
              <>
                <h2 style={{ marginLeft: "520px" }}>General Form</h2>
                <h3>
                  Which category does your most bothersome symptom fall into?
                </h3>
                <form>
                  {symptoms.map((symptom, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={index + 1}
                        name="symptom"
                        value={index + 1}
                        checked={selectedCategory == index + 1}
                        onChange={handleCategoryChange}
                      />
                      <label htmlFor={index + 1}>{symptom}</label>
                    </div>
                  ))}
                  {/* <div>Selected Option ID: {selectedCategory}</div> */}
                </form>
              </>
            }
            <div
              className={
                !selectedCategory ? "btn-filled-disabled" : "btn-filled"
              }
              style={{
                width: "fit-content",
                marginLeft: "540px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              onClick={() => handleConfirm(selectedCategory)}
            >
              Confirm
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        open={showQuestions}
        modal
        closeOnDocumentClick={false}
        onClose={() => {
          setShowQuestions(false);
          setQuestionnare("");
          setQuestionNum(0);
          setUserResponse("");
          setShowUnderstood(false);
          setShowAdvisaryText(false);
          setSelectedYes(false);
        }}
        className="congrats-popup"
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowQuestions(false);
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </div>
        <br />
        {showAdvisaryText && (
          <div>
            <p style={{ color: "red" }}>
              Kidney stones can lead to severe infection and significant pain
              and may be life-threatening in certain situations. If you are
              experiencing any of the symptoms below, you should seek care
              immediately at the nearest Emergency Department. Youro does not
              provide emergency services.- click "I understand".
              <ul>
                <li>Severe flank pain</li>
                <li>Fever</li>
                <li>Chills</li>
                <li>Vomiting (inability to keep any fluids down)</li>
              </ul>
            </p>
            <label>
              <input
                type="checkbox"
                checked={showUnderstood}
                onChange={handleCheckboxChange}
              />
              I understand
            </label>
          </div>
        )}
        <div
          style={{
            padding: "30px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {showQuestions && questionnare.length > 0 && (
              <>
                <p>
                  Question {questionNum + 1} out of {questionnare.length}
                </p>
              </>
            )}
          </div>
          <div>
            <p>{questionnare[questionNum]?.question}</p>
            {questionnare[questionNum]?.options.map((option) => {
              return (
                <div>
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
                  <div>
                    {selectedCategory === "4" &&
                    selectedYes &&
                    questionNum === 0 &&
                    option.oName === "Yes" ? (
                      <div>
                        <p style={{ color: "red" }}>
                          Kidney stones can lead to severe infection and
                          significant pain and may be life-threatening in
                          certain situations. If you are experiencing any of the
                          symptoms below, you should seek care immediately at
                          the nearest Emergency Department. Youro does not
                          provide emergency services.- click "I understand".
                          <ul>
                            <li>Severe flank pain</li>
                            <li>Fever</li>
                            <li>Chills</li>
                            <li>
                              Vomiting (inability to keep any fluids down)
                            </li>
                          </ul>
                        </p>
                        <label>
                          <input
                            type="checkbox"
                            checked={showUnderstood}
                            onChange={handleCheckboxChange}
                          />
                          I understand
                        </label>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={
              (selectedCategory === 3 && showUnderstood) ||
              (selectedCategory === 4 && selectedYes && showUnderstood) ||
              !userResponse[questionNum]
                ? "btn-filled-disabled"
                : "btn-filled"
            }
            style={{
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              margin: "auto",
            }}
            onClick={handleNext}
          >
            {questionNum + 1 < questionnare.length ? "Next" : "Submit"}
          </div>
        </div>
      </Popup>
    </>
  );
};
export default GeneralForm;
