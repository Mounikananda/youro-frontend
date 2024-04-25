import axios from "axios";
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Container,
  Tooltip,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { API_DETAILS, COOKIE_KEYS, USER_TYPES } from "../../App";
import AdminSideBar from "./Admin-SideBar";
import { Link } from "react-router-dom";
import AdminPopUps from "./Admin-PopUps";
import Popup from "reactjs-popup";
import { set, useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import Youroheader from "../Youro-header";
import ReactQuillWrapper from "../Doctor UI/DA-takenote";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../../styles/Admin-ui/Admin-Maintainence.css";
import AddIcon from "@mui/icons-material/Add";

const AdminMaintainenceList = () => {
  const [tableData, setTableData] = useState([]);
  const [renderAdmin, canRenderAdmin] = useState(false);
  const [renderapidata, cannotrenderapidata] = useState({
    prescriptionRender: true,
    diagnosisRender: true,
    questionnairesRender: true,
  });
  const [renderDiagnosisApiData, setRenderDiagnosisApiData] = useState(false);
  const [renderPrescriptionApiData, setRenderPrescriptionApiData] =
    useState(false);
  const [renderQuestionnaireApiData, setRenderQuestionnaireApiData] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [addPopUpContext, setAddPopUpContext] = useState("");
  const isRendered = useRef(false);
  let count = 0;
  const [authContext, setAuthContext] = useState(""); // default zero. After login if ADMIN -> set('ADMIN') else if 'ASSITANT' -> set('ASSITANT')
  const [pageContext, setPageContext] = React.useState("PRESCRIPTION");
  const [prescriptionList, setPrescription] = useState([]);
  // const [diagnosisList, setDiagnoses] = useState([]);
  const [questionnairesList, setQuestionnaires] = useState([]);
  const [selecDiag, setDiag] = useState("");
  const [selecDiagInfo, setDiagInfo] = useState("");

  const [diagnosisData, setDiagnosisData] = useState([]);
  const [needsRefresh, setRefreshStatus] = useState(false);

  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [actionsColumnPosition, setActionsColumnPosition] = useState("last");
  const [isQuestionnaireSelected, setisQuestionnanireSelected] =
    useState(false);
  const [questions, setQuestions] = useState([]);
  const [Questionnaires, setQuestionnairesUpdate] = useState([]);
  const [options, setOptions] = useState([]);
  const [isAddQuestionClicked, setIsAddQuestionClicked] = useState(false);
  const [openInnerPopUp, setOpenInnerPopUp] = useState(false);
  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [refetchQuestionnaire, setRefetchQuestionnaire] = useState(false);
  const [showAdminPopUps, setShowAdminPopUps] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [optionsList, setOptionsList] = useState([]);
  const [isEditQuestionClicked, setIsEditQuestionClicked] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleDiagnosisChange = (event) => {
    setSelectedDiagnosis(event.target.value);
  };
  const [customOptions, setCustomOptions] = useState([]);
  const [customOption, setCustomOption] = useState("");
  const [questionOptions, setQuestionOptions] = useState([]);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState(new Map());
  const [parentId, setParentId] = useState(null);
  const [optionId, setOptionId] = useState(null);
  const [questionMap, setQuestionMap] = useState(new Map());
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditQuestionnaireClicked, setIsEditQuestionnaireClicked] =
    useState(false);

  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
  };

  const handleAddCustomOption = () => {
    if (customOption.trim() !== "") {
      setCustomOptions([...customOptions, customOption]);
      setCustomOption("");
    }
  };

  const [columns, setColumns] = useState([
    {
      accessorKey: "medicineId",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false,
      size: 50,
    },
    {
      accessorKey: "medicineName",
      header: "Medicine Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "diagnosis",
      header: "Diagnosis",
    },
  ]);
  const handleClosePopup = () => {
    setCustomOption("");
    setCustomOptions([]);
    setOptionsList([]);
    setSelectedOption("");
    setOpenInnerPopUp(false);
    setParentId(null);
    setOptionId(null);
  };
  const handleCloseEditPopup = () => {
    setCustomOption("");
    setCustomOptions([]);
    setOptionsList([]);
    setSelectedOption("");
    setIsEditQuestionClicked(false);
    setParentId(null);
    setOptionId(null);
  };

  const handleOptionChange = (event) => {
    if (event.target.value === "") {
      setOptionsList(null);
    } else {
      setOptionsList(event.target.value.split("/"));
    }
    setSelectedOption(event.target.value);
  };
  //added by nanda

  const handleQuestionnaireSelection = async (
    questionnaire_id,
    questionnaire_type
  ) => {
    setSelectedQuestionnaireId(questionnaire_id);
    setSelectedQuestionnaire(questionnaire_type);
    setisQuestionnanireSelected(true);
    setOpen(true);
    setAddPopUpContext("QUESTION");
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getAllQuestions/${questionnaire_id}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      setQuestions(res.data);
      console.log(res.data);
      const questionGroupMap = new Map();
      res.data.forEach((question) => {
        const { qId, question: qText, parent_question_id } = question;
        if (parent_question_id !== 0) {
          if (questionGroupMap.has(parent_question_id)) {
            const existingQuestions = questionGroupMap.get(parent_question_id);
            questionGroupMap.set(parent_question_id, [
              ...existingQuestions,
              { qId, qText },
            ]);
          } else {
            questionGroupMap.set(parent_question_id, [{ qId, qText }]);
          }
        }
      });
      setQuestionMap(questionGroupMap);
      console.log(questionGroupMap);
    } catch {}
  };
  //

  const hanldeUpdateColumns = (questionnaire = "") => {
    setColumns([
      {
        accessorKey: "questionnaire_type",
        header: "Questionnaire",
        size: 450,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 450,
      },
      {
        accessorKey: "action",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1rem",
            }}
          >
            <button
              key={`edit-${row.original.questionnaire_type}`}
              aria-label="Edit"
              onClick={() => {
                setOpen(true);
                setAddPopUpContext("QUESTIONNAIRE");
                setSelectedQuestionnaire(row.original.questionnaire_type);
                setSelectedDiagnosis(row.original.diag_id);
                setIsEditQuestionnaireClicked(true);
                setSelectedQuestionnaireId(row.original.id);
                row.original.status === "Active"
                  ? setIsChecked(true)
                  : setIsChecked(false);
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <EditIcon />
            </button>
            <button
              key={`add-${row.original.questionnaire_type}`}
              aria-label="Edit"
              onClick={() =>
                handleQuestionnaireSelection(
                  row.original.id,
                  row.original.questionnaire_type
                )
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <AddIcon />
            </button>
            <Tooltip arrow placement="right" title="Delete">
              <AdminPopUps
                data={{
                  action: `delete-questionnaire`,
                  step: 1,
                  rowData: { id: row.original.id },
                  postDeleteAction: () => {
                    // handleSetPageContext();
                    // // setPageContext("QUESTIONNAIRE");
                    // // setRefetchQuestionnaire(true);
                    fetchAllQuestionnaireForms();
                    setShowAdminPopUps(false);
                  },
                  setParentRefreshStatus: (status) => {
                    setRefreshStatus(status);
                    setShowAdminPopUps(false);
                  },
                  setPageContextAgain: (context) => {
                    setPageContext(context);
                    setShowAdminPopUps(false);
                  },
                }}
              />
            </Tooltip>
          </Box>
        ),
      },
    ]);
  };
  const handleSetPageContext = () => {
    setPageContext("QUESTIONNAIRE");
  };
  const handlePageContextChange = (event, newAlignment) => {
    if (newAlignment === null || newAlignment === "PRESCRIPTION") {
      setPageContext("PRESCRIPTION");
      setColumns([
        {
          accessorKey: "medicineId",
          header: "ID",
          enableColumnOrdering: false,
          enableEditing: false,
          size: 50,
        },
        {
          accessorKey: "medicineName",
          header: "Medicine Name",
        },
        {
          accessorKey: "category",
          header: "Category",
        },
        {
          accessorKey: "diagnosis",
          header: "Diagnosis",
        },
        {
          accessorKey: "action",
          header: "Actions",
        },
      ]);
      setTableData(prescriptionList);
    } else if (newAlignment === "QUESTIONNAIRE") {
      setPageContext("QUESTIONNAIRE");
      setTableData(Questionnaires);
      hanldeUpdateColumns();
    } else if (newAlignment === "DIAGNOSIS") {
      setPageContext("DIAGNOSIS");
      setColumns([
        {
          accessorKey: "diagId",
          header: "ID",
          enableColumnOrdering: false,
          enableEditing: false,
          size: 50,
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "info",
          header: "Info",
        },
        {
          accessorKey: "action",
          header: "Actions",
        },
      ]);
      setTableData(diagnosisData);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    count += 1;
    if (!isRendered.current) {
      fetchPrescitions();
      fetchAllDiagnoses();
      fetchAllQuestionnaireForms();
      isRendered.current = true;
    } else {
      console.log("useEffect re-render : " + count);
    }
  }, []);

  useEffect(() => {
    if (!refetchQuestionnaire || !selectedQuestion) return;
    fetchAllQuestionnaireForms();
  }, [refetchQuestionnaire, selectedQuestion]);

  // diagId, name, info
  const fetchPrescitions = async () => {
    Cookies.get(COOKIE_KEYS.userType) === "ADMIN"
      ? setAuthContext("ADMIN")
      : Cookies.get(COOKIE_KEYS.userType) === "ASSITANT"
      ? setAuthContext("ASSITANT")
      : navigate("/login");
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getAllPrescriptions`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      canRenderAdmin(true);
      let tempData = [];
      for (let i = 0; i < res.data.length; i++) {
        let temp = {
          medicineId: res.data[i].presId,
          medicineName: res.data[i].name,
          category: res.data[i].presType,
          diagnosis: res.data[i].diagnosis.name,
        };
        tempData.push(temp);
      }
      setPrescription(tempData);
      setTableData(tempData);
      setRenderPrescriptionApiData(true);
    } catch (err) {
      setRenderPrescriptionApiData(false);
      console.error(err);
    }
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
      setDiagnosisData(res.data);
      if (pageContext === "DIAGNOSIS") {
        setTableData(res.data);
      }
      setRenderPrescriptionApiData(true);
    } catch (err) {
      cannotrenderapidata({
        prescriptionRender: true,
        diagnosisRender: false,
        questionnairesRender: true,
      });
      setRenderDiagnosisApiData(false);
      console.error(err);
    }
  };

  const getOptionsStringFromApiData = (qOptsArray) => {
    let str = "$ ";
    for (let i = 0; i < qOptsArray.length; i++) {
      let temp = qOptsArray[i].oName + " $ ";
      str += temp;
    }
    return str;
  };
  const fetchAfterDelete = () => {
    if (needsRefresh) {
      if (pageContext === "QUESTIONNAIRE") {
        fetchAllQuestionnaireForms();
      }
      if (pageContext === "PRESCRIPTION") {
        fetchPrescitions();
      } else if (pageContext === "DIAGNOSIS") {
        fetchAllDiagnoses();
      }
      setRefreshStatus(false);
    }
  };

  const handleAddDiagnosis = () => {
    if (selecDiag !== "" && selecDiagInfo !== "") {
      setOpen(false);
      const temp = {
        name: selecDiag,
        info: selecDiagInfo,
      };
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          API_DETAILS.baseUrl +
            API_DETAILS.PORT +
            API_DETAILS.baseExtension +
            "/addDiagnosis",
          temp,
          config
        )
        .then((res) => {
          toast.success("Added successfully!!");
          fetchAllDiagnoses();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error adding diagnosis");
        });
    } else {
      console.clear();
    }
  };

  const handleAddPrescription = (data) => {
    setOpen(false);
    let numberArray = [];
    for (var i = 0; i < data.diagnosis.length; i++) {
      numberArray.push(parseInt(data.diagnosis[i]));
    }

    const temp = {
      name: data.medicineName,
      type: data.category,
      diagnosisId: numberArray,
    };

    axios
      .post(
        API_DETAILS.baseUrl +
          API_DETAILS.PORT +
          API_DETAILS.baseExtension +
          "/addPrescription",
        temp
      )
      .then((res) => {
        toast.success("Added successfully!!");
        fetchPrescitions();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.errorMessage);
      });
  };

  const handleAddQuestionnaire = () => {
    setOpen(true);
  };
  const handleAddQuestionnaireNew = () => {
    const newQuestionnaire = inputRef.current.value;
    const checkbox = document.getElementById("ActiveCheck");

    const temp = {
      questionnaire_type: newQuestionnaire,
      diag_id: selectedDiagnosis === "" ? null : selectedDiagnosis,
      status: checkbox.checked ? "Active" : "Inactive",
    };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        API_DETAILS.baseUrl +
          API_DETAILS.PORT +
          API_DETAILS.baseExtension +
          "/addQuestionnaireForm",
        temp,
        config
      )
      .then((res) => {
        toast.success("Added successfully!!");
        fetchAllQuestionnaireForms();
        setSelectedDiagnosis(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error adding Questionnaire_form");
      });

    setOpen(false);
  };
  const handleEditQuestionnaire = () => {
    const temp = {
      id: selectedQuestionnaireId,
      questionnaire_type: selectedQuestionnaire,
      diagnosis_id: selectedDiagnosis,
      status: isChecked ? "Active" : "Inactive",
    };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        API_DETAILS.baseUrl +
          API_DETAILS.PORT +
          API_DETAILS.baseExtension +
          "/updateQuestionnaireInfo",
        temp,
        config
      )
      .then((res) => {
        toast.success("Saved successfully!!");
        fetchAllQuestionnaireForms();
        setSelectedDiagnosis(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error saving Questionnaire_form");
      });

    setOpen(false);
  };
  const fetchAllQuestionnaireForms = async () => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getAllQuestionnaireForms`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);
      if (pageContext === "QUESTIONNAIRE" || refetchQuestionnaire) {
        setTableData(res.data);
      }
      setQuestionnairesUpdate(res.data);
      console.log(res.data);
      setRenderPrescriptionApiData(true);
    } catch (err) {
      cannotrenderapidata({
        prescriptionRender: true,
        diagnosisRender: true,
        questionnairesRender: false,
      });
      setRenderDiagnosisApiData(false);
      console.error(err);
    }
  };

  const handleAddQuestion = () => {
    const options = [
      "Mild/Severe/None",
      "Yes/No",
      "Yes/No/Skip",
      "Yes/No/Unsure",
      "1/2/3/4/5",
      "1/2/3/4/5/6/7/8/9/10",
    ];
    setOptions(options);
    setIsAddQuestionClicked(true);
    setOpenInnerPopUp(true);
  };

  const handleAddFollowUpQuestion = (pId, oId) => {
    const options = [
      "Mild/Severe/None",
      "Yes/No",
      "Yes/No/Skip",
      "Yes/No/Unsure",
      "1/2/3/4/5",
      "1/2/3/4/5/6/7/8/9/10",
    ];
    setOptions(options);
    setIsAddQuestionClicked(true);
    setOpenInnerPopUp(true);
    setIsFollowUp(true);
    setParentId(pId);
    setOptionId(oId);
  };

  const handleAddQuestionInner = async () => {
    const newQuestion = inputRef.current.value;
    if (newQuestion.trim() !== "") {
      const temp = {
        question: newQuestion,
        weight: 1,
        questionnaire_id: selectedQuestionnaireId,
        parent_question_id: parentId,
        bound_option_id: optionId,
        optionsList: optionsList.length === 0 ? customOptions : optionsList,
      };
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          API_DETAILS.baseUrl +
            API_DETAILS.PORT +
            API_DETAILS.baseExtension +
            "/addQuestion",
          temp,
          config
        )
        .then((res) => {
          toast.success("Added successfully!!");

          setQuestions([...questions, newQuestion]);
          handleQuestionnaireSelection(
            selectedQuestionnaireId,
            selectedQuestionnaire
          );
          handleEditQuestion(parentId, newQuestion);
          //inputRef.current.value = "";
          setSelectedOption("");
        })
        .catch((err) => {
          toast.error("Error adding Question");
        });
    }
    setOpenInnerPopUp(false);
  };

  const handleEditQuestion = async (qid, ques) => {
    const url =
      API_DETAILS.baseUrl +
      API_DETAILS.PORT +
      API_DETAILS.baseExtension +
      `/getQuestionOptions/${qid}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(url, config);

      if (Array.isArray(res.data)) {
        const updatedFollowUpQuestionsMap = new Map();

        res.data.forEach((item) => {
          if (item.hasFollowUpQuestion) {
            const childQuestions = item.childQuestions || [];

            if (!updatedFollowUpQuestionsMap.has(item.oId)) {
              updatedFollowUpQuestionsMap.set(item.oId, []);
            }

            const followUpQues = updatedFollowUpQuestionsMap.get(item.oId);
            followUpQues.push(...childQuestions);
          }
        });
        setFollowUpQuestions(updatedFollowUpQuestionsMap);
        setQuestionOptions(res.data);
        setSelectedQuestion(ques);
        setQuestionId(qid);
        setIsEditQuestionClicked(true);
        setIsFollowUp(true);
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveEditQuestion = () => {
    const temp = {
      q_id: questionId,
      question: selectedQuestion,
      questionnaire_id: selectedQuestionnaireId,
    };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        API_DETAILS.baseUrl +
          API_DETAILS.PORT +
          API_DETAILS.baseExtension +
          "/updateQuestionInfo",
        temp,
        config
      )
      .then((res) => {
        toast.success("Saved successfully!!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error saving Question");
      });

    setOpen(false);
  };
  var parentQuestionCounter = 1;
  const handleActiveChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      const isPresent = Questionnaires.some(
        (questionnaire) =>
          questionnaire.questionnaire_type === inputRef.current.value.trim() &&
          questionnaire.status === "Active" &&
          questionnaire.id !== selectedQuestionnaireId
      );
      if (isPresent) {
        setErrorMessage(
          "Questionnaire form with the same name is already present. Please change the name and try again."
        );
      } else {
        setErrorMessage("");
      }
      setIsChecked(!isPresent);
    }
  };

  const handleInputChange = (event) => {
    setSelectedQuestionnaire(event.target.value);
  };
  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  return (
    <div>
      {
        <div className="hm">
          <div className="sidebar">
            <AdminSideBar data={"manage-approved-medicine"} />
          </div>
          <div className="admin-ui-table">
            <div className="header" style={{ marginLeft: "15px" }}>
              <Youroheader />
            </div>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {pageContext === "PRESCRIPTION" && (
                <div
                  className="btn-filled"
                  style={{ width: "fit-content", marginLeft: "15px" }}
                  onClick={() => {
                    setOpen(true);
                    setAddPopUpContext("MEDICINE");
                    fetchAllDiagnoses();
                  }}
                >
                  Medicine
                </div>
              )}
              {/* {pageContext == 'DIAGNOSIS' && <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('DIAGNOSIS') }}> Add Diagnosis</div>} */}
              {pageContext === "QUESTIONNAIRE" && (
                <div
                  className="btn-filled"
                  style={{
                    width: "32px",
                    marginLeft: "10px",
                    height: "22px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setOpen(true);
                    setAddPopUpContext("QUESTIONNAIRE");
                    handleAddQuestionnaire();
                  }}
                >
                  {" "}
                  +{" "}
                </div>
              )}

              <ToggleButtonGroup
                value={pageContext}
                exclusive
                onChange={handlePageContextChange}
                aria-label="Platform"
              >
                <ToggleButton value="PRESCRIPTION">Prescription</ToggleButton>
                <ToggleButton value="DIAGNOSIS">Diagnosis</ToggleButton>
                <ToggleButton value="QUESTIONNAIRE">Questionnaire</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <ToastContainer />
            {renderAdmin === true && tableData && tableData.length > 0 ? (
              <MaterialReactTable
                columns={columns}
                data={tableData}
                enableStickyHeader={false}
                enableColumnOrdering
                //enableRowActions={authContext === "ADMIN"}
                //enableEditing={authContext === "ADMIN"}
                muiTableContainerProps={{
                  sx: { maxHeight: window.innerHeight },
                }}
                positionActionsColumn="last"
              />
            ) : (pageContext === "PRESCRIPTION" &&
                !renderPrescriptionApiData) ||
              (pageContext === "DIAGNOSIS" && !renderDiagnosisApiData) ||
              (pageContext === "QUESTIONNAIRE" &&
                !renderQuestionnaireApiData) ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "98%",
                  borderRadius: "10px",
                  height: "70vh",
                }}
              >
                Error Fetching Data!
              </div>
            ) : !renderAdmin ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "98%",
                  borderRadius: "10px",
                  height: "70vh",
                }}
              >
                <Oval />
              </div>
            ) : (
              renderAdmin === true &&
              tableData &&
              tableData.length === 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "98%",
                      borderRadius: "10px",
                      height: "70vh",
                    }}
                  >
                    No Data Found!
                  </div>
                </>
              )
            )}
          </div>
        </div>
      }
      <Popup
        open={open}
        modal
        closeOnDocumentClick={false}
        onClose={() => {
          setOpen(false);
          setIsChecked(false);
          setSelectedQuestionnaire(null);
          setIsEditQuestionnaireClicked(false);
          setIsChecked(false);
          setSelectedQuestionnaireId(null);
          setErrorMessage(null);
          setSelectedDiagnosis(null);
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
              setOpen(false);
            }}
          >
            <span class="material-symbols-outlined">close</span>
          </div>
          {addPopUpContext === "MEDICINE" && (
            <>
              <div
                style={{
                  padding: "50px 20px",
                  maxWidth: "60vw",
                  minWidth: "30vw",
                }}
              >
                <div style={{ width: "300px" }}></div>
                <div
                  className=""
                  style={{ display: "flex", marginBottom: "1.5vh" }}
                >
                  <label>Medicine Name :</label>
                  <input
                    className="input-field-doctor input-border"
                    type="text"
                    style={{ width: "94%" }}
                    {...register("medicineName", {
                      required: true,
                      maxLength: 32,
                    })}
                  />
                  {errors?.medicineName?.type === "required" && (
                    <p className="error-text">This field is required</p>
                  )}
                  {errors?.medicineName?.type === "maxLength" && (
                    <p className="error-text">
                      Medicine Name cannot exceed 32 characters
                    </p>
                  )}
                </div>
                <br />
                <div className="">
                  <label>Category :</label>
                  <br />
                  <select
                    style={{ width: "100%" }}
                    className="input-field input-border"
                    id="gender"
                    {...register("category", {
                      required: true,
                    })}
                  >
                    <option value="">Select</option>
                    <option value="LAB">LAB</option>
                    <option value="VITAMINS">VITAMINS</option>
                    <option value="MEDICINES">MEDICINES</option>
                    <option value="IMAGING">IMAGING</option>
                    <option value="LIFESTYLE">LIFESTYLE</option>
                    <option value="MEDIA">MEDIA</option>
                  </select>
                  {errors?.category && (
                    <p className="error-text">This field is required</p>
                  )}
                </div>{" "}
                <br></br>
                <div className="">
                  <label>Diagnosis :</label>
                  <br />
                  {diagnosisData.map((diagosis) => {
                    return (
                      <div style={{ maxWidth: "200px", minWidth: "150px" }}>
                        <input
                          type="checkbox"
                          id="html"
                          name="diagnosis"
                          value={diagosis.diagId}
                          {...register("diagnosis", {
                            required: true,
                          })}
                        />
                        <label for="html" style={{ marginLeft: "10px" }}>
                          {diagosis.name}
                        </label>
                        <br />
                        <br />
                      </div>
                    );
                  })}
                  {errors?.diagnosis && (
                    <p className="error-text">This field is required</p>
                  )}
                </div>
              </div>

              <div>
                <div
                  className="btn-filled"
                  style={{ width: "fit-content", margin: "0px auto 50px auto" }}
                  onClick={handleSubmit(handleAddPrescription)}
                >
                  Add medicine
                </div>
              </div>
            </>
          )}

          {/* {addPopUpContext == 'DIAGNOSIS' && <>
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>

                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Diagnosis Name :</label>
                            <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} onChange={(e) => setDiag(e.target.value)} />
                        </div>

                        <div className="">
                            <label>Diagnosis Info :</label>
                            <ReactQuillWrapper val={setDiagInfo} />
                        </div>

                        
                    </div>

                    <div>
                        <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={() => handleAddDiagnosis()}>Add diagnosis</div>
                    </div>
                </>} */}

          {addPopUpContext === "QUESTIONNAIRE" && (
            <div
              style={{
                padding: "22px 9px",
                width: "467px",
                minHeight: "300px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ textAlign: "center", marginTop: "0px" }}>
                {isEditQuestionnaireClicked ? (
                  <h2>Edit Questionnaire</h2>
                ) : (
                  <h2>Add New Questionnaire</h2>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="question">Questionnaire:</label>
                <br />
                <br />
                <input
                  type="text"
                  id="question"
                  name="question"
                  style={{
                    marginLeft: "2px",
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "lightgrey",
                    boxSizing: "border-box",
                  }}
                  ref={inputRef}
                  value={selectedQuestionnaire}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="diagnosis">Diagnosis:</label>
                <br />
                <br />
                <select
                  id="diagnosis"
                  name="diagnosis"
                  style={{
                    marginLeft: "2px",
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "lightgrey",
                    boxSizing: "border-box",
                  }}
                  onChange={handleDiagnosisChange}
                  value={selectedDiagnosis || ""}
                >
                  <option value="" disabled hidden>
                    Select a diagnosis
                  </option>
                  {diagnosisData.map((diagnosis) => (
                    <option key={diagnosis.diagId} value={diagnosis.diagId}>
                      {diagnosis.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div style={{ marginTop: "10px" }}>
                <input
                  type="checkbox"
                  id="ActiveCheck"
                  name="ActiveCheck"
                  onChange={handleActiveChange}
                  checked={isChecked}
                />
                <label htmlFor="ActiveCheck" style={{ marginLeft: "5px" }}>
                  Active?
                </label>
                {errorMessage && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {errorMessage}
                  </p>
                )}
              </div>
              <div>
                <div
                  className="btn-filled"
                  style={{
                    width: "fit-content",
                    margin: "0px auto 50px auto",
                  }}
                  onClick={() =>
                    isEditQuestionnaireClicked
                      ? handleEditQuestionnaire()
                      : handleAddQuestionnaireNew()
                  }
                >
                  {isEditQuestionnaireClicked ? "Save" : "Add Questionnaire"}
                </div>
              </div>
            </div>
          )}

          {addPopUpContext === "QUESTION" && (
            <>
              <div
                style={{
                  padding: "15px 15px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <div style={{ textAlign: "center", marginTop: "0px" }}>
                  <h2>{selectedQuestionnaire} Questionnaire :</h2>
                </div>
                <div style={{ textAlign: "left", marginTop: "0px" }}>
                  {questions.map((questionItem, idx) => {
                    const parentQuestion = questionItem;
                    const childQuestions = questions.filter(
                      (childQuestion) =>
                        childQuestion.parent_question_id ===
                          parentQuestion.qId &&
                        childQuestion.qId !== parentQuestion.qId
                    );
                    const mapValues = Array.from(questionMap.values());
                    const isParentQuestion = mapValues.some((innerArray) =>
                      innerArray.some((obj) => obj.qId === questionItem.qId)
                    );
                    //);
                    if (!isParentQuestion) {
                      return (
                        <div
                          key={parentQuestion.qId}
                          style={{ marginBottom: "20px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <p style={{ marginRight: "10px" }}>
                              {" "}
                              {parentQuestionCounter++}.
                            </p>{" "}
                            <p style={{ flexGrow: 1 }}>
                              {parentQuestion.question}
                            </p>
                            <EditIcon
                              onClick={() =>
                                handleEditQuestion(
                                  parentQuestion.qId,
                                  parentQuestion.question
                                )
                              }
                              style={{ cursor: "pointer", marginRight: "10px" }}
                            >
                              Edit
                            </EditIcon>
                            <AdminPopUps
                              data={{
                                action: `delete-question`,
                                step: 1,
                                rowData: {
                                  q_id: parentQuestion.qId,
                                },
                                postDeleteAction: () => {
                                  handleQuestionnaireSelection(
                                    selectedQuestionnaireId,
                                    selectedQuestionnaire
                                  );
                                  setShowAdminPopUps(false);
                                },
                                setParentRefreshStatus: (status) => {
                                  setRefreshStatus(status);
                                  setShowAdminPopUps(false);
                                },
                              }}
                            />
                          </div>
                          {childQuestions.map((childQuestion, childIndex) => (
                            <div
                              key={childQuestion.qId}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "20px",
                              }}
                            >
                              <p style={{ marginRight: "10px" }}>
                                {childIndex + 1}.
                              </p>{" "}
                              <p style={{ flexGrow: 1 }}>
                                {childQuestion.question}
                              </p>
                              <EditIcon
                                onClick={() =>
                                  handleEditQuestion(
                                    childQuestion.qId,
                                    childQuestion.question
                                  )
                                }
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              >
                                Edit
                              </EditIcon>
                              <AdminPopUps
                                data={{
                                  action: `delete-question`,
                                  step: 1,
                                  rowData: {
                                    q_id: childQuestion.qId,
                                  },
                                  postDeleteAction: () => {
                                    handleQuestionnaireSelection(
                                      selectedQuestionnaireId,
                                      selectedQuestionnaire
                                    );
                                    setShowAdminPopUps(false);
                                  },
                                  setParentRefreshStatus: (status) => {
                                    setRefreshStatus(status);
                                    setShowAdminPopUps(false);
                                  },
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    }
                  })}
                </div>
                <div>
                  <div
                    className="btn-filled"
                    style={{
                      width: "fit-content",
                      margin: "0px auto 50px auto",
                    }}
                    onClick={() => handleAddQuestion()}
                  >
                    Add Question
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Popup>
      <Popup
        open={openInnerPopUp}
        modal
        closeOnDocumentClick={false}
        onClose={handleClosePopup}
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
            onClick={handleClosePopup}
          >
            <span class="material-symbols-outlined">close</span>
          </div>
          {isAddQuestionClicked && (
            <>
              <div
                style={{
                  padding: "22px 9px",
                  width: "467px",
                  minHeight: "300px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ textAlign: "center", marginTop: "0px" }}>
                  <h2>Add New Question</h2>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="question">Question:</label>
                  <br />
                  <input
                    type="text"
                    id="question"
                    name="question"
                    style={{
                      marginLeft: "5px",
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "lightgrey",
                      boxSizing: "border-box",
                    }}
                    ref={inputRef}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginBottom: "5px" }}>
                    Select/Add Options :
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      style={{ marginRight: "10px" }}
                    >
                      <option value="">Select Options</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div style={{ marginRight: "10px", fontWeight: "bold" }}>
                      or
                    </div>
                    <input
                      type="text"
                      value={customOption}
                      onChange={(e) => setCustomOption(e.target.value)}
                      style={{ marginRight: "10px" }}
                      placeholder="Enter custom option"
                    />
                    <button onClick={handleAddCustomOption}>Add</button>
                  </div>

                  {customOptions.length > 0 && (
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                        Options Added:
                      </div>
                      {customOptions.map((custom, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {index + 1}.{" "}
                          </span>
                          {custom}
                        </div>
                      ))}
                    </div>
                  )}
                  {optionsList != null && optionsList.length > 0 && (
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                        Options Selected:
                      </div>
                      {optionsList.map((option, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {index + 1}.{" "}
                          </span>
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: "fit-content",
                    margin: "20px auto 50px auto",
                  }}
                >
                  <button
                    onClick={handleAddQuestionInner}
                    className="btn-filled"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Popup>
      <Popup
        open={isEditQuestionClicked}
        modal
        closeOnDocumentClick={false}
        onClose={handleCloseEditPopup}
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
            onClick={handleCloseEditPopup}
          >
            <span class="material-symbols-outlined">close</span>
          </div>
          {isEditQuestionClicked && (
            <>
              <div
                style={{
                  padding: "22px 9px",
                  width: "467px",
                  minHeight: "300px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ textAlign: "center", marginTop: "0px" }}>
                  <h2>Edit Question</h2>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label htmlFor="question">Question:</label>
                  <br />
                  <input
                    type="text"
                    id="question"
                    name="question"
                    style={{
                      marginLeft: "5px",
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "lightgrey",
                      boxSizing: "border-box",
                    }}
                    value={selectedQuestion}
                    ref={inputRef}
                    onChange={handleQuestionChange}
                  />
                </div>
                <br />

                {questionOptions != null && questionOptions.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Options:
                    </div>
                    {questionOptions.map((option, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{ fontWeight: "bold", marginRight: "5px" }}
                          >
                            {index + 1}. {option.optionName}
                          </div>
                          <button
                            onClick={() =>
                              handleAddFollowUpQuestion(questionId, option.oid)
                            }
                            style={{
                              borderRadius: "50%",
                              width: "25px",
                              height: "25px",
                              border: "1px solid #ccc",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            <span style={{ fontSize: "12px" }}>+</span>
                          </button>
                        </div>
                        <div style={{ marginTop: "5px", marginLeft: "20px" }}>
                          Follow Ups:
                          {isFollowUp &&
                            followUpQuestions.has(option.oid) &&
                            followUpQuestions
                              .get(option.oid)
                              .map((followUpQuestion, idx) => (
                                <div key={idx} style={{ marginLeft: "15px" }}>
                                  {idx + 1}. {followUpQuestion}
                                </div>
                              ))}
                        </div>
                        <br />
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    width: "fit-content",
                    margin: "20px auto 50px auto",
                  }}
                >
                  <button
                    onClick={handleSaveEditQuestion}
                    className="btn-filled"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default AdminMaintainenceList;
