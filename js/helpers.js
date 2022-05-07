function getRandomIntInclusive(min, max) {
  //The maximum is inclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

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
