// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// “ctx” is the object that directly represents the drawing
// area of the canvas and allows us to draw 2D shapes on it.
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0, 0, width, height);


function Ball(x, y, vx, vy, color, r) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.r = r;
	if(x-r < 0) this.x = r;
	if(x+r > width) this.x = width - r;
	if(y-r < 0) this.y = r;
	if(y+r > height) this.y = height - r;

};


Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
};

Ball.prototype.move = function() {
	
	if(this.x-this.r < 0 || this.x+this.r > width) this.vx = -this.vx;
	if(this.y-this.r < 0 || this.y+this.r > height) this.vy = -this.vy;
	this.x += this.vx;
	this.y += this.vy;


};

Ball.prototype.checkCollision = function() {

};

var ball = new Ball(random(0, width), random(0, height), random(-10, 10), random(-10, 10), "red" , random(10,20));
var balls = [];
for (let i = 0; i< 10; ++i){
	let g = new Ball(random(0, width), random(0, height), random(-10, 10), random(-10, 10),
	"rgb("+random(200,255)+', '+random(200,255)+', '+random(200,255)+ " )" , random(10,20));
	balls.push(g);
	g.draw();
}



function loop(){
	
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0, 0, width, height);
	for(let i= 0; i<10; ++i){
		balls[i].draw();
		balls[i].move();
	}
	requestAnimationFrame(loop);
}

loop();







