import "./css/App.css";
import HomePage from "./Components/Landing/HomePage";
import Dashboard from "./Components/Dashboard/Home/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Components/Dashboard/Profile/Profile";
import CreatePostPage from "./Components/Dashboard/Post/CreatePostPage";
import UserProfile from "./Components/UserProfile/UserProfile";
import { io } from "socket.io-client";
import { API_BASE_URL } from "./js/config";
const socket = io(API_BASE_URL);

function App() {
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
