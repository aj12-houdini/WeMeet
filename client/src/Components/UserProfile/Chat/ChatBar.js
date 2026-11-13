import { useState, useEffect } from "react";

export default function ChatBar({ socket }) {
  const [users, updateUsers] = useState([]);
  useEffect(() => {
    socket.on("user connected", (receivedUsers) => {
      updateUsers([receivedUsers, ...users]);
    });
  });
  return (
    <div className="chat-sidebar">
      <h2 className="dashboard-card__title">Open chat</h2>

      <div>
        <h3 className="chat-sidebar__label">Active users</h3>
        <div className="chat-sidebar__users">
          {users.length ? (
            users.map((user) => (
              <p key={user.userId} className="chat-sidebar__user">
                {user.username}
              </p>
            ))
          ) : (
            <p className="chat-sidebar__empty">Nobody else is online</p>
          )}
        </div>
      </div>
    </div>
  );
}
