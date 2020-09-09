/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */

var alpha, beta, gamma; // orientation data
var catImg;
var xPosition = 0;
var yPosition = 0;
var x = 0; // acceleratiobn data
var y = 0;
var z = 0;
var cars = [];
var catPos;
var angle = 0.0;

//---------------------------------------------------------Set up
function preload() {
  catImg = loadImage("assets/1x/catPlace.png");
  woodFloor = loadImage("assets/1x/floor.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);



  // initialize accelerometer variables
  alpha = 0;
  beta = 0;
  gamma = 0;

  for (var i = 0; i < 10; i++) {
    cars.push(new car())
  }
  catPos = createVector(width / 2, height - 80);


  imageMode(CENTER);
  rectMode(CENTER);

}
//--------------------------------------------------------Draw
function draw() {

  background('#CE9B64'); // background fill
  image(woodFloor, windowWidth / 2, windowHeight / 2);



  let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  let catPos = createVector(mouseX - windowWidth / 2, mouseY - windowHeight / 2);

  drawArrow(catPos0, catPos, 'black');

  let myHeading = catPos.heading();

  //-------------------------------code for test mouse moving cat
  // push();
  //
  // translate(catPos.x - 100, catPos.y - 65);
  //
  // cat();
  // pop();

  //-------------------------------code for test mouse moving cat END

  // noStroke();
  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;
  //============================================================ mapping
  xPosition = map(gamma, -60, 60, 0, width);
  yPosition = map(beta, -30, 30, 0, height);



  catPos.x = xPosition
  catPos.y = yPosition

  for (var i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].drive();
    if (cars[i].pos.dist(catPos) < 50) {
      cars.splice(i, 1);
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
//----------------------------------------------------------end of draw
// HERE'S THE STUFF YOU NEED FOR READING IN DATA!!!

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

// Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});


// accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});
//----------------------------------------------------------element definitions
//----------------------------------------------------------cat
function cat() {
  rotate(90);
  image(catImg, 0, 113);
  // fill(150, 0, 150, 150);
  translate(-300, -300);
  noFill();
  ellipse(300, 300, 70, 70);


  // fill(100, 0, 100);
  // ellipse(300, 385, 150, 200);
  // stroke(0);
  // strokeWeight(6);
  // line(300, 385, 322, 594);


}




//-------------------------------------------------------------Car(mice)
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
//----------------------------------------------------------------end of mice
function deviceShaken() {
cars = [];

  for (var i = 0; i < 20; i++) {
    cars.push(new car())
  }
}
