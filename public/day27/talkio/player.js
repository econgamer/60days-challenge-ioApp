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

  this.show = function() {
    // fill(255);
    // rectMode(CENTER);
    // rect(this.x, this.y, 20, 20);
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


  this.hits = function(enemy) {
    var d = dist(this.x, this.y, enemy.x, enemy.y);

    if (d < enemy.r) {
      this.health -= 1;
      if(this.health <= 0){
        this.gameOver = true;
        console.log('gameover');
      }

      return true;
    } else {
      return false;
    }
  }

}
