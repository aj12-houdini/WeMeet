import { useEffect, useState } from "react";
import "../../../css/Dashboard/dashboard.css";
import { fetchFeed } from "../../../js/fetchFeed";
import PostItem from "../Post/PostItem";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const feedResponse = await fetchFeed(localStorage.getItem("id"));
      setPosts(feedResponse.followedPostsArr);
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
          <PostItem
            key={post.id}
            canDelete={false}
            id={post.id}
            title={post.title}
            date={post.date}
            description={post.description}
            author={post.user}
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
