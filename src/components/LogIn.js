import React from "react";

const LogIn = ({ socket, setUserName, setRoomNumber }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const userName = form.userName.value;
    const roomNumber = form.roomNumber.value;

    setUserName(userName);
    setRoomNumber(roomNumber);

    socket.emit("join_room", roomNumber);
  };

  return (
    <div className="lg:w-[60%] w-[90%] mx-auto mt-10 bg-blue-300 p-10 border-2 border-solid border-blue-700 rounded-lg">
      <p className="font-bold text-xl">
        Please enter your user Name and room number to log in
      </p>
      <p className="text-red-600 font-bold">
        Note: This is a demo project for socket.io. You can only chat with
        those, who are in the same room number
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="block text-start text-xl font-bold mb-2">
            User Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="userName"
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="" className="block text-start text-xl font-bold mb-2">
            Room Number
          </label>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="roomNumber"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-5 w-full">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
