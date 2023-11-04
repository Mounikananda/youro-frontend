import React, { useState, useEffect } from "react";
import { COOKIE_KEYS, USER_TYPES } from "../App";
import Cookies from "js-cookie";
import "../styles/Youro-header.css";
import { Navigate, useNavigate } from 'react-router-dom';


const Youroheader = (props) => {

  const userId = Cookies.get(COOKIE_KEYS.userId);
  const userName = Cookies.get(COOKIE_KEYS.userName);
  const userType = Cookies.get(COOKIE_KEYS.userType);
  const [navTo, setNav] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  // }, []);
  const changeView = () => {
    console.log(userId +  " : " + userName + " :: " + userType);
    if(userType == USER_TYPES.doctor){
      navigate('/doctor-profile');
    }
    if(userType == USER_TYPES.user){
      console.log(props);
      props.setView(4);
    }
  }
  return (
    <div className='youro-header'>
      <div className='header'>
        <h1>youro</h1>
      </div>
      <div className='user-name'>
        <img src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9' className="profile-pic" alt="Preview" width="20" height="20" />
        <h4 className='profle-bubtton-h4'>
          <button className="options-button-1" onClick={changeView}>{userName}</button>
        </h4>
      </div>
    </div>
  );
}

export default Youroheader;
