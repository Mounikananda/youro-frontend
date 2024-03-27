import axios from 'axios';
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { MaterialReactTable } from 'material-react-table';
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
    Switch
} from '@mui/material';
import { EditorState, convertToRaw , ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { API_DETAILS, COOKIE_KEYS, USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'
import AdminPopUps from './Admin-PopUps';
import CustomToolbarEditor from '../RichTextEditor';
import Popup from 'reactjs-popup';
import { set, useForm } from "react-hook-form";
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Youroheader from '../Youro-header';
import ReactQuillWrapper from '../Doctor UI/DA-takenote';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "../../styles/Admin-ui/Admin-Maintainence.css";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Edit';

const POPUPMODES = {
    NEW: 'NEW',
    VIEW: 'VIEW',
    EDIT: 'EDIT'
}

const AdminMaintainenceList = () => {
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(false);
    const [renderapidata, cannotrenderapidata] = useState({
        prescriptionRender: true,
        diagnosisRender: true,
        questionnairesRender: true,
    });
    const [renderDiagnosisApiData, setRenderDiagnosisApiData] = useState(false);
    const [renderPrescriptionApiData, setRenderPrescriptionApiData] = useState(false);
    const [renderQuestionnaireApiData, setRenderQuestionnaireApiData] = useState(false);
    const [renderCategoryApiData, setRenderCategoryApiData] = useState(false);
    const [renderPresTypeApiData, setRenderPresTypeApiData] = useState(false);
    const [open, setOpen] = useState(false);
    const [popUpMode, setPopupMode] = useState(POPUPMODES.NEW);
    const [popUpData, setPopUpData] = useState({});
    const [addPopUpContext, setAddPopUpContext] = useState('');
    const isRendered = useRef(false);
    let count = 0;
    const [authContext, setAuthContext] = useState(''); // default zero. After login if ADMIN -> set('ADMIN') else if 'ASSITANT' -> set('ASSITANT')
    const [pageContext, setPageContext] = React.useState('PRESCRIPTION');
    const [prescriptionList, setPrescription] = useState([]);
    // const [diagnosisList, setDiagnoses] = useState([]);
    const [questionnairesList, setQuestionnaires] = useState([]);
    const [selecDiag, setDiag] = useState('');
    const [selecDiagInfo, setDiagInfo] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [diagnosisData, setDiagnosisData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [presTypeData, setPresTypeData] = useState([]);
    const [needsRefresh, setRefreshStatus] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState({});
    const [editPresTypeData, setEditPresTypeData] = useState({});


    const [columns, setColumns] = useState(
        [
            // {
            //     accessorKey: 'medicineId',
            //     header: 'ID',
            //     enableColumnOrdering: false,
            //     enableEditing: false,
            //     size: 50,
            // },
            {
                accessorKey: 'medicineName',
                header: 'Medicine Name',
                enableColumnOrdering: false,
                enableEditing: false,
                size: 50,
            },
            {
                accessorKey: 'presName',
                header: 'Name',
            },
            {
                accessorKey: 'presType',
                header: 'Prescription Type',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'diagnosis',
                header: 'Diagnosis',
            }
        ]
    );


    const handlePageContextChange = (event, newAlignment) => {
        if (newAlignment == null || newAlignment == 'PRESCRIPTION') {
            setPageContext('PRESCRIPTION');
            setColumns([
                // {
                //     accessorKey: 'medicineId',
                //     header: 'ID',
                //     enableColumnOrdering: false,
                //     enableEditing: false,
                //     size: 50,
                // },
                {
                    accessorKey: 'medicineName',
                    header: 'Medicine Name',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'presType',
                    header: 'Prescription Type',
                },
                {
                    accessorKey: 'category',
                    header: 'Category',
                },
                {
                    accessorKey: 'diagnosis',
                    header: 'Diagnosis',
                }
            ]);
            setTableData(prescriptionList)
        }
        else if (newAlignment == 'QUESTIONNAIRE') {
            setPageContext('QUESTIONNAIRE');
            setColumns([
                // {
                //     accessorKey: 'questionId',
                //     header: 'ID',
                //     enableColumnOrdering: false,
                //     enableEditing: false,
                //     size: 50,
                // },
                {
                    accessorKey: 'question',
                    header: 'Question',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'options',
                    header: 'Options',
                }
            ]);
            setTableData(questionnairesList);
        }
        else if (newAlignment == 'DIAGNOSIS') {
            setPageContext('DIAGNOSIS');
            setColumns([
                // {
                //     accessorKey: 'diagId',
                //     header: 'ID',
                //     enableColumnOrdering: false,
                //     enableEditing: false,
                //     size: 50,
                // },
                {
                    accessorKey: 'name',
                    header: 'Name',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'info',
                    header: 'Info',
                }
            ]);


            setTableData(diagnosisData);
        }


        else if (newAlignment == 'CATEGORY') {
            setPageContext('CATEGORY');
            setColumns([
                // {
                //     accessorKey: 'categoryID',
                //     header: 'ID',
                //     enableColumnOrdering: false,
                //     enableEditing: false,
                //     size: 50,
                // },
                {
                    accessorKey: 'categoryName',
                    header: 'Category Name',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
            ]);

            
            setTableData(categoryData);
        }

        else if (newAlignment == 'PRES_TYPE') {
            setPageContext('PRES_TYPE');
            setColumns([
                // {
                //     accessorKey: 'presTypeID',
                //     header: 'ID',
                //     enableColumnOrdering: false,
                //     enableEditing: false,
                //     size: 50,
                // },
                {
                    accessorKey: 'presTypeName',
                    header: 'Prescription Type',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
            ]);

            
            setTableData(presTypeData);
        }
    };


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    useEffect(() => {
        count += 1;
        if (!isRendered.current) {
            fetchPrescitions();
            fetchAllDiagnoses();
            fetchAllQuestionnaires();
            fetchCategoryData();
            fetchPresTypeData();
            isRendered.current = true;
        }
        else {
            console.log('useEffect re-render : ' + count);
        }
    }, []);

    // diagId, name, info
    const fetchPrescitions = async () => {
        Cookies.get(COOKIE_KEYS.userType) == 'ADMIN' ? setAuthContext('ADMIN') : (Cookies.get(COOKIE_KEYS.userType) == 'ASSITANT' ? setAuthContext('ASSITANT') : navigate('/login'));
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllPrescriptions`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            console.log("HERE IS THE PRESCRIPTION DATA", res);
            canRenderAdmin(true);
            let tempData = [];
            for (let i = 0; i < res.data.length; i++) {
                let temp = {
                    presId: res.data[i].presId,
                    presName: res.data[i].name,
                    presType: res.data[i].presType,
                    diagnosis: res.data[i].diagnosis.name,
                    diagnosisId: res.data[i].diagnosis.diagId,
                    shortInfo: res.data[i].shortInfo,
                    overview: res.data[i].overview,
                    category: res.data[i].category ? res.data[i].category.name: '-- ',
                    categoryId: res.data[i].category && res.data[i].category.categoryId,
                };
                tempData.push(temp);
            }
            console.log("SETTING PRESCRIPTION LIST")
            setPrescription(tempData);
            setTableData(tempData);
            setRenderPrescriptionApiData(true);
        }
        catch (err) {
            setRenderPrescriptionApiData(false);
            console.error(err);
        }
    };

    const fetchAllDiagnoses = async () => {
        // console.log("====^^^===");
        // console.log("fetchAllDiagnoses START");
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllDiagnoses`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            setDiagnosisData(res.data);
            if (pageContext == 'DIAGNOSIS') {
                setTableData(res.data);
            }
            setRenderPrescriptionApiData(true);
        }
        catch (err) {
            cannotrenderapidata({
                prescriptionRender: true,
                diagnosisRender: false,
                questionnairesRender: true,
            });
            setRenderDiagnosisApiData(false);
            console.error(err);
        }
        // console.log("fetchAllDiagnoses END");
        // console.log("====^^^===");
    };

    const getOptionsStringFromApiData = (qOptsArray) => {
        let str  = "$ ";
        for (let i = 0; i < qOptsArray.length; i++) {
            let temp = qOptsArray[i].oName + " $ ";
            str += temp;
        }
        // console.log('Opts str :: '+ str);
        return str;
    }   
    //   getAllQuestionnaires
    const fetchAllQuestionnaires = async () => {
        // console.log("====^^^===");
        // console.log("fetchAllQuestionnaires START");
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllQuestionnaires`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            let tempData = [];
            for (let i = 0; i < res.data.length; i++) {
                let optStr = getOptionsStringFromApiData(res.data[i].options);
                console.log('Opts str :: '+ optStr);
                let temp = {
                    questionId: res.data[i].questionId,
                    question: res.data[i].question,
                    options: optStr
                };
                tempData.push(temp);
            }
            setQuestionnaires(tempData);
            if (pageContext == 'QUESTIONNAIRE') {
                setTableData(tempData);
            }
            
            setRenderQuestionnaireApiData(true);
        }
        catch (err) {

            cannotrenderapidata({
                prescriptionRender: true,
                diagnosisRender: true,
                questionnairesRender: false,
            });
            setRenderQuestionnaireApiData(false);
            console.error(err);
        }
        // console.log("fetchAllQuestionnaires END");
        // console.log("====^^^===");
    };

    const fetchCategoryData = async () => {
       // Cookies.get(COOKIE_KEYS.userType) == 'ADMIN' ? setAuthContext('ADMIN') : (Cookies.get(COOKIE_KEYS.userType) == 'ASSITANT' ? setAuthContext('ASSITANT') : navigate('/login'));
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllCategories`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config); 
            console.log("here is the category",res);
            canRenderAdmin(true);
            let tempData = [];
            for (let i = 0; i < res.data.length; i++) {
                let temp = {
                    categoryID: res.data[i].categoryId,
                    categoryName: res.data[i].name,
                };
                console.log("here is the temp",temp);
                tempData.push(temp);
            }
            setCategoryData(tempData);
            if (pageContext == 'CATEGORY') {
                setTableData(tempData);
            }
            setRenderCategoryApiData(true);
        }
        catch (err) {
            setRenderCategoryApiData(false);
            console.error(err);
        }

        // let temp = [{
        //                 catId: 1,
        //                 catName: "testing",
        //             }];
        //             setCategoryData(temp);
        //             setTableData(temp);
        //             setRenderCategoryApiData(true);
    };

    const fetchPresTypeData = async () => {
        // Cookies.get(COOKIE_KEYS.userType) == 'ADMIN' ? setAuthContext('ADMIN') : (Cookies.get(COOKIE_KEYS.userType) == 'ASSITANT' ? setAuthContext('ASSITANT') : navigate('/login'));
         const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllPreTypes`;
         const config = {
             headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Methods': '*',
                 'Content-Type': 'application/json'
             }
         };
         try {
             const res = await axios.get(url, config); 
             console.log("here is the presType",res);
             canRenderAdmin(true);
             let tempData = [];
             for (let i = 0; i < res.data.length; i++) {
                 let temp = {
                     presTypeID: res.data[i].presTypeId,
                     presTypeName: res.data[i].name,
                 };
                 console.log("here is the temp",temp);
                 tempData.push(temp);
             }
             setPresTypeData(tempData);
             if (pageContext == 'PRES_TYPE') {
                 setTableData(tempData);
             }
             setRenderPresTypeApiData(true);
         }
         catch (err) {
             setRenderPresTypeApiData(false);
             console.error(err);
         }
    };

    const fetchAfterDelete = () => {
        if (needsRefresh) {
            if (pageContext == 'QUESTIONNAIRE') {
                fetchAllQuestionnaires();
            }
            if (pageContext == 'PRESCRIPTION') {
                fetchPrescitions();
            }
            else if (pageContext == 'DIAGNOSIS') {
                fetchAllDiagnoses();
            }
            else if (pageContext == 'CATEGORY') {
                fetchCategoryData();
            }
            else if (pageContext == 'PRES_TYPE') {
                fetchPresTypeData();
            }
            setRefreshStatus(false);
        }
    }

    const handleAddDiagnosis = () => {
        if (selecDiag != '' && selecDiagInfo != '') {
            setOpen(false);
            const temp = {
                name: selecDiag,
                info: selecDiagInfo
            };
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Content-Type': 'application/json'
                }
            };
            axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/addDiagnosis", temp, config).then((res) => {
                toast.success('Added successfully!!');
                fetchAllDiagnoses();
            }).catch((err) => {
                console.error(err);
                toast.error('Error adding diagnosis');
            });
        }
        else {
            console.clear();
        }
    }

    const handleAddPrescription = (data) => {
        const temp = {
            name: data.presName,
            type: data.presType,
            shortInfo: data.shortInfo,
            overview: getEditorinHTML(),
            diagnosisId: data.diagnosis.map(d => parseInt(d)),
            categoryId: data.category
        };

        axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/addPrescription", temp).then((res) => {
            toast.success('Added successfully!!');
            fetchPrescitions();
        }).catch((err) => {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        });
        setOpen(false);

    }

    const handleUpdatePrescription = () => {
        console.log(popUpData)
        const temp = {
            name: popUpData.presName,
            type: popUpData.presType,
            diagnosisId: popUpData.diagnosisId,
            shortInfo: popUpData.shortInfo,
            categoryId: popUpData.categoryId,
            overview: getEditorinHTML()
        };
        console.log(temp)
        axios.put(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/updatePrescription/${popUpData.presId}`, temp).then((res) => {
            toast.success(`${popUpData.presName} Updated successfully!!`);
            fetchPrescitions();
        }).catch((err) => {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        });
        setOpen(false);

    }

    const onClickViewInfo = (rowData) => {
        setPopUpData(rowData)
        setEditorFromHTML(rowData.overview || '')
        setPopupMode(POPUPMODES.VIEW)
        setAddPopUpContext(pageContext);
        setOpen(true);
    }

    const onClickEditInfo = (rowData) => {
        setPopUpData(rowData)
        setEditorFromHTML(rowData.overview || '')
        setPopupMode(POPUPMODES.EDIT)
        setAddPopUpContext(pageContext);
        setOpen(true);
    }

    const setEditInfo = (key, val) => {
        setPopUpData({
            ...popUpData,
            [key]: val
        })
    }
    
    const clearEditor = () => {
        setEditorState(EditorState.createEmpty())
    }

    const setEditorFromHTML = (content) => {
        const blocksFromHtml = htmlToDraft(content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    }

    const getEditorinHTML = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    const onClickAddPrescription = () => {
        reset();
        clearEditor();
        setOpen(true);
        setPopupMode(POPUPMODES.NEW)
        setAddPopUpContext('PRESCRIPTION');
        fetchAllDiagnoses();
    }

    const onClickAddSave = () => {
        if (popUpMode == POPUPMODES.NEW) {
            handleSubmit(handleAddPrescription)();
        }
        if (popUpMode == POPUPMODES.EDIT) {
            handleUpdatePrescription();
        }
    }

    const handleAddCategory = (data) => {
        setOpen(false);
        //debugger;
        const temp = {
            name: data.categoryName,
        };

        axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/addCategory", temp).then((res) => {
            toast.success('Added successfully!!');
            fetchCategoryData();
        }).catch((err) => {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        });
    };

    const handleEditCategorySubmit = async () => {
        try {
            const response = await axios.put(`${API_DETAILS.baseUrl}${API_DETAILS.PORT}${API_DETAILS.baseExtension}/editCategory/${editCategoryData.categoryID}`, {
                name: editCategoryData.categoryName,
            });
            toast.success('Category updated successfully!');
            fetchCategoryData(); // Refresh the category list
            setOpen(false); // Close the popup
        } catch (error) {
            console.error(error);
            toast.error('Failed to update category');
        }
    };

    const handleAddPresType = (data) => {
        setOpen(false);
        //debugger;
        const temp = {
            name: data.presTypeName,
        };

        axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/addPresType", temp).then((res) => {
            toast.success('Added successfully!!');
            fetchPresTypeData();
        }).catch((err) => {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        });
    };

    const handleEditPresTypeSubmit = async () => {
        try {
            const response = await axios.put(`${API_DETAILS.baseUrl}${API_DETAILS.PORT}${API_DETAILS.baseExtension}/editPresType/${editPresTypeData.presTypeID}`, {
                name: editPresTypeData.presTypeName,
            });
            toast.success('Category updated successfully!');
            fetchPresTypeData(); // Refresh the category list
            setOpen(false); // Close the popup
        } catch (error) {
            console.error(error);
            toast.error('Failed to update category');
        }
    };

    return (
        <div>
            {

                <div className='hm'>
                    <div className='sidebar'>
                        <AdminSideBar data={'manage-approved-medicine'} />
                    </div>
                    <div className="admin-ui-table">
                        <div className='header' style={{ marginLeft: '15px' }}>
                            <Youroheader />
                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                pageContext == 'PRESCRIPTION' && 
                                <Box sx={{ display: 'flex', gap: '1rem', marginLeft: '15px' }}>
                                    <Tooltip arrow placement="left" title="Add Prescription">
                                        <IconButton color="gray" onClick={onClickAddPrescription} className='add-icon' size="large">
                                            <AddIcon fontSize='inherit'/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                            {/* {pageContext == 'DIAGNOSIS' && <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('DIAGNOSIS') }}> Add Diagnosis</div>} */}
                            {/* {pageContext == 'QUESTIONNAIRE' && <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('QUESTIONNAIRE'); fetchAllDiagnoses(); }}> Add Questionnaire</div>} */}
                            {
                                pageContext == 'CATEGORY' && 
                                <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('CATEGORY'); fetchCategoryData()}}> 
                                    Add Category
                                </div>
                            }

                            {
                                pageContext == 'PRES_TYPE' && 
                                <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('PRES_TYPE'); fetchPresTypeData()}}> 
                                    Add Prescription Type
                                </div>
                            }
                            <ToggleButtonGroup
                                value={pageContext}
                                exclusive
                                onChange={handlePageContextChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value="PRESCRIPTION">Prescription</ToggleButton>
                                <ToggleButton value="DIAGNOSIS">Diagnosis</ToggleButton>
                                <ToggleButton value="QUESTIONNAIRE">Questionnaire</ToggleButton>
                                <ToggleButton value="CATEGORY">Category</ToggleButton>
                                <ToggleButton value="PRES_TYPE">Prescription Type</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <ToastContainer />
                        {
                            renderAdmin == true && tableData && tableData.length > 0 ?
                                (
                                    <MaterialReactTable
                                        displayColumnDefOptions={{
                                            'mrt-row-actions': {
                                                muiTableHeadCellProps: {
                                                    align: 'center',
                                                },
                                                size: 120,
                                            },
                                        }}
                                        columns={columns}
                                        data={tableData}
                                        enableStickyHeader
                                        enableColumnOrdering
                                        enableRowActions={authContext == 'ADMIN'}
                                        enableEditing={authContext == 'ADMIN'}
                                        muiTableContainerProps={{ sx: { maxHeight: window.innerHeight } }}
                                        positionActionsColumn='last'
                                        renderRowActions={({ row }) => (
                                            authContext == 'ADMIN' && (
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                        <Tooltip arrow placement="top" title="Delete">
                                                            <AdminPopUps data={{ 'action': `delete-${pageContext.toLowerCase()}`, 'step': 1, 'rowData': row.original, 'postDeleteAction': fetchAfterDelete(), 'setParentRefreshStatus': setRefreshStatus }} />
                                                        </Tooltip>
                                                    </Box>
                                                    {pageContext === 'PRESCRIPTION' && (
                                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                            <Tooltip arrow placement="top" title="Edit Info">
                                                                <IconButton color="gray" onClick={() => onClickEditInfo(row.original)} className='delete-doctor-button'>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    )}
                                                    {pageContext === 'PRESCRIPTION' && (
                                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                            <Tooltip arrow placement="top" title="View Info">
                                                                <button type="button" className='view-info-button' onClick={() => onClickViewInfo(row.original)}>View Info</button>
                                                            </Tooltip>
                                                        </Box>
                                                    )}
                                                    {pageContext === 'CATEGORY' && (
                                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                            <Tooltip arrow placement="right" title="Edit">
                                                                <IconButton
                                                                    onClick={() => { setOpen(true); setAddPopUpContext('EDIT_CATEGORY'); setEditCategoryData(row.original); }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    )}
                                                    {pageContext === 'PRES_TYPE' && (
                                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                            <Tooltip arrow placement="right" title="Edit">
                                                                <IconButton
                                                                    onClick={() => { setOpen(true); setAddPopUpContext('EDIT_PRES_TYPE'); setEditPresTypeData(row.original); }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    )}
                                                </div>
                                            )
                                        )}

                                        muiTableBodyProps={{
                                            sx: () => ({
                                                '& tr:nth-of-type(odd)': {
                                                    backgroundColor: "lightgray",
                                                },
                                            }),
                                        }}
                                    />
                                )
                                : (
                                    ((pageContext == 'PRESCRIPTION' && !renderPrescriptionApiData) || (pageContext == 'DIAGNOSIS' && !renderDiagnosisApiData) || (pageContext == 'QUESTIONNAIRE' && !renderQuestionnaireApiData) || (pageContext == 'CATEGORY' && !renderCategoryApiData) || (pageContext == 'PRES_TYPE' && !renderPresTypeApiData))  ?
                                        (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }}>
                                            Error Fetching Data!
                                        </div>)
                                        : !renderAdmin ?
                                            (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', positionActionsColumn:'last'}} ><Oval /></div>)
                                            : renderAdmin == true && tableData && tableData.length == 0 &&
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }}>
                                                    No Data Found!
                                                </div>
                                            </>
                                )
                        }
                    </div>
                </div>


            }
            <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="order-popup">
                <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                {addPopUpContext == 'PRESCRIPTION' && <>
                    <div style={{ padding: '25px', width: '65vw', marginBottom: '25px'}}>
                        <div className="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            {(popUpMode == POPUPMODES.NEW || popUpMode == POPUPMODES.EDIT) && (<>
                                <label>Name:</label>
                                {popUpMode == POPUPMODES.NEW ? (
                                    <>
                                    <input className="input-field-doctor input-border" type="text" style={{ width: '60%', marginLeft: '20px' }} {...register("presName", {
                                        required: true,
                                        maxLength: 32,
                                    })} />
                                    {errors?.presName?.type === "required" && <p className="error-text">This field is required</p>}
                                    {errors?.presName?.type === "maxLength" && <p className="error-text"> Name cannot exceed 32 characters</p>}
                                    </>
                                ) : (
                                    <input 
                                        className="input-field-doctor input-border"
                                        type="text"
                                        style={{ width: '60%', marginLeft: '20px' }}
                                        value={popUpData.presName || ''}
                                        onChange={e => setEditInfo('presName', e.target.value)}
                                    />
                                )}
                            </>)}
                            {(popUpMode == POPUPMODES.VIEW)&& (<>
                                <h2>{popUpData.presName}</h2>
                            </>)}
                        </div>
                        <br />
                        <div className="">
                            <label>Prescription Type:</label><br />
                            {popUpMode == POPUPMODES.NEW && (<>
                                <select
                                    style={{ width: '25vw' }}
                                    className="input-field input-border" 
                                    id="gender" 
                                    {...register("presType", {required: true,})}
                                >
                                    <option value="">Select</option>
                                    {presTypeData.map((presType,index) => (
                                        <option key={index} value={presType.presTypeName}>
                                            {presType.presTypeName}
                                      </option>
                                    ))}
                                    {/* <option value="">Select</option>
                                    <option value="LAB">LAB</option>
                                    <option value="VITAMINS">VITAMINS</option>
                                    <option value="MEDICINES">MEDICINES</option>
                                    <option value="IMAGING">IMAGING</option>
                                    <option value="LIFESTYLE">LIFESTYLE</option>
                                    <option value="MEDIA">MEDIA</option> */}
                                </select>
                                {errors?.presType && <p className="error-text">This field is required</p>}
                            </>)}
                            {(popUpMode === POPUPMODES.VIEW || popUpMode === POPUPMODES.EDIT)&& (<>
                                <select
                                    style={{ width: '25vw' }}
                                    className="input-field input-border"
                                    id="gender"
                                    disabled={popUpMode === POPUPMODES.VIEW}
                                    value={popUpData.presType}
                                    onChange={e => setEditInfo('presType', e.target.value)}
                                     
                                >
                                    <option value="">Select</option>
                                    <option value="LAB">LAB</option>
                                    <option value="VITAMINS">VITAMINS</option>
                                    <option value="MEDICINES">MEDICINES</option>
                                    <option value="IMAGING">IMAGING</option>
                                    <option value="LIFESTYLE">LIFESTYLE</option>
                                    <option value="MEDIA">MEDIA</option>
                                </select>
                            </>)}
                        </div>
                        <br />
                        <div className="">
                            <label>Category :</label><br />
                            <select style={{ width: '25vw' }} className="input-field input-border" id="gender"  disabled={popUpMode != POPUPMODES.NEW} {...register("category", {
                                required: false,
                            })}>
                                <option value="">Select</option>
                                {categoryData.map((categoryData,index) => (
                                        <option key={index} value={categoryData.categoryName}>
                                            {categoryData.categoryName}
                                      </option>
                                    ))}
                            </select>
                            {errors?.category&& <p className="error-text">This field is required</p>}
                        </div> <br ></br>
                        <div className="">
                            {popUpMode == POPUPMODES.NEW && (
                            <div style={{display: 'flex', flexDirection:'column'}}>
                                <label>Diagnosis :</label><br />
                                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                                    {
                                        diagnosisData.map((diagosis) => {
                                            return (
                                                <>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '20px'}}>
                                                    <input type="checkbox" id="html" name="diagnosis" value={diagosis.diagId} {...register("diagnosis", {
                                                        required: true,
                                                    })} />
                                                    <label for="html" style={{ marginLeft: '10px' }}>{diagosis.name}</label><br /><br />
                                                </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                {errors?.diagnosis && <p className="error-text">This field is required</p>}
                            </div>
                            )}
                            {(popUpMode == POPUPMODES.VIEW || popUpMode == POPUPMODES.EDIT)&& (<>
                            <div className=''>
                                <label>Diagnosis :</label> <br/>
                                <select
                                    style={{ width: '25vw' }}
                                    className="input-field input-border"
                                    id="gender"
                                    disabled={popUpMode === POPUPMODES.VIEW}
                                    value={popUpData.diagnosisId}
                                    onChange={e => setEditInfo('diagnosisId', parseInt(e.target.value))}
                                     
                                >
                                    {diagnosisData.map(diagnosis => (
                                        <option value={diagnosis.diagId}>{diagnosis.name}</option>
                                    ))}
                                </select>                            
                            </div><br/>
                            </>)}

                        </div>
                        <br />
                        <div className="" style={{ display: 'flex', flexDirection: 'column'}}>
                            <label>Brief Overview :</label>
                            {popUpMode == POPUPMODES.NEW && (<>
                                <input 
                                    className="input-field-doctor input-border"
                                    type="text"
                                    style={{ width: '98%'}}
                                    {...register("shortInfo", 
                                        {
                                            required: false,
                                            maxLength: 128,
                                        })
                                    }
                                />
                            </>)}
                            {(popUpMode == POPUPMODES.VIEW) && (<>
                                <input 
                                    className="input-field-doctor input-border"
                                    type="text"
                                    style={{ width: '98%'}}
                                    value={popUpData.shortInfo || ''}
                                    disabled
                                />
                            </>)}
                            {(popUpMode == POPUPMODES.EDIT)&& (<>
                                <input 
                                    className="input-field-doctor input-border"
                                    type="text"
                                    style={{ width: '98%'}}
                                    value={popUpData.shortInfo || ''}
                                    onChange={e => setEditInfo('shortInfo', e.target.value)}
                                />
                            </>)}
                        </div>                             
                        <br/>
                        <div className="">
                            <label>Detailed Overview :</label><br />
                            <CustomToolbarEditor
                                readOnly={popUpMode === POPUPMODES.VIEW}
                                editorState={editorState}
                                setEditorState={setEditorState}
                            />
                        </div>
                    </div>
                    {(popUpMode == POPUPMODES.NEW || popUpMode == POPUPMODES.EDIT) && (
                        <>
                            <div 
                                className='btn-filled'
                                style={{ width: 'fit-content', margin: '0px auto 25px auto' }}
                                onClick={onClickAddSave}
                            >
                                {popUpMode == POPUPMODES.NEW ? "Add Prescription": "Save Changes"}
                            </div>
                        </>
                    )}
                </>}
                {addPopUpContext == 'CATEGORY' && <>
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>

                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Category Name :</label>
                            <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} {...register("categoryName", {
                                required: true,
                                maxLength: 32,
                            })} />
                            {errors?.categoryName?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.categoryName?.type === "maxLength" && <p className="error-text">category Name cannot exceed 32 characters</p>}
                        </div><br />
                    </div>

                    <div>
                        <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={handleSubmit(handleAddCategory)}>Add category</div>
                    </div>
                </>}


                {addPopUpContext === 'EDIT_CATEGORY' && (
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>
                            {/* You can add additional elements here if needed */}
                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Category Name :</label>
                            <input
                                className="input-field-doctor input-border"
                                type="text"
                                style={{ width: '94%' }}
                                defaultValue={editCategoryData.categoryName}
                                onChange={(e) => setEditCategoryData({ ...editCategoryData, categoryName: e.target.value })}
                                required= {true}
                                maxLength= {32}
                                
                            />
                            {errors?.categoryName?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.categoryName?.type === "maxLength" && <p className="error-text">Category Name cannot exceed 32 characters</p>}

                        </div>
                        <br />
                        <div>

                            <div
                                className='btn-filled'
                                style={{ width: 'fit-content', margin: '0px auto 50px auto'}}
                                onClick={() => handleEditCategorySubmit()}
                            >
                                Save Changes
                            </div>
                        </div>
                    </div>
                )}

                {addPopUpContext == 'PRES_TYPE' && <>
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>

                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Prescription Type Name :</label>
                            <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} {...register("presTypeName", {
                                required: true,
                                maxLength: 32,
                            })} />
                            {errors?.presTypeName?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.presTypeName?.type === "maxLength" && <p className="error-text">Prescription Type Name cannot exceed 32 characters</p>}
                        </div><br />
                    </div>

                    <div>
                        <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={handleSubmit(handleAddPresType)}>Add prescription type</div>
                    </div>
                </>}


                {addPopUpContext === 'EDIT_PRES_TYPE' && (
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>
                            {/* You can add additional elements here if needed */}
                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Prescription Type Name :</label>
                            <input
                                className="input-field-doctor input-border"
                                type="text"
                                style={{ width: '94%' }}
                                defaultValue={editPresTypeData.presTypeName}
                                onChange={(e) => setEditPresTypeData({ ...editPresTypeData, presTypeName: e.target.value })}
                                required= {true}
                                maxLength= {32}
                                
                            />
                            {errors?.presTypeName?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.presTypeName?.type === "maxLength" && <p className="error-text">Prescription Type Name cannot exceed 32 characters</p>}

                        </div>
                        <br />
                        <div>

                            <div
                                className='btn-filled'
                                style={{ width: 'fit-content', margin: '0px auto 50px auto'}}
                                onClick={() => handleEditPresTypeSubmit()}
                            >
                                Save Changes
                            </div>
                        </div>
                    </div>
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

                {/* {addPopUpContext == 'QUESTIONNAIRE' && <>
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Diagnosis Name :</label>
                            <select style={{ width: '100%' }} className="input-field input-border" id="gender" {...register("diagnosis", {
                                required: true,
                            })}>
                                <option value="">Select</option>
                                {
                                    diagnosisData.map((result) => (<option value={result.diagId}>{result.name}</option>))
                                }
                            </select>
                        </div>

                        <div className="">
                            <label>Diagnosis Info :</label>
                            <ReactQuillWrapper val={setDiagInfo} />
                        </div>


                    </div>

                    <div>
                        <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={() => handleAddDiagnosis()}>Add Questionnaire</div>
                    </div>
                </>} */}
            </Popup>
        </div>
    )

};

export default AdminMaintainenceList;
