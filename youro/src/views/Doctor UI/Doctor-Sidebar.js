import { React, useState, useEffect, useRef } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Hamburger from "hamburger-react";
import "../../styles/Patient-ui/Patient-home.css";
import {
  FaHome,
  FaCalendar,
  FaFacebookMessenger,
  FaPrescription,
  FaPowerOff,
  FaHamburger,
} from "react-icons/fa";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import NotificationSound from "../../assets/notification-sound.mp3";
import { useChatContext } from "../../context/ChatContext";

function DoctorSideBar(props) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const audioPlayer = useRef(null);
  const { stompObject } = useChatContext();

  const { totalMsgCount, setSelectedChat, setStompObject } = useChatContext();

  const handleLogout = () => {
    // Display a loading indicator or a message if needed
    // For example, you can set a loading state variable.

    // Wait for 5 seconds before removing cookies
    // setTimeout(() => {
    // toast.success("loging out");
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    if (stompObject) {
      stompObject.disconnect(function () {
        console.log("Disconnected from WebSocket.");
      });
      setStompObject(null);
    }
    navigate("/");
  };

  const handleMenuClick = (navigationUrl, remvoeSelectedChat = true) => {
    if (remvoeSelectedChat) setSelectedChat(null);
    navigate(navigationUrl);
  };

  function playAudio() {
    audioPlayer?.current?.play();
  }

  const [show, setShow] = useState(false);

  // Define functions for handling mouse events
  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  const location = useLocation();

  return (
    <div>
      <div className="Tab-section">
        <Sidebar
          backgroundColor="#9CB189"
          className="Side-bar"
          collapsed={collapse}
        >
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                if (active === true)
                  return {
                    backgroundColor: active ? "#808080" : undefined,
                  };
              },
            }}
          >
            <div className="Hamburger">
              {/* <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> */}
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => setCollapse(!collapse)}
              >
                menu
              </span>
              {/* <span class="material-symbols-outlined" style={{fontSize: '40px', cursor: 'pointer'}} onClick={() => setCollapse(!collapse)}></span> */}
            </div>
            <Tooltip
              title={<p style={{ margin: "2px", fontSize: "12px" }}>Home</p>}
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={() => handleMenuClick("/doctor-home")}
                icon={<FaHome size={40} />}
                active={props.data === "doctor-home"}
                className="Menu-item"
              >
                Home
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={
                <p style={{ margin: "2px", fontSize: "12px" }}>Appointments</p>
              }
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={() => handleMenuClick("/doctor-appointment")}
                icon={<FaCalendar size={40} />}
                active={props.data === "doctor-appointment"}
                className="Menu-item"
              >
                {" "}
                Appointments
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={<p style={{ margin: "2px", fontSize: "12px" }}>Chat</p>}
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={() => handleMenuClick("/doctor-chat", false)}
                icon={
                  <>
                    <img
                      style={{ position: "absolute" }}
                      src={require("../../assets/Messaging_icon.png")}
                      height="32px"
                      alt="home_icon"
                    />
                    {totalMsgCount > 0 && (
                      <p
                        style={{
                          fontSize: "10px",
                          padding: "3px 6px",
                          position: "absolute",
                          top: "-9px",
                          right: "15px",
                          lineHeight: "normal",
                        }}
                        className="mssg-count-ui"
                      >
                        {totalMsgCount}
                      </p>
                    )}
                  </>
                }
                active={props.data === "doctor-chat"}
                className="Menu-item"
              >
                Chat
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={
                <p style={{ margin: "2px", fontSize: "12px" }}>
                  Patient Details
                </p>
              }
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={() => handleMenuClick("/doctor-view-profile")}
                icon={<FaEdit size={40} />}
                active={props.data === "doctor-view-profile"}
                className="Menu-item"
              >
                {" "}
                Patient Details
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={<p style={{ margin: "2px", fontSize: "12px" }}>Profile</p>}
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={() => handleMenuClick("/doctor-profile")}
                icon={
                  <img
                    src={require("../../assets/Profile_icon.png")}
                    height="40px"
                    alt="home_icon"
                  />
                }
                active={props.data === "doctor-profile"}
                className="Menu-item"
              >
                {" "}
                Profile
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={<p style={{ margin: "2px", fontSize: "12px" }}>Logout</p>}
              placement="right-start"
              enterDelay={100}
              leaveDelay={100}
              followCursor
              TransitionComponent={Zoom}
              disableFocusListener
              disableTouchListener
            >
              <MenuItem
                onClick={handleLogout}
                className="Menu-item"
                icon={<FaSignOutAlt size={40} color="white" />}
              >
                Logout
              </MenuItem>
            </Tooltip>
          </Menu>
        </Sidebar>
      </div>
      <audio ref={audioPlayer} muted="muted" src={NotificationSound} />
    </div>
  );
}

export default DoctorSideBar;
