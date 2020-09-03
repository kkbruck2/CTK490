//new p5.Vector([x], [y], [z])
let value = 0;
let threshold = 30;

function setup() {
  setShakeThreshold(threshold);

}

function draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

function deviceShaken() {
  value = value + 5;
  threshold = threshold + 5;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setShakeThreshold(threshold);
}
