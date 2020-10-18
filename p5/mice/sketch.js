
var grid;
var woodFloor;
var angle = 0;
var catPos;
var myLegs, myBody, head;
var mice = [];
var pieces = [];
var direction = [];
var timer = 0;

//------------------------------------------------------var end
//------------------------------------------------------preload
function preload() {

  grid = loadImage('assets/grid.png');
  woodFloor = loadImage('assets/myFloor.png');
  mice[0] = loadImage('assets/mice1.png');
  mice[1] = loadImage('assets/mice2.png');
  mice[2] = loadImage('assets/mice3.png');
  mice[3] = loadImage('assets/mice4.png');
  mice[4] = loadImage('assets/mice3.png');
  mice[5] = loadImage('assets/mice2.png');
}
//------------------------------------------------------preload end

//-----------------------------------------------------------setup
function setup() {

  createCanvas(1080, 720);
  angleMode(DEGREES);
  grid = loadImage('assets/grid.png');


  //--------------------------Spawn mice
  for (var i = 0; i < 30; i++) {
    pieces.push(new Piece());
  }
  //---------------------------spawn end
  catPos = createVector(width / 2, height / 2);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
}
//------------------------------------------------end setup

//-------------------------------------------------------------draw
function draw() {
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  game();

}
//----------------------------------------------------end draw

//----------------------------------------------------mice class!!
function Piece() {
  //----attributes
  this.pos = createVector(width - 50, height - 50);
  this.vel = createVector(random(-6, 6), random(-6, 6));
  this.miceNum = 0;
  this.timer = 0;
  this.maxTimer = (1, 10);

  //----- methods
  // display

  this.display = function() {
    //  translate(p5.Vector.fromAngle(millis() / 1000, 40));

    push();
    // animating the mices
    if (this.vel > 0) map(this.maxTimer * -1 === this.vel.mag());
    if (this.vel < 0) map(this.maxTimer === this.vel.mag());
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    image(mice[this.miceNum], 0, 0);
    this.timer++;


    if (this.timer > this.maxTimer) {
      this.miceNum = this.miceNum + 1;
      this.timer = 0;

    }


    //mice reset
    if (this.miceNum > mice.length - 1) {
      this.miceNum = 0;
    }


    pop();

  }
  //drive
  this.drive = function() {
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }

}

//--------------------------------------------------------end pieces class


//------------------------------------------------------------ game
function game() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].display();
    pieces[i].drive();
    if (pieces[i].pos.dist(catPos) < 100) {
      pieces.splice(i, 1);

    }
  }

  if (pieces.length == 0) {
    myState = 3;
    timer = 0;
  }
  push();

  // translate(catPos.x, catPos.y);
  // rotate(angle);
  cat();

  pop();

}

function cat() {
  fill(100, 255, 100);
  ellipse(mouseX, mouseY, 100, 100);
}
