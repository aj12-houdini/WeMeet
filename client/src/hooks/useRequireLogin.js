import { useEffect, useState } from "react";
import { authApi } from "../js/api/AuthApi";

// Checks the stored token with the server and sends the user back to the
// landing page if it is not valid. Returns true once the check has passed,
// so pages can wait before rendering their content.
export function useRequireLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // No dependency list on purpose: like the original page code, the check
  // runs after every render.
useEffect(() => {
    (async () => {
      const loggedIn = await authApi.isLoggedIn();
      loggedIn ? setIsLoggedIn(true) : (window.location.href = "/");
    })();
  });

  return isLoggedIn;
}
