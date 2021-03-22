function setup() {
  createCanvas(windowWidth, windowHeight);
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
  collisionDetect(balls) {
    for(let j = 0; j < balls.length; j++) {
      if( (!(this.x === balls[j].x && this.y === balls[j].y && this.v.x === balls[j].v.x && this.v.y === balls[j].v.y)) ) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        
        let d =  balls[j].p.sub(this.p).magn();
        if (d < (balls[j].r + this.r)) {
          let v = this.v;
          let w = this.p.sub(balls[j].p);
          let cosTheta = v.mul(-1).dot(w) / (v.mul(-1).magn() * w.magn());
          let n = w.norm().mul(v.magn() * cosTheta);
          let r = v.add(n.mul(2));
          this.v = r;
        }
      }
    }
  }
  reflectbyWall() {
    
    if (this.p.x > (windowWidth -15) || this.p.x < 15) {
      this.v.x = -this.v.x;
    }
    if (this.p.y < 15 || this.p.y > (windowHeight -15)) {
      this.v.y = -this.v.y;
    }
  }
  
  move() {
    this.p = this.p.add(this.v.mul(1/60));
  }
}

class Brick {
  constructor(_p, _r) {
    this.p = _p;
    this.r = _r;
  }
}


let balls = [new Ball(
  new Vector(200, 300),
  new Vector(240, -60).mul(2.5),
  15
), new Ball(
  new Vector(100, 200),
  new Vector(-190, 60).mul(2.5),
  15
), new Ball(
  new Vector(120, 170),
  new Vector(290, 80).mul(2.5),
  15
), new Ball(
  new Vector(100, 130),
  new Vector(190, -80).mul(3.5),
  15
), new Ball(
  new Vector(90, 170),
  new Vector(-290, 120).mul(1.5),
  15
)];


let brick = new Brick(new Vector(200, 150), 50);
let isPlaying = true;

function draw() {
  for(let i=0;i<balls.length && isPlaying ;i++) {
    balls[i].move();
    balls[i].reflectbyWall();
    balls[i].collisionDetect(balls);
  }
  
  background(230);
  for(let i=0;i<balls.length;i++) {
    circle(balls[i].p.x, balls[i].p.y, 2 * balls[i].r);
  }
}

document.querySelector("body")
    .addEventListener("keydown", function(event) {
    event.preventDefault();
    let keys= [
      80, // Key P 
      27  // Key Esc
    ];
    if (keys.includes(event.keyCode)) {
        isPlaying = !isPlaying;
    }
});
