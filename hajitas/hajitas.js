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
    this.cosSzog = cos(abs(this.szog));
    this.sinSzog = sin(this.szog);
    this.t = 0;
    translate(20, height - 20);
    scale(scl);
    noFill();
    stroke(200);
    for (let i = 0; i < width / scl; i += 5) {
      strokeWeight(strW);
      line(i, 3, i, -3);
    }

    for (let i = 0; i < height / scl; i++) {
      strokeWeight(strW);
      line(-3, i * -5, 3, i * -5);
    }

    strokeWeight(1);
    stroke(this.szin);
    this.x1 = 0;
    this.y1 = this.h;
    let vX = this.v0 * this.cosSzog;
    let vY = this.v0 * this.sinSzog;
    this.maxH = this.y1;
    this.t += this.dt;
    let v = sqrt(vX ** 2 + vY ** 2);
    let dvX = ((this.c * this.dt) / this.m) * vX * v; // this.t csere this.dt
    let vXuj = vX - dvX;
    let vYuj = vY + -((this.c * this.dt) / this.m) * (vY * v) - this.g * this.dt; // -
    this.x2 = this.x1 + (vX + vXuj) / 2 * this.dt;
    this.y2 = this.y1 - (vY + vYuj) / 2 * this.dt;
    vX = vXuj;
    vY = vYuj;
    line(this.x1, this.y1, this.x2, this.y2);
    this.t += this.dt;
    while (this.y1 <= 0) {
      if (this.y1 < this.maxH) this.maxH = this.y1;
      this.x1 = this.x2;
      this.y1 = this.y2;
      v = sqrt(vX ** 2 + vY ** 2);
      dvX = -((this.c * this.dt) / this.m) * vX * v;
      vXuj = vX + dvX;
      vYuj = vY + -((this.c * this.dt) / this.m) * (vY * v) - this.g * this.dt; // -
      this.x2 = this.x1 + (vX + vXuj) / 2 * this.dt;
      this.y2 = this.y1 - (vY + vYuj) / 2 * this.dt; //
      vX = vXuj;
      vY = vYuj;
      line(this.x1, this.y1, this.x2, this.y2);
      this.t += this.dt;
    }
    this.eredmeny = "<p>" + "<b>x =</b> " +
      ((this.x1 + this.x2) / 2).toFixed(3) + " m" + "</br><b>y =</b> " +
      (-this.maxH).toFixed(3) + " m" + "</br>" + "<b>t =</b> " +
      (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " +
      (acos((this.x2 - this.x1) / (sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)))).toFixed(3) + "°" +
      "<br/>" + "<b>Végsebesség:</b> " +
      (v).toFixed(3) + " m/s" + "</p>";
    document.getElementById("eredmeny").innerHTML = this.eredmeny;
  }



  kozNelkul() {
    redraw();
    this.cosSzog = cos(abs(this.szog));
    this.sinSzog = sin(this.szog);
    let a = this.g / 2;
    this.t = 0;
    translate(20, height - 20);
    scale(scl);
    noFill();
    stroke(200);
    for (let i = 0; i < width / scl; i += 5) {
      strokeWeight(strW);
      line(i, -3, i, 3);
    }
    for (let i = 0; i < height / scl; i++) {
      strokeWeight(strW);
      line(-3, i * -5, 3, i * -5);
    }
    strokeWeight(1);
    stroke(this.szin);
    this.x1 = 0;
    this.y1 = this.h;
    this.t += this.dt;
    this.maxH = this.y1;
    this.x2 = this.x1 + this.v0 * this.cosSzog * this.dt;
    this.y2 = this.h - this.v0 * this.sinSzog * this.t + a * this.t * this.t;
    line(this.x1, this.y1, this.x2, this.y2);
    this.t += this.dt;
    while (this.y1 <= 0) {
      if (this.y1 < this.maxH) this.maxH = this.y1;
      this.x1 = this.x2;
      this.y1 = this.y2;
      this.x2 += this.v0 * this.cosSzog * this.dt;
      this.y2 = this.h - this.v0 * this.sinSzog * this.t + a * this.t * this.t;
      line(this.x1, this.y1, this.x2, this.y2);
      this.t += this.dt;
    }
    this.eredmeny = "<p>" + "<b>x =</b> " +
    (this.v0 * this.cosSzog * this.t).toFixed(3) + " m" + "</br><b>y =</b> " +
    (-this.maxH).toFixed(3) + " m" + "</br>" + "<b>t =</b> " +
    (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " +
    (acos((this.x2 - this.x1) / (sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2)))).toFixed(3) + "°" +
    "<br/>" + "<b>Végsebesség:</b> " +
    (dist(this.x1, this.y1, this.x2, this.y2) / this.dt).toFixed(3) + " m/s" + "</p>";
    document.getElementById("eredmeny").innerHTML = this.eredmeny;
  }




  letoltes() {
    let fileNev = year() + '.' + month() + '.' + day() + ';' + hour() + ':' + minute() + formatum;
    saveCanvas(canv, fileNev);
  }
}
