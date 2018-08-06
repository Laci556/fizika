var gui;

let c, v0, v, g, m, dt, t;
let koz = true;
let szog;
var x1, x2;
var y1, y2;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = QuickSettings.create(width-220, 20, 'Beállítások');
  gui.addRange('Szög', -89, 89);
  gui.addBoolean('Közegellenállás', true, value => {koz = value; if(!koz) {gui.disableControl('C')} else {gui.enableControl('C')}});
  gui.addNumber('C', 0, 1000, 0, value => c = value);
  gui.addNumber('Magasság', 0, 1000, 0);
  gui.addNumber('Kezdősebesség', 0, 300, 0);
  gui.addButton('Mehet', anyad);
  gui.addHTML('Eredmény', "</br>");
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(20);
  strokeWeight(3);
  stroke(255);
  line(0, height-20, width, height-20);
}

function anyad() {
  if(!koz){
    kozNelkul();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function kozNelkul() {
  h = height - gui.getValue('Magasság') - 20;
  v0 = gui.getValue('Kezdősebesség');
  szog = gui.getValue('Szög');
  let cosSzog = cos(abs(szog));
  let sinSzog = sin(szog);
  let a = 9.81 / 2;
  t = 0;
  noFill();
  stroke(255);
  strokeWeight(2);
  x1 = 20;
  y1 = h;
  t += 0.01;
  x2 = x1 + v0 * cosSzog * 0.01;
  y2 = h - v0 * sinSzog * t + a * t * t;
  line(x1, y1, x2, y2);
  t += 0.01;
  while(y1 < height - 20) {
    x1 = x2;
    y1 = y2;
    x2 += v0 * cosSzog * 0.01;
    y2 = h - v0 * sinSzog * t + a * t * t;
    line(x1, y1, x2, y2);
    t += 0.01;
  }

  gui.setValue('Eredmény', "x = " + v0 * cosSzog * t + " m" + "</br>" + "t = " + t + " s");
}
