import axios from 'axios';
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Oval } from 'react-loader-spinner';
import {
    Box,
    Typography,
    Container,
    Tooltip,
    Switch
} from '@mui/material';

import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { API_DETAILS, COOKIE_KEYS, USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import AdminPopUps from './Admin-PopUps';
import Cookies from "js-cookie";

import "../../styles/Admin-ui/Admin-PopUps.css";

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import Youroheader from '../Youro-header';


const AdminAssistantList = () => {
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(false);
    const [renderapidata, cannotrenderapidata] = useState(false);
    const isRendered = useRef(false);
    const [open, setOpen] = useState(false);
    let count = 0;
    const [authContext, setAuthContext] = useState(''); // default zero. After login if ADMIN -> set('ADMIN') else if 'ASSITANT' -> set('ASSITANT')


    useEffect(() => {
        count += 1;
        if (!isRendered.current) {
            console.log('useEffect : ' + count);
            fetchData();
            isRendered.current = true;
            // setTableData(data)
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : " + count + "  =>  " + tableData);
        }
    }, []);


    const fetchData = async () => {
        let type = USER_TYPES.assistant;
        const token = Cookies.get(COOKIE_KEYS.token).trim();
        Cookies.get(COOKIE_KEYS.userType) == 'ADMIN' ? setAuthContext('ADMIN') : (Cookies.get(COOKIE_KEYS.userType) == 'ASSITANT' ? setAuthContext('ASSITANT') : navigate('/login'));
        console.log("token in admin doctors list :: " + token.trim());
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllUsers/${type}`;
        try {
            const res = await axios.get(url, config);
            canRenderAdmin(true);
            // for (let i = 0; i < res.data.length; i++) {
            //     console.log(res.data[i]);
            //     if (res.data[i].softDelete !== true) {
            //         console.log(true);
            //     }
            // }
            setTableData(res.data);
            console.log("Data inside fetchData : ");
            console.log(res);
        }
        catch (err) {
            //setfetcher true
            cannotrenderapidata(true);
            console.error(err);
        }
    };

    const handleApproveRenderAndChange = (cell = { emptyRow: true }, isChange = false) => {
        // console.log('cell => ' + JSON.stringify(cell) + " , " + JSON.stringify(tableData));
        if (isChange) {
            for (let i = 0; i < tableData.length; i++) {
                console.log("----====---------------=-------------=-----------");
                if (cell.row.original.userId == tableData[i].userId) {
                    console.log('i ==>  ' + i + " :: " + tableData[i].userId + " -> " + tableData[i].status);
                    tableData[i]['status'] = cell.row.original.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
                    setTableData([...tableData]);
                    isRendered.current = true;
                    updateAssistantStatus(cell.row.original);
                }
            }
        }
    }

    const updateAssistantStatus = async (rowData) => {
        console.log('in updateAssistantStatus::');
        console.log(rowData);
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/assistant/updateProfile`;
        try {
            // const temp = rowData;
            // console.log(temp);
            // const res = await axios.put(url, temp);
            // console.log(res);
            // fetchData();
        }
        catch (err) {
            console.error(err);
        }
    }

    const columns = authContext=='ADMIN' ?
    [
        {
            accessorKey: 'userId',
            header: 'ID',
            enableColumnOrdering: false,
            enableEditing: false,
            size: 50,
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'state',
            header: 'State',
        },
        {
            header: "Status",
            accessorKey: "status",
            Cell: ({ cell }) => (
                <Tooltip arrow placement="right" title="Approve">
                    <Switch
                        checked={cell.row.original.status == 'APPROVED'}
                        onChange={() => handleApproveRenderAndChange(cell, true)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Tooltip>
            ),
            size: 20,
        }
    ]:
    [
        {
            accessorKey: 'userId',
            header: 'ID',
            enableColumnOrdering: false,
            enableEditing: false,
            size: 50,
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'state',
            header: 'State',
        }
    ];


    const navigate = useNavigate();

    const handleClick = (row) => {
        console.log('Redirecting to admin view doctor');
        navigate('/admin-view-doctor', {
            state: {
                userId: row.original.userId,
                firstName: row.original.firstName,
                lastName: row.original.lastName,
                email: row.original.email,
                phone1: row.original.phone1,
                address: row.original.address,
                city: row.original.city,
                zipCode: row.original.zipCode,
                specialty: row.original.specialty,
                status: row.original.status,
                userType: row.original.userType,
                state: row.original.state,
                profileImageURL: row.original.profileImageURL,
                license: row.original.license,
                username: row.original.username,
                gender: row.original.gender,
                dateOfBirth: row.original.dateOfBirth
            }
        });
    };

    const handlAddNewAssistant = (data) => {
        data.userType = 'ASSITANT';
        data.phoneNumber = 1234567890;
        console.log(data);
        const config = {
            headers: {          
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        axios.post(API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +"/register", data, config).then((res) => {
            console.log("email in usrdata ", data.email);
            console.log("register success :: ");
            console.log(res);
            // navigate("/verify-email",  { state: { userEmail : usrData.email } });
            toast.success("Registration success");
            reset();
            setOpen(false);
        }).catch((err) => {
            console.error(err.response.data.errorMessage)
            toast.error('Oops!! ' + err.response.data.errorMessage)
        });
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();



    return (
        <div>
            {
                <div className='hm'>
                    <div className='sidebar'>
                        <AdminSideBar data={'admin-assistants'} />
                    </div>
                    <div className="admin-ui-table">
                        <div className='header' style={{ marginLeft: '15px' }}>
                            {/* <h1 style={{marginLeft: '15px'}}>youro</h1> */}
                            <Youroheader />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true) }}>+ Add new Assistant</div>
                            {/* <div className='btn-filled' style={{ width: 'fit-content', marginLeft: '15px' }} onClick={() => { setOpen(true) }}>+ Add new diagnosis</div> */}
                        </div>
                        <ToastContainer />
                        {renderAdmin == true && tableData && tableData.length > 0 ?
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
                                    enableRowActions={authContext=='ADMIN'}
                                    enableEditing={authContext=='ADMIN'}
                                    // enableRowNumbers

                                    muiTableContainerProps={{ sx: { maxHeight: window.innerHeight } }}
                                    positionActionsColumn='last'
                                    renderRowActions={({ row }) => (
                                        authContext=='ADMIN' &&
                                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                                            <Tooltip arrow placement="right" title="Delete" >
                                                <AdminPopUps data={{ 'action': 'delete-doctor', 'step': 1, 'rowData': row.original }} />
                                            </Tooltip>
                                        </Box>
                                    )}
                                    renderDetailPanel={({ row }) => (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                margin: 'auto',
                                                gridTemplateColumns: '1fr 1fr',
                                                width: '100%',
                                                padding: '0',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <Container maxWidth={false} sx={{ padding: '0', margin: '0px', maxWidth: '100%' }}>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <Typography>Address: {row.original.address}</Typography>
                                                        <Typography>City: {row.original.city}</Typography>
                                                        <Typography>State: {row.original.state}</Typography>
                                                        <Typography>Country: {row.original.country}</Typography>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12' style={{ textAlign: 'end' }}>
                                                        <button onClick={() => handleClick(row)} className='view-more-class' >
                                                            View More {'>>'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Container>
                                        </Box>
                                    )}
                                    muiTableBodyProps={{
                                        sx: () => ({
                                            // '& tr:nth-of-type(even)': {
                                            //     backgroundColor: "yellow",
                                            // },
                                            '& tr:nth-of-type(odd)': {
                                                backgroundColor: "lightgray",
                                                // border: '2px solid',
                                                // borderColor: 'black'
                                            },
                                        }),
                                    }}
                                />

                            )
                            : renderapidata ?
                                (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }}>
                                        Error Fetching Data!
                                    </div>
                                )
                                : !renderAdmin ?
                                    (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "98%", borderRadius: '10px', height: '70vh', }} ><Oval /></div>
                                    )
                                    : renderAdmin == true && tableData && tableData.length == 0 && <>
                                        <div style={{ textAlign: 'center', width: "98%", borderRadius: '10px', height: '70vh' }}>
                                            No Data Found!
                                        </div>
                                    </>
                        }
                    </div>

                </div>

                // </>
            }
            <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
                <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>

                <div style={{ padding: '50px 20px' }}>
                    <div style={{ minWidth: '30vw', maxWidth: '60vw' }}>

                    </div>

                    <div className="myself-input-assist">
                        <label>First Name *</label>
                        <input className="input-field input-border" type="text" {...register("firstName", {
                            required: true,
                            maxLength: 32,
                        })} />
                        {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                    </div>

                    <div className="myself-input-assist">
                        <label>Last Name *</label>
                        <input className="input-field input-border" type="text" {...register("lastName", {
                            required: true,
                            maxLength: 32,
                        })} />
                        {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                    </div>

                    <div className="myself-input-assist">
                        <label>Phone *</label>
                        <input className="input-field input-border" type="text" {...register("phoneNumber", {
                            required: true,
                            maxLength: 32,
                        })} />
                        {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.lastName?.type === "maxLength" && <p className="error-text">Phone number cannot exceed 10 characters</p>}
                    </div>

                    <div className="myself-input-assist">
                        <label>Email *</label>
                        <input className="input-field input-border" type="text" {...register("email", {
                            required: true,
                            maxLength: 32,
                            pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                        })} />
                        {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                        {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                    </div>
                    <div className="myself-input-assist">
                        <label >Create Password *</label>
                        <input className="input-field input-border" type="password" {...register("password", {
                            required: true,
                            maxLength: 32,
                            minLength: 8
                        })} ></input>
                        {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                        {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
                    </div>
                    <div className="myself-input-assist">
                        <label >Re-type Password *</label>
                        <input className="input-field input-border" type="password" {...register("confirmPassword", {
                            validate: val => watch('password') === val
                        })}  ></input>
                        {errors?.confirmPassword && <p className="error-text">Passwords must match</p>}
                    </div>
                    <br></br>
                </div>

                <div>
                    <div className='btn-filled' style={{ width: 'fit-content', margin: '0px auto 50px auto' }} onClick={handleSubmit(handlAddNewAssistant)}>Register User</div>
                </div>
            </Popup>

        </div>
    );

};

export default AdminAssistantList;
