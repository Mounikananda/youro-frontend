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
import "../../styles/Admin-ui/Admin-PatientList.css";
import { uTypes } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'


const AdminPatientList = () => {
    const [tableDataPats, setTableDataPats] = useState([]);
    const [renderAdminPats, canRenderAdminPats] = useState(true);
    const isAdminPatsRendered = useRef(false);
    let count = 0;


    useEffect(() => {
        count += 1;
        if (!isAdminPatsRendered.current) {
            console.log('useEffect : ' + count);
            fetchData();
            isAdminPatsRendered.current = true;
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : " + count + "  =>  " + tableDataPats);
        }
    }, []);


    const fetchData = async () => {
        let type = uTypes.user;
        const url = `http://localhost:9092/youro/api/v1/getAllUsers/${type}`;
        try {
            const res = await axios.get(url);
            canRenderAdminPats(true);
            setTableDataPats(res.data);
            console.log("Data inside fetchData : " + count + "  =>  " + tableDataPats);
        }
        catch (err) {
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



    if (!renderAdminPats) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div>
            {
                renderAdminPats == true && tableDataPats.length > 0 && <>
                    <div className='hm'>
                        <div className='sidebar'>
                            <AdminSideBar data={'admin-patients'} />
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
                                data={tableDataPats}
                                enableColumnOrdering
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
                                                    <Link to={'/admin-patients' } className='view-more-class'>
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
                        </div>
                    </div>

                </>
            }
            {
                renderAdminPats == true && tableDataPats.length == 0 && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        No Data Found!
                    </div>
                </>
            }
            {
                renderAdminPats == false && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        API error
                    </div>
                </>
            }
        </div>
    );

};

export default AdminPatientList;
