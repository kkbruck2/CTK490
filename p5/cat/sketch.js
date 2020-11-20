var catWhole;
var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;
var woodFloor;
var activeArea;
var stomachY = 64;
var stomachX = 160;
var catDirection = 1;
var marks;
var grid;
let x = 150,
  y = 150,
  angle1 = 0.0,
  segLength = 100;

var catDirection = 1;
var marks;
var grid;
let catImg;
var windowWidth = 0;
var windowHeight = 0;

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
  woodFloor = loadImage("assets/1x/myFloor.png");
  marks = loadImage("assets/1x/marking.png");
  grid = loadImage("assets/grid.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);

  strokeWeight(20.0);
  stroke(255, 100);




}


function draw() {
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  //image(grid, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  //================insert direction code here
  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;

//Rotating point
segment(x, y, angle1);



//ellipse(x, y, 20, 20);
  //================================= draw render
}
// cat axis
function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  cat(0, 0);
  line(0, 0, segLength, 0);
  pop();
}

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
function car() {
  //-----------------------attributes
  this.pos = createVector(100, 100);
  this.vel = createVector(random(-5, 5), random(-5, 5));
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  //----------------------vector

  this.display = function() {
    fill(this.r, this.g, this.b);
    rect(this.pos.x, this.pos.y, 100, 50);
  }

  //----------------------methods
  this.drive = function() {
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

// function mouseReleased() {
//   image(marks, 100, 150, stomachX, stomachY += 5);
// }
