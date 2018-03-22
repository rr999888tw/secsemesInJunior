// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var score = document.getElementById("#eaten");


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

///////////////////////////////////////////////////////////////////
// define the object prototype of Ball 							 //
///////////////////////////////////////////////////////////////////


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


///////////////////////////////////////////////////////////////////
// define the object prototype of EvilBall 						 //
///////////////////////////////////////////////////////////////////


class EvilBall extends Ball{


	move(){
		if(this.x-this.r < 0) this.x = this.r;
		if(this.x+this.r > width) this.x = width - this.r;
		if(this.y-this.r < 0)  this.y = this.r;
		if(this.y+this.r > height) this.y = height - this.r;
	}

	checkCollision(regBall) {
		var horizontalD = this.x - regBall.x;
		var verticalD = this.y - regBall.y;
		var distance = Math.sqrt(horizontalD**2 + verticalD**2);
		if(distance < this.r + regBall.r)
			return true;
		else 
			return false;
	}

	keyboardMove(direction){
		if(direction == "up"){
			this.y -= 20;
		}
		if(direction == "down"){
			this.y += 20;
		}
		if(direction == "left"){
			this.x -= 20;
		}
		if(direction == "right"){
			this.x += 20;
		}
	}

}

///////////////////////////////////////////////////////////////////
// define the object prototype of RegBall 						 //
///////////////////////////////////////////////////////////////////

class RegBall extends Ball{

	// constructor(){
	// 	this.vx = 0;
	// 	this.vy = 0;
	// }
}



///////////////////////////////////////////////////////////////////
// announce the initial RegBalls and EvilBall 				     //
///////////////////////////////////////////////////////////////////

var ball = new Ball(random(0, width), random(0, height), random(-10, 10), random(-10, 10), "red" , random(10,20));
var balls = [];
var evilBall = new EvilBall(width/2, height/2, 0, 0, 'white', 50);
evilBall.draw();
balls.push(evilBall);

for(let i= 0; i< 10; ++i){
	let g = new RegBall(random(0, width), random(0, height), random(-10, 10), random(-10, 10),
	"rgb("+random(50,255)+', '+random(50,255)+', '+random(50,255)+ " )" , random(10,20));
	balls.push(g);
	g.draw();
}




function loop(){
	
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(0, 0, width, height);
	for(let i= 0; i< balls.length; ++i){
		balls[i].draw();
		balls[i].move();
	}
	// evilBall.draw();
	for(let i = 1; i < balls.length; ++i){
		if(balls[0].checkCollision(balls[i])){
			balls[i] = new RegBall(random(0, width), random(0, height), random(-10, 10), random(-10, 10),
			"rgb("+random(150,255)+', '+random(150,255)+', '+random(150,255)+ " )" , random(10,20));
			score.innerHTML = parseInt(score.innerHTML) + 1;
		}
	}
	requestAnimationFrame(loop);
}



document.addEventListener('keydown', function(e) {

    //left
    if (e.keyCode == 37) {
        // console.log('start moving LEFT');
        balls[0].keyboardMove('left');
        // dx = -1;
    }
    else if (e.keyCode == 38) {
        // console.log('start moving UP');
        balls[0].keyboardMove('up');
        // dy = -1;
    }
    else if (e.keyCode == 39) {
        // console.log('start moving RIGHT');
        balls[0].keyboardMove('right');
        // dx = 1;
    }
    else if (e.keyCode == 40) {
        // console.log('start moving DOWN');
        balls[0].keyboardMove('down');
        // dy = 1;
    }
});



loop();

