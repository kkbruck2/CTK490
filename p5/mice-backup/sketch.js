//@name Flocking
//@description Demonstration of <a href="http://www.red3d.com/cwr/">Craig Reynolds' "Flocking" behavior</a>.<br>
//(Rules: Cohesion, Separation, Alignment.)<br>
//From <a href="http://natureofcode.com">natureofcode.com</a>
//===============variables
var mice = [];
let boids = [];
var flock;
var woodFloor;
var windowWidth = 0;
var windowHeight = 0;

function preload() {
  mice[0] = loadImage('assets/1x/mice1.png');
  mice[1] = loadImage('assets/1x/mice2.png');
  mice[2] = loadImage('assets/1x/mice3.png');
  mice[3] = loadImage('assets/1x/mice4.png');
  mice[4] = loadImage('assets/1x/mice5.png');
  mice[5] = loadImage('assets/1x/mice4.png');
  mice[6] = loadImage('assets/1x/mice3.png');
  mice[7] = loadImage('assets/1x/mice2.png');

  woodFloor = loadImage("assets/1x/myFloor.png")


}
//===============setup

function setup() {
  //mice = loadImage("assets/mice5.png");
  createCanvas(windowWidth, windowHeight);


  imageMode(CENTER);
  angleMode(DEGREES);

  flock = new Flock();

  // Add an initial set of boids into the system

  for (let i = 0; i < 25; i++) {
    boids[i] = new Boid(random(width), random(height));

  }
}
//================end setup
//================draw start
function draw() {
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  flock.run();

}

function Flock() {
  this.boids = [];
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);
  }
Flock.prototype.addBoid = function(b) {
    this.boids.push(b);
  }
}

//=================== Boid class
// -------Methods for Separation, Cohesion, Alignment added
function Boid(x, y) {
  //=============attributes

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3; // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}
//====================drive
Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

// Forces go into acceleration
Boid.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
//=================flock
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids); // Separation
  //let ali = this.align(boids); // Alignment
  let coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.0);
  //ali.mult(0);
  coh.mult(0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  //this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
//===============method
Boid.prototype.update = function() {
  //--------------- Update velocity
  this.velocity.add(this.acceleration);
  //------------------Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset acceleration to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired, this.velocity);


  steer.limit(this.maxforce); // Limit to maximum steering force

  return steer;
}

//===============display
Boid.prototype.render = function()  {
  this.miceNum = 0;
  //this.timer = 0;
  //this.maxTimer = (1, 10);
  let theta = this.velocity.heading() + radians(90);

  push();
  // animating the mices
  // if (this.velocity > 0) map(this.maxTimer * -1 === this.velocity.mag());
  // if (this.velocity < 0) map(this.maxTimer === this.velocity.mag());
  translate(this.position.x, this.position.y);
  rotate(theta);
  image(mice[this.miceNum], this.position.x, this.position.y);
  pop();

  //this.timer++;


  //   if (this.timer > this.maxTimer) {
  //     this.miceNum = this.miceNum + 1;
  //     this.timer = 0;

  //   }


  //   //mice reset
  //   if (this.miceNum > mice.length - 1) {
  //     this.miceNum = 0;
  //   }
  //==========================end newcode


}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -170) this.position.x = windowWidth + 170;
  if (this.position.y < -170) this.position.y = windowHeight + 170;
  if (this.position.x > windowWidth + 170) this.position.x = -170;
  if (this.position.y > windowHeight + 170) this.position.y = -170;
}

//================ Separation

//================ Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  //===============For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);

    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
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


// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
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
