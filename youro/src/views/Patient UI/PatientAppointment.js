import React, { useState, useEffect } from "react";
import { Calendar as ReactCalendar } from 'react-calendar';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Youroheader from "../Youro-header";

const PatientAppointment = (props) => {
    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setDate(maxDate.getDate() + 15);

    const localizer = momentLocalizer(moment);


    const [event, setEvent] = useState(null);

    const [dateSelection, setDateSelection] = useState(new Date());
    // select date

    const [open, setOpen] = useState(false);

    // slots in a day
    const [slotsData, setSlotsData] = useState([]);
    const [slotsOnDate, setSlotsOnDate] = useState();
    const [selectedInfo, setSelectedInfo] = useState();
    const [viewVal, setViewVal] = useState(0);
    const [diagnosisNames, setDiagnoses] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        // console.log(event.target.value);
        // console.log("symptom score data :: " + JSON.stringify(data));
        setSelectedOption(event.target.value);
    };


    const navToProfile = () => {
        props.changeView(4);
    }

    useEffect(() => {
        fetch15DaysSlots();
        fetchAllDiagnoses();
        if (viewVal == 4) {
            navToProfile();
        }
    }, [viewVal]);

    const formatSlotsToLocal = async (data) => {
        var finalData = {}
        for(var i = 0; i< data.length; i++){

        }
    }

    const fetchAllDiagnoses = async () => {
        // console.log("====^^^===");
        // console.log("fetchAllDiagnoses START");
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getAllDiagnoses`;
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json'
          }
        };
        try {
          const res = await axios.get(url, config);
          setDiagnoses(res.data);
        }
        catch (err) {
          console.error(err);
        }
        // console.log("fetchAllDiagnoses END");
        // console.log("====^^^===");
      };

    const fetch15DaysSlots = async () => {
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAvailableSlotsByDate?timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
        const token = Cookies.get(COOKIE_KEYS.token);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            // console.log("got data ");
            // console.log(res);
            setSlotsData(res.data);
            handleDateSelection(new Date(), res.data);

            const rnFunc = async (formattedDate, classname) => {
                var manySlots = await document.querySelector(`[aria-label="${formattedDate}"]`);
                // manySlots.className += "many_slots"
                manySlots?.classList?.add(classname);
            }


            for (var i = 0; i < res.data.length; i++) {
                var date = new Date(res.data[i].date);
                // date.setDate(date.getDate());
                var formattedDate = date.toLocaleString('default', { month: 'long', day: 'numeric', timeZone: 'UTC'}) + ", " + date.toLocaleString('default', { year: 'numeric', timeZone: 'UTC' });
                if (res.data[i].noOfSlots > 5) {
                    rnFunc(formattedDate, "many_slots")
                } else if (res.data[i].noOfSlots <= 5 && res.data[i].noOfSlots > 0) {
                    rnFunc(formattedDate, "few_slots")
                } else {
                    rnFunc(formattedDate, "no_slots")
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleBook = () => {
        
        console.log(selectedInfo); //.doctorIds[Math.floor(Math.random()*selectedInfo.doctorIds.length)]
        saveNewAppointment();
    }

    const [newApptDocName, setNewApptDocName] = useState('');
    const saveNewAppointment = async () => {
        // console.log("====^^^===");
        // console.log("saveNewAppointment START");
        const token = Cookies.get(COOKIE_KEYS.token);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/saveAppointment`;

        try {
            console.log(selectedInfo);
            const temp = {
                diagId: selectedOption,
                docId: selectedInfo.doctorIds[0],
                patId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
                startTime: selectedInfo.startTime + ''
            };
            console.log(temp);
            const res = await axios.post(url, temp);
            console.log(res.data); //{message: 'Doctor Name'}
            setNewApptDocName(res.data.message);
            setOpen(true);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("saveNewAppointment END");
        // console.log("====^^^===");
    };

    const getEndTime = (time) => {
        // console.log(time);
        var hour = parseInt(time.split(":")[0]);
        var minutes = time.split(":")[1];
        // console.log(hour + " : " + minutes);
        if (minutes == '30') {
            // console.log(hour+1 + " : 00" );
            return `${hour + 1}:00`
        } else {
            // console.log(hour + " : 30" );
            return `${hour}:30`
        }
    }


    const getSlots = (eve, data) => {
        // console.log("getSlots start");
        var flag = 0
        data = data ? data : slotsData
        // console.log(data)
        for (var i = 0; i < data.length; i++) {
            // console.log(slotsData[i]);
            if (data[i].date === eve) {
                flag = 1;
                setSlotsOnDate(data[i]);
                console.log(data[i])
                break
            }
        }

        if (flag === 0) {
            setSlotsOnDate(null);
        }
        // console.log("getSlots end");
    }

    const handleSelectSlot = (startTime, info) => {
        // console.log("handleSelectSlot start");
        setEvent(startTime);
        setSelectedInfo(info);
        // console.log("handleSelectSlot end");
    }

    const handleDateSelection = (eve, data = null) => {
        // event is directly the date
        // console.log("handleDateSelection start");
        // console.log(eve);
        setDateSelection(eve);
        console.log(eve)
        // console.log(eve.getDate() > 10);
        var date = eve.getFullYear() + "-" + (eve.getMonth() + 1) + "-" + (eve.getDate() >= 10 ? (eve.getDate()) : ('0' + eve.getDate()));
        getSlots(date, data);
        setEvent(false);
        // console.log("handleDateSelection end");
    };

    return (
        <div style={{ display: 'flex', flexDirection: "column", width: "100%" }} >
            <div style={{ margin: "0% 2%" }}>
                <Youroheader setView={setViewVal} />
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: "row", alignItems: 'start' }}>
                <div style={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>

                    <div className="react-calendar-container">
                        <h1 style={{ margin: "0% 7%" }}>Schedule Appointment</h1>
                        <ReactCalendar minDate={minDate} maxDate={maxDate} onChange={(e) => handleDateSelection(e, null)} value={dateSelection} />
                    </div>
                    <div style={{ width: '-webkit-fill-available', marginTop: '50px', }} className="slots-container">
                        <p>Available Slots on - <strong style={{ textDecoration: 'underline' }}>{dateSelection.toLocaleDateString()}</strong></p>
                        <div className="slots-container-sub">
                            {slotsOnDate && slotsOnDate.slotInfo.map((data) => {
                                // var startTime = data['startTime'].includes("T") ? data['startTime'].split('T')[1].split(':')[0] + ':' + data['startTime'].split('T')[1].split(':')[1] : data['startTime'].split(':')[0] + ':' + data['startTime'].split(':')[1];
                                var startTime = data['startTime'].split(" ")[4].split(":")[0] + ':' + data['startTime'].split(" ")[4].split(":")[1]
                                return (
                                    <>
                                        <div onClick={(e) => handleSelectSlot(startTime, data)} className="slot-timings">
                                            <span style={{ letterSpacing: '1.3px' }}>{startTime}</span>
                                            -
                                            <span style={{ letterSpacing: '1.3px' }}>{getEndTime(startTime)}</span>
                                        </div>
                                    </>

                                )
                            })}

                            {!slotsOnDate && <h4 style={{ letterSpacing: '2px' }}>No slots Available on selected date. Choose another date</h4>}
                        </div>
                    </div>
                </div>

                {
                    event &&
                    <>
                        
                        <div style={{ margin: 'auto' }}>
                        <label for='d'>Choose diagnosis: </label>
                        <select id="d" name="d" className='dropdown-chart' value={selectedOption} onChange={handleSelectChange}>
                            <option>Select Diagnosis</option>
                            {
                            diagnosisNames.map((result) => (<option value={result.diagId}>{result.name}</option>))
                            }
                        </select><br/><br/>
                            <strong>Selected Date:</strong>&nbsp;&nbsp;{dateSelection.toDateString()} <br /><br />
                            <strong>Selected Slot:</strong>&nbsp;&nbsp;&nbsp;{event} - {getEndTime(event)}
                            <br /><br /><br /><br /><br />
                            <div className="btn-filled" onClick={handleBook}>Book Appointment</div>

                        </div>

                    </>
                }

                <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
                    <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false); props.changeView(0) }}>
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <div style={{ padding: '50px 20px', textAlign: 'center' }}>
                        <h3>Congratulations !!!</h3>
                        <h3>Appointment confirmed with {newApptDocName}</h3>
                        <img src={require('../../assets/Congrats.png')} alt='Congrats' style={{ height: '100px' }}></img><br /><br />
                        {event && <p>Appointment at: &nbsp;<strong> {dateSelection.toLocaleDateString()}, {event} - {getEndTime(event)}</strong></p>}
                    </div>
                </Popup>
            </div>
        </div>

    )
}


export default PatientAppointment;