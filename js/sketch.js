let nPixelsRow = 500;
let nPixelsCol = 500;
let fps = 5;
let pulseFrame = 10;
let framesSincePulse = pulseFrame;
let bgColor = [0, 0, 50];
let fungusColor = [90, 75, 100];
let nodeSize = 20;
let tendrilWidth = 10;
let nodes = [];
let tendrilCoords, x1, y1, theta;
let tendrilReach = 20;
// let saveFrames = true;
let saveFrames = false;
let nFrames = 50;

function keyPressed() {
  // Set spacebar to toggle play/pause of drawing loop
  if (key === ' ') {
    if (isLooping()) {
      noLoop();
      console.log('STOPPED. Press SPACE to resume.')
    } else {
      loop();
      console.log('RESUMED. Press SPACE to stop.')
    }
  }
  if (key === 'r') {
    reset();
  }
}

function drawLine(x1, y1, theta) {
  let dTheta = theta + random(-PI / 6, PI / 6);
  x2 = x1 + tendrilReach * cos(dTheta);
  y2 = y1 + tendrilReach * sin(dTheta);
  stroke.apply(null, fungusColor);
  strokeWeight(tendrilWidth);
  line(x1, y1, x2, y2);
  return [x2, y2];
}

function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  createCanvas(nPixelsCol, nPixelsRow);
  frameRate(fps);
  background.apply(null, bgColor);
  nodes.push([width / 2, height / 2]);
  theta = random(0, 2 * PI);
  console.log('End of setup()')
}

function draw() {
  background(bgColor[0], bgColor[1], bgColor[2], 2 / pulseFrame)
  if (framesSincePulse == pulseFrame) {
    for (let node of nodes) {
      // Draw node
      noStroke();
      fill.apply(null, fungusColor);
      circle(node[0], node[1], nodeSize)
      x1 = node[0];
      y1 = node[1];
      theta = random(0, 2 * PI);
    }
    framesSincePulse = 0;
  }
  tendrilCoords = drawLine(x1, y1, theta)
  x1 = tendrilCoords[0];
  y1 = tendrilCoords[1];
  framesSincePulse += 1;
  // if save is true, save frames
  if (saveFrames && frameCount - 1 < nFrames) {
    saveCanvas(`frame_${('000' + frameCount).slice(-3)}`);
  }
}
