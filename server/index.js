require("dotenv").config()
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid")

const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {
  socket.on('create game', () => {
    const gameId = uuidv4();
    socket.emit('game created', gameId);
  });
});

server.listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});
