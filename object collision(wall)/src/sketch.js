function setup() {
  createCanvas(400, 400);
}

function vecAdd(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
}

function vecMultiple(o, t) {
  return new Vector(t * o.x, t * o.y);
}

class Vector {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
  add(b) {
    let self = this;
    return new Vector(self.x + b.x, self.y + b.y);
  }
  mul(t) {
    let self = this;
    return new Vector(t * self.x, t * self.y);
  }
  magn() {
    let self = this;
    return sqrt(self.x**2 + self.y**2);
  }
  sub(b) {
    let self = this;
    return new Vector(self.x - b.x, self.y - b.y);
  }
  norm() {
    let self = this;
    return self.mul(1 / self.magn());
  }
  dot(b) {
    let self = this;
    return self.x * b.x + self.y * b.y;
  }
}

class Ball {
  constructor(_p, _v, _r) {
    this.p = _p;
    this.v = _v;
    this.r = _r;
  }
}

class Brick {
  constructor(_p, _r) {
    this.p = _p;
    this.r = _r;
  }
}


let ball = new Ball(
  new Vector(200, 300),
  new Vector(240, -60).mul(2.5),
  15
);




function draw() {
  ball.p = ball.p.add(ball.v.mul(1/60));

  
  if (ball.p.x > 385 || ball.p.x < 15) {
    ball.v.x = -ball.v.x;
  }
  if (ball.p.y < 15 || ball.p.y > 385) {
    ball.v.y = -ball.v.y;
  }
  
  background(230);
  circle(ball.p.x, ball.p.y, 2 * ball.r);
}

