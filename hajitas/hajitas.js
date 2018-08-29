function setupUI() {
  gui.addNumber('Kezdősebesség', 0, 300, 0);
  gui.addButton('Számol', function () {
    H = new Hajitas(gui.getValue('C'), gui.getValue('Kezdősebesség'), gui.getValue('Tömeg'), gui.getValue('Szög'), gui.getValue('Magasság'), gui.getValue('Szín'), ido, g);
    if (koz) {
      H.kozegellenallas();
    } else {
      H.kozNelkul();
    }
    gui.showControl('Letöltés');
  });
  gui.addHTML('Eredmény', "</br>");
  gui.addButton('Töröl', () => { redraw(); gui.setValue('Eredmény', '</br>'); gui.hideControl('Töröl'); gui.hideControl('Letöltés') }).hideControl('Töröl');
  gui.addButton('Letöltés', letoltes).hideControl('Letöltés');
}

let dropdown = [9.81, 10];

function letoltes() {
  let fileNev = year() + '.' + month() + '.' + day() + ';' + hour() + ':' + minute() + formatum;
  saveCanvas(fileNev);
}

class Hajitas {
  constructor(c, v0, m, szog, h, szin, dt, g) {
    this.c = c;
    this.v0 = v0;
    this.m = m;
    this.szog = szog;
    this.h = -h;
    this.szin = szin;
    this.dt = dt;
    this.g = g;
  }




  kozegellenallas() {
    redraw();
    let cosSzog = cos(abs(this.szog));
    let sinSzog = sin(this.szog);
    this.t = 0;
    translate(20, height - 20);
    scale(scl);
    noFill();
    stroke(200);
    for (let i = 0; i < width / scl; i += 5) {
      strokeWeight(1);
      line(i, 0, i, 50);
    }
    strokeWeight(1);
    stroke(this.szin);

    let x1 = 0;
    let y1 = this.h;

    let vX = this.v0 * cosSzog;
    let vY = this.v0 * sinSzog;

    this.maxH = y1;
    this.t += this.dt;

    let v = sqrt(vX ** 2 + vY ** 2);

    let dvX = ((this.c * this.dt) / this.m) * vX * v; // this.t csere this.dt


    let vXuj = vX - dvX;
    let vYuj = vY + -((this.c * this.dt) / this.m) * (vY * v) - this.g * this.dt; // -



    let x2 = x1 + (vX + vXuj) / 2 * this.dt;

    let y2 = y1 - (vY + vYuj) / 2 * this.dt;

    vX = vXuj;
    vY = vYuj;

    line(x1, y1, x2, y2);
    this.t += this.dt;

    while (y1 <= 0) {
      if (y1 < this.maxH) this.maxH = y1;

      x1 = x2;
      y1 = y2;

      v = sqrt(vX ** 2 + vY ** 2);

      dvX = -((this.c * this.dt) / this.m) * vX * v;


      vXuj = vX + dvX;
      vYuj = vY + -((this.c * this.dt) / this.m) * (vY * v) - this.g * this.dt; // -



      x2 = x1 + (vX + vXuj) / 2 * this.dt;
      y2 = y1 - (vY + vYuj) / 2 * this.dt; //

      vX = vXuj;
      vY = vYuj;

      line(x1, y1, x2, y2);
      this.t += this.dt;
    }

    let eredmeny = "<p style=\"font-size: 10.3pt\">" + "<b>x =</b> " +
      ((x1 + x2) / 2).toFixed(3) + " m" + "</br><b>y =</b> " +
      (-this.maxH).toFixed(3) + " m" + "</br>" + "<b>t =</b> " +
      (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " +
      (acos((x2 - x1) / (sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)))).toFixed(3) + "°" +
      "<br/>" + "<b>Végsebesség:</b> " +
      (v).toFixed(3) + " m/s" + "</p>";
    gui.setValue('Eredmény', eredmeny);
    gui.showControl('Töröl');
  }



  kozNelkul() {
    redraw();
    let cosSzog = cos(abs(this.szog));
    let sinSzog = sin(this.szog);
    let a = this.g / 2;
    this.t = 0;
    translate(20, height - 20);
    scale(scl);
    noFill();
    stroke(200);
    for (let i = 0; i < width / scl; i += 5) {
      strokeWeight(1);
      line(i, 0, i, 50);
    }
    strokeWeight(1);
    stroke(this.szin);
    let x1 = 0;
    let y1 = this.h;
    this.t += this.dt;
    this.maxH = y1;
    let x2 = x1 + this.v0 * cosSzog * this.dt;
    let y2 = this.h - this.v0 * sinSzog * this.t + a * this.t * this.t;
    line(x1, y1, x2, y2);
    this.t += this.dt;
    while (y1 <= 0) {
      if (y1 < this.maxH) this.maxH = y1;
      x1 = x2;
      y1 = y2;
      x2 += this.v0 * cosSzog * this.dt;
      y2 = this.h - this.v0 * sinSzog * this.t + a * this.t * this.t;
      line(x1, y1, x2, y2);
      this.t += this.dt;
    }

    let eredmeny = "<p style=\"font-size: 10.3pt\">" + "<b>x =</b> " +
      (this.v0 * cosSzog * this.t).toFixed(3) + " m" + "</br><b>y =</b> " +
      (-this.maxH).toFixed(3) + " m" + "</br>" + "<b>t =</b> " +
      (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " +
      (acos((x2 - x1) / (sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)))).toFixed(3) + "°" +
      "<br/>" + "<b>Végsebesség:</b> " +
      (dist(x1, y1, x2, y2) / this.dt).toFixed(3) + " m/s" + "</p>";
    gui.setValue('Eredmény', eredmeny);
    gui.showControl('Töröl');
  }
}
