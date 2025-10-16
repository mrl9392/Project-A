let x = 200;  // frog x position which is middle
let groundY;    // ground level  
let t = 0;      // time through hop  
let newHop = 0;   // chooses next hop  
let startPos;      // where hop starts  
let size = 1;     // size of frog
let flashYellow = false; // background decision
let showGolden = false;  // frog golden flash
let backgroundsave; // <- store captured background image

let coinX, coinY; // coin location
let jumping = false; // tracks frog jump

function setup() {  
  let canvas = createCanvas(800, 500);  
  canvas.parent("p5-canvas-container");
  groundY = height - 40;   
  startPos = x;  
  drawBackground();
  backgroundsave = get();

  coinX = width / 2;
  coinY = height / 2;
}  

function drawBody() {
  if (showGolden) fill(255, 215, 0); // gold
  else fill(100, 200, 100);       
  ellipse(0, 0, 80, 50);
}

function drawEyes() {
  fill(255);  
  ellipse(-20, -30, 30, 30);  
  ellipse(20, -30, 30, 30);   

  fill(0);  
  ellipse(-20, -30, 10, 10);  
  ellipse(20, -30, 10, 10);   
}

function drawSmile() {
  noFill();  
  stroke(0);  
  strokeWeight(1);  
  arc(0, -10, 40, 20, 0, PI);  
}

function drawArmsAndLegs() {
  if (showGolden) stroke(255, 190, 0); // gold outline
  else stroke(80, 140, 80);

  strokeWeight(5);
  // Arms
  line(-30, -10, -45, 3);
  line(30, -10, 45, 3);

  // Legs
  if (showGolden) fill(255, 190, 0);
  else fill(80, 150, 80);
  noStroke();
  ellipse(-20, 25, 25, 15);
  ellipse(20, 25, 25, 15);
}

function drawFrog() {
  image(backgroundsave, 0, 0);

  if (flashYellow) {
    background(255, 255, 0); // yellow flash
    return;
  }
   

  // Jump arc
  let y = groundY;
  let xCurr = startPos;

  if (jumping) {
    y = groundY - sin(t) * (250 / size); // jump height  
    xCurr = startPos + newHop * (t / PI); // move horizontally  
    t += 0.1;  

    if (t >= PI) {  
      t = 0;  
      startPos = xCurr;   
      if (startPos > 800) startPos = 0;  
      if (startPos < 0) startPos = 800;   
      jumping = false; // stop jump
    }
  }

  let angle = map(newHop, -400, 400, -PI / 5, PI / 5);

  // Draw frog body
  push();
    translate(xCurr, y);
    rotate(angle);
    noStroke();
    scale(size);
    drawBody(); 
    drawEyes();
    drawSmile();
    drawArmsAndLegs();
  pop();

  // Save frog coordinates for click detection
  frogX = xCurr;
  frogY = y;

  // Draw coin where mouse hovers
  coinX = mouseX;
  coinY = mouseY;
  drawCoin(coinX, coinY);
}

function drawCoin(x, y) {
  noStroke();
  fill(255, 215, 0); // gold color
  ellipse(x, y, 25, 25);
}

function draw() {  
  drawFrog();
}  

function mousePressed() {
  let distanceAway = dist(mouseX, mouseY, frogX, frogY);
  if (distanceAway < 40 * size) {  
    size += 0.05;
    showGolden = true;

    setTimeout(() => {
      showGolden = false;
    }, 500);

    if (size > 2) {
      flashYellow = true; 
      size = 1;
      noLoop(); 
      setTimeout(() => {
        flashYellow = false;
        loop();
      }, 1000);
    }
  }

  let distanceCoin = dist(mouseX, mouseY, coinX, coinY);
  if (distanceCoin < 16) {  
    let CoinToFrog = dist(coinX, coinY, frogX, frogY);
    if (CoinToFrog < 40 * size) { 
      jumping = true;
      t = 0;  
      chooseNewHop();
    }
  }
}

function chooseNewHop() {  
  newHop = random([1, -1]) * random(100, 250);  
}

function drawBackground() {
  noStroke();
  
  let gap = 5;
  
  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      
      let rand = noise(x * 0.05, y * 0.05);
    
      let thickness = 20 + rand * 40;  
      
      let newx = sin(x * 0.04) * 10;
      let newy = cos(y * 0.04) * 10;
      
      let r = 120 + rand * 255;
      let g = 100 + rand * 150;
      let b = 200 + rand * 135;
      
      fill(r, g, b, 120);
      ellipse(x + newx, y + newy, thickness);
      circle(x + newx, y + newy, thickness);
    }
  }
}
