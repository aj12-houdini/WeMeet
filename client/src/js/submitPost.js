export async function submitPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const options = {
      method: "POST",
      body: new URLSearchParams({
        id: localStorage.getItem("id"),
        username: localStorage.getItem("username"),
        title,
        description,
      }),
    };
    const response = await fetch("http://localhost:8000/post", options);
    const data = await response.json();
    if(data.created){
      window.location.href='/dashboard/profile'
    }
  }