import { ApiClient } from "./ApiClient";

export class PostApi extends ApiClient {
  // Posts from the people the logged-in user follows
  getFeed() {
    return this.sendJson("get/following/posts", {
      method: "GET",
      headers: new URLSearchParams({
        userId: this.currentUserId(),
      }),
    });
  }

  getUserPosts(profileUserId) {
    return this.sendJson("get/posts", {
      method: "GET",
      headers: {
        id: profileUserId,
      },
    });
  }

  create(title, description) {
    return this.sendJson("post", {
      method: "POST",
      body: new URLSearchParams({
        id: this.currentUserId(),
        username: localStorage.getItem("username"),
        title,
        description,
      }),
    });
  }

  delete(postId) {
    return this.sendRequest("delete/posts", {
      method: "DELETE",
      headers: {
        userId: this.currentUserId(),
        postId,
      },
    });
  }
}

export const postApi = new PostApi();
