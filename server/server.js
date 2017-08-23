const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var playerNum = 0;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  console.log('Socket id: ', socket.id);


  socket.on('playerState', (data) => {
    //console.log('Player',  data);


    socket.broadcast.emit('playersPosition', {
      data: data,
      id: socket.id
    });

  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('removePlayer', {
      id: socket.id
    });
  });


  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  //
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  //
  //
  // socket.on('createMessage', (message, callback) => {
  //   console.log('newMessage received', message);
  //
  //   io.emit('newMessage', generateMessage(message.from, message.text));
  //   callback('This is from the server');


    // the user who sent will not receive the message
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });

  // });





});



server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
