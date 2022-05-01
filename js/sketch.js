let nPixelsRow = 1000;
let nPixelsCol = 1000;
let fps = 5;
let pulseFrame = 10;
let framesSincePulse = pulseFrame;
let bgColor = [0, 0, 50];
let fungusColor = [90, 75, 100];
let nodeSize = 20;
let tendrilWidth = 10;
let nodes = [];
let tendrilEnd;
let tendrilReach = 20;

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

function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  createCanvas(nPixelsCol, nPixelsRow);
  frameRate(fps);
  background.apply(null, bgColor);
  nodes.push([width / 2, height / 2])
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
      tendrilEnd = node;
    }
    framesSincePulse = 0;
  }
  endX = tendrilEnd[0] + getRandomIntInclusive(-1 * tendrilReach, tendrilReach);
  endY = tendrilEnd[1] + getRandomIntInclusive(-1 * tendrilReach, tendrilReach);
  stroke.apply(null, fungusColor)
  strokeWeight(tendrilWidth);
  line(tendrilEnd[0], tendrilEnd[1], endX, endY);
  tendrilEnd = [endX, endY]
  framesSincePulse += 1;
}
