let nPixelsRow = 500;
let nPixelsCol = 500;
let fps = 5;
let pulseFrame = 10;
let framesSincePulse = pulseFrame;
let bgColor = [0, 0, 50];
let fungusColor = [90, 75, 100];
let nodeSize = 20;
let tendrilWidth = 10;
let nNodes = 2;
let nodes = [];
// Node.newTendril adds tendril position to tendrilTips
let tendrilTips = [];
let tendrilReach = 20;
// let saveFrames = true;
let saveFrames = false;
let nFrames = 50;

class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.tendrils = []
  }
  draw() {
    noStroke();
    fill.apply(null, fungusColor);
    circle(this.x, this.y, nodeSize)
  }
  newTendril() {
    this.tendrils.unshift(new Tendril(this.x, this.y, random(0, 2 * PI)))
    tendrilTips.unshift([this.x, this.y])
  }
}

class Tendril {
  constructor(x, y, theta) {
    // Tendril coords added to beginning of list so [0] is always end of tendril
    this.tendrilCoords = [[x, y]]
    this.theta = theta
  }
  grow() {
    let dTheta = this.theta + random(-PI / 6, PI / 6);
    let x1 = this.tendrilCoords[0][0]
    let y1 = this.tendrilCoords[0][1]
    let x2 = x1 + tendrilReach * cos(dTheta);
    let y2 = y1 + tendrilReach * sin(dTheta);
    stroke.apply(null, fungusColor);
    strokeWeight(tendrilWidth);
    line(x1, y1, x2, y2);
    this.tendrilCoords.unshift([x2, y2])
    this.theta = dTheta
  }
}


function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  createCanvas(nPixelsCol, nPixelsRow);
  frameRate(fps);
  background.apply(null, bgColor);
  // Create nNodes nodes in random places
  for (let i = 0; i < nNodes; i++) {
    nodes.unshift(new Node(random(width), random(height)));
  }
  console.log('End of setup()')
}

function draw() {
  // if save is true, save frames
  if (saveFrames && frameCount - 1 < nFrames) {
    saveCanvas(`frame_${('000' + frameCount).slice(-3)}`);
  }
  // Redraw background with partial transparency for fade effect between pulses
  background(bgColor[0], bgColor[1], bgColor[2], 2 / pulseFrame)
  // During a pulse
  if (framesSincePulse == pulseFrame) {
    // Draw each node & add a new tendril at a random angle
    for (let node of nodes) {
      // Draw node
      node.draw()
      // Set starting angle of first tendril
      node.newTendril()
      x1 = node.x
      y1 = node.y
    }
    framesSincePulse = 0;
  }
  for (let node of nodes) {
    for (let tendril of node.tendrils) {
      // Draw segment of tendril
      tendril.grow()
    }
  }
  framesSincePulse += 1;
}
