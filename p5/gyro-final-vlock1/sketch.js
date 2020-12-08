//@name Flocking
//@description Demonstration of <a href='http://www.red3d.com/cwr/'>Craig Reynolds' 'Flocking' behavior</a>.<br>
//(Rules: Cohesion, Separation, Alignment.)<br>
//From <a href='http://natureofcode.com'>natureofcode.com</a>
//===============variables

//===============mice
let boids = [];
let flock;
//--------------------mice array
var mice = [];
let miceNum = 8;
let currentFrame = 0;
//===============cat
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
var cat;
var xdirection = 1;
var ydirection = 1;
var windowWidth = 0;
var windowHeight = 0;
//==============environment
var woodFloor;


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
//==================interface var
var start;
var win;
var lose;
var winSound;
var loseSound;
var soundOn;
var soundOff;

//------------------game


var myState = 0;
var timer = 0;
var direction = [];


function preload() {
  //================mice images
  //mice = loadImage('assets/1x/mice5.png');
  mice[0] = loadImage('assets/1x/mice1.png');
  mice[1] = loadImage('assets/1x/mice2.png');
  mice[2] = loadImage('assets/1x/mice3.png');
  mice[3] = loadImage('assets/1x/mice4.png');
  mice[4] = loadImage('assets/1x/mice5.png');
  mice[5] = loadImage('assets/1x/mice4.png');
  mice[6] = loadImage('assets/1x/mice3.png');
  mice[7] = loadImage('assets/1x/mice2.png');

  //===============cat images
  catHead = loadImage("assets/1x/head.png");
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  woodFloor = loadImage("assets/1x/myFloorV.png");
  marks = loadImage("assets/1x/marking.png");
  //=================interface images
  start = loadImage('assets/1x/start.png');
  win = loadImage('assets/1x/winCat.png');
  lose = loadImage('assets/1x/loss.png');
  soundOn = loadImage('assets/1x/soundOn.png')
  soundOff = loadImage('assets/1x/soundOff.png')
  //===============sound
  bkgMusic = loadSound('assets/456797__anechoix__jazz-music-loop.mp3');
  winSound = loadSound('assets/396174__funwithsound__success-triumph-resolution-sound-effect_01.mp3')
  loseSound = loadSound('assets/174427__badly99__domino-sound-effect_01.mp3')

  bkgMusic.loop();
  bkgMusic.stop();
  winSound.play();
  winSound.stop();
  loseSound.play();
  loseSound.stop();
}
//===============setup
function setup() {
  createCanvas(768, 1366);
  angleMode(DEGREES);
  imageMode(CENTER);
  ellipseMode(CENTER);

  //---------------fonts
  fontDiner = loadFont('assets/FontdinerSwanky-Regular.ttf');
  robo = loadFont('assets/Roboto-Regular.ttf');

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 30; i++) {
    let b = new Boid(random(width), random(height));
    flock.addBoid(b);
  }

  catPos = createVector(windowWidth / 2, windowHeight / 2);

  alpha = 0;
  beta = 0;
  gamma = 0;

  frameRate(8);

}
//==================draw
function draw() {
  background(200, 150, 100);
  image(woodFloor, windowWidth / 2, windowWidth / 2, windowWidth, windowWidth);


  catPos.x = xPosition
  catPos.y = yPosition

  zPosition = map(alpha, 0, 0, 0, 0);
  yPosition = map(gamma, 30, -30, 0, width);
  xPosition = map(beta, 60, -60, 0, height);



  textFont(fontDiner);


  switch (myState) {

    case 0:
      fill(0);
      textSize(70);
      textAlign(CENTER);
      text("Let's Hunt Mice!", width / 2, 250);
      image(start, width / 2, height / 2 + 30);
      textSize(24);
      textFont(robo);
      text("For best results turn on screen lock.", width / 2, height - 80);
      textFont(fontDiner);
      textSize(36);
      text("Click to Enter Game", width / 2, height - 200);
      break;

    case 1:
      bkgMusic.play();
      myState = 2;
      break;

    case 2:
      fill(0);
      textSize(70);
      textAlign(CENTER);
      text("Let's Hunt Mice!", width / 2, 250);
      image(start, width / 2, height / 2 + 30);
      textSize(24);
      textFont(robo);
      textFont(fontDiner);
      textSize(36);

      text("Click to Start Game", width / 2, height - 200);
      break;


    case 3:
      game();
      timer++;
      if (timer > 120) {
        myState = 6;
        timer = 0;
      }
      break;

    case 4:
      winSound.play();
      bkgMusic.stop();
      myState = 5;
      break;

    case 5: // the win state
      fill(0);
      textFont(fontDiner);
      textSize(60);
      textAlign(CENTER);
      text("Hee...Hee! WE WON!", width / 2 - 15, 120);
      image(win, width / 2, height / 2);
      textSize(24);
      textFont(robo);
      text("Click to Reset Game", width / 2, height - 35);

      break;

    case 6:
      bkgMusic.stop();
      loseSound.play();
      myState = 6;
      break;

    case 7: // the lose state
      fill(0);
      textFont(fontDiner);
      textSize(60);
      textAlign(CENTER);
      text("uh...oh!", width / 2, 120);
      image(lose, width / 2, 400);
      textSize(24);
      textFont(montMed);
      text("Click to Reset Game", width / 2, height - 35);


      break;
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

//=====================Flock

function Flock() {
  // An array for all the boids
  this.boids = [];
  // Initialize the array
}

//   Flock.prototype.run = function() {

//   }

Flock.prototype.addBoid = function(b) {
  flock.boids.push(b);
}

//------------------element definitions
// Flock object
// Does very little, simply manages the array of all the boids

//===================== Path class
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
// Methods for Separation, Cohesion,
//===================== Boid start
function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-10, 10), random(-10, 10));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 10; // Maximum speed
  this.maxforce = 0.5 // Maximum steering force
  this.timer = 0;
  this.maxTimer = (1, 10);
  //   this.maxforce = 0.05; // Maximum steering force
}
//---------------------end boid variables
Boid.prototype.run = function() {
  //==================these are the prototypes for boid
  this.flock(boids);
  this.update();
  this.borders(100, 100);
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
  let theta = this.velocity.heading(0, 0);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

  image(mice[currentFrame], 0, 0);
  currentFrame++;
  if (miceNum == mice.length) {
    currentFrame = 0;
  }
  pop();
}


//==================Mice movement
Boid.prototype.movement = function() {
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
  if (miceNum > mice.length - 1) {
    currentFrame = 0;
  }


  pop();

}


// --------------------- end render
// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -150) this.position.x = windowWidth + 150;
  if (this.position.y < -150) this.position.y = windowHeight + 150;
  if (this.position.x > windowWidth + 150) this.position.x = -150;
  if (this.position.y > windowHeight + 150) this.position.y = -150;
}
//--------------------- end borders
// Separation
// Method checks for nearby boids and steers away

Boid.prototype.separate = function(boids) {
  let angle = 0;
  let angleVel = 0.5;
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

//=====================Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
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
  line(0, 0, vec.x, vec.y);
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
  translate(-300, -300);
  pop();
}
//------------------------end cat class
//================mouseReleased
function mouseReleased() {
  switch (myState) {
    case 0:
      myState = 1;
      break;

    case 2:
      myState = 3;
      break;
    case 6:
      resetTheGame();
      myState = 1;
      break;
    case 7:
      resetTheGame();
      myState = 0;
      break;
  }
}
//================end mouseReleased
//------------------------------------- game
function game() {

  let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  let catPos = createVector(xPosition - windowWidth / 2, yPosition - windowHeight / 2);
  drawAxis(catPos0, catPos);

  let myHeading = catPos.heading();



  //-----------------splice mice
  for (var i = 0; i < flock.boids.length; i++) {
    flock.boids[i].run();
    if (flock.boids[i].position.dist(catPos) < 50) {
      flock.boids.splice(i, 1);
      stomachX += 2;
    }

    if (flock.boids.length == 0) {
      myState = 3;
      timer = 0;
    }



  }
}
//------------------ game end
//==================reset game
function resetTheGame() {
boids = [];

  for (let i = 0; i < 30; i++) {
    let b = new Boid(random(width), random(height));
    flock.addBoid(b);
    timer = 0;
    stomachX = 64;
  }
}
