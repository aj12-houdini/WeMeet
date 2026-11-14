const userService = require("../services/UserService");
const postService = require("../services/PostService");
const { ValidationError } = require("../errors/ApiError");

async function createPost(req, res) {
  const { id:authorId, username, title, description } = req.body;

  if (!username) {
    res.json({ message: "Sign in" });
    return;
  }
  try {
    const savedPost = await postService.create(title, description, username);
    await userService.addPostToUser(authorId, savedPost._id);
    res.json({ created: true, post_id: savedPost._id });
  } catch (error) {
    console.log(error);
  }
}

async function getPosts(req, res) {
  const profileUserId = req.headers.id;
  if (!profileUserId) {
    console.log("Invalid username");
    return;
  }
  let postIds = [];
  let userPosts = [];
  try {
    const profileUser = await userService.findById(profileUserId);
    postIds = profileUser.post;
    if (!profileUser) throw new ValidationError("Could not find user")
    await postService.collectFormattedPosts(postIds, userPosts);
  } catch (error) {
    console.log(error);
  }

  return res.json({ posts: userPosts });
}

async function deletePost(req, res) {
  const loggedInUserId = req.headers.userid;
  const postId = req.headers.postid;

  const user = await userService.findById(loggedInUserId);
  const post = await postService.findById(postId);

  if (post) {
    const deletedPost = await postService.deleteById(postId);
    console.log(`Deleted post:  ${deletedPost.deletedCount}`);
  }
  if (user) {
    await userService.removePostFromUser(user, postId);
  } else console.log("No user found");

  res.json({ message: "Deleted" });
}

async function getPostsOfFollowing(req, res) {
  const loggedInUserId = req.headers.userid;
  let feedPosts = [];
  try {
    const user = await userService.findById(loggedInUserId);
    if (user) {
      for (const followedUserId of user.following) {
        const followedUser = await userService.findById(followedUserId);
        await postService.collectFormattedPosts(followedUser.post, feedPosts);
      }
    } else console.log("Notfound");
  } catch (error) {
    console.log(error);
  }
  res.json({ followedPostsArr: feedPosts });
}

module.exports = { createPost, getPosts, deletePost, getPostsOfFollowing };
