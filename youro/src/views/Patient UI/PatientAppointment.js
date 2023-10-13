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
    const [event, setEvent] = useState({});
    const [dateSelection, setDateSelection] = useState(new Date());
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(dateSelection)
    }, [dateSelection])

    const myEvents = [{
        'id': 1,
        'start': new Date(2023, 9, 13, 10, 0, 0),
        'end': new Date(2023, 9, 13, 10, 30, 0)
      },
      {
        'id': 2,
        'start': new Date(2023, 9, 13, 10, 30, 0),
        'end': new Date(2023, 9, 13, 11, 0, 0)
      },
      {
        'id': 3,
        'start': new Date(2023, 9, 13, 12, 0, 0),
        'end': new Date(2023, 9, 13, 12, 30, 0)
      },
      {
        'id': 4,
        'start': new Date(2023, 9, 13, 13, 0, 0),
        'end': new Date(2023, 9, 13, 13, 30, 0)
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

    return (
        <div style={{display: 'flex', width: '100%', position: 'relative'}}>
            <div style={{display: 'flex', width: '75%', justifyContent: 'space-between'}}>
            <div className="react-calendar-container">
                <h1 style={{top: '55px', position: 'absolute'}}>Schedule Appointment</h1> 
                <ReactCalendar minDate={minDate} maxDate={maxDate} onChange={setDateSelection} value={dateSelection}/>
            </div>
            <div style={{width: '50%', minWidth: '40%', marginTop: '10px'}} className="big-calendar-container">
            {dateSelection && 
            <BigCalendar
                date={dateSelection}
                defaultView={Views.DAY}
                views={['day']}
                events={myEvents}
                localizer={localizer}
                toolbar={true}
                onSelectEvent={handleSelectEvent}
                // selectable
                eventPropGetter={eventPropGetter}
                // scrollToTime={scrollToTime}
            />}
            </div>
            
        </div>
        {event.start && <>
                        <div style={{margin: 'auto'}}>
                        <strong>Selected Date:</strong>&nbsp;&nbsp;{event.start.toDateString()} <br /><br />
                        <strong>Selected Slot:</strong>&nbsp;&nbsp;&nbsp;{event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
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
                <p>Appointment at: &nbsp;<strong> {event.start && event.start.toLocaleDateString()}, {event.start && event.start.toLocaleTimeString()}</strong></p>
            </div>
        </Popup>
            {/* </div> */}
        </div>
        
    )
}


export default PatientAppointment;