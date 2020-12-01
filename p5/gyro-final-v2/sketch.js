//@name Flocking
//@description Demonstration of <a href='http://www.red3d.com/cwr/'>Craig Reynolds' 'Flocking' behavior</a>.<br>
//(Rules: Cohesion, Separation, Alignment.)<br>
//From <a href='http://natureofcode.com'>natureofcode.com</a>
//===============variables

//===============mice
let boids = [];
var flock;
var woodFloor;
var mice = [];
let numFrame = 8;
let currentFrame = 0;

var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;
var marks;
var stomachY = 159;
var stomachX = 64;

var catPos;
var catPos0;
var cat;
var xdirection = 1;
var ydirection = 1;
//==============environment
var woodFloor;
var displayWidth = 0;
var displayHeight = 0;

//===============axis
let base = 150,
  angle1 = 0.0,
  segLength = 100;

//===============gryo
var alpha, beta, gamma; // orientation data
var xPosition = 0;
var yPosition = 0;
var zPosition = 0;
var x = 0; // acceleratiobn data
var y = 0;
var z = 0;
var windowWidth = 0;
var windowHeight = 0;


function preload() {
  //================mice
  //mice = loadImage('assets/1x/mice5.png');
  mice[0] = loadImage('assets/1x/mice1.png');
  mice[1] = loadImage('assets/1x/mice2.png');
  mice[2] = loadImage('assets/1x/mice3.png');
  mice[3] = loadImage('assets/1x/mice4.png');
  mice[4] = loadImage('assets/1x/mice5.png');
  mice[5] = loadImage('assets/1x/mice4.png');
  mice[6] = loadImage('assets/1x/mice3.png');
  mice[7] = loadImage('assets/1x/mice2.png');

  //===============cat
  catHead = loadImage("assets/1x/head.png");
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  //catWhole = loadImage("assets/1x/catPlace0.png");
  woodFloor = loadImage("assets/1x/myFloor.png");
  marks = loadImage("assets/1x/marking.png");

}
//===============setup
function setup() {
  //createCanvas(1080, 720);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 50; i++) {
    let b = new Boid(random(width), random(height));
    flock.addBoid(b);
  }

  catPos = createVector(0, 0);

  alpha = 0;
  beta = 0;
  gamma = 0;

  frameRate(8);

}
//==================draw
function draw() {
  background(200, 150, 100);
  image(woodFloor, width / 2, height / 2);
  background(200, 150, 100);
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  let catPos = createVector(xPosition - windowWidth / 2, yPosition - windowHeight / 2);
  drawAxis(catPos0, catPos);

  let myHeading = catPos.heading();

  flock.run();

  // if (catPos.x > windowWidth || catPos.x < windowWidth) {
  //   xdirection *= -1;
  // }
  // if (catPos.y > windowHeight || catPos.Y < windowHeight) {
  //   ydirection *= -1;
  // }


  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;
  //================switched x and y maps
  zPosition = map(alpha, 0, 0, 0, 0);
  xPosition = map(gamma, 80, -80, 0, width);
  yPosition = map(beta, 40, -40, 0, height);


  catPos.x = xPosition
  catPos.y = yPosition



  for (var i = 0; i < flock.boids.length; i++) {
    //flock.boids[i].render();
    flock.boids[i].run();
    if (flock.boids[i].position.dist(catPos) < 40) {
      flock.boids.splice(i, 1);
      stomachX += 3;

    }

  }

}
//================end draw

//---------------- Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});

// --------------------accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});
//------------------element definitions
// Flock object
// Does very little, simply manages the array of all the boids


function Flock() {
  // An array for all the boids
  this.boids = [];
  // Initialize the array
}

Flock.prototype.run = function() {

}

Flock.prototype.addBoid = function(b) {
  flock.boids.push(b);
}

// Path class
function Path(p) {
  let radius = 25;

  start = createVector(sx, sy);
  end = createVector(px, py);
}

Path.prototype.run = function(boids) {
  // Following path = constant vel with a predicted location
  let predict = vel.get();
  predict.normalize();
  predict.mult(25);
  predictLocation = p5.Vector.add(loc, predict);

  a = p.start;
  b = p.end;
  normalPoint = getNormalPoint(predictLocation, a, b)

  dir = p5.Vector.sub(b, a);
  dir.normalize();
  dir.mult(10);
  target = p5.Vector.add(nomalPoint, dir);

  distance = p5.dist(normalPoint, predictLocation);
  if (distance > path.radius) {
    seek(target);
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added
//===================== Boid start
function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-20, 20), random(-20, 20));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 20; // Maximum speed
  this.maxforce = 0.5 // Maximum steering force
  //   this.maxforce = 0.05; // Maximum steering force
}
//---------------------end boid variables
Boid.prototype.run = function() {
  //==================these are the prototypes for boid
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}
//---------------------- end run
Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}
//--------------------- end force
// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function() {
  let sep = this.separate(boids); // Separation
  //let ali = this.align(boids); //align
  let coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(5.0);
  coh.mult(0.05);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  // this.applyForce(ali);
  this.applyForce(coh);
}
//-------------------- end flock
// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  //this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

}
//----------------end update location
// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {

  //let d = desired.mag();
  let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}
//------------------ end seek

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading(0, 0);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

  image(mice[currentFrame], 0, 0);
  currentFrame++;
  if (currentFrame == mice.length) {
    currentFrame = 0;
  }

  pop();
}
// --------------------- end render
// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < 0) this.position.x = windowWidth;
  if (this.position.y < 0) this.position.y = windowHeight;
  if (this.position.x > windowWidth) this.position.x = 0;
  if (this.position.y > windowHeight) this.position.y = 0;
}
//--------------------- end borders
// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let angle = 0;
  let angleVel = 0.3;
  let desiredseparation = 160;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < flock.boids.length; i++) {

    let d = p5.Vector.dist(this.position, flock.boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, flock.boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }
  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}
//--------------------end Separation

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 100;
  let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < flock.boids.length; i++) {
    let d = p5.Vector.dist(this.position, flock.boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(flock.boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
//-------------------- end cohesion
//============================================end boid class

//===================================start Cat class

function drawAxis(base, vec) {
  push();
  noStroke();
  translate(base.x, base.y);
  line(base.x, base.y, vec.x, vec.y);
  rotate(vec.heading());
  translate(vec.mag(), 0);
  cat(vec.x, vec.y);
  pop();
}

function cat() {

  rotate(90);
  push();


  //left front leg
  image(frontL, -36 + -2 / 10 * (stomachX - 64), 15);

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
  //fill(150, 0, 150, 150);
  translate(-300, -300);
  //ellipse(300, 300, 70, 70);
  pop();
}
