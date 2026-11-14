import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileBody from "../Dashboard/Profile/ProfileBody";
import DashboardNavBar from "../Dashboard/DashboardNavBar";

export default function UserProfile() {
  const { userid } = useParams();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/get/users/${userid}`);
      const data = await res.json();
      setId(userid);
      setUsername(data.username);
    })();
  }, [id, username]);

  return (
    <div className="profile dashboard">
      <DashboardNavBar />
      <ProfileBody id={userid} username={username} />
    </div>
  );
}
