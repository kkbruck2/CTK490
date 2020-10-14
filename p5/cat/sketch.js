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
var marks;


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
  woodFloor = ("assets/1x/wood.jpeg")
  marks = loadImage("assets/1x/marking.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);

//  cat(mouseX, mouseY);




}

function draw() {
  background(255);
  //template
  // image(catWhole, 100,160);
  // fill(255, 255, 255, 80)
  // rect(0, 0, 400, 400);
  //template END

  cat(mouseX, mouseY, angle);


}

function cat(x, y, a) {
  //set translation point
  push();
  translate(x, y);
  rotate(a);

//rotation point
  translate(-95, -30);


  //==active area location
  push();
  fill(0, 0, 0, 50);
  ellipse(95, 30, 60, 60);
  noFill();
  translate(20, 30);
  pop();
  //==end of active area

  //==frontpaw
  //image(frontL, 62, 54);
  image(frontL, 62 + -2/10 * (stomachX - 64), 54);

  //right front Leg
  image(frontR, 131 + 2/10 * (stomachX - 64), 63);
  //back Legs left
  image(backL, 62 + -2/8 * (stomachX - 64), 176);
  //back right
  image(backR, 134 + -2/8 * (stomachX - 64), 177);

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

    pop();
}

function mouseReleased() {
  image(marks, 100, 150, stomachX += 5, stomachY);
}
