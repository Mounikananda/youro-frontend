import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../App";

const ChatContext = createContext();
const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  // Socket States
  const [stompObject, setStompObject] = useState(null);
  const alreadyRendered = useRef(false);

  // Login details
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [chatUserDetails, setChatUserDetails] = useState();
  const [totalMsgCount, setTotalMsgCount] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData] = useState([]);

  const selectedChatRef = useRef(null);

  const updateCount = (val) => {
    setTotalMsgCount(val);
  };

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Connect using Stomp
  useEffect(() => {
    if (!stompObject) return;

    console.log("Trying......... to connect ");
    stompObject.connect({}, onConnected, onError);
  }, [stompObject]);

  useEffect(() => {
    if (!isLoggedIn) return;

    createStompObject();
  }, [isLoggedIn]);

  useEffect(() => {
    const uid = Cookies.get(COOKIE_KEYS.userId);

    if (uid) setIsLoggedIn(true);
  }, []);

  const createStompObject = () => {
    let Sock = new SockJS("http://localhost:9095/youro/api/v1/ws");
    const stompClient = over(Sock);
    setStompObject(stompClient);
  };

  const updateChatUserDetails = (details) => setChatUserDetails({ ...details });

  //   const connectStomp = () => {
  //     if (!stompObject) return;
  //     console.log("Trying to connect...");
  //     stompObject.connect({}, onConnected, onError);
  //   };

  const onConnected = () => {
    if (!stompObject) return;

    console.log("Stomp ::: ", stompObject);

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

  const onError = (err) => {
    console.error("WebSocket error:", err);
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);

    console.log(
      "Private message conds ::: ",
      selectedChatRef.current,
      payloadData.fromId
    );

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

      setChatUserDetails((prev) => ({
        ...prev,
        [payloadData.fromId]: {
          ...prev[payloadData.fromId],
          message: payloadData.message,
        },
      }));

      setChatData((prevChatData) => [receivedChat, ...prevChatData]);
    }
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: Cookies.get(COOKIE_KEYS.userId),
      status: "JOIN",
    };
    stompObject.send("/app/message", {}, JSON.stringify(chatMessage));
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

  return (
    <ChatContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        stompObject,
        setStompObject,
        selectedChatRef,
        chatUserDetails,
        updateChatUserDetails,
        updateCount,
        totalMsgCount,
        selectedChat,
        setSelectedChat,
        chatData,
        setChatData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { useChatContext, ChatProvider };
