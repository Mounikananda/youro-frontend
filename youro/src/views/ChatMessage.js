import { useEffect, useRef } from "react";
import { COOKIE_KEYS } from "../App";
import Cookies from "js-cookie";

const ChatMessage = ({
  data,
  timestamp,
  prevTimeStamp,
  stompObject,
  selectedChat,
}) => {
  const alreadyRendered = useRef(false);

  const updateChatStatus = () => {
    const updateData = {
      fromId: selectedChat,
      toId: parseInt(Cookies.get(COOKIE_KEYS.userId)),
      time: `${new Date()}`,
    };

    stompObject.send("/app/updateChat", {}, JSON.stringify(updateData));
  };

  useEffect(() => {
    if (alreadyRendered.current || data.seen) return;

    console.log("caht data ::: ", data);
    console.log(
      "Conds :: ",
      data.fromId != Cookies.get(COOKIE_KEYS.userId),
      !data.seen
    );
    alreadyRendered.current = true;
    if (data.fromId != Cookies.get(COOKIE_KEYS.userId) && !data.seen) {
      updateChatStatus();
    }
  }, []);

  return (
    <>
      <div
        className={
          data.fromId == Cookies.get(COOKIE_KEYS.userId)
            ? "chat-sent-text"
            : "chat-received-text"
        }
      >
        {data.message}
        <span className="chat-time-stamp">
          &nbsp;&nbsp;
          {timestamp.toLocaleTimeString().split(":")[0] +
            ":" +
            timestamp.toLocaleTimeString().split(":")[1] +
            " " +
            timestamp.toLocaleTimeString().split(" ")[1]}
        </span>
      </div>
      {!prevTimeStamp ||
      (prevTimeStamp && prevTimeStamp != timestamp.toLocaleDateString()) ? (
        <div className="chat-timestamp">{timestamp.toLocaleDateString()}</div>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatMessage;
