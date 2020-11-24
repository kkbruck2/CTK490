/*
 * @name Follow 1
 * @frame 710,400
 * @description A line segment is pushed and pulled by the cursor.
 * Based on code from Keith Peters.
 */
let x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;
var catPos;
var windowWidth = 0;
var windowHeight = 0;

function setup() {
  createCanvas(710, 400);
  strokeWeight(20.0);
  stroke(255, 100);

  alpha = 0;
beta = 0;
gamma = 0;

for (var i = 0; i < 20; i++) {
  cars.push(new car())
}
}


  //=================
  function draw() {
    background('#CE9B64'); // background fill
    background(200);
    //image(woodFloor, width / 2, height / 2, 710, 400);


    //-----------------------------

    //---------------------------------------cat translate
    xPosition = map(gamma, -60, 60, 0, width);
    yPosition = map(beta, -30, 30, 0, height);



    catPosX = xPosition
    catPosY = yPosition

    for (var i = 0; i < cars.length; i++) {
      cars[i].display();
      cars[i].drive();
      if (cars[i].pos.dist(catPos) < 50) {
        cars.splice(i, 1);
        stomachX += 3;

      }

    //==================

    dx = catPosX - x;
    dy = catPosY - y;
    angle1 = atan2(dy, dx);
    x = catPosX - cos(angle1) * segLength;
    y = catPosY - sin(angle1) * segLength;

    segment(x, y, angle1);
    ellipse(x, y, 20, 20);
  }

  function segment(x, y, a) {
    push();
    translate(x, y);
    rotate(a);
    line(0, 0, segLength, 0);
    pop();
  }
}
