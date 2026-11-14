import { ApiClient } from "./ApiClient";

export class UserApi extends ApiClient {
  getUser(userId) {
    return this.sendJson(`get/users/${userId}`);
  }

  async getFollowInfo(profileUserId) {
    const data = await this.sendJson("get/follower", {
      method: "GET",
      headers: new URLSearchParams({
        userId: this.currentUserId(),
        followerId: profileUserId,
      }),
    });
    return {
      isFollowing: data.following,
      followers: data.followersArr,
      following: data.followingArr,
    };
  }

  follow(profileUserId, shouldFollow) {
    const followAction = shouldFollow ? "Followed" : "Unfollow";
    return this.sendRequest("follow", {
      method: "PATCH",
      headers: new URLSearchParams({
        userId: this.currentUserId(),
        followerId: profileUserId,
        followed: followAction,
      }),
    });
  }
}

export const userApi = new UserApi();
