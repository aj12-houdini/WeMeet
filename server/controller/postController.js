const User = require("../models/User");
const Post = require("../models/Post");
const { ValidationError } = require("../errors/ApiError");

function formatPost(post) {
  return {
    id: post._id,
    title: post.title,
    description: post.description,
    date: post.date,
    user: post.user,
  };
}

async function createPost(req, res) {
  const { id:authorId, username, title, description } = req.body;

  if (!username) {
    res.json({ message: "Sign in" });
    return;
  }
  try {
    const post = await Post.create({
      title,
      description,
      date: new Date(),
      user: username,
    });
    const savedPost = await post.save();
    await User.findOneAndUpdate({ _id: authorId }, { $push: { post: savedPost._id } });
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
    const profileUser = await User.findById(profileUserId);
    postIds = profileUser.post;
    if (!profileUser) throw new ValidationError("Could not find user")
    for (let postId of postIds) {
      const post = await Post.findById(postId);
      let formattedPost = formatPost(post);
      userPosts.push(formattedPost);
    }
  } catch (error) {
    console.log(error);
  }

  return res.json({ posts: userPosts });
}

async function deletePost(req, res) {
  const loggedInUserId = req.headers.userid;
  const postId = req.headers.postid;

  const user = await User.findById(loggedInUserId);
  const post = await Post.findById(postId);

  if (post) {
    const deletedPost = await Post.deleteOne({ _id: postId });
    console.log(`Deleted post:  ${deletedPost.deletedCount}`);
  }
  let remainingPostIds = [];
  if (user) {
    remainingPostIds = user.post;
    remainingPostIds.splice(remainingPostIds.indexOf(postId), 1);
    await User.updateOne({ _id: loggedInUserId }, { $set: { post: remainingPostIds } });
  } else console.log("No user found");

  res.json({ message: "Deleted" });
}

async function getPostsOfFollowing(req, res) {
  const loggedInUserId = req.headers.userid;
  let feedPosts = [];
  try {
    const user = await User.findById(loggedInUserId);
    if (user) {
      const followedUserIds = user.following;
      for (let followedUserId of followedUserIds) {
        const followedUser = await User.findById(followedUserId);
        const followedUserPostIds = followedUser.post;
        for (let postId of followedUserPostIds) {
          const post = await Post.findById(postId);
          let formattedPost = formatPost(post);
          feedPosts.push(formattedPost);
        }
      }
    } else console.log("Notfound");
  } catch (error) {
    console.log(error);
  }
  res.json({ followedPostsArr: feedPosts });
}

module.exports = { createPost, getPosts, deletePost, getPostsOfFollowing };
