export async function followUser(profileUserId, shouldFollow) {
  const userId = localStorage.getItem("id");

  const followAction = shouldFollow ? "Followed" : "Unfollow";

  const options = {
    method: "PATCH",
    headers: new URLSearchParams({
      userId,
      followerId: profileUserId,
      followed: followAction,
    }),
  };
  const response = await fetch("http://localhost:8000/follow", options);
  const data = await response.json();
  console.log(data);
}
