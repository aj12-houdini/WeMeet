const userService = require("../services/UserService");

async function getUser(req, res) {
  const profileUserId = req.params.id;

  try {
    const user = await userService.findById(profileUserId);

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
  const matchingUsers = await userService.searchByUsername(searchTerm);
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
        await userService.follow(loggedInUserId, targetUserId)
        break;
      case "Unfollow":
        await userService.unfollow(loggedInUserId, targetUserId)
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
    const profileUser = await userService.findById(profileUserId);
    let profileUserFollowing = profileUser.following;
    let profileUserFollowers = profileUser.followers;

    await userService.collectUserNames(profileUserFollowers, followerUsernames);
    await userService.collectUserNames(profileUserFollowing, followingUsernames);

    isFollowing = await userService.isFollowing(loggedInUserId, profileUserId);
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
