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

import { Delete } from '@mui/icons-material';
import SideBar from '../Patient UI/SideBar';
import "../../styles/Admin-ui/Admin-HomePage.css";
// const data = [
//     {
//         userId: '1',
//         firstName: 'Dylan',
//         middleName: 'Sprouse',
//         lastName: 'Murray',
//         address: '261 Erdman Ford',
//         city: 'East Daphne',
//         state: 'Kentucky',
//         country: 'United States',
//         status: "APPROVED"

//     },
//     {
//         userId: '2',
//         firstName: 'Raquel',
//         middleName: 'Hakeem',
//         lastName: 'Kohler',
//         address: '769 Dominic Grove',
//         city: 'Vancouver',
//         state: 'British Columbia',
//         country: 'Canada',
//         status: "APPROVED"
//     },
//     {
//         userId: '3',
//         firstName: 'Ervin',
//         middleName: 'Kris',
//         lastName: 'Reinger',
//         address: '566 Brakus Inlet',
//         city: 'South Linda',
//         state: 'West Virginia',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '4',
//         firstName: 'Brittany',
//         middleName: 'Kathryn',
//         lastName: 'McCullough',
//         address: '722 Emie Stream',
//         city: 'Lincoln',
//         state: 'Nebraska',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '5',
//         firstName: 'Branson',
//         middleName: 'John',
//         lastName: 'Frami',
//         address: '32188 Larkin Turnpike',
//         city: 'Charleston',
//         state: 'South Carolina',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '1',
//         firstName: 'Dylan',
//         middleName: 'Sprouse',
//         lastName: 'Murray',
//         address: '261 Erdman Ford',
//         city: 'East Daphne',
//         state: 'Kentucky',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '2',
//         firstName: 'Raquel',
//         middleName: 'Hakeem',
//         lastName: 'Kohler',
//         address: '769 Dominic Grove',
//         city: 'Vancouver',
//         state: 'British Columbia',
//         country: 'Canada',
//         status: "PENDING"
//     },
//     {
//         userId: '3',
//         firstName: 'Ervin',
//         middleName: 'Kris',
//         lastName: 'Reinger',
//         address: '566 Brakus Inlet',
//         city: 'South Linda',
//         state: 'West Virginia',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '4',
//         firstName: 'Brittany',
//         middleName: 'Kathryn',
//         lastName: 'McCullough',
//         address: '722 Emie Stream',
//         city: 'Lincoln',
//         state: 'Nebraska',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '5',
//         firstName: 'Branson',
//         middleName: 'John',
//         lastName: 'Frami',
//         address: '32188 Larkin Turnpike',
//         city: 'Charleston',
//         state: 'South Carolina',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '1',
//         firstName: 'Dylan',
//         middleName: 'Sprouse',
//         lastName: 'Murray',
//         address: '261 Erdman Ford',
//         city: 'East Daphne',
//         state: 'Kentucky',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '2',
//         firstName: 'Raquel',
//         middleName: 'Hakeem',
//         lastName: 'Kohler',
//         address: '769 Dominic Grove',
//         city: 'Vancouver',
//         state: 'British Columbia',
//         country: 'Canada',
//         status: "PENDING"
//     },
//     {
//         userId: '3',
//         firstName: 'Ervin',
//         middleName: 'Kris',
//         lastName: 'Reinger',
//         address: '566 Brakus Inlet',
//         city: 'South Linda',
//         state: 'West Virginia',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '4',
//         firstName: 'Brittany',
//         middleName: 'Kathryn',
//         lastName: 'McCullough',
//         address: '722 Emie Stream',
//         city: 'Lincoln',
//         state: 'Nebraska',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '5',
//         firstName: 'Branson',
//         middleName: 'John',
//         lastName: 'Frami',
//         address: '32188 Larkin Turnpike',
//         city: 'Charleston',
//         state: 'South Carolina',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '1',
//         firstName: 'Dylan',
//         middleName: 'Sprouse',
//         lastName: 'Murray',
//         address: '261 Erdman Ford',
//         city: 'East Daphne',
//         state: 'Kentucky',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '2',
//         firstName: 'Raquel',
//         middleName: 'Hakeem',
//         lastName: 'Kohler',
//         address: '769 Dominic Grove',
//         city: 'Vancouver',
//         state: 'British Columbia',
//         country: 'Canada',
//         status: "APPROVED"
//     },
//     {
//         userId: '3',
//         firstName: 'Ervin',
//         middleName: 'Kris',
//         lastName: 'Reinger',
//         address: '566 Brakus Inlet',
//         city: 'South Linda',
//         state: 'West Virginia',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '4',
//         firstName: 'Brittany',
//         middleName: 'Kathryn',
//         lastName: 'McCullough',
//         address: '722 Emie Stream',
//         city: 'Lincoln',
//         state: 'Nebraska',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '5',
//         firstName: 'Branson',
//         middleName: 'John',
//         lastName: 'Frami',
//         address: '32188 Larkin Turnpike',
//         city: 'Charleston',
//         state: 'South Carolina',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '1',
//         firstName: 'Dylan',
//         middleName: 'Sprouse',
//         lastName: 'Murray',
//         address: '261 Erdman Ford',
//         city: 'East Daphne',
//         state: 'Kentucky',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '2',
//         firstName: 'Raquel',
//         middleName: 'Hakeem',
//         lastName: 'Kohler',
//         address: '769 Dominic Grove',
//         city: 'Vancouver',
//         state: 'British Columbia',
//         country: 'Canada',
//         status: "APPROVED"
//     },
//     {
//         userId: '3',
//         firstName: 'Ervin',
//         middleName: 'Kris',
//         lastName: 'Reinger',
//         address: '566 Brakus Inlet',
//         city: 'South Linda',
//         state: 'West Virginia',
//         country: 'United States',
//         status: "APPROVED"
//     },
//     {
//         userId: '4',
//         firstName: 'Brittany',
//         middleName: 'Kathryn',
//         lastName: 'McCullough',
//         address: '722 Emie Stream',
//         city: 'Lincoln',
//         state: 'Nebraska',
//         country: 'United States',
//         status: "PENDING"
//     },
//     {
//         userId: '5',
//         firstName: 'Branson',
//         middleName: 'John',
//         lastName: 'Frami',
//         address: '32188 Larkin Turnpike',
//         city: 'Charleston',
//         state: 'South Carolina',
//         country: 'United States',
//         status: "APPROVED"
//     },
// ];
const data = []
// {
//     "userId": 5,
//     "email": "doc1@gmail.com",
//     "password": "12121212",
//     "userType": "PROVIDER",
//     "firstName": "doc1st",
//     "lastName": "asdf",
//     "gender": "MALE",
//     "address": "asdf",
//     "city": "asfd",
//     "state": "NY",
//     "zipCode": "14214",
//     "dateOfBirth": "2003-07-03",
//     "phone1": "987654321",
//     "license": "123456",
//     "specialization": "Diagnosis1",
//     "status": "APPROVED"
//   }

const AdminHomePage = () => {
    const [isLoading1, setLoading1] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(true);
    const isRendered = useRef(false);

    // const [value, setValue, getValue] = useSetState("");
    useEffect(() => {
        if(!isRendered.current){
            console.log('useEffect');
            fetchData();
            isRendered.current = true;
        }   
        else{
            console.log('useEffect re-render');
            console.log("printing in console",tableData); 
        }
    }, [tableData]);


    const fetchData = async () => {
        const url = `http://localhost:9092/youro/api/v1/getAllUsers/PROVIDER`;
        const res = await axios.get(url);
        canRenderAdmin(true);
        setTableData([...res.data]);
        console.log('Got data');
        
        console.log("printing in console",tableData); //empty array
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
                    // cell.row.original.status = cell.row.original.status == 'APPROVED' ? 'PENDING' : 'APPROVED'
                )
            }
        ],
        [],
    );



    /**
     * 
     * @param {JSON} row - table cell data 
     * @param {boolean} isChange - isChangeEvent
     * @returns boolean
     */

    const handleApproveRenderAndChange = (row = { emptyRow: true }, isChange = false) => {
        let temp = tableData;
        console.log('row => ' + JSON.stringify(row.row.original) + " , " + tableData) ;
        if (isChange) {
            for (let i = 0; i < tableData.length; i++) {
                if (row.row.original.userId == tableData[i].userId) {
                    console.log('i ==>  ' + i + " :: " + tableData[i].userId + " -> " + tableData[i].status);
                    tableData[i].status = row.row.original.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
                    row.row.original.status = tableData[i].status;
                    setTableData([...tableData]);
                    // isRendered.current = true;
                    // return temp[i].status === 'APPROVED' ? true : false;
                }
            }
            // return !row.row.original.isApproved;
        }
    }

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            // setTableData([...tableData]);
        },
        [tableData],
    );


    // const handleChange1 = useCallback(
    //     (event, row) => {
    //         if (window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)) {
    //             console.log(event);
    //             setChecked(event.target.checked);
    //             return;
    //         }
    //         else {
    //             console.log("asdf");
    //         }
    //         //send api delete request here, then refetch or update local table data for re-render
    //         tableData.splice(row.index, 1);
    //         setTableData([...tableData]);
    //     },
    //     [tableData],
    // );




    // const [checked, setChecked] = React.useState(true);
    // const handleChange = (event, row) => {
    //     console.log(event);
    //     console.log(row);
    //     setChecked(event.target.checked);
    // };


    if (!renderAdmin) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div>
            {
                renderAdmin == true && tableData.length > 0 && <>
                    <div className='hm'>
                        <div className='sidebar'>
                            <SideBar />
                        </div>
                        <div className="admin-ui-table">
                            <div className='header'>
                                <h1>youro</h1>
                            </div>
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
                                enableColumnOrdering
                                enableRowActions
                                // enableRowNumbers
                                positionActionsColumn='last'
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        {/* <Tooltip arrow placement="right" title="Approve">
                                            <Switch
                                                checked={handleApproveRenderAndChange(row)}
                                                onChange={(event) => handleChange(event, row)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Tooltip> */}
                                        <Tooltip arrow placement="right" title="Delete">
                                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                                <Delete />
                                            </IconButton>
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
                                        <Container maxWidth={false} sx={{ border: '1px solid', padding: '0', margin: '0px', maxWidth: '100%', bgcolor: "#dff7f7" }}>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <Typography>Address: {row.original.address}</Typography>
                                                    <Typography>City: {row.original.city}</Typography>
                                                    <Typography>State: {row.original.state}</Typography>
                                                    <Typography>Country: {row.original.country}</Typography>
                                                </div>
                                                {/* <div className='col-3'>
                                                    <Tooltip arrow placement="right" title="Delete">
                                                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div> */}
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
                                            border: '2px solid',
                                            borderColor: 'black'
                                        },
                                    }),
                                }}

                            />
                        </div>
                    </div>

                </>
            }
            {
                renderAdmin == true && tableData.length == 0 && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        No Data Found!
                    </div>
                </>
            }
            {
                renderAdmin == false && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        API error
                    </div>
                </>
            }
        </div>
    );

};

export default AdminHomePage;
