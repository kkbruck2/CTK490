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
var stomachX = 64;
var stomachY = 160;
var angle = 0;
var angleDirection = 1;
var marks


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
  marks = loadImage("assets/1x/marking.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);

  catPos = new Cat(mouseX, mouseY);



}

function draw() {
  background(255);

  translate(mouseX, mouseY);
  rotate(angle);

  cat();

}

function Cat() {

  //set translation point
  translate(-95, -30);
  //active area

  push();
  fill(0, 0, 0, 50);
  ellipse(95, 30, 60, 60);
  noFill();
  translate(20, 30);
  pop();
  //==end of active area

  //==frontpaw

  image(frontL, 62, 54);


  //right front Leg
  image(frontR, 131, 63);
  //back Legs left
  image(backL, 62, 176);
  //back right
  image(backR, 134, 177);


  //Cat body gets fat
  fill(115, 99, 87);
  stroke(0);
  strokeWeight(2);
  ellipse(100, 145, stomachX, 165);
  //body markings
  noStroke();
  image(marks, 100, 144, stomachX, stomachY);
  //head and tail
  image(catHead, 100, 40);
  image(cattail, 120, 277);

}

function mouseReleased() {
  image(marks, 100, 150, stomachX += 5, stomachY);
}
