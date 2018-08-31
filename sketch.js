let P = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(20);
  P.push(new part());
  for (let i = 0; i < P.length; i++) {
    if (P[i].x < 0 || P[i].x > width) {
      P[i].xSpeed = -P[i].xSpeed;
    }
    if (P[i].y < 0 || P[i].y > height) {
      P[i].ySpeed = -P[i].ySpeed;
    }
    P[i].show();
    if (P[i].weight < 0) {
      P.splice(i, 1);
      i--;
    }
  }
}
class part {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.weight = random(5, 20);
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }
  show() {
    stroke(this.r, this.g, this.b);
    strokeWeight(this.weight);
    point(this.x, this.y);
    this.weight = this.weight - 0.075;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}