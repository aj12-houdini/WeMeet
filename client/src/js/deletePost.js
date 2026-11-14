export async function deletePost(postId) {
    const options = {
      method: "DELETE",
      headers: {
        userId: localStorage.getItem("id"),
        postId,
      },
    };
    const response = await fetch("http://localhost:8000/delete/posts", options);
    window.location.href = "/dashboard/profile";
  }