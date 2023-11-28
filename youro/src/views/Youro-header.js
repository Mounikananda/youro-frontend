import React, { useState, useEffect } from "react";
import { COOKIE_KEYS, USER_TYPES, API_DETAILS} from "../App";
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/Youro-header.css";
import { Navigate, useNavigate } from 'react-router-dom';
// import { API_DETAILS} from '../App';
import { FaBell } from 'react-icons/fa';
const Youroheader = (props) => {

  const userId = Cookies.get(COOKIE_KEYS.userId);
  const userName = Cookies.get(COOKIE_KEYS.userName);
  const userType = Cookies.get(COOKIE_KEYS.userType);
  const [navTo, setNav] = useState('');
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  // const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };
 
  const fetchNotifications = async () => {

    console.log("fetching notifications")
    const userId = Cookies.get(COOKIE_KEYS.userId);
    const apiUrl = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension+`/getNotifications/${userId}`;

    try {
      const response = await axios.get(apiUrl);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const closeNotification = async (notId) => {

    const apiUrl = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension+`/deleteNotifications/${notId}`;
    try {
      await axios.delete(apiUrl);
      fetchNotifications();
    } catch (error) {
      console.error('Error clearing notification:', error.message);
    }
  };

  const clearAllNotifications = async (notId) => 
  {
    const user_id = Cookies.get(COOKIE_KEYS.userId);
     const apiUrl = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension+`/deleteNotifications/${user_id}`;
    try {
      // Hit the API to clear the specific notification
      await axios.delete(apiUrl);
      // Refresh notifications after clearing
      fetchNotifications();
    } catch (error) {
      console.error('Error clearing notification:', error.message);
    }

   }


  const get_profile_pic = async () => {
    const user_id = Cookies.get(COOKIE_KEYS.userId);
    console.log("came to profile pic method");
    const get_url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDp/${user_id}`;
  
  
    // try {
    //   const res = await axios.get(get_url);
    //   console.log("getting get_api pic ");
    //   console.log(res.data);
    //   // const imageURL = res.data.imageURL;
    //   // setImagePreview('data:image/jpeg;base64,' + res.data.eventFlyer);
    //   // const arrayBufferView = new Uint8Array(res.data);
    //   setImagePreview('data:image/jpeg;base64,' + res.data);
    //   // const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
    //   // const dataUrl = URL.createObjectURL(blob);
    //   // console.log(res.data);
    //   // setImagePreview(dataUrl);
    //   // usrData = res.data;
    // }
    // catch (err) {
    //   console.log("getting get_api error pic ");
    //   console.error(err);
    // }
    const config = {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': '*',
      //   'Content-Type': 'application/json',
      //   'responseType': 'arraybuffer'
      // }
    };
    try {
      const response = await axios.get(get_url,{ responseType: 'arraybuffer' });

      if (response.status === 200) {
        console.log("came ",response);
        const arrayBuffer = new Uint8Array(response.data);
        if(arrayBuffer.length!=0)
       {
        const base64Image = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setImagePreview(`data:image/jpeg;base64,${base64Image}`);
       }
      }
    }

    catch (err) {
      console.log("getting get_api error pic ");
      console.error(err);
    }
  }
  

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

//   const YouroNotificationPopup = ({ notifications, onClose }) => {
//   return (
//     <div className="notification-popup">
//       <div className="popup-header">
//         <h3>Notifications</h3>
//         <button onClick={onClose}>Close</button>
//       </div>
//       <div className="popup-content">
//         {/* Render the list of notifications */}
//         {/* {notifications.map((notification) => (
//           <div key={notification.notId} className="notification-item">
//             {notification.message}
//           </div>
//         ))} */}
//         {notifications.map((notification) => (
//          <div key={notification.notId} className="notification-item">
//           {/* ... */}
//           {/* Close button for each notification */}
//            {notification.message}
//           <button style={{ borderRadius: '50%', marginLeft: '10px' }} onClick={() => clearNotification(notification.notId)}>
//            X
//           </button>
//          </div>
//          ))}
//       </div>
//     </div>
//   );
// };

const YouroNotificationPopup = ({ notifications, onClear, onClose}) => {
  return (
    <div>
      <div className="notif-popup-header">
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <button className="clear-all-button" onClick={() => onClear()}>
            Clear All
          </button>
        )}
      </div>
      <div className="notif-popup-content">
        {notifications.length === 0 ? (
          <div>No new notifications</div>
        ) : (
          <div className="notifications-list">
            {/* Render the list of notifications */}
            {notifications.map((notification) => (
              <div key={notification.notId} className="notification-item">
               <div className="notification-message" >{notification.message}</div>
                {/* Close button for each notification */}
                <button style={{ borderRadius: '10%' }} onClick={() => onClose(notification.notId)}>
                  close
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

  useEffect(() => {
    get_profile_pic();
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='youro-header'>
      <div className='header'>
        <h1>youro</h1>
      </div>
      <div className='user-name'>
       <img src={props.imagePreview ? props.imagePreview : (imagePreview ? imagePreview : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9')} className="profile-pic" alt="Preview" width="20" height="20" />
        <h4 className='profle-bubtton-h4'>
          <div className="userprofile-button" onClick={changeView}>{userName}</div>
        </h4>
       <div className="notification-icon-container">
       <div className="notification-icon" onClick={toggleNotificationPopup} style={{ marginLeft: '10px' }}>
        {/* <FaBell size={20} /> */}
        <FaBell size={20} />
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
      </div>
      </div>
      </div>

      {showNotificationPopup && (
       <div className="notification-popup-overlay" onClick={toggleNotificationPopup}>
         <div className="notification-popup" onClick={(e) => e.stopPropagation()}>
        {/* Your notification content goes here */}
        <YouroNotificationPopup
          notifications={notifications}
          onClear={clearAllNotifications}
          onClose={closeNotification}
        />
       </div>
       </div>
      )} 
    </div>
  );
}

export default Youroheader;
