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
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";
import "../../index.css";
import axios from 'axios';


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
  const [createvent, setcreatevent] = useState(true);


  const handlecreatevent_boolen = () => {
    setNewEvent({ start: null, end: null, title: "", email: "" });
  }
  const handleSelectEvent = (event) => {
    console.log('handleSelectEvent start :: ');
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const hidedetails = () => {
    // console.log(selectedEvent);
    setShowEventDetails(false);
  }

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
    apptId: 22,
    doctorId: 34
  };

  const event2 = {
    start: moment().add(2, "days").toDate(),
    end: moment().add(3, "days").toDate(),
    title: "Chris Brown",
    email: "another@example.com",
    apptId: 23,
    doctorId: 34
  };


  const initialEvents = [event1, event2];

  useState(() => {
    setEvents(initialEvents);
  }, []);

  const [newEvent, setNewEvent] = useState({ start: null, end: null, title: "", email: "" });

  function handleEventCreation() {
    if (newEvent) {
      if (newEvent.title.length === 0) {
        newEvent.title = "Available";
      }
      // newEvent.start={moment(newEvent.start).format('MMMM Do YYYY, h:mm:ss a')};
      // newEvent.start = moment(newEvent.start).format('MMMM Do YYYY, h:mm:ss a');
      console.log("printing new event", newEvent);
      console.log("printing date", newEvent.start);
      console.log("printing fetch ", event1.start);
      saveNewSchedule();
      // const eventsToSplit = splitEventIfNecessary(newEvent);
      // console.log("new event",eventsToSplit);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setNewEvent({ start: null, end: null, title: "", email: "" });
      setcreatevent(false);
    }
  }

  function handleCancelAppt(selectedEvent) {
    console.log(selectedEvent);
    handleCancelApptAPI(selectedEvent);
    hidedetails();
    
  }

  const handleCancelApptAPI = async (selectedEvent) => {
    console.log('handleCancelApptAPI :: ');

    console.log(typeof(selectedEvent.apptId));
    const url = `http://localhost:9092/youro/api/v1/cancelAppointment/${selectedEvent.apptId}/${selectedEvent.docId}`;
    try {
      const res = await axios.put(url);
      console.log(res);
    }
    catch (err) {
      console.error(err);
    }
  };

  const saveNewSchedule = async () => {
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    const url = `http://localhost:9092/youro/api/v1/addDoctorAvailability`;
    const doctorId = '4';
    const temp = {
      stateTime: newEvent.start + "",
      endTime: newEvent.end + "",
      // status : 'AVAILABLE',
      dotId: doctorId
    };
    console.log(temp);
    try {
      const res = await axios.put(url, temp);
      console.log(res);
    }
    catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <div className="d-app">
        <div className="sidebar">
          <DoctorSideBar data={'doctor-appointment'} />
        </div>
        <div className="d-calender">
          <div className="d-calender-form">
            {/* <Calendar
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
                  })
                };
              }}
              onSelectEvent={handleSelectEvent}
              style={{ height: "85vh"}}
              components={{
                   month: {
                  dateHeader: ({ label, date }) => (
                   <div className="current-month">
                     {label}
                   </div>
                  ),
                 },
                 day: {
                   event: ({ event }) => (
                    <div className="day-view">
                    {event.title}
                   </div>
                    ),
                   },
                 week: {
                  event: ({ event }) => (
                  <div className="week-view">
                   {event.title}
                  </div>
                   ),
                 },
                 
              }}
            /> */}
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="week"
              events={events}
              selectable
              onSelectSlot={(slotInfo) => {
                if (slotInfo.action === "select") {
                   handleEventCreation(slotInfo);
                // Handle event creation here
                // setNewEvent({
                //   start: slotInfo.start,
                //   end: slotInfo.end,
                //   title: "",
                //   email: "",
                // })};
              }}}
              onSelectEvent={handleSelectEvent}
              style={{ height: "85vh"}}
              />
            <div className="events-form">
              {newEvent.start && (
                <div className="popup-container-apt">
                  <div className="popup-background-apt"></div>
                  <div className="event-creation-form">
                    <p><span style={{ fontWeight: 'bold' }}>Adding Slot</span></p>
                    <p><span style={{ fontWeight: 'bold' }}>Start:</span>{moment(newEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p><span style={{ fontWeight: 'bold' }}>end:</span>{moment(newEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    {/* <p><span style={{ fontWeight: 'bold' }}>End:</span>{newEvent.start.Date}</p> */}
                    {/* <input
                    type="text"
                    placeholder="Event email"
                    value={newEvent.email}
                    onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
                  /> */}
                    <div className="slot-buttons">
                      <button className="add-availability" onClick={handleEventCreation}>
                        Add
                      </button>
                      <button className="add-availability" onClick={handlecreatevent_boolen}>Hide</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {showEventDetails && (
            <div className="popup-container-apt">
              <div className="popup-background-apt"></div>
              <div className="event-details-container">
                <div className="event-details">
                  {selectedEvent.title === "Available" ? (<h3>Available Slot</h3>) :
                    (<h3>{selectedEvent.title}</h3>)}
                  <p>
                    {/* <strong>Date:</strong>{" "} */}
                    {/* <p>start:{selectedEvent.start}</p> */}
                    <p>start:{moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p>end:{moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    {/* <p>end:{selectedEvent.end.toLocaleString()}</p> */}
                  </p>
                  {selectedEvent.title !== "Available" ? (<p>Email: {selectedEvent.email}</p>) : <></>}
                  <div className="slot-buttons">
                    {selectedEvent.title === "Available" ?
                      (<div><button className="remove-button" > Remove availablity</button></div>) :
                      (<div><button className="remove-button" onClick={() => handleCancelAppt(selectedEvent)}> Cancel Appointment</button></div>)
                    }
                    <button className="hide-button" onClick={hidedetails}>Hide</button>
                  </div>
                </div>
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

