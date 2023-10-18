import { React, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Admin-ui/Admin-SideBar.css";
import { FaHome, FaHospitalUser, FaUsers, FaBan, FaNotesMedical, FaPowerOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function AdminSideBar(props) {
    const [collapse, setCollapse] = useState(true);
    const navigate = useNavigate();
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
                        <MenuItem onClick={() => navigate("/admin-doctors")} icon={<FaHospitalUser size={40} />} active={props.data === 'admin-doctors'} className="Menu-item" >Home</MenuItem>
                        <MenuItem onClick={() => navigate("/admin-patients")} icon={<FaUsers size={40} />} active={props.data === 'admin-patients'} className="Menu-item" > Patients</MenuItem>
                        <MenuItem onClick={() => navigate("/admin-denied-doctors")} icon={<FaBan size={40} />} active={props.data === 'admin-denied-doctors'} className="Menu-item" >Chat</MenuItem>
                        <MenuItem onClick={() => navigate("/manage-approved-medicine")} icon={<FaNotesMedical size={40} />} active={props.data === 'manage-approved-medicine'} className="Menu-item" > Section-1</MenuItem>
                        <MenuItem onClick={() => navigate("/admin-profile")} icon={<FaPowerOff size={40} />} active={props.data === 'admin-profile'} className="Menu-item" > Profile</MenuItem>
                    </Menu>
                </Sidebar>
            </div>

        </div>
    );
}

export default AdminSideBar;