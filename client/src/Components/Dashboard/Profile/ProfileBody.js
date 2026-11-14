import  { useEffect, useState } from "react";
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
import PostItem from "../Post/PostItem";
import { followUser } from "../../../js/followUser";
import Button from "@mui/material/Button";
import { fetchFollowerInfo } from "../../../js/fetchFollowerInfo";

function TabPanel(props) {
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

TabPanel.propTypes = {
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
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  function toggleFollow() {
    followUser(props.id, !isFollowing);
    setIsFollowing(!isFollowing);
  }

  useEffect(() => {
    if (localStorage.getItem("id") === props.id) setIsOwnProfile(true);
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
      const followInfo = await fetchFollowerInfo(props.id);
      setIsFollowing(followInfo.isFollowing);
      setFollowers(followInfo.followers);
      setFollowing(followInfo.following);
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
        {!isOwnProfile && (
          <Button
            variant={isFollowing ? "outlined" : "contained"}
            onClick={toggleFollow}
            className="follow"
            disableElevation
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <div className="profile-info">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Profile sections"
            >
              <Tab label="Posts" {...a11yProps(0)} />
              <Tab label="Followers" {...a11yProps(1)} />
              <Tab label="Following" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <div>
            <TabPanel value={activeTab} index={0}>
              {posts.length != 0 ? (
                posts.map((post) => (
                  <PostItem
                    key={post.id}
                    canDelete={isOwnProfile}
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
                  <p>
                    {isOwnProfile
                      ? "Posts you create will appear here."
                      : "This user hasn't posted anything yet."}
                  </p>
                </div>
              )}
            </TabPanel>
          </div>
          <TabPanel value={activeTab} index={1}>
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
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
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
          </TabPanel>
        </Box>
      </div>
    </Container>
  );
}
