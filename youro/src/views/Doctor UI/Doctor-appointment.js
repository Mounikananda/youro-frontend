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


import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";
import "../../index.css";
import axios, { all } from 'axios';
import { appendErrors } from "react-hook-form";
import { COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";


const localizer = momentLocalizer(moment);

function DoctorAppointments() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [createvent, setcreatevent] = useState(true);
  const [selectslot, setselectslot] = useState("Available");


  const handleSelectChange = (event) => {
    setselectslot(event.target.value);
  }

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
  const [calenderapt, setcalenderapt] = useState([]);
  
  // console.log(User)

  // const clear_events =
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

  const apt = {

    // "appoitments": [
    // {
    // "apptId": 1,
    // "patientId": 1,
    // "doctorName": "Ms. doc6th asdf",
    // "patientName": "Mr. Ravi Mandava",
    // "doctorId": 10,
    // "apptDate": null,
    // "apptStartTime": "Wed Nov 01 2023 00:00:00 GMT-0400 (EDT)",
    // "apptEndTime": "Wed Nov 01 2023 02:00:00 GMT-0400 (EDT)",
    // "link": "ZOOM LINK",
    // "followUpId": 0
    // },
    // {
    // "apptId": 2,
    // "patientId": 2,
    // "doctorName": "Mr. Ravi Mandava",
    // "patientName": "Ms. Sai Hyd",
    // "doctorId": 1,
    // "apptDate": null,
    // "apptStartTime": "Mon Oct 23 2023 08:00:00 GMT-0400 (EDT)",
    // "apptEndTime": "Mon Oct 23 2023 08:30:00 GMT-0400 (EDT)",
    // "link": "ZOOM LINK",
    // "followUpId": 0
    // }
    // ],
    // "docAvail": [
    // {
    // "doctorId": 1,
    // "status":"Available",
    // "startTime": "Mon Oct 23 2023 19:30:00 GMT-0400 (EDT)",
    // "endTime": "Mon Oct 23 2023 20:00:00 GMT-0400 (EDT)"
    // },
    // {
    // "doctorId": 1,
    // "status":"Available",
    // "startTime": "Mon Oct 23 2023 04:30:00 GMT-0400 (EDT)",
    // "endTime": "Mon Oct 23 2023 05:00:00 GMT-0400 (EDT)"
    // }
    // ]
  };

  const doctid = Cookies.get(COOKIE_KEYS.userId);
  const fetching_api_data = async () => {

    //  let type = USER_TYPES.doctor;
    let all_events = [];
    let doc_events=[];

    const url = `http://localhost:9092/youro/api/v1/getAvailability/${doctid}`;
    try {

      const res = await axios.get(url);
      console.log("checking doc availability", res.data);
      // const res.data = res.data;
     
      
      if (res.data && res.data.appoitments) {
        res.data.appoitments.forEach((appointment) => {
          const event = {
            start: new Date(appointment.apptStartTime),
            end: new Date(appointment.apptEndTime),
            title: appointment.patientName,
            id: appointment.apptId,
          };
          all_events.push(event);
        });
      }

      console.log("All events",res.data.appoitments);
      if (res.data && res.data.docAvail) {
        res.data.docAvail.forEach((availability) => {
          const event = {
            start: new Date(availability.startTime),
            end: new Date(availability.endTime),
            title: availability.status,
            id: availability.doctorId,
          };
           doc_events.push(event);
        });
      }

     console.log("all events of docavail ",all_events)

      // console.log("printing all events", all_events);
      setEvents(all_events);
      console.log("printing events after fetching", all_events);
    } catch (error) {
      console.error(error);
    }

    // try {
    //     const res = await axios.get(url);

    //     console.log("checking doc availability",res.data);
    //     const doc_appt=res.data;

    //     doc_appt.appoitments.forEach(appointment => {
    //       const event = {
    //       start: new Date(appointment.apptStartTime),
    //       end: new Date(appointment.apptEndTime),
    //       title: appointment.patientName,
    //       };
    //       all_events.push(event);
    //     });


    //     apt.docAvail.forEach(availability => {
    //     const event = {
    //     start: new Date(availability.startTime),
    //     end: new Date(availability.endTime),
    //     title: availability.status,
    //     };  
    //       all_events.push(event);
    //     });

    //     // console.log("printing all events",all_events);
    //     setEvents(all_events);
    //     console.log("printing events after fetching",all_events)    
    //     // // console.log("checking variable data",doc_appt.appoitments);
    //     // // canRenderAdmin(true);
    //     // // setTableData(res.data);s
    //     // setcalenderapt(doc_appt);
    //     // // setcalenderapt((prevData) => {
    //     // //       console.log("all calender appointments", prevData);
    //     // //       return res.data; // Make sure to return the new state
    //     // // });
    //     // console.log("all calender appointments",calenderapt);
    //     // console.log("Data inside fetchData : " + count + "  =>  " + tableData);
    // }
    // catch (err) {
    //     console.error(err);
    // }

    // apt.appoitments.forEach(appointment => {
    //   const event = {
    //     start: new Date(appointment.apptStartTime),
    //     end: new Date(appointment.apptEndTime),
    //     title: appointment.patientName,
    //   };
    //   all_events.push(event);
    // });


    // apt.docAvail.forEach(availability => {
    //   const event = {
    //     start: new Date(availability.startTime),
    //     end: new Date(availability.endTime),
    //     title: availability.status,
    //   };
    //   all_events.push(event);
    // });

    // console.log("printing all events",all_events);
    // setEvents(all_events);
  }



  useEffect(() => {
    // setEvents(initialEvents);
    fetching_api_data();
  }, []);

  const [newEvent, setNewEvent] = useState({ start: null, end: null, id: ""});

  function handleEventCreation(slotInfo) {
    if (newEvent) {

      // if (newEvent.title.length === 0) {
      //   newEvent.title = selectslot;
      // }
      setNewEvent({
        start: slotInfo.start,
        end: slotInfo.end,
        doctid: doctid,
      })
      // newEvent.start = slotInfo.start;
      // newEvent.end = slotInfo.end;
      console.log("new event details", newEvent);
      // newEvent.start={moment(newEvent.start).format('MMMM Do YYYY, h:mm:ss a')};
      // newEvent.start = moment(newEvent.start).format('MMMM Do YYYY, h:mm:ss a');
      // console.log("printing new event", newEvent);
      // console.log("printing date", newEvent.start);
      // console.log("printing fetch ", event1.start);
      saveNewSchedule();
      // const eventsToSplit = splitEventIfNecessary(newEvent);
      // console.log("new event",eventsToSplit);
      // setEvents((prevEvents) => [...prevEvents, newEvent]);
      // setNewEvent({ start: null, end: null, title: "", email: "" });
      setcreatevent(false);
    }
  }

  function handleCancelAppt(selectedEvent) {

    const url= `http://localhost:9092/youro/api/v1/cancelAppointment/2/1`
    console.log(selectedEvent);
    handleCancelApptAPI(selectedEvent);
    hidedetails();

  }

  const handleCancelApptAPI = async (selectedEvent) => {
    console.log('handleCancelApptAPI :: ');

    console.log(typeof (selectedEvent.apptId));
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

    console.log("showing what slot is selected",selectslot);
    if (selectslot == "Available") {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      const url = `http://localhost:9092/youro/api/v1/addDoctorAvailability`;

      const temp = {
        startTime: newEvent.start + "",
        endTime: newEvent.end + "",
        docId: doctid
      };
      console.log(temp);
      try {
        const res = await axios.put(url,temp);
        console.log(res);
        console.log("posting available data", res);
        fetching_api_data();
      }
      catch (err) {
        console.error(err);
      }
    }
    else if(selectslot=="UnAvailable")
    {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      const url = `http://localhost:9092/youro/api/v1/removeDoctorAvailability`;
      const temp = {
        startTime: newEvent.start + "",
        endTime: newEvent.end + "",
        docId: doctid
      };
      console.log(temp);
      try {
        const res = await axios.put(url,temp);
        console.log(res);
        console.log("posting unavailable data", res);
        fetching_api_data();
      }
      catch (err) {
        console.error(err);
      }
    } 
    }
  // };


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
              defaultView={"week"}
              events={events}
              selectable
              onSelectSlot={(slotInfo) => {
                if (slotInfo.action === 'select') {
                  const currentTime = new Date();
                  const selectedSlotStart = new Date(slotInfo.start);
                  console.log(selectedSlotStart, currentTime)
                  if (slotInfo.start >= currentTime) {
                    // Handle event creation here
                    // setNewEvent({
                    //   start: slotInfo.start,
                    //   end: slotInfo.end,
                    //   title: "",
                    //   email: "",
                    // })
                    handleEventCreation(slotInfo);
                  }
                }
              }}
              onSelectEvent={handleSelectEvent}
              style={{ height: "85vh" }}

            />
            <div className="events-form">
              {newEvent.start && (
                <div className="popup-container-apt">
                  <div className="popup-background-apt"></div>
                  <div className="event-creation-form">
                    <p><span style={{ fontWeight: 'bold' }}>Adding Slot</span></p>
                    <select
                      style={{ width: '85%' }} className="input-field input-border"
                      value={selectslot}
                      onChange={handleSelectChange}
                    >
                      {/* <option value="no-option">Select</option>  */}
                      <option value="Available">Available</option>
                      <option value="UnAvailable">UnAvailable</option>
                    </select>
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
                  {selectedEvent.title === "Available" || selectedEvent.title === "UnAvailable" ? (<h3>Available Slot</h3>) :
                    (<h3>{selectedEvent.title}</h3>)}
                  <p>
                    {/* <strong>Date:</strong>{" "} */}
                    {/* <p>start:{selectedEvent.start}</p> */}
                    <p>start:{moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p>end:{moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    {/* <p>end:{selectedEvent.end.toLocaleString()}</p> */}
                  </p>
                  <div className="slot-buttons">
                    {selectedEvent.title === "Available" || selectedEvent.title === "UnAvailable" ?
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

