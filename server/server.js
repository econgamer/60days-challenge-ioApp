const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const mongoose = require('mongoose');

const bodyParser = require('body-parser')


const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);              //youtube: require('socket.io').listen(server)


var connectionUrl = 'mongodb://admin:admin@ds155091.mlab.com:55091/databasetesting';

mongoose.connect(connectionUrl);
mongoose.connection.once('open', () => console.log('Database is ready!'))
                    .on('error', (error) => {
                      console.warn('Warning, error');
                    });



var playerNum = 0;

var connectCounter = 0;

// app init
app.use(express.static(publicPath));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


io.on('connection', (socket) => {



  connectCounter++;

  console.log("Player connect!!!!!!!!!", connectCounter);


  data = {x:50, y:50};
  //console.log('New user connected');
  //console.log('Socket id: ', socket.id);

  app.post('/sharing', function(req, res){

    console.log("req.body.move: ", req.body);

    if(req.body.move === 'left'){
      socket.broadcast.emit('moveToLeft');
    }else if(req.body.move === 'right'){
      socket.broadcast.emit('moveToRight');
    }else if(req.body.move === 'up'){
      socket.broadcast.emit('moveUp');
    }else if(req.body.move === 'down'){
      socket.broadcast.emit('moveDown');
    }


  });


  socket.on('playerState', (data) => {
    ////console.log('Player',  data);
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
  //console.log('hihi');
  // res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html');

});

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  //console.log(`Chat app connected ${connections.length}`);


  // Disconnect
  socket.on('disconnect', (data)=> {
    if(!socket.username) return;
    users.splice(users.indexOf(socket.username), 1);
    updateUsername();
    connections.splice(connections.indexOf(socket), 1);
    //console.log(`Disconnected: Users left ${connections.length}`);
  });

  //Send message handler
  socket.on('sendMessage', (data) => {
    //console.log(data);
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
    io.sockets.emit('getUsers', users);     //error before sockets.emit, it should be io.sockets in order to send message to all
  }



});

// End of day 19

// day 26
var musicPlayer = [];
var connectionsPiano = [];
var playerType = [];


io.sockets.on('connection', (socket) => {
  connections.push(socket);
  ////console.log(`Piano app connected ${connections.length}`);


  // Disconnect
  socket.on('disconnect', (data)=> {
    if(!socket.playername) return;
    musicPlayer.splice(musicPlayer.indexOf(socket.playername), 1);
    playerType.splice(playerType.indexOf(socket.instrument), 1);
    updatePlayername();
    connections.splice(connections.indexOf(socket), 1);
    //console.log(`Disconnected: Users left ${connections.length}`);
  });

  //Send message handler
  socket.on('sendNote', (data) => {
    //console.log(data);
    // io.sockets.emit('newNote', {msg: data, user: socket.playername});
    socket.broadcast.emit('newNote', {note: data, user: socket.playername, instrument: socket.instrument});
  });

  // User registrate handler
  socket.on('createPlayer', (data, callback) => {
    //console.log("Piano player", data.username);
    callback(true);
    socket.playername = data.username;
    socket.instrument = data.instrument;
    musicPlayer.push(socket.playername);
    playerType.push(socket.instrument);
    updatePlayername();

  });


  function updatePlayername(){
    io.sockets.emit('getPlayers', {musicPlayer: musicPlayer, instrumentPlayerUsed: playerType});     //error before sockets.emit, it should be io.sockets in order to send message to all
  }

});
// End of day 26

// day 27

var worldPlayer = [];
var playerPositionX = [];
var playerPositionY = [];
var connectionsPlayers = [];
var animalType = [];


io.sockets.on('connection', (socket) => {
  connectionsPlayers.push(socket);
  //console.log(`World io connected ${connectionsPlayers.length}`);


  // Disconnect
  socket.on('disconnect', (data)=> {
    if(!socket.playername) return;
    worldPlayer.splice(worldPlayer.indexOf(socket.playername), 1);
    playerPositionX.splice(playerPositionX.indexOf(socket.playername), 1);
    playerPositionY.splice(playerPositionY.indexOf(socket.playername), 1);
    animalType.splice(animalType.indexOf(socket.playertype), 1);
    updateworldPlayername();
    connectionsPlayers.splice(connectionsPlayers.indexOf(socket), 1);
    //console.log(`Disconnected: Users left ${connectionsPlayers.length}`);
  });

  //Send message handler
  socket.on('sendPlayerMessage', (data) => {
    //console.log(data);
    // io.sockets.emit('newNote', {msg: data, user: socket.playername});
    // socket.broadcast.emit

    io.sockets.emit('newMessage', {msg: data,
                                        user: socket.playername,
                                        playerType: socket.playertype,
                                        posX: socket.playerX,
                                        posY: socket.playerY

                                      });
  });

  // User registrate handler
  socket.on('createworldPlayer', (data, callback) => {
    //console.log("World player created", data.playername);
    callback(true);
    socket.playername = data.playername;
    socket.playertype = data.playertype;
    socket.playerX = data.playerX;
    socket.playerY = data.playerY;
    worldPlayer.push(socket.playername);
    animalType.push(socket.playertype);
    playerPositionX.push(socket.playerX);
    playerPositionY.push(socket.playerY);
    updateworldPlayername();
  });

  //Update game status
  socket.on('updatePlayerStatus', (data) => {

    socket.playername = data.playername;
    socket.playertype = data.playertype;
    socket.playerX = data.playerX;
    socket.playerY = data.playerY;

    //index of
    var playerId = worldPlayer.indexOf(socket.playername);

    animalType[playerId] = socket.playertype;
    playerPositionX[playerId] = socket.playerX;
    playerPositionY[playerId] = socket.playerY;
    updateworldPlayername();
  });


  function updateworldPlayername(){
    io.sockets.emit('getworldPlayers', {worldPlayer, animalType, playerPositionX, playerPositionY});     //error before sockets.emit, it should be io.sockets in order to send message to all
  }

});


// End of day 27


// Day 39

var customer = [];
var customerNum = [];


const Customer = require('../public/day39/customer');

app.get('/day39', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html');

});

io.sockets.on('connection', (socket) => {
  customerNum.push(socket);
  //console.log(`Chat app connected ${customerNum.length}`);

  getAllCustomer();

  // app
  function getAllCustomer(){
    Customer.find({}).exec(function(err, data){
      if(err){
        //console.log('Error occur when retrieving customer data from database');
      }

        //console.log(data);
        updateCustomer(data);


    });
  }





  // Disconnect
  socket.on('disconnect', (data)=> {
    if(!socket.username) return;
    customer.splice(customer.indexOf(socket.username), 1);
    // updateUsername();
    customerNum.splice(customerNum.indexOf(socket), 1);
    //console.log(`Disconnected: Users left ${customerNum.length}`);
  });

  //Send Information handler
  socket.on('sendInformation', (data) => {
    //console.log(data);

    customer.push(data);
    // Store customer Information
    const customerInformation = new Customer({ name: data.name, phone: data.phone, tableNum: data.tableNum, time: data.time});
      customerInformation.save().then((data) => {
          //console.log('Customer information stored');
          io.sockets.emit('bookStatus', {data});
          getAllCustomer();
          updateCustomer();
        }, (err) => {
          //console.log('Customer information failed to stored');
        });


    //io.sockets.emit('newCustomer', {msg: data, user: socket.username});

  });

  // User registrate handler
  socket.on('createUser', (data, callback) => {
    callback(true);
    socket.username = data;
    customer.push(socket.username);
    // updateUsername();

  });


  function updateCustomer(data){
    io.sockets.emit('getStatus', data);     //error before sockets.emit, it should be io.sockets in order to send message to all
  }



});









// End of Day39















server.listen(port, () => {
  //console.log(`Server is up on ${port}`);
});
