let gomb;
let monsterratBoldItalic;
let monsterratSemiBoldItalic

function preload() {
  monsterratBoldItalic = loadFont('fonts/Montserrat-ExtraBoldItalic.ttf');
  monsterratSemiBoldItalic = loadFont('fonts/OpenSans-SemiBoldItalic.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gomb = new Gomb(0, 0, 75, "hajitas/asd.html", 'Hajítás');
  background(20);
  for(let i = 0; i < 200; i++) {
    fill(240);
    stroke(240);
    strokeWeight(2);
    point(random(width), random(height));
  }
}

function draw() {
  // background(28);
  // for(let i = 0; i < 100; i++) {
  //   fill(240);
  //   stroke(240);
  //   point(random(width), random(height));
  // }
  fill(230, 83, 79);
  textAlign(CENTER);
  textSize(180);
  stroke(230, 83, 79);
  textFont(monsterratBoldItalic);
  text('Projektjeim', width/2, 200);
  gomb.show();
}

class Gomb {
  constructor(x, y, r, url, felirat) {
    this.x = x;
    this.y = y;
    this.url = url;
    this.r = r;
    this.felirat = felirat;
  }

  show() {
    push()
    noStroke();
    if (dist(width/2 + this.x, height/2 + this.y, mouseX, mouseY) < this.r) {
      fill(192);
    } else {
      fill(226);
    }
    noStroke();
    ellipse(width/2 + this.x, height/2 + this.y, this.r*2);
    textSize(38);
    textFont(monsterratSemiBoldItalic);
    if (dist(width/2 + this.x, height/2 + this.y, mouseX, mouseY) < this.r) {
      fill(94, 152, 117);
    } else {
      fill(94, 152, 117);
    }
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    text(this.felirat, width/2 + this.x, height/2 + this.y - 7);
    pop();
  }

  mouseClicked() {
    if (dist(width/2 + this.x, height/2 + this.y, mouseX, mouseY) < this.r) {
      window.location.href = this.url;
    }
  }
}

function mouseClicked() {
  gomb.mouseClicked();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
