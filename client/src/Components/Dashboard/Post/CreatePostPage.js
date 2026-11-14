import {  useEffect, useState } from "react";
import { isUserLoggedIn } from "../../../js/isUserLoggedIn";
import DashboardNavBar from "../DashboardNavBar";
import CreatePostForm from "./CreatePostForm";
export default function CreatePostPage() {
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
        <div className="dashboard">
          <DashboardNavBar />
          <CreatePostForm />
        </div>
      )}
    </div>
  );
}
