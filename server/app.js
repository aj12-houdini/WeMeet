const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));

const server = app.listen(8000, () => {
  console.log("Server started on port 8000");
});

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  socket.username = username;
  next();
}).on("connection", (socket) => {

  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    username: socket.username,
    userId: socket.id,
  });

  socket.on("private_chat", function (data) {
    const to = data.to,
      message = data.message;
    socket.to(to).emit("private_chat", {
      //The sender's username
      username: socket.username,
      //Message sent to receiver
      message: message,
    });
  });
  socket.on("newUser", (data) => {
    users[data.username] = data.username;
    socket.username = socket;
  });
  socket.on("disconnect", () => {
  });
});

app.get("/home", (req, res) => {
  res.json({ message: "Hello from react" });
});

app.use(require("./router/apiRoutes.js"));
app.use(require("./router/dashboardRoutes.js"));
