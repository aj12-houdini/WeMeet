import DashboardNavBar from "../DashboardNavBar";
import ProfileBody from "./ProfileBody";
import { useRequireLogin } from "../../../hooks/useRequireLogin";


export default function Profile() {
  const isLoggedIn = useRequireLogin();
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
