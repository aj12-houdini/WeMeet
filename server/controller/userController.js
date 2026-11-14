const User = require("../models/User");

async function getUser(req, res) {
  const profileUserId = req.params.id;

  try {
    const user = await User.findById(profileUserId);

    if (user) {
      res.json({
        id: profileUserId,
        username: user.username,
        post: user.post,
        followers: user.followers,
        following: user.following,
      });
    } else res.json({ user: "Not found" });
  } catch (error) {
    console.log(error);
  }
}

async function searchUsers(req, res) {
  const searchTerm = req.params.query;
  if (searchTerm === "") {
    console.log("Empty");
    return;
  }
  const usernameFilter = { username: { $regex: searchTerm, $options: "i" } };

  const matchingUsers = await User.find(usernameFilter);
  res.json({ documents: matchingUsers });
}

async function followUser(req, res) {
  const {
    userid: loggedInUserId,
    followerid: targetUserId,
    followed: followAction,
  } = req.headers;
  try {
    switch (followAction) {
      case "Followed":
        await User.findByIdAndUpdate(loggedInUserId, {
          $push: { following: targetUserId },
        });
        await User.findByIdAndUpdate(targetUserId, {
          $push: { followers: loggedInUserId },
        });
        break;
      case "Unfollow":
        await User.findByIdAndUpdate(loggedInUserId, {
          $pull: { following: targetUserId },
        });
        await User.findByIdAndUpdate(targetUserId, {
          $pull: { followers: loggedInUserId },
        });
        break;
    }
    res.json({ message: "Done" });
  } catch (error) {
    console.log(error);
  }
}

async function getFollowInfo(req, res) {
  const { userid: loggedInUserId, followerid: profileUserId } = req.headers;
  let isFollowing = false;

  let followingUsernames = [];
  let followerUsernames = [];

  try {
    const profileUser = await User.findById(profileUserId);
    let profileUserFollowing = profileUser.following;
    let profileUserFollowers = profileUser.followers;

    for (const followerId of profileUserFollowers) {
      const followerUser = await User.findById(followerId);
      followerUsernames.push(followerUser.username);
    }
    for (const followedId of profileUserFollowing) {
      const followedUser = await User.findById(followedId);
      followingUsernames.push(followedUser.username);
    }
    const loggedInUser = await User.findById(loggedInUserId)
    if (loggedInUser.following.includes(profileUserId)) isFollowing = true;
    else isFollowing = false;
  } catch (error) {
    console.log(error);
  }

  return res.json({
    following: isFollowing,
    followingArr: followingUsernames,
    followersArr: followerUsernames,
  });
}

module.exports = { searchUsers, getUser, followUser, getFollowInfo };
