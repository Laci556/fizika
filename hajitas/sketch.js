let gui;

let szog, h, c;
let koz;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = QuickSettings.create(20, 20, 'Beállítások');
  angleMode(DEGREES);
  gui.addRange('Szög', 0, 90, 45, 1, value => szog = value);
  gui.addBoolean('Közegellenállás', true, value => {koz = value; if(!koz) {gui.disableControl('C')} else {gui.enableControl('C')}});
  gui.addNumber('C', 0, 1000, 0, 0.1, value => c = value);
  gui.addNumber('Magasság', 0, 1000, 0, 1, value => h = value);
}

function draw() {
  background(20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
