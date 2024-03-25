require("dotenv").config()
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://0.0.0.0:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let connectedUsers = 0;

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  connectedUsers++;
  console.log(`a user conected with socket id: ${socket.id}`)

  io.emit('nr of users', connectedUsers);

  socket.on('results', (results) =>
    console.log(`These are the results of the user with the id: ${socket.id} - ${results}`))


  socket.on("disconnect", () => {
    connectedUsers--;
    console.log(`a user disconected with socket id: ${socket.id}`)
    io.emit('nr of users', connectedUsers);
  })
})


server.listen(PORT, () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
