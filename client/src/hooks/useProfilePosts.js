import { useEffect, useState } from "react";
import { postApi } from "../js/api/PostApi";

// Loads the posts of one profile when the page opens.
export function useProfilePosts(profileUserId) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await postApi.getUserPosts(profileUserId);
      setPosts(data.posts);
    })();
    // Runs once when the page opens, like the original ProfileBody code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return posts;
}
