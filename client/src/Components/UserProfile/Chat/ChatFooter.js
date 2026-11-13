import { useState } from "react";

export default function ChatFooter({ socket }) {
  const [message, setMessage] = useState("");
  const [username, updateUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
  }
  return (
    <div className="chat_footer">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="To (username)"
          className="message"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        />
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a message…"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
