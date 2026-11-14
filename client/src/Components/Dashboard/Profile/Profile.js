import DashboardNavBar from "../DashboardNavBar";
import ProfileBody from "./ProfileBody";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "../../../js/isUserLoggedIn";


export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const loggedIn = await isUserLoggedIn();
      loggedIn ? setIsLoggedIn(true) : (window.location.href = "/");
    })();
  });
  return (
    <div>
      {isLoggedIn && (
        <div className="profile dashboard">
          {" "}
          <DashboardNavBar /> <ProfileBody username = {localStorage.getItem("username")} id={localStorage.getItem("id")} />{" "}
        </div>
      )}
    </div>
  );
}
