var player;
var playerx;
var playery;
var players = [];


var others = [];
var sender;
//
// var enemies = [];
// var enemyx;
// var enemyy;
// var enemyAmount = 100;
// var enemyFirstwave = 10;


var bullet = [];
var bulletAmount = 0;


var explosion = [];
var explosionObj;



var socket = io.connect();



var friendly = [];

//p5 js dom
var nameInput;
var submit;
var $userFormArea;

var message;
var send;

var otherPlayer = [];
var gameisStart = false;
var textDisplay = false;

var textPositionX;
var textPositionY;
var textContent = '';

var sex;

var textplayerType;


// key handler
var keyCodePressed;
var keyStore = [];
var keyMessage;

function preload(){

}

function setup(){

  createCanvas(900, 600);
  background(0,255,0);

  // page layout

  nameInput = select('#nameInput');
  submit = select('#submit');
  $userFormArea = select('#userFormArea');
  sex = select('#sex');
  submit.mousePressed(createPlayer);




  //Player Setup
  playerx = width/2;
  playery = height/2;
  player = new Player(playerx, playery);


}


function sendtheMessage(){

    keyMessage = '';

    for(var i = 0; i < keyStore.length; i++){
      keyMessage += keyStore[i];
    }

    console.log(keyMessage);

    // socket.emit('sendPlayerMessage', message.value());
    socket.emit('sendPlayerMessage', keyMessage);

}

// $messageForm.submit(function(e){
//   e.preventDefault();
//   console.log('submit');
//
//   socket.emit('sendMessage', $message.val());
//   $message.val('');
//
// });


// $('#message').keypress(function (e) {
//   if (e.which == 13) {
//     $messageForm.submit();
//     return false;    //<---- Add this line
//   }
// });


socket.on('newMessage', function(data){
  console.log('message received : ', data);
  textPositionX = data.posX;
  textPositionY = data.posY;
  textContent = data.msg;
  textDisplay = true;
  textplayerType = data.playerType;
  sender = data.user;

  // if(otherPlayer.worldPlayer){
  //   for(var i = 0; i < otherPlayer.worldPlayer.length; i++){
  //     others[i] = new Others(otherPlayer.playerPositionX[i], otherPlayer.playerPositionY[i], otherPlayer.animalType[i], data.msg);
  //   }
  // }

});







// Player creation
function createPlayer(){
  gameisStart = true;

  console.log(sex.value());

  socket.emit('createworldPlayer', { playername: nameInput.value(),
                                      playertype: sex.value(),
                                      playerX: 100,
                                      playerY: 100},
  function(data){

    if(data){
      // $messageArea.show();
      $userFormArea.hide();
      console.log('World User Created');
      // $message.focus();
    }
  });


}


// Update Player
function updatePlayer(){
  if(gameisStart){
    socket.emit('updatePlayerStatus', { playername: nameInput.value(),
                                        playertype: sex.value(),
                                        playerX: player.x,
                                        playerY: player.y});
  }
}

// Update bullet
// function updateBullet(){
//   if(gameisStart){
//
//     if(bullet){
//       for(var b = 0; b < bullet.length; b++){
//         socket.emit('updateBullet', { bulletX: bullet[b].x, bulletY: bullet[b].y });
//       }
//     }
//
//
//   }
// }

// worldPlayer, animalType, playerPositionX, playerPositionY

socket.on('getworldPlayers', function(data){

  var html = '';

  for(i = 0; i < data.length; i++){
    // html += `<li>${data[i]}</li>` ;

  }
  // $users.html(html);
  otherPlayer = data;
});



function draw(){
  background('#208200');
  //Player
  playerMovement();
  player.show();



  if(otherPlayer.worldPlayer){
    for(var i = 0; i < otherPlayer.worldPlayer.length; i++){
      var index = otherPlayer.worldPlayer.indexOf(sender);

      others[i] = new Others(otherPlayer.playerPositionX[i], otherPlayer.playerPositionY[i], otherPlayer.animalType[i], '', otherPlayer.worldPlayer[i]);
      others[index] = new Others(otherPlayer.playerPositionX[index], otherPlayer.playerPositionY[index], otherPlayer.animalType[index], textContent, otherPlayer.worldPlayer[index]);
      others[i].show();


      console.log("Sender: " , otherPlayer.worldPlayer.indexOf(sender));


    }
  }

  // if(textDisplay){
  //
  //   if(textplayerType === 'female'){
  //     fill('#ED225D');
  //     textSize(25);
  //     text(textContent, textPositionX, textPositionY);
  //   }else{
  //     fill('#245ef2');
  //     textSize(25);
  //     text(textContent, textPositionX, textPositionY);
  //   }
  //
  // }


  updatePlayer();

  //bullet

    for(var b = 0; b < bullet.length; b++){

      bullet[b].show();
      bullet[b].move();



    }



  for (var i = bullet.length-1; i >= 0; i--) {
    if (bullet[i].toDelete) {
      bullet.splice(i, 1);
    }
  }



  if(player.gameOver){
    textSize(50);
    textStyle(BOLD)
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    noloop();
  }


}



function keyPressed() {

  if(keyCode != BACKSPACE && keyCode != DELETE && keyCode != ENTER && keyCode != RETURN
    && keyCode != TAB && keyCode != ESCAPE && keyCode != SHIFT && keyCode != CONTROL
    && keyCode != OPTION
    && keyCode != ALT && keyCode != UP_ARROW && keyCode != DOWN_ARROW
    && keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW && gameisStart){
      keyCodePressed = String.fromCharCode(keyCode).toLowerCase();
      keyStore.push(keyCodePressed);
      console.log(keyStore);
    }



  if (keyCode === RETURN) {
    sendtheMessage();
    keyStore = [];
    //document.getElementById("message").focus();
    // var newbullet = new Bullet(player.x, player.y);
    // bullet.push(newbullet);
  }
}

function playerMovement(){

  if (keyIsDown(LEFT_ARROW))
   player.move(-5, 'horizontal');

 if (keyIsDown(RIGHT_ARROW))
   player.move(5, 'horizontal');

 if (keyIsDown(UP_ARROW))
   player.move(-5, 'vertical');

 if (keyIsDown(DOWN_ARROW))
   player.move(5, 'vertical');
}
