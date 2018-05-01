var player;
var players= [];
var playersId = [];
var update = true;
var lastLoopTime = 0;

var socket = io();

socket.on('connect', function() {
  var initialX = (Math.random() * 900/2 + 100);
  var initialY = (Math.random() * 900/2 + 100);
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

socket.on('moveToLeft', function() {
  player.move(-5, 'horizontal');

  socket.emit('playerState', {
    player: player
  });
});

socket.on('moveToRight', function() {
  player.move(5, 'horizontal');

  socket.emit('playerState', {
    player: player
  });
});

socket.on('moveUp', function() {
  player.move(-5, 'vertical');

  socket.emit('playerState', {
    player: player
  });
});

socket.on('moveDown', function() {
  player.move(5, 'vertical');

  socket.emit('playerState', {
    player: player
  });
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

    if (player.x < 127 && player.x + 20 > 100 &&
      player.y > 73 && player.y - 20 < 100){
        textSize(32);
        text('Win!!!!!!!!!!!', 250, 250);
    }

    if (player.x < 227 && player.x + 20 > 200 &&
      player.y > 173 && player.y - 20 < 200){
        textSize(32);
        text('Game Over!!!!!!!!!!!', 250, 250);
    }

    if (player.x < 127 && player.x + 20 > 100 &&
      player.y > 173 && player.y - 20 < 200){
        textSize(32);
        text('Game Over!!!!!!!!!!!', 250, 250);
    }

    if (player.x < 227 && player.x + 20 > 200 &&
      player.y > 73 && player.y - 20 < 100){
        textSize(32);
        text('Game Over!!!!!!!!!!!', 250, 250);
    }

  }



  // if(new Date().getTime() -  lastLoopTime> 20){

  var c = color(255, 204, 0);
  fill(c);
  playerMovement();
  rect(100, 100, 55, 55);

  var c = color(206, 0, 0);
  fill(c);
  rect(200, 200, 55, 55);
  rect(100, 200, 55, 55);
  rect(200, 100, 55, 55);

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
