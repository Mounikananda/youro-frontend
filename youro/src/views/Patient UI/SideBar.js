import {React, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import Signupoptions from '../Signupoptions';

function SideBar(props)
{
   const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();

  // const toggleSidebar = () => {
  //   setCollapse(!collapse);
  // };

  return (
  <div>
  <div className='Tab-section'>
    <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
     
     <Menu menuItemStyles={{
      button: ({active}) => {
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
      {/* <Hamburger toggled={collapse} toggle={setCollapse} size={40} />  */}
      <span class="material-symbols-outlined" style={{fontSize: '40px', cursor: 'pointer'}} onClick={() => setCollapse(!collapse)}>
        menu
        </span>
      </div>
    <MenuItem onClick={() => props.setActive(0)} icon={<img src={require('../../assets/Homepage_icon.png')} height='40px' alt='home_icon'/>} active={props.active === 0} className="Menu-item" >Home</MenuItem>
    <MenuItem onClick={() => props.setActive(1)} icon={<img src={require('../../assets/Schedule_icon.png')} height='45px' alt='home_icon'/>} active={props.active === 1} className="Menu-item" > Appointments</MenuItem>
    <MenuItem onClick={() => props.setActive(2)} icon={<img src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon'/>}active={props.active === 2} className="Menu-item" >Chat</MenuItem>
    <MenuItem onClick={() => props.setActive(3)} icon={<img src={require('../../assets/Educate_icon.png')} height='35px' alt='home_icon'/>}active={props.active === 3} className="Menu-item" > Educate yourself</MenuItem>
    <MenuItem onClick={() => props.setActive(4)} icon={<img src={require('../../assets/Profile_icon.png')} height='40px' alt='home_icon'/>} active={props.active === 4} className="Menu-item" > Profile</MenuItem>  
    </Menu>
    </Sidebar>
  </div>
      
  </div>
  );
}

export default SideBar;