import {React, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import "../../styles/Patient-ui/Patient-home.css";
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import "../../styles/Patient-ui/Patient-Homepage.css";
import SideBar from './SideBar';
import PatientSymptomChart from './Patient-symptom-chart';


const PatientHomePage =()=>
{
   return (
     <div className='hm'>
       <SideBar/>
       <div className='care-plan'>
        <h1>youro</h1>
        <div className='all-details'>
        <div className='care-plan-details'>
          <h3>Your care plan Comes Hereeeeee</h3>
          <h3>All the api data</h3> 
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
           <h3>Your care plan</h3>
          <h3>All the api data</h3> 
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
          <h3>Your care plan</h3>
          <h3>All the api data</h3>
           <h3>Your care plan</h3>
          <h3>All the api data</h3> 
          <h3>Your care plan</h3>
        </div>
             <div className='column-data'>
               <PatientSymptomChart/>
               <div className='row-data'>
                 <div className='care-plan-details-1'>
                     <h3>Your care plan comes hereeee</h3>
                     <h3>All the api data</h3> 
                     <h3>Your care plan</h3>
                     <h3>All the api data</h3>
                     <h3>Your care plan</h3>
                    <h3>All the api data</h3>
                    <h3>Your care plan</h3>
                    <h3>All the api data</h3> 
                  </div>
                  <div className= 'care-plan-details-1'>
                     <h3>Your care plan comes hereeee</h3>
                     <h3>All the api data</h3> 
                     <h3>Your care plan</h3>
                     <h3>All the api data</h3>
                     <h3>Your care plan</h3>
                    <h3>All the api data</h3>
                    <h3>Your care plan</h3>
                    <h3>All the api data</h3> 
               </div>
             </div>
        </div> 
        </div>  
       </div>
      </div>
  );
  
}

export default PatientHomePage;

