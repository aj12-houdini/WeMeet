import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostItem from "../Post/PostItem";

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

// The Posts / Followers / Following tabs of a profile.
export default function ProfileTabs({ posts, followers, following, isOwnProfile }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
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
  );
}
