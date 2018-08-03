let gui;
let h = 50;
let x1 = h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = QuickSettings.create(20, 20, 'Beállítások');
  angleMode(DEGREES);
  
}

function draw() {
  background(20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
