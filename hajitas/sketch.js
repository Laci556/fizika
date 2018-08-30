let koz = true; // koz
let scl = 1;
let H;
let canv;
let ido; // dt
let beall = 300;
let C_; // c
let tomeg; // m
let g; // g
let formatum; // formatum
let alfa = 0; // szog
let magassag; // h
let kezdoseb; // v0
let strW = 0.3;

function setup() {
  canv = createCanvas(windowWidth - beall, windowHeight);
  canv.parent(document.getElementById("cnv"));
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(20);
  strokeWeight(0.5);
  stroke(255);
  line(20, height-20, width, height-20);
  line(20, height-20, 20, -width+20)
}

function windowResized() {
  resizeCanvas(windowWidth - beall, windowHeight);
}

function mouseWheel(event) {
  if (scl - event.delta / 1000 > 0.1) {
    scl -= event.delta / 1000;
  } else {
    scl += event.delta / 1000;
  }
}

