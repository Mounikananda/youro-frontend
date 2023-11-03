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
import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { DOCTOR_STATUS, USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'
import AdminPopUps from './Admin-PopUps';
import Youroheader from '../Youro-header';

const AdminDeniedDoctorsList = () => {
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
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : " + count + "  =>  " + tableData);
        }
    }, []);


    const fetchData = async () => {
        let type = USER_TYPES.doctor;
        const url = `http://52.14.33.154:9093/youro/api/v1/getAllUsers/${type}`;
        try {
            const res = await axios.get(url);
            canRenderAdmin(true);
            let data= [];
            for(let i =0; i<res.data.length; i++){
                console.log(res.data[i]);
                if(res.data[i].softDelete === true){ //res.data[i].status === DOCTOR_STATUS.denied &&
                    console.log(true);
                    data.push( res.data[i]);
                }
            }

            setTableData(data);
            console.log("Data inside fetchData : " + count + "  =>  " + data);
        }
        catch (err) {
            cannotrenderapidata(true);
            console.error(err);
        }
    };

    // const handleApproveRenderAndChange = (cell = { emptyRow: true }, isChange = false) => {
    //     console.log('cell => ' + JSON.stringify(cell) + " , " + JSON.stringify(tableData));
    //     if (isChange) {
    //         for (let i = 0; i < tableData.length; i++) {
    //             console.log("----====---------------=-------------=-----------");
    //             if (cell.row.original.userId == tableData[i].userId) {
    //                 console.log('i ==>  ' + i + " :: " + tableData[i].userId + " -> " + tableData[i].status);
    //                 tableData[i]['status'] = cell.row.original.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
    //                 setTableData([...tableData]);
    //                 isRendered.current = true;
    //             }
    //         }
    //     }
    // }

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
            // {
            //     header: "Status",
            //     accessorKey: "status",
            //     Cell: ({ cell }) => (
            //         <Tooltip arrow placement="right" title="Approve">
            //             <Switch
            //                 checked={cell.row.original.status == 'APPROVED'}
            //                 onChange={() => handleApproveRenderAndChange(cell, true)}
            //                 inputProps={{ 'aria-label': 'controlled' }}
            //             />
            //         </Tooltip>
            //     ),
            //     size: 20,
            // }
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
            tableData.splice(row.index, 1);
        },
        [tableData],
    );



  
    return (
        <div>
            {
                    <div className='hm'>
                        <div className='sidebar'>
                            <AdminSideBar data={'admin-denied-doctors'} />
                        </div>
                        <div className="admin-ui-table">
                            {/* <div className='header'>
                                <h1>youro</h1>
                            </div> */}
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
                                enableColumnOrdering
                                enableRowActions
                                enableEditing={true}
                                // enableRowNumbers
                                positionActionsColumn='last'
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="right" title="Delete">
                                            {/* <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                                <Delete />
                                            </IconButton> */}
                                            <AdminPopUps data={{ 'action': 'delete-denied-doctor', 'step': 1 , 'rowData': row.original}} />
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
                                                    <Link to={'/admin-patients' } className='view-more-class'>
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
                        ):  renderapidata? (<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}}>
                        Error Fetching Data!
                    </div>):!renderAdmin ? ( <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',}} ><Oval/></div>):
                          renderAdmin==true && tableData && tableData.length == 0 && <>
                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width: "98%", borderRadius: '10px', height: '70vh',} }>
                         No Data Found!
                     </div>
                       </>
                       };
                        </div>
                    </div>

                
            }
            {
                renderAdmin == true && tableData && tableData.length == 0 && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        No Data Found!
                    </div>
                </>
            }
            {
                renderAdmin == false && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        Error Fetching Data!
                    </div>
                </>
            }
        </div>
    );

};

export default AdminDeniedDoctorsList;
