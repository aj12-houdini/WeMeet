import { useEffect, useState } from "react";
import { userApi } from "../js/api/UserApi";

// Loads who a profile follows, who follows it, and whether the logged-in
// user follows it. Also provides toggleFollow for the Follow button.
export function useFollowInfo(profileUserId) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    (async () => {
      const followInfo = await userApi.getFollowInfo(profileUserId);
      setIsFollowing(followInfo.isFollowing);
      setFollowers(followInfo.followers);
      setFollowing(followInfo.following);
    })();
    // Runs once when the page opens, like the original ProfileBody code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleFollow() {
    userApi.follow(profileUserId, !isFollowing);
    setIsFollowing(!isFollowing);
  }

  return { isFollowing, followers, following, toggleFollow };
}
