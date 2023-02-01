import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, userName, rooNumber }) => {
  const [messageList, setMessageList] = useState([]);
  const [msgContent, setMsgContent] = useState("");
  const [receivedMsg, setReceivedMsg] = useState(null);
  const messageSend = async () => {
    if (msgContent) {
      const msgData = {
        authorName: userName,
        room: rooNumber,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        msgContent,
      };
      await socket.emit("send_message", msgData);
      setMessageList((list) => [...list, msgData]);
      setMsgContent("");
    }
  };

  const handleMessage = (event) => {
    setMsgContent(event.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("in");
      //   console.log(data);
      setReceivedMsg(data);
    });
  }, [socket]);

  useEffect(() => {
    if (receivedMsg) {
      setMessageList((list) => [...list, receivedMsg]);
    }
    console.log(receivedMsg);
  }, [receivedMsg]);

  return (
    <div className="lg:w-[60%] w-[90%] mx-auto mb-10 mt-10">
      <ScrollToBottom className="bg-gray-400 h-[500px] mb-5 rounded-lg border-2 border-solid border-black">
        {!messageList && (
          <p className="text-xl font-bold">Please Start Conversation</p>
        )}
        <div className="mt-10">
          {messageList.map((msg) =>
            msg.authorName === userName ? (
              <div className="chat chat-end">
                <div className="chat-bubble">{msg.msgContent}</div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">
                  {msg.msgContent}
                </div>
              </div>
            )
          )}
        </div>
      </ScrollToBottom>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Type here"
          value={msgContent}
          className="input input-bordered input-primary w-full"
          onChange={handleMessage}
        />
        <button
          onClick={messageSend}
          className="btn btn-circle ml-2"
          disabled={!msgContent}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
