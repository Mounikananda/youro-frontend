import React, { useState, useEffect } from "react";
import { Calendar as ReactCalendar } from 'react-calendar';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const PatientAppointment = (props) => {
    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setDate(maxDate.getDate() + 28);

    const localizer = momentLocalizer(moment);

    // const [val, setVal] = useState(-1);

    const [event, setEvent] = useState(null);

    const [dateSelection, setDateSelection] = useState(new Date());
    // select data

    const [open, setOpen] = useState(false);

    // slots in a day
    const [slotsData, setSlotsData] = useState([]);
    const [slotsOnDate, setSlotsOnDate] = useState();
    const [selectedInfo, setSelectedInfo] = useState();

    useEffect(() => {
        setSlotsData([
            {
                "date": "2023-10-27",
                "noOfSlots": 14,
                "slotInfo": [
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T21:00:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T14:00:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 2,
                        "startTime": "19:30:00",
                        "doctorIds": [
                            1,
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T13:30:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T10:00:00.000+00:00",
                        "doctorIds": [
                            1
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T20:30:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "04:30:00",
                        "doctorIds": [
                            1
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T20:00:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "08:00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T19:30:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "14:00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T15:00:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 1,
                        "startTime": "1970-01-01T14:30:00.000+00:00",
                        "doctorIds": [
                            34
                        ]
                    },
                    {
                        "noOfDoctors": 2,
                        "startTime": "1970-01-02T01:00:00.000+00:00",
                        "doctorIds": [
                            1,
                            34
                        ]
                    }
                ]
            }
        ])
    }, [])

    // const handleSelectEvent = (event) => {
    //     setVal(event.id)
    //     setEvent(event)
    //     eventPropGetter(event)
    // }

    const handleBook = () => {
        setOpen(true);
        console.log(selectedInfo.doctorIds[Math.floor(Math.random()*selectedInfo.doctorIds.length)])
    }

    const saveNewAppointment = async () => {

        // yet to finish

        // console.log("====^^^===");
        // console.log("saveNewAppointment START");
        const now = new Date();
        const url = `http://localhost:9092/youro/api/v1/saveNewAppointment/`;
        try {
            console.log(event); //14:00:00
            console.log(getEndTime(event)); //14:30
            console.log("scheduled"); //scheduled
            console.log(dateSelection); //Mon Oct 23 2023 00:00:00 GMT-0400 (Eastern Daylight Time)
            console.log(now); //Fri Oct 20 2023 12:11:42 GMT-0400 (Eastern Daylight Time)

            // for(let i=0; i<slotsData.length; i++){
            //     // have to compare the slot timings with the selected slot i.e. event/SetEvent
            // }
            const res = await axios.post(url);
            // console.log(res.data);
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
        var hour = parseInt(time.split(":")[0])
        var minutes = time.split(":")[1]

        if (minutes === '30') {
            return `${hour + 1}:00`
        } else {
            return `${hour}:30`
        }
    }

    // const rnFunc = async () => {
    //     var manySlots = await document.querySelector('[aria-label="October 14, 2023"]');
    //    await  manySlots.className += "many_slots"
    // }

    // rnFunc()

    const getSlots = (eve) => {
        var flag = 0
        for(var i = 0; i<slotsData.length; i++){
            if(slotsData[i].date === eve){
                flag = 1;
                console.log(slotsData[i])
                setSlotsOnDate(slotsData[i]);
                break
            }
        }

        if (flag === 0){
            setSlotsOnDate(null);
        }
    }

    const handleSelectSlot = (startTime, info) => {
        setEvent(startTime);
        setSelectedInfo(info)
    }

    const handleDateSelection = (eve) => {
        // event is directly the date
        setDateSelection(eve);
        var date = eve.getFullYear() + "-" + (eve.getMonth() + 1) + "-" + eve.getDate()
        getSlots(date)
        setEvent(false);
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
                            var startTime = data['startTime'].includes("T") ? data['startTime'].split('T')[1].split(':')[0] + ':' + data['startTime'].split('T')[1].split(':')[1] : data['startTime'].split(':')[0] + ':' + data['startTime'].split(':')[1];
                            return (
                                <>
                                    <div onClick={(e) => handleSelectSlot(startTime, data) } className="slot-timings">
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
                    <h3>Appointment with Dr. Farah confirmed</h3>
                    <img src={require('../../assets/Congrats.png')} alt='Congrats' style={{ height: '100px' }}></img><br /><br />
                    {event && <p>Appointment at: &nbsp;<strong> {dateSelection.toLocaleDateString()}, {event} - {getEndTime(event)}</strong></p>}
                </div>
            </Popup>
        </div>

    )
}


export default PatientAppointment;