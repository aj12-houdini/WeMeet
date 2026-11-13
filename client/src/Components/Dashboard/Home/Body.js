import { useEffect, useState } from "react";
import "../../../css/Dashboard/dashboard.css";
import { showTimelinePost } from "../../../js/showTimelinePost";
import PostHeader from "../Post/PostHeader";

export default function Body() {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    (async () => {
      const getPosts = await showTimelinePost(localStorage.getItem("id"));
      updatePosts(getPosts.followedPostsArr);
    })();
  }, []);

  return (
    <div>
      <header className="feed-header">
        <h1 className="feed-header__title">Your feed</h1>
        <p className="feed-header__subtitle">
          Latest posts from people you follow
        </p>
      </header>
      {posts.length ? (
        posts.map((post) => (
          <PostHeader
            key={post.id}
            userFlag={false}
            id={post.id}
            title={post.title}
            date={post.date}
            descr={post.description}
            user={post.user}
          />
        ))
      ) : (
        <div className="feed-empty">
          <h2>No posts to show</h2>
          <p>Follow people to see their posts here, or create your own.</p>
        </div>
      )}
    </div>
  );
}
