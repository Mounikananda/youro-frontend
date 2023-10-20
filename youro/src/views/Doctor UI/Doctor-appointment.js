// // // import { Calendar, momentLocalizer } from "react-big-calendar";
// // // import React,{useState,Component } from "react";
// // // import moment from "moment";
// // // import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// // // import Hamburger from 'hamburger-react';
// // // import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
// // // import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
// // // import "../../styles/Doctor-ui/Doctor-Appointment-page.css";
// // // import "react-big-calendar/lib/css/react-big-calendar.css";



// // // const localizer = momentLocalizer(moment);

// // // function DoctorAppointments ()  {

// // //   const [events, setEvents] = useState([
// // //     {
// // //       start: moment().toDate(),
// // //       end: moment()
// // //         .add(1, "days")
// // //         .toDate(),
// // //       title: "Some title",
// // //     },
// // //   ]);

// // //    function DoctorSideBar()
// // //   {
// // //    const [collapse, setCollapse] = useState(true);
// // //   const navigate = useNavigate();

// // //   return (
// // //   <div>
// // //   <div className='Tab-section'>
// // //     <Sidebar backgroundColor="#9CB189" className='Side-bar' collapsed={collapse}>
      
// // //      <Menu menuItemStyles={{
// // //       button: ({active}) => {
// // //         // only apply styles on first level elements of the tree
// // //         if (active==true)
// // //           return {
// // //             // color: disabled ? '#f5d9ff' : '#d359ff',
// // //             backgroundColor: active ? '#808080' : undefined,
// // //           };
        
// // //       },
// // //     }}
// // //   >
// // //      <div className='Hamburger'>
// // //       <Hamburger toggled={collapse} toggle={setCollapse} size={40} /> 
// // //       </div>
// // //     <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaHome size={40}/>}  className="Menu-item" >Home</MenuItem>
// // //     <MenuItem onClick={() => navigate("/doctor-ui")} icon={<FaCalendar size={40} />} className="Menu-item" > Appointments</MenuItem>
// // //     <MenuItem onClick={() => navigate("/doctor--ui")} icon={<FaFacebookMessenger size={40} />}  className="Menu-item" >Chat</MenuItem>
// // //     <MenuItem onClick={() => navigate("/doctor-appointment")} icon={<FaPrescription size={40}/>} active={true} className="Menu-item" > Section-1</MenuItem>
// // //     <MenuItem onClick={() => navigate("/doctor-profile")} icon={<FaPowerOff size={40}/>}  className="Menu-item" > Profile</MenuItem>  
// // //     </Menu>
// // //     </Sidebar>
// // //   </div>
      
// // //   </div>
// // //   );
// // // }

// // //   return (
// // //     <div className="d-app">
// // //       <DoctorSideBar/>
// // //       <div className="d-calender">
// // //       <Calendar
// // //         localizer={localizer}
// // //         defaultDate={new Date()}
// // //         defaultView="month"
// // //         events={events}
// // //         style={{ height: "100vh" }}
// // //         /> 
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default DoctorAppointments;















// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// // import Hamburger from 'hamburger-react';
// // import { FaHome, FaCalendar, FaFacebookMessenger, FaPrescription, FaPowerOff, FaHamburger } from "react-icons/fa";
// // import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
// // import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";
// // import "react-big-calendar/lib/css/react-big-calendar.css";
// // import DoctorSideBar from "./Doctor-Sidebar";

// // const localizer = momentLocalizer(moment);

// // function DoctorAppointments() {
// //   const [events, setEvents] = useState([
// //     {
// //       start: moment().toDate(),
// //       end: moment().add(1, "days").toDate(),
// //       title: "Some title",
// //     },
// //   ]);

// //   const [newEvent, setNewEvent] = useState({ start: null, end: null, title: "" });

// //   function handleEventCreation() {
// //     setEvents((prevEvents) => [...prevEvents, newEvent]);
// //     setNewEvent({ start: null, end: null, title: "" });
// //   }

// //   return (
// //     <div> 
// //     <div className="d-app">
// //       <div className="sidebar">
// //       <DoctorSideBar data={'doctor-appointment'} />
// //       </div>
// //       <div className="d-calender">
// //         <Calendar 
// //           localizer={localizer}
// //           defaultDate={new Date()}
// //           defaultView="month"
// //           events={events}
// //           selectable
// //           onSelectSlot={(slotInfo) => {
// //             // Handle event creation here
// //             setNewEvent({ start: slotInfo.start, end: slotInfo.end, title: "" });
// //           }}
// //           style={{ height: "60vh",border: "0.5px solid black" }}
// //         />
// //         <div>
// //           {/* Event creation form or modal */}
// //           {newEvent.start && (
// //             <div>
// //               <input
// //                 type="text"
// //                 placeholder="Event title"
// //                 value={newEvent.title}
// //                 onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
// //               />
// //               <button onClick={handleEventCreation}>Add Event</button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }

// export default DoctorAppointments;

//its working without split minutes:

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DoctorSideBar from "./Doctor-Sidebar";
// import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";

// const localizer = momentLocalizer(moment);



// const calculateDurationInMinutes = (start, end) => {
//   const diff = moment(end).diff(moment(start), "minutes");
//   return diff;
// };

// const splitEventIfNecessary = (event) => {
//   const duration = calculateDurationInMinutes(event.start, event.end);
//   if (duration > 30) {
//     const eventsToSplit = [];
//     let currentStart = moment(event.start);

//     while (currentStart.isBefore(event.end)) {
//       const currentEnd = moment(currentStart).add(30, "minutes");
//       if (currentEnd.isAfter(event.end)) {
//         currentEnd = moment(event.end);
//       }
//       eventsToSplit.push({
//         ...event,
//         start: currentStart.toDate(),
//         end: currentEnd.toDate(),
//       });
//       currentStart = currentEnd;
//     }
//     return eventsToSplit;
//   } else {
//     return [event];
//   }
// };
// function DoctorAppointments() {

//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);

//   const handleSelectEvent = (event) => {
//   setSelectedEvent(event);
//   setShowEventDetails(true);
//   };

//  const eventsToSplit = splitEventIfNecessary(newEvent);
//     setEvents((prevEvents) => [...prevEvents, ...eventsToSplit]);

//   const [events, setEvents] = useState([
//     {
//       start: moment().toDate(),
//       end: moment().add(1, "days").toDate(),
//       title: "Stephen Curry",
//       email: "example@example.com",
//     },
//     {
//       start: moment().add(2, "days").toDate(),
//       end: moment().add(3, "days").toDate(),
//       title: "Chris Brown",
//       email: "another@example.com",
//     },
//   ]);

//   const [newEvent, setNewEvent] = useState({ start: null, end: null, title: "", email: "" });

//   function handleEventCreation() {
//     console.log("new event",newEvent);
//     const eventsToSplit = splitEventIfNecessary(newEvent);
//     setEvents((prevEvents) => [...prevEvents, eventsToSplit]);
//     setNewEvent({ start: null, end: null, title: "", email: "" });
//   }



//   return (
//     <div>
//       <div className="d-app">
//         <div className="sidebar">
//           <DoctorSideBar data={'doctor-appointment'} />
//         </div>
//         <div className="d-calender">
//           <div className="d-calender-form">
//           <Calendar
//             localizer={localizer}
//             defaultDate={new Date()}
//             defaultView="month"
//             events={events}
//             selectable
//             onSelectSlot={(slotInfo) => {
//               // Handle event creation here
//               setNewEvent({
//                 start: slotInfo.start,
//                 end: slotInfo.end,
//                 title: "",
//                 email: "",
//               });
//             }}
//             onSelectEvent={handleSelectEvent}
//             style={{height: "50vh" ,backgroundColor: "white",}}
//           />
//           <div className="events-form">
//             {/* Event creation form or modal */}
//             {newEvent.start && (
//               <div className="event-creation-form">
//                 <input 
//                   type="text"
//                   className="available-input"
//                   placeholder="Event title"
//                   value={newEvent.title}
//                   onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                 />
//                 {/* <input
//                   type="text"
//                   placeholder="Event email"
//                   value={newEvent.email}
//                   onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
//                 /> */}
//                 <button className="add-availability" onClick={handleEventCreation}>Add Availability</button>
//               </div>
//             )}
//           </div>
//           </div>
//              {showEventDetails && (
//           <div className="event-details-container">
//           <div className="event-details">
//           <h2>{selectedEvent.title}</h2>
//           <p>
//         <strong>Date:</strong>{" "}
//         {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleString()}
//       </p>
//           <p>Email: {selectedEvent.email}</p>
//           {/* <button onClick={() => setShowEventDetails(false)}>Close</button> */}
//          </div>
//         </div>
// )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorAppointments;


import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";

const localizer = momentLocalizer(moment);

const calculateDurationInMinutes = (start, end) => {
  const diff = moment(end).diff(moment(start), "minutes");
  return diff;
};

const splitEventIfNecessary = (event) => {
  const duration = calculateDurationInMinutes(event.start, event.end);
  if (duration > 30) {
    const eventsToSplit = [];
    let currentStart = moment(event.start);

    while (currentStart.isBefore(event.end)) {
      const currentEnd = moment(currentStart).add(30, "minutes");
      if (currentEnd.isAfter(event.end)) {
        currentEnd = moment(event.end);
      }
      eventsToSplit.push({
        ...event,
        start: currentStart.toDate(),
        end: currentEnd.toDate(),
      });
      currentStart = currentEnd;
    }
    return eventsToSplit;
  } else {
    return [event];
  }
};

function DoctorAppointments() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleSelectEvent = (event) =>
 {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  // const [events, setEvents] = useState([
  //   {
  //     start: moment().toDate(),
  //     end: moment().add(1, "days").toDate(),
  //     title: "Stephen Curry",
  //     email: "example@example.com",
  //   },
  //   {
  //     start: moment().add(2, "days").toDate(),
  //     end: moment().add(3, "days").toDate(),
  //     title: "Chris Brown",
  //     email: "another@example.com",
  //   },
  // ]);

  const [events, setEvents] = useState([]);


  const event1 = {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Stephen Curry",
    email: "example@example.com",
  };

  const event2 = {
    start: moment().add(2, "days").toDate(),
    end: moment().add(3, "days").toDate(),
    title: "Chris Brown",
    email: "another@example.com",
  };

  const initialEvents = [event1, event2];

  useState(() => {
    setEvents(initialEvents);
  }, []);

  const [newEvent, setNewEvent] = useState({ start: null, end: null, title: "", email: "" });

  function handleEventCreation() {
    if(newEvent)
    {
    const eventsToSplit = splitEventIfNecessary(newEvent);
    console.log("new event",eventsToSplit);
    setEvents((prevEvents) => [...prevEvents, ...eventsToSplit]);
    setNewEvent({ start: null, end: null, title: "", email: "" });
    }
  }

  return (
    <div>
      <div className="d-app">
        <div className="sidebar">
          <DoctorSideBar data={'doctor-appointment'} />
        </div>
        <div className="d-calender">
          <div className="d-calender-form">
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="week"
              events={events}
              selectable
              onSelectSlot={(slotInfo) => {
                if (slotInfo.action === "select") {
                // Handle event creation here
                setNewEvent({
                  start: slotInfo.start,
                  end: slotInfo.end,
                  title: "",
                  email: "",
                })};
              }}
              onSelectEvent={handleSelectEvent}
              style={{ height: "60vh", backgroundColor: "white",border:"0.5px solid black"}}
            />
            <div className="events-form">
              {newEvent.start && (
                <div className="event-creation-form">
                  <input
                    type="text"
                    className="available-input"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  />
                  {/* <input
                    type="text"
                    placeholder="Event email"
                    value={newEvent.email}
                    onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
                  /> */}
                  <button className="add-availability" onClick={handleEventCreation}>
                    Add Availability
                  </button>
                </div>
              )}
            </div>
          </div>
          {showEventDetails && (
            <div className="event-details-container">
              <div className="event-details">
                <h3>Patient Name:{selectedEvent.title}</h3>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedEvent.start.toLocaleString()} - {selectedEvent.end.toLocaleString()}
                </p>
                <p>Email: {selectedEvent.email}</p>
              </div>
            </div>
          )}
          {/* <div className="event-container">
            <h3>All Events:</h3>
            {events.map((event, index) => (
            <div key={index} className="event-item">
            <p>
              <strong>Title:</strong> {event.title}
            </p>
            <p>
            <strong>Date:</strong> {event.start.toLocaleString()} - {event.end.toLocaleString()}
            </p>
            <p>
              <strong>Email:</strong> {event.email}
            </p>
          </div>
      ))}
    </div> */}
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments;

