import React, {useState, useEffect} from "react";
import { Calendar as ReactCalendar } from 'react-calendar';
import { Calendar as BigCalendar, Views, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const PatientAppointment = (props) => {
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 28);
    const localizer = momentLocalizer(moment);
    const [val, setVal] = useState(-1);
    const [event, setEvent] = useState(null);
    const [dateSelection, setDateSelection] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [slotsData, setSlotsData] = useState(['10', '10:30', '11', '11:30', '12', '12:30', '13', '13:30']);

    useEffect(() => {
        console.log(event)
    }, [event])

    const myEvents = [{
        'id': 1,
        'start': new Date(2023, 9, 14, 10, 0, 0),
        'end': new Date(2023, 9, 14, 10, 30, 0)
      },
      {
        'id': 2,
        'start': new Date(2023, 9, 14, 10, 30, 0),
        'end': new Date(2023, 9, 14, 11, 0, 0)
      },
      {
        'id': 3,
        'start': new Date(2023, 9, 14, 12, 0, 0),
        'end': new Date(2023, 9, 14, 12, 30, 0)
      },
      {
        'id': 4,
        'start': new Date(2023, 9, 14, 13, 0, 0),
        'end': new Date(2023, 9, 14, 13, 30, 0)
      },
    ]

    const handleSelectEvent = (event) => {
        setVal(event.id)
        setEvent(event)
        eventPropGetter(event)
    }

    const handleBook = () => {
        setOpen(true)
    }

    const eventPropGetter = (event) => {
        const backgroundColor = event.id === val  ? 'var(--neon-color)' : 'var(--secondary-color)';
        return { style: { backgroundColor } }
    }

    const getEndTime = (time) => {
        var hour = parseInt(time.split(":")[0])
        var minutes = time.split(":")[1]

        if(minutes === '30'){
            return `${hour+1}`
        } else {
            return `${hour}:30`
        }
    }

    // const rnFunc = async () => {
    //     var manySlots = await document.querySelector('[aria-label="October 14, 2023"]');
    //    await  manySlots.className += "many_slots"
    // }

    // rnFunc()

    return (
        <div style={{display: 'flex', width: '100%', position: 'relative', alignItems: 'center'}}>
            <div style={{display: 'flex', width: '70%', justifyContent: 'space-between'}}>
            <div className="react-calendar-container">
                <h1 style={{top: '55px', position: 'absolute', left: '50px'}}>Schedule Appointment</h1> 
                <ReactCalendar minDate={minDate} maxDate={maxDate} onChange={setDateSelection} value={dateSelection}/>
            </div>
            <div style={{width: '-webkit-fill-available', marginTop: '10px',}} className="slots-container">
                <p>Available Slots on - <strong style={{textDecoration: 'underline'}}>{dateSelection.toLocaleDateString()}</strong></p>
                <div className="slots-container-sub">
                    {slotsData.map((data) => {
                        return (
                            <>
                            <div onClick={(e) => setEvent(data)} className="slot-timings"><span style={{letterSpacing: '1.3px'}}>{data}</span> - <span style={{letterSpacing: '1.3px'}}>{getEndTime(data)}</span></div>
                            </>
                            
                        )                       
                    })} 

                    {slotsData && !slotsData[0] && <h4 style={{letterSpacing: '2px'}}>No slots Available on selected date. Choose another date</h4>}
                </div>
            </div>
            
        </div>
        {event && <>
                        <div style={{margin: 'auto'}}>
                        <strong>Selected Date:</strong>&nbsp;&nbsp;{dateSelection.toDateString()} <br /><br />
                        <strong>Selected Slot:</strong>&nbsp;&nbsp;&nbsp;{event} - {getEndTime(event)}
                        <br /><br /><br /><br /><br />
                        <div className="btn-filled" onClick={handleBook}>Book Appointment</div>

                        </div>
                        
                    </>}

            {/* <div className="congrats-popup"> */}
            <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
            <div style={{position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}} onClick={() => {setOpen(false); props.changeView(0)}}>
                <span class="material-symbols-outlined">
                close
                </span>
            </div>
            <div style={{padding: '50px 20px', textAlign: 'center'}}>
                <h3>Congratulations !!!</h3>
                <h3>Appointment with Dr. Farah confirmed</h3>
                <img src={require('../../assets/Congrats.png')} alt='Congrats' style={{height: '100px'}}></img><br/><br/>
                {event && <p>Appointment at: &nbsp;<strong> {dateSelection.toLocaleDateString()}, {event} - {getEndTime(event)}</strong></p>}
            </div>
        </Popup>
            {/* </div> */}
        </div>
        
    )
}


export default PatientAppointment;