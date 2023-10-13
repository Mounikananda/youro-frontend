import {React,useState} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import "../../styles/Doctor-ui/Doctor-Profile.css";
// import SideBar from '../Patient UI/SideBar';


const DoctorProfile=()=>
{
 

   function DoctorSideBar()
  {
   const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();

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
      <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> 
      </div>
    <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaHome size={40}/>}  className="Menu-item" >Home</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaCalendar size={40} />} className="Menu-item" > Appointments</MenuItem>
    <MenuItem onClick={() => navigate("/doctor--ui")} icon={<FaFacebookMessenger size={40} />} className="Menu-item" >Chat</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaPrescription size={40}/>} className="Menu-item" > Section-1</MenuItem>
    <MenuItem onClick={() => navigate("/doctor-profile")} icon={<FaPowerOff size={40}/>} active={true} className="Menu-item" > Profile</MenuItem>  
    </Menu>
    </Sidebar>
  </div>
      
  </div>
  );
}

   return (
      <div className='d-profile'>
       <div className='profile-side-bar'>
         <DoctorSideBar/>
      </div>
      <div className="d-container">
        <div className='profile-column'>
        <h1>youro</h1>
        <div className='profile-details'>
          <div className='my-profile'>
            <h2>My Profile</h2>
            <div className='pic'></div>
          </div>
            <div className='edit-info'>  
            <h3>Edit Info</h3>
            </div> 
          <div className='p-col'> 
            {/* <div className='p-fields'>  
            <h3>Edit Info</h3>
            </div> */}
            <div className='p-fields'>
            <label>First Name(Legal first name)</label>
            <input className='input-field' disabled type='text'></input>
            </div>
            <div className='p-fields'>
            <label>Last Name</label>
            <input className='input-field' type='text'></input>
           </div>
          </div>
          <div className='p-col'>
            <div className='p-fields'>
            <label>Email</label>
            <input className='input-field' type='text'></input>
            </div> 
            <div className='p-fields'>
            <label>License Number</label>
            <input className='input-field' type='text'></input>
            </div>
          </div>
          <div className='p-col'>
           <div className='p-fields'>
            <label>Address</label>
            <input className='input-field' type='text'></input>
            </div>
            <div className='p-fields'>
            <label>City </label>
            <input className='input-field'  type='text'></input>
            </div> 
          </div>
          <div className='p-col'>
           <div className='p-fields'>
           <label>State</label>
           <input className='input-field' type='text'></input>
           </div>
           <div className='p-fields'>
            <label>Pincode</label>
            <input className='input-field' type='text'></input>
          </div>
          </div>
          <div className='p-col'>
            <div className='p-fields'>
            <label>Date of Birth</label>
            <input className='input-field' type='text'></input>
            </div>
          </div>
            <div className='p-col'>
            <div className='p-fields'>
           <label>Your Password</label>
            <input className='input-field' type='text'></input>
            </div> 
          </div>
        </div>
        </div> 
        </div>
     </div>
   );
}

export default DoctorProfile;
