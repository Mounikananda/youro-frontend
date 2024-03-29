import { React, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../styles/Patient-ui/Patient-home.css";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSignOutAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { COOKIE_KEYS } from "../../App";
import { useChatContext } from "../../context/ChatContext";

function SideBar(props) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const { stompObject, setStompObject, setIsLoggedIn, totalMsgCount } =
    useChatContext();

  const handleLogout = () => {
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    if (stompObject) {
      stompObject.disconnect(function () {
        console.log("Disconnected from WebSocket.");
      });
      setStompObject(null);
      setIsLoggedIn(false);
    }
    navigate("/");
  };

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
                // only apply styles on first level elements of the tree
                if (active == true)
                  return {
                    // color: disabled ? '#f5d9ff' : '#d359ff',
                    backgroundColor: active ? "#808080" : undefined,
                  };
              },
            }}
          >
            <div className="Hamburger">
              {/* <Hamburger toggled={collapse} toggle={setCollapse} size={40} />  */}
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={() => setCollapse(!collapse)}
              >
                menu
              </span>
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
                onClick={() => props.setActive(0)}
                icon={
                  <img
                    src={require("../../assets/Homepage_icon.png")}
                    height="40px"
                    alt="home_icon"
                  />
                }
                active={props.active === 0}
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
                onClick={() => props.setActive(1)}
                icon={
                  <img
                    src={require("../../assets/Schedule_icon.png")}
                    height="45px"
                    alt="home_icon"
                  />
                }
                active={props.active === 1}
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
              {/* <MenuItem onClick={() => props.setActive(2)} icon={<img src={require('../../assets/Messaging_icon.png')} height='32px' alt='home_icon' />} active={props.active === 2} className="Menu-item" >Chat</MenuItem> */}
              <MenuItem
                onClick={() => props.setActive(2)}
                icon={
                  <>
                    <img
                      style={{ position: "absolute" }}
                      src={require("../../assets/Messaging_icon.png")}
                      height="32px"
                      alt="home_icon"
                    />
                    {props.count > 0 && (
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
                        {props.count}
                      </p>
                    )}
                  </>
                }
                active={props.active === 2}
                className="Menu-item"
              >
                Chat
              </MenuItem>
            </Tooltip>
            <Tooltip
              title={
                <p style={{ margin: "2px", fontSize: "12px" }}>
                  Educate yourself
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
                onClick={() => props.setActive(3)}
                icon={
                  <img
                    src={require("../../assets/Educate_icon.png")}
                    height="35px"
                    alt="home_icon"
                  />
                }
                active={props.active === 3}
                className="Menu-item"
              >
                {" "}
                Educate yourself
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
                onClick={() => props.setActive(4)}
                icon={
                  <img
                    src={require("../../assets/Profile_icon.png")}
                    height="40px"
                    alt="home_icon"
                  />
                }
                active={props.active === 4}
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
    </div>
  );
}

export default SideBar;
