import {React, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import Signupoptions from '../Signupoptions';

function SideBar()
{
   const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapse(!collapse);
  };

  return (
  <div>
  <div className='Tab-section'>
    <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
     
     <Menu menuItemStyles={{
      button: ({ level, active, disabled,}) => {
        // only apply styles on first level elements of the tree
        if (active==true)
          return {
            // color: disabled ? '#f5d9ff' : '#d359ff',
            backgroundColor: active ? '#808080' : undefined,
          };
        
      },
    }}
  >
     <div className='Hamburger'>
      <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> 
      </div>
    <MenuItem onClick={() => navigate("/patient-ui")} icon={<FaHome size={40}/>} active={true} className="Menu-item" >Home</MenuItem>
    <MenuItem onClick={() => navigate("/patient-ui")} icon={<FaCalendar size={40} />} className="Menu-item" > Appointments</MenuItem>
    <MenuItem onClick={() => navigate("/patient-ui")} icon={<FaFacebookMessenger size={40} />} className="Menu-item" >Chat</MenuItem>
    <MenuItem onClick={() => navigate("/patient-ui")} icon={<FaPrescription size={40}/>} className="Menu-item" > Section-1</MenuItem>
    <MenuItem onClick={() => navigate("/patient-ui")} icon={<FaPowerOff size={40}/>} className="Menu-item" > Profile</MenuItem>  
    </Menu>
    </Sidebar>
  </div>
      
  </div>
  );
}

export default SideBar;