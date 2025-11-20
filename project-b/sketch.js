let cities = [];
let ripples = [];
let resonance;   
let sounds = []; 
let lastSoundTime = 0;
let cD = 1000;


function preload() {
  sounds.push(loadSound("baby_cry.mp3"));
  sounds.push(loadSound("male_cough.mp3"));
  sounds.push(loadSound("sigh.mp3"));
  sounds.push(loadSound("giggle.mp3"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  resonance = new p5.Oscillator('pink'); 
  resonance.amp(0);
}

function draw() {
  background(15, 20, 35, 50);

  // Update ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    r.update();
    r.show();
    if (r.finished()) ripples.splice(i, 1);
  }

  // draw the cities
  for (let city of cities) city.show();

//collision
  for (let ripple of ripples) {
    for (let city of cities) {
      let d = dist(ripple.x, ripple.y, city.x, city.y);
      if (!city.isEchoing && d < ripple.radius + city.size / 2 && ripple.trans > 100) {
        city.echo();
      }
    }
  }
}


function mousePressed() {
  userStartAudio().then(() => {
    if (!resonance.started) resonance.start();

    
    for (let city of cities) {
      let d = dist(mouseX, mouseY, city.x, city.y);
      if (d < city.size / 2) city.echo();
    }
  });
}

function keyPressed() {
  if (key === ' ') {
    cities.push(
      new City(
        random(width * 0.1, width * 0.9),
        random(height * 0.2, height * 0.8)
      )
    );
  }
}

// city
class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(8, 14);
    this.color = color(random(150, 255), random(150, 255), 255);
    this.isEchoing = false;
    this.lastEcho = 0;

    this.voice = random(sounds);
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  echo() {
    const cooldown = 4000;
    if (millis() - this.lastEcho < cooldown) return;

    this.isEchoing = true;
    this.lastEcho = millis();

    this.size += 3;
    playEchoSound(this.x);

    if (this.voice && !this.voice.isPlaying() && millis() - lastSoundTime > cD) {
      this.voice.setVolume(0.5);
      this.voice.play();
      lastSoundTime = millis();
    }

    // add ripple
    ripples.push(new Ripple(this.x, this.y));

    setTimeout(() => {
      this.isEchoing = false;
      this.size -= 3;
    }, 800);
  }
}

// ripple class
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.speed = 3;
    this.trans = 255;
  }

  update() {
    this.radius += this.speed;
    this.trans -= 2;
  }

  show() {
    noFill();
    stroke(255, 255, 100, this.trans);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius * 3);
  }

  finished() {
    return this.trans <= 0;
  }
}

function playEchoSound(x) {
  let freq = 60;
  resonance.freq(freq);
  resonance.amp(0.3, 0.05);   
  setTimeout(() => resonance.amp(0, 1.0), 300);
}
