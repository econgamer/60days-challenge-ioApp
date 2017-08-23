var player;
var players= [];
var playersId = [];
var update = true;
var lastLoopTime = 0;

var socket = io();

socket.on('connect', function() {
  var initialX = (Math.random() * width/2 + 100);
  var initialY = (Math.random() * height/2 + 100);
  player = new Player(initialX,initialY);
  //console.log(initialX, initialY);


  socket.emit('playerState', {
    player: player
  });

  //console.log(player);

});


  socket.on('playersPosition', function(otherPlayers){
    players[otherPlayers.id] = otherPlayers.data;
    playersId.push(otherPlayers.id);
    //console.log(players[otherPlayers.id]);
  });



socket.on('removePlayer', function(data){

  delete players[data.id];

  //playersId.remove(data.id);
});




socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

//
// socket.on('newMessage', function(message) {
//   console.log(message);
// });
//
// socket.emit('createMessage', {
//   from: 'Michael',
//   text: 'hello admin'
// }, function(data){
//   console.log('Got it', data);
// });



function preload(){
}

function setup(){

  createCanvas(900, 600);
  background(0,255,0);


}

function draw(){
  background(51);

  if(player){
    player.show();
    player.move();
  }



  // if(new Date().getTime() -  lastLoopTime> 20){

    playerMovement();
  //   lastLoopTime = new Date().getTime();
  // }
  //







  //console.log(players[0]);
    for(var i = 0; i < playersId.length; i ++){
      if(players[playersId[i]]){
        fill(255);
        //rectMode(CENTER);
        rect(players[playersId[i]].player.x, players[playersId[i]].player.y, 20, 20);
        //text(playersId[i], players[playersId[i]].player.x + 10, players[playersId[i]].player.y + 10);
      }
    }
}

function playerMovement(){

  if (keyIsDown(LEFT_ARROW)){
    // console.log('Left movement');
    player.move(-5, 'horizontal');

    socket.emit('playerState', {
      player: player
    });
  }


 if (keyIsDown(RIGHT_ARROW)){
   player.move(5, 'horizontal');

   socket.emit('playerState', {
     player: player
   });
 }


 if (keyIsDown(UP_ARROW)){
   player.move(-5, 'vertical');

   socket.emit('playerState', {
     player: player
   });
 }


 if (keyIsDown(DOWN_ARROW))
   player.move(5, 'vertical');

   socket.emit('playerState', {
     player: player
   });
}
