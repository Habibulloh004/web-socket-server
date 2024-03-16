const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "*",
      "http://localhost:3002",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://localhost:3000",
      "http://joinposter.com",
      "https://morella-ice.vercel.app/",
      "https://joinposter.com",
      "https://platform.joinposter.com",
    ], // Add all the origins you want to allow
    methods: ["GET", "POST"],
    credentials: true, // if your frontend sends cookies or any credentials, set this to true
  },
});

io.on("connection", (socket) => {
  console.log("user id:" + socket.id);

  const userURL = socket.handshake.headers.referer;
  console.log("User URL:", userURL);
  
  socket.on("join_room", (data) => socket.join(data));
  socket.on("send_message", (data) => {
    const uData = JSON.parse(data);
    socket.to(uData.user).emit("recieve_message", uData);
    // socket.broadcast.emit("recieve_message", uData);
    console.log(uData);
  });
});

server.listen(3001, () => {
  console.log("server run");
});
