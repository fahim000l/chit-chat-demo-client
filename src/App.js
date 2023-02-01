import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./components/Chat";
import LogIn from "./components/LogIn";

const socket = io.connect("http://localhost:5000");

function App() {
  const [userName, setUserName] = useState("");
  const [rooNumber, setRoomNumber] = useState("");

  // useEffect(() => {
  //   if (rooNumber) {
  //     console.log(rooNumber);
  //     socket.emit("join_room", rooNumber);
  //   }
  // }, [rooNumber]);

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
