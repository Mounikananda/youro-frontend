import axios from 'axios';
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Oval } from 'react-loader-spinner';
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

import { Delete } from '@mui/icons-material';
import "../../styles/Admin-ui/Admin-PatientList.css";
import { API_DETAILS, USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'
import Youroheader from '../Youro-header';


const AdminPatientList = () => {
    const [tableDataPats, setTableDataPats] = useState([]);
    const [renderAdminPats, canRenderAdminPats] = useState(false);
    const [renderapidata,cannotrenderapidata]=useState(false); 
    const isAdminPatsRendered = useRef(false);
    let count = 0;

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


    useEffect(() => {
        count += 1;
        if (!isAdminPatsRendered.current) {
            console.log('useEffect : ' + count);
            fetchData();
            isAdminPatsRendered.current = true;
            setTableDataPats(data);
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : " + count + "  =>  " + tableDataPats);
        }
    }, []);


    const fetchData = async () => {
        let type = USER_TYPES.user;
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getAllUsers/${type}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            canRenderAdminPats(true);
            setTableDataPats(res.data);
            console.log("Data inside fetchData : " + count + "  =>  " + tableDataPats);
        }
        catch (err) {
            cannotrenderapidata(true);
            console.error(err);
        }
    };

    const columns = useMemo(
        () => [
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
        ],
        [],
    );

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableDataPats.splice(row.index, 1);
            // tableDataPats([...tableDataPats]);
        },
        [tableDataPats],
    );



    // if (!renderAdminPats) {
    //     return <div className="App">Loading...</div>;
    // }
    return (
        <div>
            {
                
                    <div className='hm'>
                        <div className='sidebar'>
                            <AdminSideBar data={'admin-patients'} />
                        </div>
                        <div className="admin-ui-table">
                        {/* <div className='header'>
                                <h1 style={{marginLeft: '15px'}}>youro</h1>
                            </div> */}
                             <div className='header' style={{marginLeft: '15px'}}>
                                {/* <h1 style={{marginLeft: '15px'}}>youro</h1> */}
                                 <Youroheader/>
                            </div>
                         {renderAdminPats == true && tableDataPats && tableDataPats.length > 0 ? (
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
                                data={tableDataPats}
                                enableColumnOrdering
                                muiTableContainerProps={{ sx: { maxHeight: window.innerHeight } }}
                                // enableRowActions
                                // enableEditing={true}
                                // editingMode={'cell'}
                                // enableRowNumbers
                                // positionActionsColumn='last'
                                // renderRowActions={({ row }) => (
                                //     <Box sx={{ display: 'flex', gap: '1rem' }}>
                                //         <Tooltip arrow placement="right" title="Delete">
                                //             <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                //                 <Delete />
                                //             </IconButton>
                                //         </Tooltip>
                                //     </Box>
                                // )}
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
                                                    <Link to={'/admin-view-patient' } className='view-more-class'>
                                                        {/* <Link to={{ screen: 'Profile', params: { id: 'jane' } }}>
                                                            Go to Jane's profile
                                                            </Link> */}
                                                        View More{'>>'}
                                                        
                                                    </Link>
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
                            ): renderapidata? (<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}} >
                                Error Fetching Data!
                    </div>): !renderAdminPats ? ( <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}} ><Oval/></div>):
                          renderAdminPats==true && tableDataPats && tableDataPats.length == 0 && <>
                     <div style={{ textAlign:'center',width: "98%", borderRadius: '10px', height: '70vh' }}>
                         No Data Found!
                     </div>
                        </>
                           };
                        </div>
                    </div>

                // </>
            }
            {/* {
                renderAdminPats == true && tableDataPats && tableDataPats.length == 0 && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        No Data Found!
                    </div>
                </>
            }
            {
                renderAdminPats == false && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        Error Fetching Data!
                    </div>
                </>
            } */}
        </div>
    );

};

export default AdminPatientList;
