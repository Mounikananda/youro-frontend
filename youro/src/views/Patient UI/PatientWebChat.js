import React, { useEffect, useState, useRef } from "react";
import "../../styles/Doctor-ui/Doctorchat.css";
import Youroheader from "../Youro-header";
import { COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import ChatMessage from "../ChatMessage";

const PatientWebChat = (props) => {
  const [viewVal, setViewVal] = useState(0);
  const navToProfile = () => {
    props.changeView(4);
  };
  useEffect(() => {
    if (viewVal == 4) {
      navToProfile();
    }
  }, [viewVal]);

  const [chatHistory, setChatHistory] = useState([]);
  const [seletedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [totalMssgCount, setTotalMssgCount] = useState(0);
  const isFirstRender = useRef(0);

  // Socket States
  const [stompObject, setStompObject] = useState(null);
  const alreadyRendered = useRef(false);

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

  const listenToGetChat = () => {
    stompObject.subscribe(
      `/user/${Cookies.get(COOKIE_KEYS.userId)}/chat-data`,
      onReceivedChatData
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

  const onReceivedChatUsers = (payload) => {
    var res = JSON.parse(payload.body);
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

  const onReceivedChatHistory = async (payload, reload = true) => {
    if (reload) setActiveLoader(true);
    var res = JSON.parse(payload.body);
    console.log("received chat history :: ", res);

    setChatHistory(res);
    const response = res;
    var total = 0;
    for (var i = 0; i < response.length; i++) {
      total += response[i].count;
    }
    setTotalMssgCount(total);
    props.updateCount(total);
    setActiveLoader(false);
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

  const userJoin = () => {
    var chatMessage = {
      senderName: Cookies.get(COOKIE_KEYS.userId),
      status: "JOIN",
    };
    stompObject.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const createStompObject = () => {
    let Sock = new SockJS("http://localhost:9095/youro/api/v1/ws");
    const stompClient = over(Sock);
    setStompObject(stompClient);
  };

  useEffect(() => {
    if (alreadyRendered.current) return;

    alreadyRendered.current = true;
    createStompObject();
  }, []);

  // Connect using Stomp
  useEffect(() => {
    if (!stompObject) return;

    console.log("Trying......... to connect ");
    stompObject.connect({}, onConnected, onError);
  }, [stompObject]);

  const [activeLoader, setActiveLoader] = useState(false);

  const divRef = useRef(null);

  // Scroll into view for divRef
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);

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

    setChatData((prevChatData) => [receivedChat, ...prevChatData]);
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

      setChatHistory(chatHistory);
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
        <div>
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
          <p style={{ margin: "10px" }}>
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
    <div style={{ width: "100%" }}>
      <Loader active={activeLoader} />
      {/* <div className='sidebar'>
        </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0% 2%",
          width: "100%",
        }}
      >
        {/* <Youroheader/> */}
        <Youroheader setView={setViewVal} />

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
                        // <>
                        //   <div
                        //     className={
                        //       data.fromId == Cookies.get(COOKIE_KEYS.userId)
                        //         ? "chat-sent-text"
                        //         : "chat-received-text"
                        //     }
                        //   >
                        //     {data.message}
                        //     <span className="chat-time-stamp">
                        //       &nbsp;&nbsp;
                        //       {timestamp.toLocaleTimeString().split(":")[0] +
                        //         ":" +
                        //         timestamp.toLocaleTimeString().split(":")[1] +
                        //         " " +
                        //         timestamp.toLocaleTimeString().split(" ")[1]}
                        //     </span>
                        //   </div>
                        //   {!prevTimeStamp ||
                        //   (prevTimeStamp &&
                        //     prevTimeStamp != timestamp.toLocaleDateString()) ? (
                        //     <div className="chat-timestamp">
                        //       {timestamp.toLocaleDateString()}
                        //     </div>
                        //   ) : (
                        //     ""
                        //   )}
                        // </>
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
                        <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
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
      </div>
    </div>
  );
};
export default PatientWebChat;
