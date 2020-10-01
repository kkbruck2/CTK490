var catWhole;
var catHead;
var legleftF;
var legrightF;
var cattail;
var catbody;
var pawleftB;
var pawrightB;
var woodFloor;
var activeArea;
var stomachX = 67;
var stomachY = 162;

function preload() {
  catHead = loadImage("assets/1x/head.png");
  legleftF = loadImage("assets/1x/frontL.png");
  legrightF = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  catbody = loadImage("assets/1x/body.png");
  pawleftB = loadImage("assets/1x/backL.png");
  pawrightB = loadImage("assets/1x/backR.png");
  activeArea = loadImage("assets/1x/Asset106.png");
  catWhole = loadImage("assets/1x/catPlace.png");
}



function setup() {

  createCanvas(600, 600);
  angleMode(DEGREES);
  imageMode(CENTER);




}

function draw() {
  background(255);
  //template
  // image(catWhole, 100,160);
  // fill(255, 255, 255, 80)
  // rect(0, 0, 400, 400);
  //template END
  //activeArea
  fill(0, 0, 0, 50);
  ellipse(95, 30, 60, 60);
  cat();

}

function cat() {
  //front Legs
  image(legleftF, 62, 54);
  //right front Leg
  image(legrightF, 131, 63);

  //back Legs
  image(pawleftB, 62, 169);
  image(pawrightB, 134, 170);

  //cat head, body, and tail

  image(catbody, 100, 150, stomachX, stomachY);
  image(catHead, 100, 40);
  image(cattail, 119, 275);



}
