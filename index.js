const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://my-web-socket-steel.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`user id: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
  // socket.to(data.room).emit("user_id", socket.id);
});

server.listen(3001, () => {
  console.log("server run");
});
