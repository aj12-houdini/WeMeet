import React, { useEffect, useState } from "react";
import DashboardHome from "./DashboardHome";
import {isUserLoggedIn} from "../../../js/isUserLoggedIn"


export default function Dashboard({socket}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const loggedIn = await isUserLoggedIn();
      loggedIn ? setIsLoggedIn(true) : (window.location.href = "/");
    })();
  });

  return <div>{isLoggedIn && <DashboardHome socket={socket} />}</div>;
}
