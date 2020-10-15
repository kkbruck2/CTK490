/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */

var alpha, beta, gamma; // orientation data
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
var limbs;
var headTail;
var marks;
var stomachX = 64;
var stomachY = 160;
var woodFloorX = 0;
var woodFloorY = 0;
var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;


//===============================================================Preload
function preload() {
  catImg = loadImage("assets/1x/catPlace.png");
  woodFloor = loadImage("assets/1x/myFloor.png")
  limbs = loadImage("assets/1x/limbs.png");
  headTail = loadImage("assets/1x/headTail.png");
  marks = loadImage("assets/1x/marking.png")
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  catbody = loadImage("assets/1x/body.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  catHead = loadImage("assets/1x/head.png")

}


//===============================================================Set up
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);





  //------------------------------------- initialize accelerometer variables
  alpha = 0;
  beta = 0;
  gamma = 0;

  for (var i = 0; i < 20; i++) {
    cars.push(new car())
  }
  catPos = createVector(width / 2, height - 80);

  //------------------------------------------------- piece splice



}
//============================================================End of set-up
//=============================================================Draw
function draw() {
  background('#CE9B64'); // background fill
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);


  //-----------------------------
  let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  let catPos = createVector(xPosition - windowWidth / 2, yPosition - windowHeight / 2);

  drawArrow(catPos0, catPos, 'black');

  let myHeading = catPos.heading();
  //---------------------------------------cat translate


  //-------------------------------code for test mouse moving cat
  // push();
  // translate(mouseX, mouseY);
  //
  // rotate(angle);
  // cat(-300, -300);
  // angle += 2;
  // pop();
  //-------------------------------code for test mouse moving cat END

  // noStroke();
  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;
  xPosition = map(gamma, -60, 60, 0, width);
  yPosition = map(beta, -30, 30, 0, height);



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

  // DECORATIONS
  // Just a bunch of text commands to display data coming in from addEventListeners
  textAlign(LEFT);
  textSize(20);
  fill('black');
  text("orientation data:", 25, 25);
  textSize(15);
  text("alpha: " + alpha, 25, 50);
  text("beta: " + beta, 25, 70);
  text("gamma: " + gamma, 25, 90);
  textSize(20);
  text("acceleration data:", 25, 125);
  textSize(15);
  text("x = " + x.toFixed(2), 25, 150); // .toFixed means just show (x) decimal places
  text("y = " + y.toFixed(2), 25, 170);
  text("z = " + z.toFixed(4), 25, 190);
}
//================================================================ end of draw

// ----------------------------------------------------------- Cat motion
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
//-----------------------------------------------------------End of cat motion
//------------------------------------------------- Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});

// ------------------------------------------------------accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});
//----------------------------------------------------------element definitions

//========================================================== cat definition
function cat() {

  //angle = 90;

  //left front leg
  image(frontL, -36  + -2 / 10 * (stomachX -64), 15);

  //right front Leg
  image(frontR, 39 + 2 / 10 * (stomachX - 64), 20);

  //back Legs left
  image(backL, -36 + -2 / 6 * (stomachX - 64), 148);

  //back right
  image(backR, 35 + 2 / 6 * (stomachX - 64), 148);

  //stomach
  fill(115, 99, 87);
  stroke(0);
  strokeWeight(2);
  ellipse(0, 120, stomachX, 180);

  //body markings
  noStroke();
  image(marks, 0, 120, stomachX, stomachY);

  image(catHead, 2, 2);
  image(cattail, 20, 261);
  fill(150, 0, 150, 150);
  translate(-300, -300);
  ellipse(300, 300, 70, 70);

}

//============================================================ End of cat definition

//============================================================= Car(mice)
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
// =========================================================== End of Car(mice)
//
function deviceShaken() {
  reset();
cars = [];

  for (var i = 0; i < 20; i++) {
    cars.push(new car())
  }
}
