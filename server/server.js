const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);              //youtube: require('socket.io').listen(server)

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


});

//day 19

var users = [];
var connections = [];

app.get('/day29', function(req, res){
  console.log('hihi');
  // res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html');

});

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log(`Chat app connected ${connections.length}`);


  // Disconnect
  socket.on('disconnect', (data)=> {
    // if(!sockets.username) return;
    users.splice(users.indexOf(socket.username), 1);
    updateUsername();
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: Users left ${connections.length}`);
  });

  //Send message handler
  socket.on('sendMessage', (data) => {
    console.log(data);
    io.sockets.emit('newMessage', {msg: data, user: socket.username});
  });

  // User registrate handler
  socket.on('createUser', (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsername();

  });


  function updateUsername(){
    socket.emit('getUsers', users);
  }



});




server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
