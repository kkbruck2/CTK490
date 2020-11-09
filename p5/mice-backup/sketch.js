
var angle = 0;
var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;
var marks;
var stomachY = 64;
var stomachX = 160;
var catDirection = 1;
var mice = [];
var pieces = [];
var direction = [];
var timer = 0;
var myFloor;
var x = 150, y = 150, angle1 = 0.0, segLength = 100;

let flock;
let mice;

//------------------------------------------------------var end

//------------------------------------------------------preload
function preload() {
  catHead = loadImage("assets/1x/head.png");
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  catbody = loadImage("assets/1x/body.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  activeArea = loadImage("assets/1x/Asset106.png");
  catWhole = loadImage("assets/1x/catPlace.png");
  myFloor = loadImage("assets/1x/myFloor.png");
  marks = loadImage("assets/1x/marking.png");
  mice[0] = loadImage('assets/1x/mice1.png');
  mice[1] = loadImage('assets/1x/mice2.png');
  mice[2] = loadImage('assets/1x/mice3.png');
  mice[3] = loadImage('assets/1x/mice4.png');
  mice[4] = loadImage('assets/1x/mice3.png');
  mice[5] = loadImage('assets/1x/mice2.png');
}
//------------------------------------------------------preload end

//-----------------------------------------------------------setup
function setup() {

  createCanvas(windowWidth, windowHeight);


  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);

  //--------------------------Spawn mice
  for (var i = 0; i < 50; i++) {
    pieces.push(new Piece());
  }
  //---------------------------spawn end
  // catPos = createVector(windowWidth / 2, height / 2);
}
//------------------------------------------------end setup

//-------------------------------------------------------------draw
function draw() {
image(myFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

//game();
  //================insert direction code here

  // push();
  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;

  //Rotating point

  // pop();
}
//----------------------------------------------------end draw

// ------------------------cat axis
function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  cat(0, 0);
  line(0, 0, segLength, 0);
  pop();
}
//--------------------------cat render

function cat() {
  push();
  //==frontpaws
  image(frontL, 63, -30 + -2 / 10 * (stomachY - 30))

  image(frontR, 63, 35 + 2 / 10 * (stomachY - 35));

  //back Legs left
  image(backL, -63, -20 + -2 / 7 * (stomachY - 30));
  //back right
  image(backR, -63, 18 + 2 / 7 * (stomachY - 25));

  //Cat body gets fat
  fill(115, 99, 87);
  stroke(0);
  strokeWeight(2);
  ellipse(-30, 0, 165, stomachY);
  //body markings
  noStroke();
  image(marks, -30, 0, 160, stomachY);
  //head and tail
  image(catHead, 80, 0);
  image(cattail, -160, 20);

  pop();
}


//-------------------------------start pieces class!!
function Piece() {
  //----attributes
  this.pos = createVector(windowWidth, windowHeight);
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

    if (this.pos.x > windowWidth) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = windowWidth;
    if (this.pos.y > windowHeight) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = windowHeight;

  }

}
//--------------------------------------------------------end pieces class

//------------------------------------------------------------ game
// function game() {
//
//   for (var i = 0; i < pieces.length; i++) {
//     pieces[i].display();
//     pieces[i].drive();
//     if (pieces[i].pos.dist(mouseX, mouseY) < 10) {
//       pieces.splice(i, 1);
//       stomachX += 3;
//     }
//   }
//
// //segment();
//
// }
