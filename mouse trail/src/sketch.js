let radius = 18;
let r, g, b;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  changeColor();
}

function draw() {
  a = 30;
  noStroke();
  circle(mouseX, mouseY, radius);
}

function mousePressed() {
  background(0);
  changeColor();
}

function changeColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  fill(r, g, b, 20);
}