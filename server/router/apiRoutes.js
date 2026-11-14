require("dotenv").config();
const express = require("express");
const router = express.Router();

const {
  validateSignIn,
  validateSignUp,
  isRequestValidated,
  validatePost,
} = require("../validators/requestValidators");
const { signup, signIn } = require("../controller/authController");
const { createPost, getPosts, deletePost, getPostsOfFollowing } = require("../controller/postController");
const { searchUsers, getUser, followUser, getFollowInfo } = require("../controller/userController");

router.route("/auth/signup").post(validateSignUp, isRequestValidated, signup);
router.route("/auth/login").post(validateSignIn, isRequestValidated, signIn);
router.route("/post").post(validatePost, isRequestValidated, createPost);
router.route("/get/posts").get(getPosts);
router.route("/delete/posts").delete(deletePost);
router.route("/search/user/:query").get(searchUsers);
router.route("/get/users/:id").get(getUser);
router.route("/follow").patch(followUser);
router.route("/get/follower").get(getFollowInfo)
router.route("/get/following/posts").get(getPostsOfFollowing)
module.exports = router;
