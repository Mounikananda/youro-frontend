

import { React, useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Signupoptions from '../Signupoptions';
import Cookies from "js-cookie";
import { FaSignOutAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import axios from 'axios';

function SideBar(props) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();

  // const toggleSidebar = () => {
  //   setCollapse(!collapse);
  // };

  const handleLogout = () => {
    // Display a loading indicator or a message if needed
    // For example, you can set a loading state variable.


    // Wait for 5 seconds before removing cookies
    // setTimeout(() => {
    // toast.success("loging out");
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    navigate('/');
    // removeCookies();
    // }, 5000);


    // 5000 milliseconds = 5 seconds
  };

  useEffect(() => {
    window.onbeforeunload = function() {
      localStorage.removeItem('mssgCount')
    };
    const path = location.pathname
    if(props.active == 2){
      localStorage.removeItem('mssgCount')
    }
    if(props.active != 2 && localStorage.getItem('mssgCount') == undefined ||parseInt(localStorage.getItem('mssgCount')) < 0){
      getChatHistory()
    } else {
      setTotalMssgCount(parseInt(localStorage.getItem('mssgCount')))
    }
    setInterval(() => getChatHistory(false), 60000);
  }, [props.active])




  const [mssgCount, setTotalMssgCount] = useState(0);
  const location = useLocation()

  const getChatHistory = async(reload = true) => {
    const path = location.pathname
    if(props.active != 2){
      const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChatHistory/${Cookies.get(COOKIE_KEYS.userId)}`;

      try {           
          const res = await axios.get(url);
          const response = res.data
          var total = 0
          for(var i = 0; i<response.length; i++){
              total += response[i].count
          }
          if(total > parseInt(localStorage.getItem("mssgCount"))){
            // playAudio();
          }
          localStorage.setItem("mssgCount", total);
          setTotalMssgCount(total)
      }
      catch (err) {
          console.error(err);
      }
    }else{
      // alert('Hi')
      localStorage.setItem("mssgCount", -1);
      setTotalMssgCount(-1)
    }
    
}

  return (
    <div>
      <div className='Tab-section'>
        <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>

          <Menu menuItemStyles={{
            button: ({ active }) => {
              // only apply styles on first level elements of the tree
              if (active == true)
                return {
                  // color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#808080' : undefined,
                };

            },
          }}
          >
            <div className='Hamburger'>
              {/* <Hamburger toggled={collapse} toggle={setCollapse} size={40} />  */}
              <span class="material-symbols-outlined" style={{ fontSize: '40px', cursor: 'pointer' }} onClick={() => setCollapse(!collapse)}>
                menu
              </span>
            </div>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Home</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              <MenuItem onClick={() => props.setActive(0)} icon={<img src={require('../../assets/Homepage_icon.png')} height='40px' alt='home_icon' />} active={props.active === 0} className="Menu-item" >Home</MenuItem>
            </Tooltip>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Appointments</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              <MenuItem onClick={() => props.setActive(1)} icon={<img src={require('../../assets/Schedule_icon.png')} height='45px' alt='home_icon' />} active={props.active === 1} className="Menu-item" > Appointments</MenuItem>
            </Tooltip>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Chat</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              {/* <MenuItem onClick={() => props.setActive(2)} icon={<img src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon' />} active={props.active === 2} className="Menu-item" >Chat</MenuItem> */}
              <MenuItem onClick={() => props.setActive(2)} icon={<><img style={{position: 'absolute'}} src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon'/>{
    ((props.count && props.count > 0) || mssgCount > 0) && 
    <p style={{fontSize: '10px', padding: '3px 6px', position: 'absolute', top: '-9px', right: '15px', lineHeight: 'normal'}}className="mssg-count-ui">{(props.count && props.count > 0) ? props.count : (mssgCount > 0 && mssgCount)}</p>}</>
    } active={props.active === 2} className="Menu-item" >Chat</MenuItem>
            </Tooltip>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Educate yourself</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              <MenuItem onClick={() => props.setActive(3)} icon={<img src={require('../../assets/Educate_icon.png')} height='35px' alt='home_icon' />} active={props.active === 3} className="Menu-item" > Educate yourself</MenuItem>
            </Tooltip>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Profile</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              <MenuItem onClick={() => props.setActive(4)} icon={<img src={require('../../assets/Profile_icon.png')} height='40px' alt='home_icon' />} active={props.active === 4} className="Menu-item" > Profile</MenuItem>
            </Tooltip>
            <Tooltip title={<p style={{ margin: "2px", fontSize: "12px" }}>Logout</p>} placement="right-start" enterDelay={100} leaveDelay={100} followCursor TransitionComponent={Zoom} disableFocusListener disableTouchListener>
              <MenuItem onClick={handleLogout} className="Menu-item" icon={<FaSignOutAlt size={40} color='white' />} >Logout</MenuItem>
            </Tooltip>
          </Menu>
        </Sidebar>
      </div>

    </div>
  );
}

export default SideBar;

