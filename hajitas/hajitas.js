let g = 9.81;

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
let dropdown = [9.81, 10];
function kezdoK() {
  let welcome = QuickSettings.create(20, 20, ' ');
  welcome.setSize(width - 40, height - 40);
  welcome.addHTML('',"<h1 style=\"text-align: center; font-weight: bold;\">Hajítás 2.0</h1>" +
  "<p style=\"font-size: 20px;\">Az oldal használata: <ul style=\"font-size: 16px;\"> " +
  "<li><b>Válassz egy időegységet!</b> Ez nagyban befolyásolhatja a mérési eredmények és az ábrázolás pontosságát," +
  " de gyengébb számítógépeken az alacsonyabb értékek lassíthatják a mérést." +
  " Érdemes az alap értéket használni, azzal is 99% fölötti a mérés pontossága.</li>" +
  "<li><b>Válasszd ki a g értékét!</b></li> <li>Továbblépés után a jobb oldali kezelőfelületen" +
  " a következő paramétereket  állíthatod be: az ábrázoláshoz használt szín, szög," +
  " közegellenállás, magasság és kezdősebesség.</li> <li></li> </ul></p>");
  welcome.addRange('Időegység (s)', 0.0001, 0.5, 0.01, 0.00001);
  welcome.addDropDown('g', dropdown, value => {g = value; g = Number(g.value)});
}

function letoltes(){
    let fileNev = year() + '.' + month() + '.' + day() + ';' + hour() + ':' + minute() + '.svg';
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

  }
  kozNelkul() {
    let cosSzog = cos(abs(this.szog));
    let sinSzog = sin(this.szog);
    let a = this.g / 2;
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
    let eredmeny = "<p style=\"font-size: 10.3pt\">" + "<b>x =</b> " +
    (this.v0 * cosSzog * this.t).toFixed(3) + " m" + "</br>" + "<b>t =</b> " +
    (this.t).toFixed(3) + " s" + "</br>" + "<b>Becsapódás szöge:</b> " +
    (acos((x2 - x1) / (sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)))).toFixed(3) + "°" +
    "<br/>" + "<b>Végsebesség:</b> " +
    (sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2) / this.dt).toFixed(3) + " m/s" + "</p>";
    gui.setValue('Eredmény', eredmeny);
    gui.showControl('Töröl');
  }
}
