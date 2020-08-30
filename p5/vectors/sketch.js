//new p5.Vector([x], [y], [z])


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  catImg = loadImage("assets/1x/catPlace.png");


}




  function draw() {
  background(240);

  cat(0, 0)

  let v0 = createVector(0, 0);
  let v1 = createVector(mouseX, mouseY);


}

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


function cat() {
image(catImg, 0, 113);
fill(255, 60, 150, .2)
ellipse(-35, -35, 70, 70);
}
