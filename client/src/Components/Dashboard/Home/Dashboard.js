import DashboardHome from "./DashboardHome";
import { useRequireLogin } from "../../../hooks/useRequireLogin";


export default function Dashboard({socket}) {
  const isLoggedIn = useRequireLogin();

  return <div>{isLoggedIn && <DashboardHome socket={socket} />}</div>;
}
