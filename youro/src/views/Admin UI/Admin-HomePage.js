import axios from 'axios';
import React, { useState, useMemo,  useCallback } from "react";
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
    Tooltip,
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
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
    },
];

const AdminHomePage = () => {
    const [render, canRender] = useState(false);
    const url = `http://localhost:9092/youro/api/v1/symptomScore/`;
    axios.get(url).then((res) => {
        console.log("got symptom score :: " + JSON.stringify(res.data));
        data = res.data;
        canRender(true);
    }).catch((err) => {
        canRender(true);
        console.error(err?.response?.data.errorMessage)
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
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
        ],
        [],
    );

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
                                columns={columns}
                                data={data}
                                enableColumnOrdering
                                renderDetailPanel={({ row }) => (
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            margin: 'auto',
                                            gridTemplateColumns: '1fr 1fr',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography>Address: {row.original.address}</Typography>
                                        <Typography>City: {row.original.city}</Typography>
                                        <Typography>State: {row.original.state}</Typography>
                                        <Typography>Country: {row.original.country}</Typography>
                                    </Box>
                                )}
                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="left" title="Edit">
                                            <IconButton onClick={() => table.setEditingRow(row)}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="right" title="Delete">
                                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
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
