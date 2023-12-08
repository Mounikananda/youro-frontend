import {React, useState,useEffect, useRef} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate, useLocation  } from 'react-router-dom';
import Signupoptions from '../Signupoptions';
import { FaStickyNote } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import NotificationSound from "../../assets/notification-sound.mp3";

function DoctorSideBar(props)
{
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const audioPlayer = useRef(null);
 
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
    if(path == '/doctor-chat'){
      localStorage.removeItem('mssgCount')
    }
    if(localStorage.getItem('mssgCount') == undefined ||parseInt(localStorage.getItem('mssgCount')) < 0){
      getChatHistory()
    } else {
      setTotalMssgCount(parseInt(localStorage.getItem('mssgCount')))
    }
    setInterval(() => getChatHistory(false), 60000);
  }, [])

  function playAudio() {
    audioPlayer?.current?.play();
}



  const [mssgCount, setTotalMssgCount] = useState(0);
  const location = useLocation()

  const getChatHistory = async(reload = true) => {
    const path = location.pathname
    if(path != '/doctor-chat'){
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
      localStorage.setItem("mssgCount", -1);
      setTotalMssgCount(-1)
    }
    
}
  
  return (
  <div>
  <div className='Tab-section'>
    <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
     
     <Menu menuItemStyles={{
      button: ({active}) => {
        if (active===true)
          return {
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
      {/* <span class="material-symbols-outlined" style={{fontSize: '40px', cursor: 'pointer'}} onClick={() => setCollapse(!collapse)}></span> */}
      </div>
    <MenuItem onClick={() => navigate("/doctor-home")} icon={<FaHome size={40}/>} active={props.data==='doctor-ui'} className="Menu-item" >Home</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-appointment")} icon={<FaCalendar size={40} />} active={props.data==='doctor-appointment'} className="Menu-item" > Appointments</MenuItem>

    <MenuItem onClick={() => navigate("/doctor-chat")} icon={<><img style={{position: 'absolute'}} src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon'/>{
    ((props.mssgCount && props.mssgCount != 0) || mssgCount > 0) && 
    <p style={{fontSize: '10px', padding: '3px 6px', position: 'absolute', top: '-9px', right: '15px', lineHeight: 'normal'}}className="mssg-count-ui">{props.mssgCount ? props.mssgCount : (mssgCount > 0 && mssgCount)}</p>}</>
    } active={props.data==='doctor-chat'}  className="Menu-item" >Chat</MenuItem>

    <MenuItem onClick={() => navigate("/doctor-view-profile")} icon={<FaEdit size={40}/>}  active={props.data==='doctor-view-profile'}  className="Menu-item" > Patient Details</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-profile")} icon={<img src={require('../../assets/Profile_icon.png')} height='40px' alt='home_icon'/>} active={props.data==='doctor-profile'} className="Menu-item" > Profile</MenuItem> 
    <MenuItem onClick={handleLogout} className="Menu-item" icon={<FaSignOutAlt size={40} color='white'/>} >Logout</MenuItem>
    </Menu>
    </Sidebar>
  </div>
  <audio ref={audioPlayer} muted="muted" src={NotificationSound} />
      
  </div>
  );
}

export default DoctorSideBar;