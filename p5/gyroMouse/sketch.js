/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */

var alpha, beta, gamma; // orientation data
var catImg;
var xPosition = 0;
var yPosition = 0;
var x = 0; // acceleratiobn data
var y = 0;
var z = 0;
var angle = 0.0;
var timer = 0;
var catHead;
var legleftF;
var legrightF;
var cattail;
var catbody;
var leftB;
var rightB;
var cars = [];
var catPos;
var angle = 0.0;
var woodFloor;

//---------------------------------------------------------Set up
function preload() {
  catImg = loadImage("assets/1x/catPlace.png");
  woodFloor = loadImage("assets/1x/floor.png");
  catHead = loadImage("assets/SVG/head_1.svg");
  cattail = loadimage("assets/SVG/tail_1.svg");
  legleftF = loadimage("assets/SVG/frontR.svg");
  legrightF = loadImage("assets/SVG/frontL.svg");
  leftB = loadImage("assets/SVG/backL.svg");
  leftF = loadImage("assets/SVG/backR.svg");
  catbody = loadImage("assets/SVG/body.SVG")

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);

}
//--------------------------------------------------------Draw
function draw() {


  //translate(-300, -300);
  fill(100, 100, 100, 200);
  ellipse(300, 300, 70, 70);
  image(catHead, 300, 300);
  image(catbody, 600, 600);

}
