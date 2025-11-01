let mySound;

function preload(){
  mySound = loadSound("assets/song.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);

  // volume
  let volValue = map(mouseY, 0, height, 1.0, 0.0);
  mySound.setVolume(volValue);
  // panning
  let panValue = map(mouseX, 0, width, -1.0, 1.0);
  mySound.pan(panValue);
  // playbackRate
  let rateValue = map(mouseX, 0, width, 0.5, 2.0);
  mySound.rate(rateValue);
}

function mousePressed(){
  if(mySound.isPlaying() == false){
    mySound.play();
  }
}

  