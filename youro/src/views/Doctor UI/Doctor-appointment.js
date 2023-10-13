// import { Calendar, momentLocalizer } from "react-big-calendar";
// import React,{useState,Component } from "react";
// import moment from "moment";
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import Hamburger from 'hamburger-react';
// import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
// import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
// import "../../styles/Doctor-ui/Doctor-Appointment-page.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";



// const localizer = momentLocalizer(moment);

// function DoctorAppointments ()  {

//   const [events, setEvents] = useState([
//     {
//       start: moment().toDate(),
//       end: moment()
//         .add(1, "days")
//         .toDate(),
//       title: "Some title",
//     },
//   ]);

//    function DoctorSideBar()
//   {
//    const [collapse, setCollapse] = useState(true);
//   const navigate = useNavigate();

//   return (
//   <div>
//   <div className='Tab-section'>
//     <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
      
//      <Menu menuItemStyles={{
//       button: ({active}) => {
//         // only apply styles on first level elements of the tree
//         if (active==true)
//           return {
//             // color: disabled ? '#f5d9ff' : '#d359ff',
//             backgroundColor: active ? '#808080' : undefined,
//           };
        
//       },
//     }}
//   >
//      <div className='Hamburger'>
//       <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> 
//       </div>
//     <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaHome size={40}/>}  className="Menu-item" >Home</MenuItem>
//     <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaCalendar size={40} />} className="Menu-item" > Appointments</MenuItem>
//     <MenuItem onClick={() => navigate("/doctor--ui")} icon={<FaFacebookMessenger size={40} />}  className="Menu-item" >Chat</MenuItem>
//     <MenuItem onClick={() => navigate("/doctor-appointment")} icon={<FaPrescription size={40}/>} active={true} className="Menu-item" > Section-1</MenuItem>
//     <MenuItem onClick={() => navigate("/doctor-profile")} icon={<FaPowerOff size={40}/>}  className="Menu-item" > Profile</MenuItem>  
//     </Menu>
//     </Sidebar>
//   </div>
      
//   </div>
//   );
// }

//   return (
//     <div className="d-app">
//       <DoctorSideBar/>
//       <div className="d-calender">
//       <Calendar
//         localizer={localizer}
//         defaultDate={new Date()}
//         defaultView="month"
//         events={events}
//         style={{ height: "100vh" }}
//         /> 
//       </div>
//     </div>
//   );
// }

// export default DoctorAppointments;















import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorSideBar from "./Doctor-Sidebar";

const localizer = momentLocalizer(moment);

function DoctorAppointments() {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);

  const [newEvent, setNewEvent] = useState({ start: null, end: null, title: "" });

  function handleEventCreation() {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({ start: null, end: null, title: "" });
  }

  return (
    <div className="d-app">
      <DoctorSideBar data={'doctor-appointment'} />
      <div className="d-calender">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          selectable
          onSelectSlot={(slotInfo) => {
            // Handle event creation here
            setNewEvent({ start: slotInfo.start, end: slotInfo.end, title: "" });
          }}
          style={{ height: "100vh" }}
        />
        <div>
          {/* Event creation form or modal */}
          {newEvent.start && (
            <div>
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <button onClick={handleEventCreation}>Add Event</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments;
