import React, { useState, useEffect, useRef, useCallback } from "react";
import PatientHomePage from "./PatientHomePage";
import PatientAppointment from "./PatientAppointment";
import PatientChat from "./PatientChat";
import PatientWebChat from "./PatientWebChat";
import PatientEducate from "./PatientEducate";
import PatientProfile from "./PatientProfile";
import SideBar from "./SideBar";

import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../App";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const PatientView = () => {
  const [view, setView] = useState(0);
  const [count, setCount] = useState(-1);
  console.log("Is Mounting");
  const [chatUserDetails, setChatUserDetails] = useState();
  const [totalMsgCount, setTotalMsgCount] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState([]);

  const selectedChatRef = useRef(null);

  const updateCount = (val) => {
    setTotalMsgCount(val);
  };

  // Socket States
  const [stompObject, setStompObject] = useState(null);
  const alreadyRendered = useRef(false);

  const updateChatUserDetails = (details) => setChatUserDetails({ ...details });

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);

    if (selectedChatRef.current != payloadData.fromId) {
      setChatUserDetails((prev) => ({
        ...prev,
        [payloadData.fromId]: {
          ...prev[payloadData.fromId],
          count: prev[payloadData.fromId].count + 1,
          message: payloadData.message,
        },
      }));
      setTotalMsgCount((prev) => prev + 1);
    } else {
      const receivedChat = {
        time: payloadData.time,
        message: payloadData.message,
        toId: payloadData.toId,
        fromId: payloadData.fromId,
        seen: payloadData.seen,
      };

      setChatData((prevChatData) => [receivedChat, ...prevChatData]);
    }

    // const receivedChat = {
    //   time: payloadData.time,
    //   message: payloadData.message,
    //   toId: payloadData.toId,
    //   fromId: payloadData.fromId,
    //   seen: payloadData.seen,
    // };
  };

  const onReceivedChatHistory = async (payload, reload = true) => {
    // if (reload) setActiveLoader(true);
    var res = JSON.parse(payload.body);
    console.log("received chat history :: ", res);

    // setChatHistory(res);
    const chatDet = {};
    let totalCnt = 0;
    res.forEach((x) => {
      chatDet[x.uId] = x;
      totalCnt += x.count;
    });
    console.log("Chat Det ::: ", chatDet);
    setChatUserDetails({ ...chatDet });
    setTotalMsgCount(totalCnt);
  };

  const fetchChatHistory = () => {
    stompObject.send(`/app/getChatHistory/${Cookies.get(COOKIE_KEYS.userId)}`);
  };

  const listenToChatHistory = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-history`,
      onReceivedChatHistory
    );
  };

  const onConnected = () => {
    if (!stompObject) return;

    stompObject.subscribe(
      "/user/" + Cookies.get(COOKIE_KEYS.userId) + "/private",
      function (payload) {
        console.log("Chat user details before private ::: ", selectedChat);
        onPrivateMessage(payload);
      }
    );

    //subscribe to get chat History
    listenToChatHistory();
    fetchChatHistory();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: Cookies.get(COOKIE_KEYS.userId),
      status: "JOIN",
    };
    stompObject.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onError = (err) => {
    console.log(err);
  };

  const createStompObject = () => {
    let Sock = new SockJS("http://localhost:9095/youro/api/v1/ws");
    const stompClient = over(Sock);
    setStompObject(stompClient);
  };

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    console.log("Chat user in useEffect :: ", chatUserDetails);
  }, [chatUserDetails]);

  // Connect using Stomp
  useEffect(() => {
    if (!stompObject) return;

    console.log("Trying......... to connect ");
    stompObject.connect({}, onConnected, onError);
  }, [stompObject]);

  useEffect(() => {
    if (alreadyRendered.current) return;

    alreadyRendered.current = true;
    createStompObject();

    return () => {
      selectedChatRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (view == 2) return;

    selectedChatRef.current = null;
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
        {/* {view === 2 && <PatientChat  changeView={setView} updateCount={updateCount} count={count}/>} */}
        {view === 2 && (
          <PatientWebChat
            stompObject={stompObject}
            chatUserDetails={chatUserDetails}
            updateChatUserDetails={updateChatUserDetails}
            changeView={setView}
            updateCount={updateCount}
            count={totalMsgCount}
            seletedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chatData={chatData}
            setChatData={setChatData}
          />
        )}
        {view === 3 && <PatientEducate changeView={setView} />}
        {view === 4 && <PatientProfile changeView={setView} />}
      </div>
    </>
  );
};

export default PatientView;
