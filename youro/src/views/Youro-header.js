import {React} from 'react';
import { COOKIE_KEYS } from "../App";
import Cookies from "js-cookie";
import "../styles/Youro-header.css";


const Youroheader = () =>
 {
  
  const userid = Cookies.get(COOKIE_KEYS.userId);
  const username= Cookies.get(COOKIE_KEYS.userName);

  return (
    <div className='youro-header'>
      <div className='header'>
        <h1>youro</h1>
      </div>
       <div className='user-name'>
        <h4>{username}</h4>
       </div>
      </div>
  );
}

export default Youroheader;
