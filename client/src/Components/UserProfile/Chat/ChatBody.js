export default function ChatBody({ messages }) {
  return (
    <div>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
      </header>

      <div className="message__container">
        {messages.map((message, index) =>
          message.username === localStorage.getItem("username") ? (
            // Messages sent by you
            <div key={index} className="message__chats">
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            // Messages received by you
            <div key={index} className="message__chats">
              <p className="sender__name">{message.username}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
