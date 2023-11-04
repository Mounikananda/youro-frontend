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
import Youroheader from '../Youro-header';
import "../../styles/Admin-ui/Admin-PopUps.css";

import {  useNavigate  } from 'react-router-dom';
const data = [
    {
        userId: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        status: "APPROVED"

    },
    {
        userId: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        status: "APPROVED"
    },
    {
        userId: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        status: "PENDING"
    },
    {
        userId: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        status: "PENDING"
    },
    {
        userId: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        status: "APPROVED"
    },
    {
        userId: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        status: "APPROVED"
    },
    {
        userId: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        status: "APPROVED"
    },
    {
        userId: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        status: "PENDING"
    },
    {
        userId: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        status: "APPROVED"
    },
];


const AdminDoctorsList = () => {
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(false);
    const [renderapidata,cannotrenderapidata]=useState(false);
    const isRendered = useRef(false);
    let count = 0;


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
        let type = USER_TYPES.doctor;
        const token = Cookies.get(COOKIE_KEYS.token).trim();
        console.log("token in admin doctors list :: " + token.trim());
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getAllUsers/${type}`;
        try {
            const res = await axios.get(url, config);
            canRenderAdmin(true); 
            for (let i = 0; i < res.data.length; i++) {
                console.log(res.data[i]);
                if (res.data[i].softDelete !== true) {
                    console.log(true);
                    data.push(res.data[i]);
                }
            }
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
                    updateDoctorStatus(cell.row.original);
                }
            }
        }
    }

    const updateDoctorStatus = async (rowData) => {
        console.log('in updateDoctorStatus::');
        console.log(rowData);
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/provider/updateProfile`;
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

    const columns = [
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
  

    
    return (
        <div>
            {
                    <div className='hm'>
                        <div className='sidebar'>
                            <AdminSideBar data={'admin-doctors'} />
                        </div>
                        <div className="admin-ui-table">
                            <div className='header' style={{marginLeft: '15px'}}>
                                {/* <h1 style={{marginLeft: '15px'}}>youro</h1> */}
                                 <Youroheader/>
                            </div>
                        {renderAdmin == true && tableData && tableData.length > 0 ? (
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
                                enableRowActions
                                enableEditing={true}
                                // enableRowNumbers

                                muiTableContainerProps={{ sx: { maxHeight: window.innerHeight } }}
                                positionActionsColumn='last'
                                renderRowActions={({ row }) => (
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
                        
                          ):  renderapidata? (<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}}>
                        Error Fetching Data!
                    </div>):!renderAdmin ? ( <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}} ><Oval/></div>):
                          renderAdmin==true && tableData && tableData.length == 0 && <>
                     <div style={{ textAlign:'center',width: "98%", borderRadius: '10px', height: '70vh' }}>
                         No Data Found!
                     </div>
                       </>
                        }
                        </div>
                       
                    </div>

                // </>
            }
            {
                // tableData && tableData.length == 0 && <>
                //     <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                //         No Data Found!
                //     </div>
                // </>
            } 
         
        </div>
    );

};

export default AdminDoctorsList;
