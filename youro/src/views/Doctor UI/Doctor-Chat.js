import React, { useEffect, useState, useRef } from "react";
import DoctorSideBar from "./Doctor-Sidebar";
import "../../styles/Doctor-ui/Doctorchat.css";
import Youroheader from "../Youro-header";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import NotificationSound from "../../assets/notification-sound.mp3";
import { useSearchParams } from "react-router-dom";

import ChatMessage from "../ChatMessage";
import { useChatContext } from "../../context/ChatContext";

const DoctorChat = (props) => {
  const {
    stompObject,
    chatUserDetails,
    totalMsgCount,
    updateCount,
    updateChatUserDetails,
    selectedChat,
    setSelectedChat,
    chatData,
    setChatData,
  } = useChatContext();

  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [activeLoader, setActiveLoader] = useState(true);

  const audioPlayer = useRef(null);
  const isFirstRender = useRef(0);

  const [searchParams] = useSearchParams();

  const onReceivedChatUsers = (payload) => {
    var res = JSON.parse(payload.body);
    const chatUsers = [];

    res.forEach((x) => {
      const modObj = {
        name: x.fullName,
        picture: x.image,
        email: x.userEmail,
        uId: x.userId,
      };

      if (chatUserDetails[x.userId]) {
        modObj["message"] = chatUserDetails[x.userId].message;
      }

      chatUsers.push(modObj);
    });

    setSearchData(chatUsers);
  };

  const listenToGetChat = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-data`,
      onReceivedChatData
    );
  };

  const fetchChatUsers = () => {
    stompObject.send(`/app/getChatUsers/${Cookies.get(COOKIE_KEYS.userId)}`);
  };

  const listenToChatUsers = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-users`,
      onReceivedChatUsers
    );
  };

  useEffect(() => {
    if (!stompObject || !stompObject.connected) return;

    setActiveLoader(false);
    listenToChatUsers();
    fetchChatUsers();
    listenToGetChat();
  }, [stompObject?.connected]);

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

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const getChat = async (userId, reload = true) => {
    const sendUrl = `/app/getChat`;

    const data = {
      receiverId: Cookies.get(COOKIE_KEYS.userId),
      senderId: userId,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    stompObject.send(sendUrl, {}, JSON.stringify(data));
  };

  const onReceivedChatData = async (payload, reload = true) => {
    const res = JSON.parse(payload.body);
    setChatData(res);
  };

  // const sortChatUsers = (chatUserDetails) => {
  //   const keyValueArr = Object.entries(chatUserDetails);

  //   keyValueArr.sort((a, b) => {
  //     const d1 = new Date(a[1].time || "03-29-2025");
  //     const d2 = new Date(b[1].time || "03-29-2025");

  //     return d1 - d2;
  //   });

  //   const sortedArr = {};
  //   for (const [key, value] of keyValueArr) {
  //     sortedArr[key] = value;
  //   }

  //   console.log("Sorted arra ::: ", sortedArr);
  //   updateChatUserDetails(sortedArr);
  // };

  const saveChat = async () => {
    if (message.trim()) {
      const msg = message.trim();
      const fromId = parseInt(Cookies.get(COOKIE_KEYS.userId));
      const toId = selectedChat;
      const sendTime = new Date();

      const data = { msg, from: fromId, to: toId, time: sendTime };

      stompObject.send("/app/saveChat", {}, JSON.stringify(data));

      const mssg = { message: msg, fromId, toId, time: sendTime, seen: false };

      const updatedChatUserDet = {
        ...chatUserDetails,
        [toId]: {
          ...chatUserDetails[toId],
          message: msg,
          time: sendTime,
        },
      };
      updateChatUserDetails(updatedChatUserDet);

      const newData = [mssg, ...chatData];
      setChatData(newData);
      // sortChatUsers(updatedChatUserDet);
    }
    setMessage("");
  };

  const updateChatHistory = (userId) => {
    if (!chatUserDetails[userId]) return;

    updateCount(totalMsgCount - chatUserDetails[userId].count);
    chatUserDetails[userId].count = 0;
    updateChatUserDetails(chatUserDetails);
  };

  const ChatNamesUi = (props) => {
    return (
      <div
        className={
          `select-names-div ` +
          (props.data.uId == selectedChat ? "select-names-active" : "")
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
          {chatUserDetails[props.data.uId]?.count ? (
            <p className="mssg-count-ui">
              {chatUserDetails[props.data.uId].count}
            </p>
          ) : null}
          <p className="chat-user-msg">
            {chatUserDetails[props.data.uId] ? (
              chatUserDetails[props.data.uId].message
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
          <DoctorSideBar data={"doctor-chat"} totalMsgCount={totalMsgCount} />
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

                {/* {!searchInput &&
                  chatHistory &&
                  chatHistory.map((data) => {
                    return <ChatNamesUi data={data} />;
                  })} */}

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

              {selectedChat ? (
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
                              selectedChat={selectedChat}
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
