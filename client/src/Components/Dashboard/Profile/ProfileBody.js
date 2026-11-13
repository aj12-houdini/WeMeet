import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "bootstrap/dist/css/bootstrap.css";
import { deepPurple } from "@mui/material/colors";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import "../../../css/Dashboard/dashboard.css";
import PostHeader from "../Post/PostHeader";
import { followUser } from "../../../js/follow";
import Button from "@mui/material/Button";
import { checkFollower } from "../../../js/checkFollower";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileBody(props) {
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);
  const [userFlag, changeFlag] = useState(false);
  const [follow, changeFollow] = useState(false);
  const [followers, updateFollowers] = useState([]);
  const [following, updateFollowing] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function callFollow() {
    followUser(props.id, !follow);
  }

  function updateFollow() {
    callFollow();
    changeFollow(!follow);
  }

  useEffect(() => {
    if (localStorage.getItem("id") === props.id) changeFlag(true);
    (async () => {
      const options = {
        method: "GET",
        headers: {
          id: props.id,
        },
      };
      const response = await fetch("http://localhost:8000/get/posts", options);
      const data = await response.json();
      setPosts(data.posts);
    })();
    (async () => {
      const { isFollowing, followers, following } = await checkFollower(
        props.id
      );
      changeFollow(isFollowing);
      updateFollowers(followers);
      updateFollowing(following);
    })();
  }, []);

  return (
    <Container className="profile-body">
      <div className="profile-heading">
        <Avatar
          className="profile-heading__avatar"
          sx={{ bgcolor: deepPurple[500], width: 72, height: 72, fontSize: 28 }}
        >
          {(props.username || "?").slice(0, 2).toUpperCase()}
        </Avatar>
        <div className="profile-heading__info">
          <h1 className="profile-heading__name">{props.username}</h1>
          <div className="profile-heading__stats">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{followers.length}</strong> followers
            </span>
            <span>
              <strong>{following.length}</strong> following
            </span>
          </div>
        </div>
        {!userFlag && (
          <Button
            variant={follow ? "outlined" : "contained"}
            onClick={() => updateFollow()}
            className="follow"
            disableElevation
          >
            {follow ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <div className="profile-info">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Profile sections"
            >
              <Tab label="Posts" {...a11yProps(0)} />
              <Tab label="Followers" {...a11yProps(1)} />
              <Tab label="Following" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <div>
            <CustomTabPanel value={value} index={0}>
              {posts.length != 0 ? (
                posts.map((post) => (
                  <PostHeader
                    key={post.id}
                    userFlag={userFlag}
                    id={post.id}
                    title={post.title}
                    date={post.date}
                    descr={post.description}
                    user = {post.user}
                  />
                ))
              ) : (
                <div className="feed-empty">
                  <h2>No posts to show</h2>
                  <p>
                    {userFlag
                      ? "Posts you create will appear here."
                      : "This user hasn't posted anything yet."}
                  </p>
                </div>
              )}
            </CustomTabPanel>
          </div>
          <CustomTabPanel value={value} index={1}>
            {followers.length ? (
              followers.map((follower) => (
                <div key={follower} className="connections">
                  <span className="connections__avatar">
                    {follower.slice(0, 1).toUpperCase()}
                  </span>
                  {follower}
                </div>
              ))
            ) : (
              <p className="profile-empty">No followers yet.</p>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {following.length ? (
              following.map((followed) => (
                <div key={followed} className="connections">
                  <span className="connections__avatar">
                    {followed.slice(0, 1).toUpperCase()}
                  </span>
                  {followed}
                </div>
              ))
            ) : (
              <p className="profile-empty">Not following anyone yet.</p>
            )}
          </CustomTabPanel>
        </Box>
      </div>
    </Container>
  );
}
