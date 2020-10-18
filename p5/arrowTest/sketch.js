var woodFloorX = 0;
var woodFloorY = 0;
var catStX
var catStY
  let arrowSize = 7;
var base
var cat

function preload() {
  woodFloor = loadImage("assets/1x/myFloor.png")
  cat = loadImage("assets/1x/catPlace.png")
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  woodFloor = loadImage("assets/1x/myFloor.png")


//  cat(mouseX, mouseY);



}

function draw() {
  background(240);
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  let v0 = createVector(mouseX, mouseY);
  let v1 = createVector(mouseX, mouseY);

  drawArrow(v0, v1, 'black');

  let myHeading = v1.heading();
  noStroke();
  text(
    'vector heading: ' +
      myHeading.toFixed(2) +
      ' radians or ' +
      degrees(myHeading).toFixed(2) +
      ' degrees',
    10,
    50,
    90,
    50
  );
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  heading(base.x, base.y, vec.x, vec.y);
  //line(base.x, base.y, vec.x, vec.y);
  rotate(vec.heading());

  //translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
