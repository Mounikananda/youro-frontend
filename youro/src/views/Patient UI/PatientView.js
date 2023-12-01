import React, {useState} from "react";
import PatientHomePage from "./PatientHomePage";
import PatientAppointment from "./PatientAppointment";
import PatientChat from "./PatientChat";
import PatientEducate from "./PatientEducate";
import PatientProfile from "./PatientProfile";
import SideBar from "./SideBar";

const PatientView = () => {

    const [view, setView] = useState(0);
    const [count, setCount] = useState(-1);

    const updateCount = (val) => {
        console.log(val)
        setCount(val)
    }
    
    return (
        <>
        <div className='hm'>
            <div className='sidebar'>
                <SideBar active={view} setActive={setView} count={count}/>
            </div>
            {view === 0 && <PatientHomePage changeView={setView}/>}
            {view === 1 && <PatientAppointment changeView={setView}/>}
            {view === 2 && <PatientChat  changeView={setView} updateCount={updateCount} count={count}/>}
            {view === 3 && <PatientEducate  changeView={setView}/>}
            {view === 4 && <PatientProfile  changeView={setView}/>}
        </div>
        </>
    )
}

export default PatientView;