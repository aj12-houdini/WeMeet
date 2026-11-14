import "./css/App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import HomePage from "./Components/Landing/HomePage";
import Dashboard from "./Components/Dashboard/Home/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Components/Dashboard/Profile/Profile";
import CreatePostPage from "./Components/Dashboard/Post/CreatePostPage";
import UserProfile from "./Components/UserProfile/UserProfile";
import { io, socketClient } from "socket.io-client";
const socket = io("http://localhost:8000");

function App() {
  const [message, sendMessage] = useState("");
  const [chat, updateChat] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/home")
    .then((res) => res.json())
    .then((data) => sendMessage(data.message));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage socket={socket} />} />
          <Route path="/dashboard" element={<Dashboard socket={socket} />} />
          <Route path="/dashboard/posts" element={<CreatePostPage />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/users/:userid" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
