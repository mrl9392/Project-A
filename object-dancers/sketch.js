/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new Tapper(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Tapper {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.t = 0;
  }

  update() {
    this.t += 0.05;
    this.hipSwing = sin(this.t) * 8; //side movement
    this.legSwing = sin(this.t) * 12; // leg swing
    this.armSwing = sin(this.t * 0.5) * 0.3; // arm movement
  }
display() {
  push();
  translate(this.x, this.y);

  stroke(255);
  strokeWeight(3);
  noFill();

  // body tilt
  push();
  let tilt = this.hipSwing * 0.2; 
  translate(this.hipSwing, 0);
  rotate(tilt); 
  line(0, -50, 0, 0);
  // head
  ellipse(0, -80, 20);
  
  // arms swing relative to body
  let shoulderY = -40;
  let armLength = 30;
  let armAngle = this.armSwing;

  // left arm draws arm based off there the shoulder y level should be and rotates it 
  push();
  translate(-10, shoulderY);
  rotate(armAngle);
  line(0, 0, -armLength, 0);
  pop();

  // right arm draws arm based off there the shoulder y level should be and rotates it 
  push();
  translate(10, shoulderY);
  rotate(armAngle);
  line(0, 0, armLength, 0);
  pop();

  pop();

  // creates main hip point where the legs and hips will swing
  push();
  translate(this.hipSwing, 0);
  ellipse(0, 0, 10);

  // legs swing, just two lines going opposite directions just like the arms 
  let legMovement = this.legSwing;
  line(0, 0, -25 + legMovement, 40);
  line(0, 0, 25 + legMovement, 40);
  pop();

  // reference box and cross
  this.drawReferenceShapes();

  pop();
}

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
