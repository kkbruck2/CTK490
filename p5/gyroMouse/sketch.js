/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */


// var alpha, beta, gamma; // orientation data
var bunnyImage;
var xPosition = 0;
var yPosition = 0;
var x = 0; // acceleratiobn data
var y = 0;
var z = 0;
var cars = [];
var catPos;
var angle = 0.0;
var timer = 0;
var frontL;
var frontR;
var backL;
var backR;
var catHead;
var cattail;
var activeArea;
var angle = 0;
var marks;
var stomachX = 64;
var stomachY = 160;
var woodFloor;

//---------------------------------------------------------Set up
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
  woodFloor = loadImage("assets/1x/wood.jpg");
  marks = loadImage("assets/1x/marking.png");

}

function setup() {

  // createCanvas(displayWidth, displayHeight);
  angleMode(DEGREES);


    //------------------------------------- initialize accelerometer variables
    alpha = 0;
    beta = 0;
    gamma = 0;

    for (var i = 0; i < 20; i++) {
      cars.push(new car())
    }
    catPos = createVector(width / 2, height - 80);

    //------------------------------------------------- piece splice

    imageMode(CENTER);
    rectMode(CENTER);

  }
  //=====================================End of set-up
  //==============================================Draw


function draw() {

  background('#CE9B64'); // background fill
  image(woodFloor, windowWidth / 2, windowHeight / 2);

  //-----------------------------
  let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  let catPos = createVector(xPosition - windowWidth / 2, yPosition - windowHeight / 2);

  drawArrow(catPos0, catPos, 'black');

  let myHeading = catPos.heading();
  //---------------------------------------cat translate

  //-------------------------------code for test mouse moving cat
  push();
  translate(mouseX, mouseY);

  rotate(angle);
  cat(-300, -300);
  angle += 2;
  pop();
  //-------------------------------code for test mouse moving cat END

  catPos.x = xPosition
  catPos.y = yPosition

  for (var i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].drive();
    if (cars[i].pos.dist(catPos) < 50) {
      cars.splice(i, 1);
      stomachX += 3;

    }
  }

}

//======= end draw

//----------Cat motion
function drawArrow(base, vec, myColor) {
  push();
  noStroke();

  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  translate(vec.mag(), 0);
  cat(0, 0);
  pop();
}
