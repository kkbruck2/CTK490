//cat images
var catWhole;
var catHead;
var frontL, frontR, backL, backR;
var cattail;
var catbody;
var stomachY = 64;
var stomachX = 160;
var marks;
let catImg;
//cat location
var catDirection = 1;
let x = 150,
  y = 150,
  angle1 = 0.0,
  segLength = 100;
//mice
var mice = [];
var boids = [];
var direction = [];
//game
var myState = 0;
var start;
var win;
var lose;
//winSound
var winSound;
var loseSound;
var bkgMusic;
//environment
var windowWidth = 0;
var windowHeight = 0;
var woodFloor;
var grid;
//=======================================var end

//=======================================preload
function preload() {
  //cat
  catHead = loadImage('assets/1x/head.png');
  frontL = loadImage('assets/1x/frontL.png');
  frontR = loadImage('assets/1x/frontR.png');
  cattail = loadImage('assets/1x/tail.png');
  catbody = loadImage('assets/1x/body.png');
  backL = loadImage('assets/1x/backL.png');
  backR = loadImage('assets/1x/backR.png');
  catWhole = loadImage('assets/1x/catPlace.png')
  marks = loadImage('assets/1x/marking.png');
  //environment
  woodFloor = loadImage('assets/1x/myFloor.png');
  grid = loadImage('assets/grid.png');
  //mice
  mice[0] = loadImage('assets/1x/mice1.png');
  mice[1] = loadImage('assets/1x/mice2.png');
  mice[2] = loadImage('assets/1x/mice3.png');
  mice[3] = loadImage('assets/1x/mice4.png');
  mice[4] = loadImage('assets/1x/mice5.png');
  mice[5] = loadImage('assets/1x/mice4.png');
  mice[6] = loadImage('assets/1x/mice3.png');
  mice[7] = loadImage('assets/1x/mice2.png');
  //Game
  start = loadImage('assets/start.png');
  lose = loadImage('assets/loss.png');
  win = loadImage('assets/winCat.png')

  //sound load

  bkgMusic = loadSound('assets/456797__anechoix__jazz-music-loop.mp3');
  winSound = loadSound('assets/396174__funwithsound__success-triumph-resolution-sound-effect_01.mp3');
  loseSound = loadSound('assets/174427__badly99__domino-sound-effect_01.mp3');

  //-------------------audio play option
  // var promise = document.querySelector('video').play();
  //
  // if (promise !== undefined) {
  //   promise.then(_ => {
  //     // Autoplay started!
  //   }).catch(error => {
  //     // Autoplay was prevented.
  //     // Show a "Play" button so that user can start playback.
  //   });
  // }
  //----------------------------------------------------------

  //sound action

  bkgMusic.loop();
  bkgMusic.stop();
  winSound.play();
  winSound.stop();
  loseSound.play();
  loseSound.stop();
}
//=======================preload end

//=======================setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  //Fonts
  fontDiner = loadFont('assets/FontdinerSwanky-Regular.ttf');
  chalk = loadFont('assets/Chalkboard.ttc');
  montMed = loadFont('assets/Montserrat-Medium.ttf');
  grid = loadImage('assets/grid.png');

  // audio load


  //-----------------------------

  bkgMusic.play();

  //--------------------------Spawn mice
  for (var i = 0; i < 30; i++) {
    boids.push(new Boid());
  }
  //---------------------------spawn end

  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES);
}
//============================end setup

//============================draw
function draw() {
  background(206, 150, 100);
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;
  //Rotating point
  segment(x, y, angle1);

  //----------------Text heading
  textFont(fontDiner);
  //----------------States
  switch (myState) {
    case 0:
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Let's Hunt Mice!", windowWidth / 2, 120);
      image(start, windowWidth / 2, windowHeight / 2 + 30);
      textSize(30);
      textFont(montMed);
      text('Click for Sound', windowWidth / 2, windowHeight - 35);
      break;

    case 1:
      bkgMusic.play();
      myState = 2;
      break;

    case 2:
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Let's Hunt Mice!", windowWidth / 2, 120);
      image(start, windowWidth / 2, windowHeight / 2 + 30);
      winSound.stop();
      loseSound.stop();
      textSize(30);
      textFont(montMed);
      text('Click to Start Game', windowWidth / 2, windowHeight - 35);
      break;

    case 3:
      game();
      timer++;
      if (timer > 1000) {
        myState = 5;
        timer = 0;
      } // the game state
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
      text('Hee...Hee!       WE WON!', windowWidth / 2 - 15, 120);
      image(win, windowWidth / 2, windowHeight / 2);
      textSize(30);
      textFont(montMed);
      text('Click to Reset Game', windowWidth / 2, windowHeight - 35);
      break;

    case 6:
      bkgMusic.stop();
      loseSound.play();
      myState = 7;
      break;

    case 7: // the lose state
      fill(0);
      textFont(fontDiner);
      textSize(60);
      textAlign(CENTER);
      text('uh...oh!', windowWidth / 2, 120);
      image(lose, windowWidth / 2, 400);
      textSize(30);
      textFont(montMed);
      text('Click to Reset Game', windowWidth / 2, windowHeight - 35);
      break;
  }
}
//----------------------------------------------------end draw
//----------------------------------------------------mouseReleased
function mouseReleased() {
  switch (myState) {
    case 0:
      myState = 1;
      break;
    case 1:
      myState = 2;
      break;
    case 5:
      resetTheGame();
      myState = 1;
      break;
    case 7:
      resetTheGame();
      myState = 1;
      break;
  }
}
//---------------------------------------------------end mouseReleased


//----------------------------------------------------mice class!!
function Boid(x, y) {
  //----attributes
  this.acc = createCanvas(0, 0);
  this.vel = createVector(random(-6, 6), random(-6, 6));
  this.pos = createVector(windowWidth - 160, windowHeight - 160);
  this.miceNum = 0;
  this.timer = 0;
  this.maxTimer = (1, 10);

  //----- methods

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(1);
  }

  this.seek = function(target) {
    let desired = createVector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = createVector.sub(target, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }
  // display

  this.display = function(boids) {
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
    this.flock(boids);
    this.update();
    this.borders();
    this.render();

    if (this.pos.x > windowWidth) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = windowWidth;
    if (this.pos.y > windowHeight) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = windowHeight;
  }
this.flock = function() {
  let sep = this.separate(boids);
  let ali = this.align(boids);
  let coh = this.cohesion(boids);

  sep.mult(5.0);
  ali.mult(0.05);
  coh.mult(0);

  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

}

//--------------------------------------------------------end boids class
//------------------------------------------------------mouse keyPressed
// function mousePressed() {
//   xOffset = mouseX - catPos.x;
//   yOffset = mouseY - catPos.y;
// }
//----------------------------------------------------mouse keyPressed end

//-----------------------------------------------------mouseDragged



//---------------------------------------------------------reset the game
function resetTheGame() {
  boids = [];
  //--------------------------Spawn cars
  for (var i = 0; i < 30; i++) {
    boids.push(new Boid());
  }
  timer = 0;
  stomachX = 65;

}
//----------------------------------------------------------end game reset

//------------------------------------------------------------ game
function game() {
  for (var i = 0; i < boids.length; i++) {
    boids[i].display();
    boids[i].drive();
    if (boids[i].pos.dist(catPos) < 100) {
      boids.splice(i, 1);
      stomachY += 3;
    }
  }

  if (boids.length == 0) {
    myState = 4;
    timer = 0;
  }

  //================cat movement table-condensed

  // push();
  //
  // translate(catPos.x - 100, catPos.y - 65);
  //
  // cat();
  // pop();

}
//------------------------------------------------------------ game end


//--------------------------------------------------------------cat function
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
