// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Player(x, y) {
  // this.x = width/2;
  // this.xdir = 0;
  this.x = x;
  this.y = y;
  this.health = 100;
  this.gameOver = false;
  this.id = Math.floor((Math.random() * 1000) + 1);

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, 20, 20);
  }

  // this.setDir = function(dir) {
  //   this.xdir = dir;
  // }

  this.move = function(speed, dir) {

    if(dir === 'horizontal'){
      this.x += speed;
    }

    if(dir === 'vertical'){
      this.y += speed;
    }

  }



}
