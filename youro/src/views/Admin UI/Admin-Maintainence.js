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
import "../../styles/Admin-ui/Admin-DoctorsList.css";
import { USER_TYPES } from '../../App';
import AdminSideBar from './Admin-SideBar';
import { Link } from 'react-router-dom'
import AdminPopUps from './Admin-PopUps';
import Popup from 'reactjs-popup';
import { useForm } from "react-hook-form";

const data = [
    {
        medicineId: '1',
        categoryId: '1',
        medicineName: 'Paracetomal',
        category: 'Supplement',
        approved: '12/12/2022',

    },
    {
        medicineId: '2',
        categoryId: '2',
        medicineName: 'Vitamin C',
        category: 'Vitamins',
        approved: '',
    },
];


const AdminMaintainenceList = () => {
    const [tableData, setTableData] = useState([]);
    const [renderAdmin, canRenderAdmin] = useState(true);
    const [open, setOpen] = useState(false);
    const isRendered = useRef(false);
    let count = 0;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();


    useEffect(() => {
        count += 1;
        if (!isRendered.current) {
            console.log('useEffect : ' + count);
            fetchData();
            isRendered.current = true;
            setTableData(data)
        }
        else {
            console.log('useEffect re-render : ' + count);
            console.log("Data inside useEffect : " + count + "  =>  " + tableData);
        }
    }, []);

    useEffect(() => {
        console.log(tableData)
    }, [tableData])


    const fetchData = async () => {
        let type = USER_TYPES.doctor;
        const url = `http://localhost:9092/youro/api/v1/getAllUsers/${type}`;
        try {
            const res = await axios.get(url);
            canRenderAdmin(true);
            setTableData(res.data);
            console.log("Data inside fetchData : " + count + "  =>  " + tableData);
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleApproveRenderAndChange = (cell = { emptyRow: true }, isChange = false,) => {
        console.log('cell => ' + JSON.stringify(cell) + " , " + 'table Data =>' + JSON.stringify(tableData));
        console.log(tableData)
        if (isChange) {
            var data = [...tableData]
            for (let i = 0; i < tableData.length; i++) {
                console.log("----====---------------=-------------=-----------");
                if (cell.row.original.medicineId == tableData[i].medicineId) {
                    console.log('i ==>  ' + i + " :: " + tableData[i].userId + " -> " + tableData[i].status);
                    data[i].approved = cell.row.original.approved ? '' : new Date().toLocaleDateString();
                    setTableData([...data]);
                    
                    isRendered.current = true;
                }
            }
        }
    }

    const columns = [
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
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'approved',
                header: 'Approved On',
            },
            {
                header: "Status",
                accessorKey: "status",
                Cell: ({ cell }) => (
                    <Tooltip arrow placement="right" title="Approve">
                        <Switch
                            checked={cell.row.original.approved}
                            onClick={() => handleApproveRenderAndChange(cell, true)}
                            inputProps={{ 'aria-label': 'controlled', 'data': tableData }}
                        />
                    </Tooltip>
                ),
                size: 20,
            }
        ]

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



    if (!renderAdmin) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div>
            {
                renderAdmin == true && tableData.length > 0 && <>
                    <div className='hm'>
                        <div className='sidebar'>
                            <AdminSideBar data={'manage-approved-medicine'} />
                        </div>
                        <div className="admin-ui-table">
                            <div className='header'>
                                <h1 style={{marginLeft: '15px'}}>youro</h1>
                            </div>
                            <div className='btn-filled' style={{width: 'fit-content', marginLeft: '15px'}} onClick={() => setOpen(true)}>+ Add new medicine</div>
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
                                        <Tooltip arrow placement="right" title="Delete">
                                            {/* <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                                <Delete />
                                            </IconButton> */}
                                            <AdminPopUps data={{ 'action': 'delete-doctor', 'step': 1 , 'rowData': row.original}} />
                                        </Tooltip>
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
            <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
                <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div style={{ padding: '50px 20px' }}>
                    <div style={{width: '300px'}}>

                    </div>
                <div className="">
                               <label>Medicine Name :</label>
                               <input className="input-field-doctor input-border" type="text" style={{width: '94%'}} {...register("medicineName", {
                                  required: true,
                                  maxLength: 32,
                                })} />
                                {errors?.medicineName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.medicineName?.type === "maxLength" && <p className="error-text">Medicine Name cannot exceed 32 characters</p>}
                          </div><br/>
                    <div className="">
                        <label>Category :</label><br />
                          <select style={{width: '100%'}} className="input-field input-border" id="gender" {...register("category", {
                                  required: true,
                                })}>
                          <option value="">Select</option>
                          <option value="category 1">Category 1</option>
                          <option value="category 2">Category 2</option>
                          <option value="category 3">Category 3</option>
                        </select>
                        {errors?.category && <p className="error-text">This field is required</p>}
                   </div> 
                </div>

                <div>
                    <div className='btn-filled' style={{width: 'fit-content', margin: '0px auto 50px auto'}} onClick={() => setOpen(false)}>Add medicine</div>
                </div>
            </Popup>
        </div>
    );

};

export default AdminMaintainenceList;
