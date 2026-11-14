import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileBody from "../Dashboard/Profile/ProfileBody";
import DashboardNavBar from "../Dashboard/DashboardNavBar";
import { userApi } from "../../js/api/UserApi";

export default function UserProfile() {
  const { userid } = useParams();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    (async () => {
      const data = await userApi.getUser(userid);
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
