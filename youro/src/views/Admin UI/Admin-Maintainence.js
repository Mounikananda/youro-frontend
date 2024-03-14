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

import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { API_DETAILS, COOKIE_KEYS, USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'
import AdminPopUps from './Admin-PopUps';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Edit';


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
    const [open, setOpen] = useState(false);
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

    const [diagnosisData, setDiagnosisData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [needsRefresh, setRefreshStatus] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState({});


    const [columns, setColumns] = useState(
        [
            {
                accessorKey: 'medicineId',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false,
                size: 50,
            },
            {
                accessorKey: 'medicineName',
                header: 'Medicine Name',
            },
            {
                accessorKey: 'prescriptionType',
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
                {
                    accessorKey: 'medicineId',
                    header: 'ID',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'medicineName',
                    header: 'Medicine Name',
                },
                {
                    accessorKey: 'prescriptionType',
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
                {
                    accessorKey: 'questionId',
                    header: 'ID',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'question',
                    header: 'Question',
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
                {
                    accessorKey: 'diagId',
                    header: 'ID',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'name',
                    header: 'Name',
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
                {
                    accessorKey: 'categoryID',
                    header: 'ID',
                    enableColumnOrdering: false,
                    enableEditing: false,
                    size: 50,
                },
                {
                    accessorKey: 'categoryName',
                    header: 'Category Name',
                },
            ]);

            
            setTableData(categoryData);
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
            fetchAllQuestionnaires();
            fetchCategoryData();
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
                    medicineId: res.data[i].presId,
                    medicineName: res.data[i].name,
                    prescriptionType: res.data[i].presType,
                    category: res.data[i].category.name,
                    diagnosis: res.data[i].diagnosis.name,
                };
                tempData.push(temp);
            }
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
            setTableData(tempData);
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
        setOpen(false);
        let numberArray = [];
        for (var i = 0; i < data.diagnosis.length; i++) {
            numberArray.push(parseInt(data.diagnosis[i]));
        }

        const temp = {
            name: data.medicineName,
            type: data.prescriptionType,
            diagnosisId: numberArray,
            categoryId: data.category
        };

        axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/addPrescription", temp).then((res) => {
            toast.success('Added successfully!!');
            fetchPrescitions();
        }).catch((err) => {
            console.error(err);
            toast.error(err.response.data.errorMessage);
        });
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
    }

    // const handleEditCategory = async (data) => {
    //     const updatedData = {
    //         name: data.categoryName,
    //     };
    
    //     try {
    //         const response = await axios.put(`${API_DETAILS.baseUrl}${API_DETAILS.PORT}${API_DETAILS.baseExtension}/editCategory/${editCategoryData.categoryID}`, updatedData);
    //         toast.success('Category updated successfully!');
    //         fetchCategoryData(); // Refresh the categories
    //         setOpen(false); // Close the popup
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('Failed to update category');
    //     }
    // };

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
                                <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('MEDICINE'); fetchAllDiagnoses(); }}> 
                                    Medicine
                                </div>
                            }
                            {/* {pageContext == 'DIAGNOSIS' && <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('DIAGNOSIS') }}> Add Diagnosis</div>} */}
                            {/* {pageContext == 'QUESTIONNAIRE' && <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('QUESTIONNAIRE'); fetchAllDiagnoses(); }}> Add Questionnaire</div>} */}
                            {
                                pageContext == 'CATEGORY' && 
                                <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true); setAddPopUpContext('CATEGORY'); fetchCategoryData()}}> 
                                    Add Category
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
                                            authContext == 'ADMIN' &&
                                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                                <Tooltip arrow placement="right" title="Delete">
                                                    <AdminPopUps data={{ 'action': `delete-${pageContext.toLowerCase()}`, 'step': 1, 'rowData': row.original, 'postDeleteAction': fetchAfterDelete(), 'setParentRefreshStatus': setRefreshStatus }} />
                                                </Tooltip>

                                                {pageContext === 'CATEGORY' && (
                                                <Tooltip arrow placement="right" title="Edit">
                                                    <IconButton
                                                        onClick={() => { setOpen(true); setAddPopUpContext('EDIT_CATEGORY'); setEditCategoryData(row.original); }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                )}

                                            </Box> 

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
                                    ((pageContext == 'PRESCRIPTION' && !renderPrescriptionApiData) || (pageContext == 'DIAGNOSIS' && !renderDiagnosisApiData) || (pageContext == 'QUESTIONNAIRE' && !renderQuestionnaireApiData) || (pageContext == 'CATEGORY' && !renderCategoryApiData))  ?
                                        (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }}>
                                            Error Fetching Data!
                                        </div>)
                                        : !renderAdmin ?
                                            (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }} ><Oval /></div>)
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
            <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
                <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                {addPopUpContext == 'MEDICINE' && <>
                    <div style={{ padding: '50px 20px', maxWidth: '60vw', minWidth: '30vw' }}>
                        <div style={{ width: '300px' }}>

                        </div>
                        <div className="" style={{ display: 'flex', marginBottom: '1.5vh' }}>
                            <label>Medicine Name :</label>
                            <input className="input-field-doctor input-border" type="text" style={{ width: '94%' }} {...register("medicineName", {
                                required: true,
                                maxLength: 32,
                            })} />
                            {errors?.medicineName?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.medicineName?.type === "maxLength" && <p className="error-text">Medicine Name cannot exceed 32 characters</p>}
                        </div><br />
                        <div className="">
                            <label>Prescription Type :</label><br />
                            <select style={{ width: '100%' }} className="input-field input-border" id="gender" {...register("prescriptionType", {
                                required: true,
                            })}>
                                <option value="">Select</option>
                                <option value="LAB">LAB</option>
                                <option value="VITAMINS">VITAMINS</option>
                                <option value="MEDICINES">MEDICINES</option>
                                <option value="IMAGING">IMAGING</option>
                                <option value="LIFESTYLE">LIFESTYLE</option>
                                <option value="MEDIA">MEDIA</option>
                            </select>
                            {errors?.prescriptionType && <p className="error-text">This field is required</p>}
                        </div> <br ></br>

                        <div className="">
                            <label>Category :</label><br />
                            <select style={{ width: '100%' }} className="input-field input-border" id="gender" {...register("category", {
                                required: true,
                            })}>
                                <option value="">Select</option>
                            </select>
                            {errors?.category&& <p className="error-text">This field is required</p>}
                        </div> <br ></br>

                        <div className="">
                            <label>Diagnosis :</label><br />
                            {
                                diagnosisData.map((diagosis) => {
                                    return (
                                        <div style={{ maxWidth: '200px', minWidth: '150px' }}>
                                            <input type="checkbox" id="html" name="diagnosis" value={diagosis.diagId} {...register("diagnosis", {
                                                required: true,
                                            })} />
                                            <label for="html" style={{ marginLeft: '10px' }}>{diagosis.name}</label><br /><br />
                                        </div>
                                    )
                                })
                            }
                            {errors?.diagnosis && <p className="error-text">This field is required</p>}
                        </div>
                    </div>

                    <div>
                        <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={handleSubmit(handleAddPrescription)}>Add medicine</div>
                    </div>
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
                    <div style={{ padding: '20px' }}>
                        <TextField
                            label="Category Name"
                            defaultValue={editCategoryData.categoryName}
                            onChange={(e) => setEditCategoryData({ ...editCategoryData, categoryName: e.target.value })}
                            margin="normal"
                            fullWidth
                        />
                        <Button
                            onClick={() => handleEditCategorySubmit()}
                            variant="contained"
                            color="primary"
                        >
                            Save Changes
                        </Button>
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
