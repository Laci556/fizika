let gui;
l

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui('Beállítások');
}

function draw() {
  background(20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
