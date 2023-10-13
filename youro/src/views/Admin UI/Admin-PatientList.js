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
import { uTypes } from '../../App';


const AdminPatientList = () => {
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(true);
    const isRendered = useRef(false);
    let count = 0;
    useEffect(() => {
        count += 1;
        if (!isRendered.current) {
            console.log('useEffect : ' + count);
            fetchData();
            isRendered.current = true;
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : "+ count + "  =>  "+ tableData);
        }
    }, []);


    const fetchData = async () => {
        let type = uTypes.user;
        const url = `http://localhost:9092/youro/api/v1/getAllUsers/${type}`;
        const res = await axios.get(url);
        canRenderAdmin(true);
        setTableData(res.data);
        console.log("Data inside fetchData : "+ count + "  =>  "+ tableData);
    };
    
    const handleApproveRenderAndChange = (cell = { emptyRow: true }, isChange = false) => {
        console.log('cell => ' + JSON.stringify(cell) + " , " + JSON.stringify(tableData));
        if (isChange) {
            for (let i = 0; i < tableData.length; i++) {
                console.log("----====---------------=-------------=-----------");
                if (cell.row.original.userId == tableData[i].userId) {
                    console.log('i ==>  ' + i + " :: " + tableData[i].userId + " -> " + tableData[i].status);
                    tableData[i]['status'] = cell.row.original.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
                    setTableData([...tableData]);
                    isRendered.current = true;
                }
            }
        }
    }

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
                )
            }
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
            tableData.splice(row.index, 1);
            // setTableData([...tableData]);
        },
        [tableData],
    );



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
                                enableEditing={true}
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

export default AdminPatientList;
