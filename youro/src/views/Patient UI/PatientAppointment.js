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
import { COOKIE_KEYS } from "../../App";

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

    useEffect(() => {
        fetch15DaysSlots();

    }, [])

    const fetch15DaysSlots = async () => {
        console.log("====^^^===");
        console.log("fetch15DaysSlots START");
        const url = `http://localhost:9092/youro/api/v1/getAvailableSlotsByDate`;
        const token = Cookies.get(COOKIE_KEYS.token);
        const config = {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
            }
        };
        try {
            const res = await axios.get(url, config);
            // console.log("got data ");
            // console.log(res);
            setSlotsData(res.data);

            const rnFunc = async (formattedDate, classname) => {
                console.log(formattedDate + " :: " + classname);
                console.log(`[aria-label="${formattedDate}"]`);
                var manySlots = await document.querySelector(`[aria-label="${formattedDate}"]`);
                // manySlots.className += "many_slots"
                manySlots?.classList?.add(classname);
            }


            for (var i = 0; i < res.data.length; i++) {
                var date = new Date(res.data[i].date);
                date.setDate(date.getDate() + 1);
                var formattedDate = date.toLocaleString('default', { month: 'long', day: 'numeric' }) + ", " + date.toLocaleString('default', { year: 'numeric' });
                console.log(date.toLocaleDateString());
                if (res.data[i].noOfSlots > 5) {
                    rnFunc(formattedDate, "many_slots")
                } else if (res.data[i].noOfSlots < 5 && res.data[i].noOfSlots > 0) {
                    rnFunc(formattedDate, "few_slots")
                } else {
                    rnFunc(formattedDate, "no_slots")
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        console.log("fetch15DaysSlots END");
        console.log("====^^^===");
    }
    // const handleSelectEvent = (event) => {
    //     setVal(event.id)
    //     setEvent(event)
    //     eventPropGetter(event)
    // }

    const handleBook = () => {
        setOpen(true);
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
                "Authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const url = `http://localhost:9092/youro/api/v1/saveAppointment`;
        try {
            console.log(selectedInfo);
            const temp = {
                docId: selectedInfo.doctorIds[0],
                patId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
                startTime: selectedInfo.startTime + ''
            };
            console.log(temp);
            const res = await axios.post(url, temp);
            console.log(res.data); //{message: 'Doctor Name'}
            setNewApptDocName(res.data.message);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("saveNewAppointment END");
        // console.log("====^^^===");
    };

    // const eventPropGetter = (event) => {
    //     const backgroundColor = event.id === val  ? 'var(--neon-color)' : 'var(--secondary-color)';
    //     return { style: { backgroundColor } }
    // }

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


    const getSlots = (eve) => {
        // console.log("getSlots start");
        var flag = 0
        for (var i = 0; i < slotsData.length; i++) {
            // console.log(slotsData[i]);
            if (slotsData[i].date === eve) {
                flag = 1;
                setSlotsOnDate(slotsData[i]);
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

    const handleDateSelection = (eve) => {
        // event is directly the date
        // console.log("handleDateSelection start");
        // console.log(eve);
        setDateSelection(eve);
        // console.log(eve.getDate() > 10);
        var date = eve.getFullYear() + "-" + (eve.getMonth() + 1) + "-" + (eve.getDate() >= 10 ? (eve.getDate()) : ('0' + eve.getDate()));
        getSlots(date);
        setEvent(false);
        // console.log("handleDateSelection end");
    };

    return (
        <div style={{ display: 'flex', width: '100%', position: 'relative', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>
                <div className="react-calendar-container">
                    <h1 style={{ top: '55px', position: 'absolute', left: '50px' }}>Schedule Appointment</h1>
                    <ReactCalendar minDate={minDate} maxDate={maxDate} onChange={handleDateSelection} value={dateSelection} />
                </div>
                <div style={{ width: '-webkit-fill-available', marginTop: '10px', }} className="slots-container">
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

    )
}


export default PatientAppointment;