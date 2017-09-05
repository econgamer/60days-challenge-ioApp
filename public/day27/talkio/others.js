// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Others(x, y, sex, msg, name) {
  // this.x = width/2;
  // this.xdir = 0;
  this.x = x;
  this.y = y;
  this.health = 100;
  this.gameOver = false;

  this.msg = msg;
  this.name = name;

  this.show = function() {
    if(sex === 'male'){
      fill('#1031b7');
      rectMode(CENTER);
      rect(this.x, this.y, 20, 20);

      fill('#000000');
      textSize(25);
      text(this.msg, this.x - 10, this.y - 20);

      fill('#000000');
      textSize(20);
      text(this.name, this.x - 10, this.y + 28);


    }else{
      fill('#ED225D');
      rectMode(CENTER);
      rect(this.x, this.y, 20, 20);


      fill('#000000');
      textSize(25);
      text(this.msg, this.x - 10, this.y - 20);

      fill('#000000');
      textSize(20);
      text(this.name, this.x - 10, this.y + 28);

    }



  }


}
