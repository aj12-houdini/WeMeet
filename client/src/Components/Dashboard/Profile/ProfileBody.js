import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "@mui/material";
import "../../../css/Dashboard/dashboard.css";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { useProfilePosts } from "../../../hooks/useProfilePosts";
import { useFollowInfo } from "../../../hooks/useFollowInfo";

export default function ProfileBody(props) {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const posts = useProfilePosts(props.id);
  const { isFollowing, followers, following, toggleFollow } = useFollowInfo(props.id);

  useEffect(() => {
    if (localStorage.getItem("id") === props.id) setIsOwnProfile(true);
    // Runs once when the page opens, like the original code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="profile-body">
      <ProfileHeader
        username={props.username}
        postCount={posts.length}
        followerCount={followers.length}
        followingCount={following.length}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onToggleFollow={toggleFollow}
      />
      <ProfileTabs
        posts={posts}
        followers={followers}
        following={following}
        isOwnProfile={isOwnProfile}
      />
    </Container>
  );
}
