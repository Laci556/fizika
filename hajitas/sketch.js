var gui;

let c, v0, v, g, m, dt, t, szog, x1, x2, y1, y2, h;
let koz = true;
let scl = 1;
let szin;
let megnyomva = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = QuickSettings.create(width-220, 20, 'Beállítások');
  gui.addColor('Szín', '#ffffff');
  gui.addRange('Szög', -89, 89);
  gui.addBoolean('Közegellenállás', true, value => {koz = value; if(!koz) {gui.disableControl('C')} else {gui.enableControl('C')}});
  gui.addNumber('C', 0, 1000, 0, value => c = value);
  gui.addNumber('Magasság', 0, 1000, 0);
  gui.addNumber('Kezdősebesség', 0, 300, 0);
  gui.addButton('Mehet', anyad);
  gui.addHTML('Eredmény', "</br>");
  gui.addButton('Töröl', () => {redraw(); gui.setValue('Eredmény', '</br>'); gui.hideControl('Töröl'); gui.hideControl('Letöltés')}).hideControl('Töröl');
  gui.addButton('Letöltés', letoltes()).hideControl('Letöltés');
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(20);
  strokeWeight(3);
  stroke(255);
  line(0, height-20, width, height-20);
}

function letoltes(){
  if (megnyomva) {
    let fileNev = year() + '.' + month() + '.' + day() + ';' + hour() + ':' + minute() + '.jpg';
    saveCanvas(fileNev);
  } else {
    megnyomva = !megnyomva;
  }
}

function anyad() {
  if(!koz){
    kozNelkul();
  }
  gui.showControl('Letöltés');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function kozNelkul() {
  h = - gui.getValue('Magasság');
  v0 = gui.getValue('Kezdősebesség');
  szog = gui.getValue('Szög');
  let cosSzog = cos(abs(szog));
  let sinSzog = sin(szog);
  let a = 9.81 / 2;
  szin = gui.getValue('Szín');
  t = 0;
  translate(20, height - 20);
  scale(scl);
  noFill();
  stroke(200);
  for (let i = 0; i < width / scl; i+= 5) {
    strokeWeight(1);
    line(i, 0, i, 50);
  }
  strokeWeight(1);
  stroke(szin);
  x1 = 0;
  y1 = h;

  t += 0.001;
  x2 = x1 + v0 * cosSzog * 0.001;
  y2 = h - v0 * sinSzog * t + a * t * t;
  line(x1, y1, x2, y2);

  t += 0.001;
  while(y1 <= 0) {
    x1 = x2;
    y1 = y2;
    x2 += v0 * cosSzog * 0.001;
    y2 = h - v0 * sinSzog * t + a * t * t;
    line(x1, y1, x2, y2);

    t += 0.001;
  }
  let eredmeny = "x = " + v0 * cosSzog * t + " m" + "</br>" + "t = " + t + " s" + "</br>" + "Becsapódás szöge: " + acos((x2 - x1) / (sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))));
  gui.setValue('Eredmény', eredmeny);
  gui.showControl('Töröl');
}

function mouseWheel(event) {
  scl += event.delta / 1000;
}
