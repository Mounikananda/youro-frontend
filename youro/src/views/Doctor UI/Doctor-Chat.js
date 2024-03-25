import React, { useEffect, useState, useRef } from "react";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctorchat.css";
import Youroheader from "../Youro-header";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import axios from "axios";
import NotificationSound from "../../assets/notification-sound.mp3";
import { useSearchParams } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

import ChatMessage from "../ChatMessage";

// var stompClient = null;
const DoctorChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [seletedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [totalMssgCount, setTotalMssgCount] = useState(0);

  const audioPlayer = useRef(null);
  const isFirstRender = useRef(0);

  const [searchParams] = useSearchParams();

  // socket states
  const alreadyRendered = useRef(false);
  const [stompObject, setStompObject] = useState(null);

  //subscribe and send to get chat users
  const fetchChatUsers = () => {
    stompObject.send(`/app/getChatUsers/${Cookies.get(COOKIE_KEYS.userId)}`);
  };
  const listenToChatUsers = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-users`,
      onReceivedChatUsers
    );
  };

  //subscribe and send to get chat history
  const fetchChatHistory = () => {
    stompObject.send(`/app/getChatHistory/${Cookies.get(COOKIE_KEYS.userId)}`);
  };

  const listenToChatHistory = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-history`,
      onReceivedChatHistory
    );
  };

  const listenToGetChat = () => {
    console.log("Stomp opbject :: ", stompObject);
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-data`,
      onReceivedChatData
    );
  };

  const onReceivedChatUsers = (payload) => {
    var res = JSON.parse(payload.body);

    console.log("Payload ::: ", res);
    //remove this 1 line later
    // getChatHistory();
    console.log("Chat history :: ", chatHistory);
    const dupChatHistory = [...chatHistory];
    const response = res;
    var dupSearchData = [];

    for (var i = 0; i < response.length; i++) {
      var flag = 0;
      for (var j = 0; j < dupChatHistory.length; j++) {
        if (response[i].userId == dupChatHistory[j].uId) {
          flag = 1;
          break;
        }
      }
      var dic = {};
      if (flag != 1) {
        dic.uId = response[i].userId;
        dic.picture = response[i].image;
        dic.name = response[i].fullName;
        dic.email = response[i].userEmail;
      } else {
        dic = dupChatHistory[j];
        dic.email = response[i].userEmail;
      }

      dupSearchData.push(dic);
    }

    setSearchData(dupSearchData);
  };

  const onConnected = () => {
    stompObject.subscribe(
      "/user/" + Cookies.get(COOKIE_KEYS.userId) + "/private",
      onPrivateMessage
    );

    listenToGetChat();
    userJoin();

    // subscribe to get chat users
    listenToChatUsers();
    fetchChatUsers();

    //subscribe to get chat History
    listenToChatHistory();
    fetchChatHistory();
  };

  const createStompObject = () => {
    let Sock = new SockJS("http://localhost:9095/youro/api/v1/ws");
    const stompClient = over(Sock);
    setStompObject(stompClient);
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

  const onPrivateMessage = (payload) => {
    console.log("on  proivate msg entry");
    var payloadData = JSON.parse(payload.body);

    console.log("Paylooad ::: ", payloadData);

    // const receivedChat = {
    //   time: payloadData.time,
    //   message: payloadData.msg,
    //   toId: payloadData.to,
    //   fromId: payloadData.from,
    // };
    const receivedChat = {
      time: payloadData.time,
      message: payloadData.message,
      toId: payloadData.toId,
      fromId: payloadData.fromId,
      seen: payloadData.seen,
    };

    console.log("Received data :: ", receivedChat);
    setChatData((prevChatData) => [receivedChat, ...prevChatData]);
  };

  useEffect(() => {
    if (alreadyRendered.current) return;

    alreadyRendered.current = true;
    createStompObject();
  }, []);

  useEffect(() => {
    if (!stompObject) return;
    console.log("Trying......... to connect ");
    stompObject.connect({}, onConnected, onError);
  }, [stompObject]);

  useEffect(() => {
    setSelectedChat(searchParams.get("patientId"));
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current > 0 && isFirstRender.current < 3) {
      if (searchParams.get("patientId")) {
        if (
          chatHistory &&
          chatHistory.filter(
            (data, i) => data.uId == searchParams.get("patientId")
          ).length > 0
        ) {
        } else {
          console.log(chatHistory);
          const dupChatHistory = [...chatHistory];

          var dic = {};

          dic.uId = searchParams.get("patientId");
          dic.picture = null;
          dic.name = searchParams.get("name");
          dic.email = null;

          dupChatHistory.unshift(dic);

          setChatHistory(dupChatHistory);
        }
      }
    }
    isFirstRender.current = isFirstRender.current + 1;
  }, [chatHistory]);

  const [activeLoader, setActiveLoader] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  // function playAudio() {
  //   audioPlayer?.current?.play();
  // }

  const onReceivedChatHistory = async (payload, reload = true) => {
    if (reload) setActiveLoader(true);
    var res = JSON.parse(payload.body);
    await setChatHistory(res);
    const response = res;
    var total = 0;
    for (var i = 0; i < response.length; i++) {
      total += response[i].count;
    }
    setTotalMssgCount(total);
    //props.updateCount(total);
    setActiveLoader(false);
  };

  const getChat = async (userId, reload = true) => {
    const sendUrl = `/app/getChat`;
    const data = {
      senderId: Cookies.get(COOKIE_KEYS.userId),
      receiverId: userId,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    stompObject.send(sendUrl, {}, JSON.stringify(data));
  };

  const onReceivedChatData = async (payload, reload = true) => {
    const res = JSON.parse(payload.body);
    setChatData(res);
  };

  const saveChat = async () => {
    if (message.trim()) {
      const msg = message.trim();
      const fromId = parseInt(Cookies.get(COOKIE_KEYS.userId));
      const toId = seletedChat;
      const sendTime = new Date();

      const data = { msg, from: fromId, to: toId, time: sendTime };

      stompObject.send("/app/saveChat", {}, JSON.stringify(data));

      const mssg = { message: msg, fromId, toId, time: sendTime, seen: false };

      const newData = [mssg, ...chatData];
      setChatData(newData);
    }
    setMessage("");
  };

  const updateChatHistory = (userId) => {
    const userIdx = chatHistory.findIndex((x) => x.uId === userId);

    if (userIdx > -1) {
      setTotalMssgCount((prev) => prev - chatHistory[userIdx].count);
      chatHistory[userIdx].count = 0;

      setChatHistory([...chatHistory]);
    }
  };

  const ChatNamesUi = (props) => {
    return (
      <div
        className={
          `select-names-div ` +
          (props.data.uId == seletedChat ? "select-names-active" : "")
        }
        onClick={() => {
          setSelectedChat(props.data.uId);
          getChat(props.data.uId);
          updateChatHistory(props.data.uId);
        }}
      >
        {/* <h3>{data.name}</h3> */}

        <div style={{ height: "inherit" }}>
          <img
            style={{ height: "60px", width: "60px", borderRadius: "100%" }}
            src={
              props.data.picture
                ? `data:image/png;base64,${props.data.picture}`
                : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9"
            }
            className=""
            alt="Patient Image"
          />
        </div>
        <div className="chat-user">
          <p
            style={{
              margin: "10px",
              fontWeight: "900",
              fontSize: "large",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "inline",
            }}
          >
            {props.data.name}
          </p>
          {props.data.count && props.data.count != 0 ? (
            <p className="mssg-count-ui">{props.data.count}</p>
          ) : null}
          <p className="chat-user-msg">
            {props.data.message ? (
              props.data.message
            ) : (
              <span style={{ fontSize: "10px" }}>start conversation</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveChat();
    }
  };

  var loadingClass = isLoading ? "chatApp__convButton--loading" : "";
  let sendButtonIcon = !isLoading ? (
    <span class="material-symbols-outlined">send</span>
  ) : (
    ""
  );

  return (
    <div>
      <Loader active={activeLoader} />
      <div className="doctor-chat">
        <div className="sidebar">
          <DoctorSideBar data={"doctor-chat"} mssgCount={totalMssgCount} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0% 2%",
            width: "100%",
          }}
        >
          <Youroheader />
          <div style={{}}>
            {/* <Youroheader/> */}
            <div className="chat-container-main">
              <div className="select-names">
                <div style={{ margin: "0px auto 20px auto", width: "90%" }}>
                  <input
                    type="text"
                    className="text-input-styled"
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search or start new chat"
                  ></input>
                </div>

                {!searchInput &&
                  chatHistory &&
                  chatHistory.map((data) => {
                    return <ChatNamesUi data={data} />;
                  })}

                {((chatHistory && !chatHistory[0]) || searchInput) &&
                  searchData &&
                  searchData.map((data) => {
                    return (
                      <>
                        {(data.name
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                          (data.email &&
                            data.email
                              .toLowerCase()
                              .includes(searchInput.toLowerCase()))) && (
                          <ChatNamesUi data={data} />
                        )}
                      </>
                    );
                  })}
              </div>

              {seletedChat ? (
                <div className="selected-chat-view" onKeyDown={handleKeyDown}>
                  <div
                    id="chat-scroll"
                    style={{
                      width: "100%",
                      paddingLeft: "15px",
                      height: "82vh",
                      overflowY: "auto",
                    }}
                  >
                    {/* <div className="chat-timestamp">Today, 8:30 PM</div> */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        padding: "20px",
                      }}
                    >
                      <div ref={divRef}></div>
                      {chatData &&
                        chatData.map((data, i) => {
                          var timestamp = new Date(data.time);
                          var k = chatData[i + 1]
                            ? new Date(chatData[i + 1].time)
                            : "";
                          var prevTimeStamp = k ? k.toLocaleDateString() : "";

                          return (
                            <ChatMessage
                              key={`${data.time}-${i}`}
                              data={data}
                              timestamp={timestamp}
                              prevTimeStamp={prevTimeStamp}
                              stompObject={stompObject}
                              selectedChat={seletedChat}
                            />
                          );
                        })}

                      {chatData && !chatData[0] && (
                        <>
                          <div
                            style={{
                              margin: "0px auto",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={require("../../assets/Chat-Wave.png")}
                              alt="Say Hello"
                              style={{ width: "50%" }}
                            ></img>
                            <p
                              style={{
                                textAlign: "center",
                                fontSize: "1.5rem",
                              }}
                            >
                              <strong>Say "Hello"</strong>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {/* <div className="chat-received-text">Hello<span className="chat-time-stamp">&nbsp;&nbsp;12:20</span></div>
                        <div className="chat-sent-text">How are you doing today?</div> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      justifyContent: "space-between",
                      width: "98%",
                    }}
                  >
                    <input
                      type="textbox"
                      className="text-input-styled"
                      placeholder="Type your message here...."
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                    <div
                      className={"chatApp__convButton " + loadingClass}
                      onClick={() => {
                        setIsloading(true);
                        saveChat();
                      }}
                    >
                      {sendButtonIcon}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ margin: "0px auto" }}>
                  <img
                    src={require("../../assets/no_selection_chat.png")}
                    alt="No selected chat"
                    style={{ height: "80%" }}
                  ></img>
                  <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
                    <strong>Select a chat to display</strong>
                  </p>
                </div>
              )}
            </div>
            <audio ref={audioPlayer} src={NotificationSound} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorChat;
