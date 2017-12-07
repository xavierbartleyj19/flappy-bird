
var bird;
var pipes = [];
function setup() {
  createCanvas(400, 600);//sets up canvas
  bird = new Bird();//starts bird for game
  pipes.push(new Pipe());//makes new random pipe array on setup
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();//makes pipes display in a loop
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");//tells console log to write hit when bird hits pipe
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();//constantly updates bird
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe()); //makes a new pipe
  }
	
}
function mousePressed() {//makes bird jump when pressed
    bird.up();
    //console.log("SPACE");
  
}

function Bird() {//writes bird class display and pos
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {//draws all parts of the bird
    fill(235,255,20);
    ellipse(this.x, this.y, 30, 25);
    fill(255)
    ellipse(this.x-5, this.y - 3, 18,13);
    fill(255, 139,38); 
    triangle(this.x+5,this.y+1, this.x+9,this.y-2, this.x+9, this.y+4)
    rect(this.x+9, this.y-2, 7,3)
    rect(this.x+9, this.y+1, 7,3)
  }

  this.up = function() {
    this.velocity += this.lift;//makes the bird jump
  }

  this.update = function() {//gives the bird its gravity
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Pipe() {//writes class for pipe
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {//makes it so that when the bird hits it turns red
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}