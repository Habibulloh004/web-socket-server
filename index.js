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
      // "http://localhost:3002",
      // "http://localhost:3000",
      // "https://localhost:3000",
      // "https://my-web-socket-steel.vercel.app",
    ], // Add all the origins you want to allow
    methods: ["GET", "POST"],
    credentials: true, // if your frontend sends cookies or any credentials, set this to true
  },
});

io.on("connection", (socket) => {
  console.log("user id:" + socket.id);

  socket.on("join_room", (data) => socket.join(data));
  socket.on("send_message", (data) => {
    // socket.to(data.room).emit("recieve_message", data);
    socket.broadcast.emit("recieve_message", data);
    // console.log(data);
  });
});

server.listen(3001, () => {
  console.log("server run");
});
