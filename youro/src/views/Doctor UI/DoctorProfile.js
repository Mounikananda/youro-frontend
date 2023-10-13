import {React,useState} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import "../../styles/Doctor-ui/Doctor-Profile.css";
import { FaPen } from "react-icons/fa";
import DoctorSideBar from './Doctor-Sidebar';
// import SideBar from '../Patient UI/SideBar';


const DoctorProfile=()=>
{
 
   return (
      <div className='d-profile'>
       <div className='profile-side-bar'>
         <DoctorSideBar data={'doctor-profile'}/>
      </div>
      <div className="d-container">
        <div className='profile-column'>
        <h1>youro</h1>
        <div className='profile-details'>
          <div className='my-profile'>
            <h1>My Profile</h1>
            <div className='pic1'>
              <div>
               <img  src={'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'} alt="My Image" width="200" height="150" />
              </div>
              <div className='edit-info'>  
               <FaPen style={{ border:"1px solid black"}}/>
               <h4>Edit Profile</h4>
             </div> 
           </div>
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
            <input  className='password-input' type='text'></input>
            </div> 
          </div>
        </div>
        </div> 
        </div>
     </div>
   );
}

export default DoctorProfile;
