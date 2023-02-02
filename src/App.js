import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./components/Chat";
import LogIn from "./components/LogIn";

const socket = io.connect("https://chit-chat-demo-server.onrender.com/");
function App() {
  const [userName, setUserName] = useState("");
  const [rooNumber, setRoomNumber] = useState("");

  return (
    <div className="App">
      {userName && rooNumber ? (
        <Chat socket={socket} userName={userName} rooNumber={rooNumber}></Chat>
      ) : (
        <LogIn
          socket={socket}
          setUserName={setUserName}
          setRoomNumber={setRoomNumber}
        ></LogIn>
      )}
    </div>
  );
}

export default App;
