let gui;
let koz = true;
let scl = 1;
let megnyomva = false;
let H;
let canv;

function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  setupUI();
  noLoop();
}

function draw() {
  background(20);
  strokeWeight(3);
  stroke(255);
  line(0, height-20, width, height-20);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mouseWheel(event) {
  scl += event.delta / 1000;
  console.log(event.delta);
}
