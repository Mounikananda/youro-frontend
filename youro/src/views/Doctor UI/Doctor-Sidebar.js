import {React, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import Signupoptions from '../Signupoptions';
import { FaStickyNote } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function DoctorSideBar(props)
{
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  
  return (
  <div>
  <div className='Tab-section'>
    <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
     
     <Menu menuItemStyles={{
      button: ({active}) => {
        if (active==true)
          return {
            backgroundColor: active ? '#808080' : undefined,
          };
        
      },
    }}
  >
     <div className='Hamburger'>
      <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> 
      {/* <span class="material-symbols-outlined" style={{fontSize: '40px', cursor: 'pointer'}} onClick={() => setCollapse(!collapse)}></span> */}
      </div>
    <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaHome size={40}/>} active={props.data=='doctor-ui'} className="Menu-item" >Home</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-appointment")} icon={<FaCalendar size={40} />} active={props.data=='doctor-appointment'} className="Menu-item" > Appointments</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-chat")} icon={<img src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon'/>} active={props.data=='doctor-chat'}  className="Menu-item" >Chat</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-view-profile")} icon={<FaEdit size={40}/>}  active={props.data=='doctor-view-profile'}  className="Menu-item" > Patient Details</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-profile")} icon={<img src={require('../../assets/Profile_icon.png')} height='40px' alt='home_icon'/>} active={props.data=='doctor-profile'} className="Menu-item" > Profile</MenuItem>  
    </Menu>
    </Sidebar>
  </div>
      
  </div>
  );
}

export default DoctorSideBar;