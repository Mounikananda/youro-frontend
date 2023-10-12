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
// import Container from '@mui/material/Container';

import { Delete } from '@mui/icons-material';
import SideBar from '../Patient UI/SideBar';
import "../../styles/Admin-ui/Admin-HomePage.css";
const data = [
    {
        id: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        isApproved: true
    },
    {
        id: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        isApproved: true
    },
    {
        id: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        isApproved: true
    },
    {
        id: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        isApproved: false
    },
    {
        id: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        isApproved: true
    },
    {
        id: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        isApproved: true
    },
    {
        id: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        isApproved: false
    },
    {
        id: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        isApproved: true
    },
    {
        id: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        isApproved: true
    },
    {
        id: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        isApproved: false
    },
    {
        id: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        isApproved: true
    },
    {
        id: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        isApproved: true
    },
    {
        id: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        isApproved: true
    },
    {
        id: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        isApproved: false
    },
    {
        id: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        isApproved: true
    },
    {
        id: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        isApproved: true
    },
    {
        id: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        isApproved: true
    },
    {
        id: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        isApproved: false
    },
    {
        id: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        isApproved: true
    },
    {
        id: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        isApproved: true
    },
    {
        id: '1',
        firstName: 'Dylan',
        middleName: 'Sprouse',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        country: 'United States',
        isApproved: true
    },
    {
        id: '2',
        firstName: 'Raquel',
        middleName: 'Hakeem',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        isApproved: true
    },
    {
        id: '3',
        firstName: 'Ervin',
        middleName: 'Kris',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        country: 'United States',
        isApproved: true
    },
    {
        id: '4',
        firstName: 'Brittany',
        middleName: 'Kathryn',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
        country: 'United States',
        isApproved: true
    },
    {
        id: '5',
        firstName: 'Branson',
        middleName: 'John',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States',
        isApproved: true
    },
];

const AdminHomePage = () => {
    // const url = `http://localhost:9092/youro/api/v1/symptomScore/`;
    // axios.get(url).then((res) => {
    //     console.log("got symptom score :: " + JSON.stringify(res.data));
    //     data = res.data;
    // }).catch((err) => {
    //     canRender(true);
    //     console.error(err?.response?.data.errorMessage)
    // });


    /**
     * 
     * @param {JSON} row - table cell data 
     * @param {boolean} isChange - isChangeEvent
     * @returns boolean
     */

    const handleApproveRenderAndChange = (row = { emptyRow: true }, isChange = false) => {
        let temp = tableData;
        if (isChange) {
            console.clear();
            console.log('row => ' + JSON.stringify(row.row.original));
            for (let i = 0; i < temp.length; i++) {
                if (row.row.original.id == temp[i].id) {
                        console.log('i ==>  ' + i + " :: " + temp[i].id + " -> " + temp[i].isApproved);
                        temp[i].isApproved = !temp[i].isApproved;
                        setTableData(temp);
                        return temp[i].isApproved;
                }
            }
            return !row.row.original.isApproved;
        }
        else {
            if (row) {
                if (row.emptyRow) {
                    return false;
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (row.row.id == data[i].id) {
                            if (!data[i].isApproved) {
                                console.log('i ==>  ' + i + " :: " + data[i].id + " -> " + data[i].isApproved);
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
    }

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            // console.log("++++++first update+++++++++");
            return;
        }
        console.log("Not the first update");
        // Do something
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
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
                accessorKey: 'middleName',
                header: 'Middle Name',
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
                header: "Artist Name",
                accessorKey: "isApproved",
                Cell: ({ cell }) => (
                    <Tooltip arrow placement="right" title="Approve">
                        <Switch
                            checked={handleApproveRenderAndChange(cell, false)}
                            onChange={() => handleApproveRenderAndChange(cell, true)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Tooltip>
                )
            }

        ],
        [],
    );
    const [render, canRender] = useState(true);
    // canRender(true);
    const [tableData, setTableData] = useState(() => data);

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );


    const [checked, setChecked] = React.useState(true);
    const handleChange1 = useCallback(
        (event, row) => {
            if (window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)) {
                console.log(event);
                setChecked(event.target.checked);
                return;
            }
            else {
                console.log("asdf");
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const handleChange = (event, row) => {
        console.log(event);
        console.log(row);
        setChecked(event.target.checked);
    };


    return (
        <div>
            {
                render == true && data.length > 0 && <>
                    <div className='hm'>
                        <div className='sidebar'>
                            <SideBar />
                        </div>
                        <div class="admin-ui-table">
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
                                data={data}
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
                render == true && data.length == 0 && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        No Data Found!
                    </div>
                </>
            }
            {
                render == false && <>
                    <div style={{ width: "98%", backgroundColor: 'white', borderRadius: '10px', height: '200px' }}>
                        API error
                    </div>
                </>
            }
        </div>
    );

};

export default AdminHomePage;
