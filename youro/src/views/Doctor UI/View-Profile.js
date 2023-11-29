import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import "../../styles/Doctor-ui/View-Profile.css";
import DoctorSideBar from "./Doctor-Sidebar";
import SearchBar from "./Searchbar";
import Youroheader from "../Youro-header";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../App";
import AdminSideBar from "../Admin UI/Admin-SideBar";




const ViewProfile = () => {
  const [authContext, setAuthContext] = useState(''); // default zero. After login if ADMIN -> set('ADMIN') else if 'ASSITANT' -> set('ASSITANT')

  useEffect(() => {
    Cookies.get(COOKIE_KEYS.userType) == 'ADMIN' ? setAuthContext('ADMIN') : (Cookies.get(COOKIE_KEYS.userType) == 'ASSITANT' ? setAuthContext('ASSITANT') : setAuthContext(''));
  }, []);


  return (
    <div className="d-view-profile">
      <div className="view-side-bar">
        { authContext == '' && <DoctorSideBar data={'doctor-view-profile'} />}
        { (authContext == 'ADMIN' || authContext == 'ASSITANT') && <AdminSideBar data={'admin-patients'} /> }
      </div>
      <div></div>
      <div className="d-components">
        <Youroheader />
        <div className="search-bar-profile">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;