import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { deepPurple } from "@mui/material/colors";

// Avatar, name, counts and (on other people's profiles) the Follow button.
export default function ProfileHeader({
  username,
  postCount,
  followerCount,
  followingCount,
  isOwnProfile,
  isFollowing,
  onToggleFollow,
}) {
  return (
    <div className="profile-heading">
      <Avatar
        className="profile-heading__avatar"
        sx={{ bgcolor: deepPurple[500], width: 72, height: 72, fontSize: 28 }}
      >
        {(username || "?").slice(0, 2).toUpperCase()}
      </Avatar>
      <div className="profile-heading__info">
        <h1 className="profile-heading__name">{username}</h1>
        <div className="profile-heading__stats">
          <span>
            <strong>{postCount}</strong> posts
          </span>
          <span>
            <strong>{followerCount}</strong> followers
          </span>
          <span>
            <strong>{followingCount}</strong> following
          </span>
        </div>
      </div>
      {!isOwnProfile && (
        <Button
          variant={isFollowing ? "outlined" : "contained"}
          onClick={onToggleFollow}
          className="follow"
          disableElevation
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
}
