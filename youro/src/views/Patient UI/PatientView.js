import React, { useState, useEffect, useRef, useCallback } from "react";
import PatientHomePage from "./PatientHomePage";
import PatientAppointment from "./PatientAppointment";
import PatientChat from "./PatientChat";
import PatientEducate from "./PatientEducate";
import PatientProfile from "./PatientProfile";
import SideBar from "./SideBar";

import { useChatContext } from "../../context/ChatContext";

const PatientView = () => {
  const { selectedChatRef, setSelectedChat, totalMsgCount } = useChatContext();
  const [view, setView] = useState(0);

  useEffect(() => {
    if (view == 2) return;

    // selectedChatRef.current = null;
    setSelectedChat(null);
  }, [view]);

  return (
    <>
      <div className="hm">
        <div className="sidebar">
          <SideBar active={view} setActive={setView} count={totalMsgCount} />
        </div>
        {view === 0 && <PatientHomePage changeView={setView} />}
        {view === 1 && <PatientAppointment changeView={setView} />}
        {view === 2 && <PatientChat changeView={setView} />}
        {view === 3 && <PatientEducate changeView={setView} />}
        {view === 4 && <PatientProfile changeView={setView} />}
      </div>
    </>
  );
};

export default PatientView;
