const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let code = '// Start coding...';
let chat = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('code', code);
  socket.emit('chat', chat);

  socket.on('code', (newCode) => {
    code = newCode;
    socket.broadcast.emit('code', newCode);
  });

  socket.on('chat', (message) => {
    chat.push(message);
    io.emit('chat', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
