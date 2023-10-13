import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import "../../styles/Doctor-ui/View-Profile.css";
import DoctorSideBar from "./Doctor-Sidebar";
import SearchBar from "./Searchbar";




const ViewProfile=()=>
{
  return (
     <div className="d-view-profile">
       <div className="view-side-bar">
       <DoctorSideBar data={'doctor-view-profile'}/>
       </div>
       <div></div>
       <div className="d-components">
         <h1>youro</h1>
         <div className="search-bar-profile">
          <SearchBar/>
        </div> 
       </div>
     </div>
   );
}

export default ViewProfile;