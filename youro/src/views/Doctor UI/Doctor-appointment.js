

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-Appointment-page.css";
import "../../index.css";
import axios, { all } from 'axios';
import { appendErrors } from "react-hook-form";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Youroheader from "../Youro-header";
import Loader from '../../utils/loader';

// #d7b8b9
const components =
{
  event: (props) => {
    console.log("advance css components for calender", props);
    const eventtype = props.title;
    const centerTextStyles = {
      background: eventtype === "Available" ? "#745edf" : "#8A6767",
      color: "white",
      height: "100%",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    return <div style={centerTextStyles}>{props.title}</div>;
    //  if(eventtype==="Available")
    //   {
    //     return (
    //              <div style={{background:"#745edf",color:"white",
    //                   height:"100%",textAlign:"center"}}>{props.title}</div>
    //           )
    //   } 
    //  else
    //   {
    //     return (<div style={{background:"#8A6767",color:"white",height:"100%",textAlign:"center"}}>{props.title}</div>) 
    //    }
    //  return null;
  }
};

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




  const [events, setEvents] = useState([]);
  const [calenderapt, setcalenderapt] = useState([]);

  // console.log(User)

  // const clear_events =


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
    // let doc_events=[];

    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getAvailability/${doctid}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {

      const res = await axios.get(url, config);
      console.log("checking doc availability", res.data);
      // const res.data = res.data;


      if (res.data && res.data.appointments) {
        res.data.appointments.forEach((appointment) => {
          const event = {
            start: new Date(appointment.apptStartTime),
            end: new Date(appointment.apptEndTime),
            title: appointment.patientName,
            id: appointment.apptId,
          };
          all_events.push(event);
        });
      }

      console.log("All events", res.data.appointments);
      if (res.data && res.data.docAvail) {
        res.data.docAvail.forEach((availability) => {
          const event = {
            start: new Date(availability.startTime),
            end: new Date(availability.endTime),
            title: availability.status,
            id: availability.doctorId,
          };
          all_events.push(event);
        });
      }

      console.log("all events of docavail ", all_events)

      // console.log("printing all events", all_events);
      setEvents(all_events);
      console.log("printing events after fetching", all_events);
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    fetching_api_data();
  }, []);

  const [newEvent, setNewEvent] = useState({ start: null, end: null, id: "" });

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

  // function handleCancelAppt(selectedEvent) {

  //   const url= `http://52.14.33.154:9093/youro/api/v1/cancelAppointment/2/1`
  //   console.log(selectedEvent);
  //   handleCancelApptAPI(selectedEvent);
  //   hidedetails();

  // }

  const RemoveAvailability = async (selectedEvent) => {
    //  axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/removeDoctorAvailability`;
    console.log(selectedEvent);
    const temp = {
      startTime: selectedEvent.start + "",
      endTime: selectedEvent.end + "",
      docId: doctid
    };
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(url, temp, config);
      console.log(res);
      console.log("posting removed data", res);
      hidedetails();
      fetching_api_data();
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleCancelApptAPI = async (selectedEvent) => {
    console.log('handleCancelApptAPI :: ', selectedEvent);

    console.log(typeof (selectedEvent.apptId));
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/cancelAppointment/${selectedEvent.id}/${doctid}`;
    const config = {
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/json'
      }
  };
    try {
      const res = await axios.put(url, config);
      console.log(res);
      hidedetails();
      fetching_api_data();
    }
    catch (err) {
      console.error(err);
    }
  };

  const saveNewSchedule = async () => {

    console.log("showing what slot is selected", selectslot);
    if (selectslot == "Available") {
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/addDoctorAvailability`;

      const temp = {
        startTime: newEvent.start + "",
        endTime: newEvent.end + "",
        docId: doctid
      };
      console.log(temp);
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/json'
        }
      };
      try {
        const res = await axios.put(url, temp, config);
        console.log(res);
        console.log("posting available data", res);
        fetching_api_data();
      }
      catch (err) {
        console.error(err);
      }
    }
    else if (selectslot == "UnAvailable") {
      RemoveAvailability(newEvent);
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      // const url = `http://52.14.33.154:9093/youro/api/v1/removeDoctorAvailability`;
      // const temp = {
      //   startTime: newEvent.start + "",
      //   endTime: newEvent.end + "",
      //   docId: doctid
      // };
      // console.log(temp);
      // try {
      //   const res = await axios.put(url,temp);
      //   console.log(res);
      //   console.log("posting unavailable data", res);
      //   fetching_api_data();
      // }
      // catch (err) {
      //   console.error(err);
      // }
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
          <Youroheader />
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
              style={{ height: "80vh" }}
              components={components}
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
                        Confirm
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
                  <div className="slot-buttons">
                    {selectedEvent.title === "Available" ?
                      (<div><button className="remove-button" onClick={() => RemoveAvailability(selectedEvent)} > Remove availablity</button></div>) :
                      (<div><button className="remove-button" onClick={() => handleCancelApptAPI(selectedEvent)}> Cancel Appointment</button></div>)
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
