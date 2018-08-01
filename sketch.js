let gomb;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gomb = new Gomb(0, 0, 50, "hajitas/asd.html");
}

function draw() {
  background(51);
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
    fill(255);
    noStroke();
    ellipse(width/2 + this.x, height/2 + this.y, this.r*2);
    textSize(28);
    fill(100);
    textAlign(CENTER, CENTER)
    text(str,x,y,x2,y2)
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
