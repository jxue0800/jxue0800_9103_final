// background image and tower variable
let Background; 
let Tower; 

// array to store Line objects
let lines = []; 

// graphics buffer for the background and tower image
let backgroundGraphics; 
let towerGraphics; 

let maxLines = 1000; // maximum number of lines
let seaNoise = []; // array to store sea wave noise

// Starting position for the sea wave
let seaY; 
let sea2Y; 
let sea3Y; 
let sea4Y; 
let sea5Y; 
let sea6Y; 

// line class definition
class Line {
  constructor(x1, y1, x2, y2, color, thickness, direction, speed) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.thickness = thickness;
    this.direction = direction;
    this.speed = speed;
  }

  // draw line
  draw() {
    stroke(this.color);
    strokeWeight(this.thickness);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  // update line's position
  update() {
    let angle = atan2(this.y2 - this.y1, this.x2 - this.x1);
    this.x1 += this.direction * this.speed * cos(angle);
    this.x2 += this.direction * this.speed * cos(angle);
    this.y1 += this.direction * this.speed * sin(angle);
    this.y2 += this.direction * this.speed * sin(angle);
  }
}

// preload image resource
function preload() {
  Background = loadImage('asset/originalWork.jpg');
  Tower = loadImage('asset/tower.png');
}

// setup initial state
function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  Background.resize(windowWidth, windowHeight);
  Tower.resize(windowWidth, windowHeight);
  backgroundGraphics = drawBackground(Background);
  towerGraphics = drawBackground(Tower);
  redraw();

  // initialize the Perlin noise array for sea wave
  generateSeaNoise();
  
  // initialize starting positions for sea wave
  seaY = windowHeight * 0.75;
  sea2Y = seaY - 50;
  sea3Y = seaY - 80;
  sea4Y = seaY + 130;
  sea5Y = seaY - 110;
  sea6Y = seaY + 60;
}

// draw frame
function draw() {
  image(backgroundGraphics, 0, 0, windowWidth, windowHeight);
  tint(255, 5); // Set transparency

  // add lines to the background image
  for (let i = 0; i < 30; i++) {
    addLine(Background);
  }

  image(towerGraphics, 0, 0, windowWidth, windowHeight);
  tint(255, 10); // Set transparency

  // add lines to the tower image
  for (let i = 0; i < 15; i++) {
    addLine(Tower);
  }

  // draw sea waves
  drawSeaWave(seaY);
  drawSeaWave(sea2Y);
  drawSeaWave(sea3Y);
  drawSeaWave(sea4Y);
  drawSeaWave(sea5Y);
  drawSeaWave(sea6Y);

  // generate new sea noise for the next frame
  generateSeaNoise();

  // keep the number of lines within the maximum limit
  while (lines.length > maxLines) {
    lines.shift();
  }

  // update and draw line
  for (let line of lines) {
    line.update();
    line.draw();
  }
}

// draw a single sea wave
function drawSeaWave(seaLevel) {
  for (let x = 0; x < windowWidth; x++) {
    let y = seaLevel + seaNoise[x][frameCount % windowHeight] * 50; // Adjust the amplitude
    stroke(0, 100, 255); // Blue sea wave
    strokeWeight(1);
    point(x, y);
  }
}

// generate sea wave noise
function generateSeaNoise() {
  for (let x = 0; x < windowWidth; x++) {
    seaNoise[x] = [];
    for (let y = 0; y < windowHeight; y++) {
      seaNoise[x][y] = noise(x * 0.03, y * 0.03);
    }
  }
}

// create line
function createLine(img, x1 = null, y1 = null, speed = 1.5) {
  if (x1 === null) x1 = random(windowWidth);
  if (y1 === null) y1 = random(windowHeight);

  const { angle, length, direction } = getLineProperties(img, y1);
  const x2 = x1 + cos(angle) * length;
  const y2 = y1 + sin(angle) * length;
  const color = img.get(x1, y1);
  const thickness = random(3, 10);

  return new Line(x1, y1, x2, y2, color, thickness, direction, speed);
}

// get the propertie of a line
function getLineProperties(img, y1) {
  let angle;
  let direction = 1;

  if (img === Tower) {
    angle = PI / 2 + random(-PI / 5, PI / 5);
    direction = -1;
  } else {
    if (y1 > windowHeight * 0.3 && y1 < windowHeight * 0.6) {
      direction = -1;
    }
    if (y1 < windowHeight * 0.6) {
      angle = PI / 2 + random(-PI / 5, PI / 5);
    } else {
      angle = random(PI * 0.85, PI * 1.05);
    }
  }

  const length = random(50);
  return { angle, length, direction };
}

// draw background image
function drawBackground(img) {
  img.resize(windowWidth, windowHeight);
  let graphics = createGraphics(windowWidth, windowHeight);
  graphics.clear();

  const numLines = 50000;
  for (let i = 0; i < numLines; i++) {
    const line = createLine(img);
    graphics.stroke(line.color);
    graphics.strokeWeight(line.thickness);
    graphics.line(line.x1, line.y1, line.x2, line.y2);
  }

  return graphics;
}

// add line to array
function addLine(img) {
  const line = createLine(img);
  lines.push(line);
}

// ddjust the canvas size when window resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
