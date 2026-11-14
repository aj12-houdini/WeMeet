const Post = require("../models/Post");

// The shape the client expects for a post
function formatPost(post) {
  return {
    id: post._id,
    title: post.title,
    description: post.description,
    date: post.date,
    user: post.user,
  };
}

class PostService {
  async create(title, description, username) {
    const post = await Post.create({
      title,
      description,
      date: new Date(),
      user: username,
    });
    return post.save();
  }

  findById(postId) {
    return Post.findById(postId);
  }

  deleteById(postId) {
    return Post.deleteOne({ _id: postId });
  }

  // Looks up each post and adds it, formatted, to the caller's list one by
  // one, so a failure halfway keeps the posts found so far (same as the
  // original loops in getPosts and getPostsOfFollowing).
  async collectFormattedPosts(postIds, formattedPosts) {
    for (const postId of postIds) {
      const post = await Post.findById(postId);
      formattedPosts.push(formatPost(post));
    }
  }
}

module.exports = new PostService();
