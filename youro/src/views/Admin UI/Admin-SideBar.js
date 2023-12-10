
import { React, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Admin-ui/Admin-SideBar.css";
import { FaHome, FaHospitalUser, FaUsers, FaBan, FaNotesMedical, FaPowerOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import { FaSignOutAlt } from 'react-icons/fa';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
function AdminSideBar(props) {
    const [collapse, setCollapse] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Display a loading indicator or a message if needed
        // For example, you can set a loading state variable.
        Cookies.remove(COOKIE_KEYS.userId);
        Cookies.remove(COOKIE_KEYS.token);
        Cookies.remove(COOKIE_KEYS.userType);
        navigate('/');
    };


    return (
        <div className='admin-sidebar'>
            <div className='Tab-section'>
                <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>

                    <Menu menuItemStyles={{
                        button: ({ active }) => {
                            // only apply styles on first level elements of the tree
                            if (active == true)
                                return {
                                    backgroundColor: active ? '#808080' : undefined,
                                };

                        },
                    }}>
                        <div className='Hamburger'>
                            <Hamburger toggled={collapse} toggle={setCollapse} size={40} />
                        </div>
                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Home</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={() => navigate("/admin-doctors")} icon={<FaHospitalUser size={40} />} active={props.data === 'admin-doctors'} className="Menu-item" >Home</MenuItem>
                        </Tooltip>
                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Patients</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={() => navigate("/admin-patients")} icon={<FaUsers size={40} />} active={props.data === 'admin-patients'} className="Menu-item" > Patients</MenuItem>
                        </Tooltip>

                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Chat</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={() => navigate("/admin-denied-doctors")} icon={<FaBan size={40} />} active={props.data === 'admin-denied-doctors'} className="Menu-item" >Chat</MenuItem>
                        </Tooltip>

                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Manage-Prescriptions</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={() => navigate("/manage-approved-medicine")} icon={<FaNotesMedical size={40} />} active={props.data === 'manage-approved-medicine'} className="Menu-item" > Manage-Prescriptions</MenuItem>
                        </Tooltip>

                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Assist</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={() => navigate("/admin-assistants")} icon={<FaHospitalUser size={40} />} active={props.data === 'admin-assistants'} className="Menu-item" >Assist</MenuItem>
                        </Tooltip>

                        <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Logout</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
                            <MenuItem onClick={handleLogout} className="Menu-item" icon={<FaSignOutAlt size={40} color='white' />} >Logout</MenuItem>
                        </Tooltip>

                        {/* <MenuItem onClick={() => navigate("/admin-profile")} icon={<FaPowerOff size={40} />} active={props.data === 'admin-profile'} className="Menu-item" > Profile</MenuItem> */}
                    </Menu>
                </Sidebar>
            </div>

        </div>
    );
}

export default AdminSideBar;

