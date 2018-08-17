function setupUI() {
  gui = QuickSettings.create(width-220, 20, 'Beállítások');
  gui.addColor('Szín', '#ffffff');
  gui.addRange('Szög', -89, 89);
  gui.addBoolean('Közegellenállás', true, value => {koz = value; if(!koz) {gui.disableControl('C')} else {gui.enableControl('C')}});
  gui.addNumber('C', 0, 1000, 0);
  gui.addNumber('Magasság', 0, 1000, 0);
  gui.addNumber('Kezdősebesség', 0, 300, 0);
  gui.addButton('Mehet', function() {
    H = new Hajitas(gui.getValue('C'), gui.getValue('Kezdősebesség'), 0, gui.getValue('Szög'), gui.getValue('Magasság'), gui.getValue('Szín'), 0.0001);
    if(koz){
      H.kozegellenallas();
    } else {
      H.kozNelkul();
    }
    gui.showControl('Letöltés');
  });
  gui.addHTML('Eredmény', "</br>");
  gui.addButton('Töröl', () => {redraw(); gui.setValue('Eredmény', '</br>'); gui.hideControl('Töröl'); gui.hideControl('Letöltés')}).hideControl('Töröl');
  gui.addButton('Letöltés', letoltes).hideControl('Letöltés');
}

function letoltes(){
    let fileNev = year() + '.' + month() + '.' + day() + ';' + hour() + ':' + minute() + '.svg';
    saveCanvas(fileNev);
}

class Hajitas {
  constructor(c, v0, m, szog, h, szin, dt) {
    this.c = c;
    this.v0 = v0;
    this.m = m;
    this.szog = szog;
    this.h = -h;
    this.szin = szin;
    this.dt = dt;
  }
  kozegellenallas() {

  }
  kozNelkul() {
    let cosSzog = cos(abs(this.szog));
    let sinSzog = sin(this.szog);
    let a = 9.81 / 2;
    this.t = 0;
    translate(20, height - 20);
    scale(scl);
    noFill();
    stroke(200);
    for (let i = 0; i < width / scl; i+= 5) {
      strokeWeight(1);
      line(i, 0, i, 50);
    }
    strokeWeight(1);
    stroke(this.szin);
    let x1 = 0;
    let y1 = this.h;

    this.t += this.dt;
    let x2 = x1 + this.v0 * cosSzog * this.dt;
    let y2 = this.h - this.v0 * sinSzog * this.t + a * this.t * this.t;
    line(x1, y1, x2, y2);

    this.t += this.dt;
    while(y1 <= 0) {
      x1 = x2;
      y1 = y2;
      x2 += this.v0 * cosSzog * this.dt;
      y2 = this.h - this.v0 * sinSzog * this.t + a * this.t * this.t;
      line(x1, y1, x2, y2);

      this.t += this.dt;
    }
    let eredmeny = "<p style=\"font-size: 10.3pt\">" + "<b>x =</b> " + (this.v0 * cosSzog * this.t).toFixed(3) + " m" + "</br>" + "<b>t =</b> " + (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " + (acos((x2 - x1) / (sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))))).toFixed(3) + "°" + "<br/>" + "<b>Végsebesség:</b> " + (sqrt(pow(y2 - y1, 2) + pow(x2 - x1, 2)) / this.dt).toFixed(3) + " m/s" + "</p>";
    gui.setValue('Eredmény', eredmeny);
    gui.showControl('Töröl');
  }
}
