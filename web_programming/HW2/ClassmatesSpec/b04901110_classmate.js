var money = document.getElementById('money');
var record = document.getElementById('record');
var streak = document.getElementById('streak');
var time = document.getElementById('time');

var comFingers = document.getElementsByName("comFinger");
var playerFingers = document.getElementsByName("playerFinger");

var paperBtn = document.getElementById("paperBtn");
var scissorsBtn = document.getElementById("scissorsBtn");
var stoneBtn = document.getElementById("stoneBtn");

var go = document.getElementById("go");
var randomNum = Math.floor((Math.random() * 3) + 1);
// 0 == unspecified, 1 == paper, 2 == scissors, 3 == stone 
var selectValue = 0;
var winN = 0;
var loseN = 0;
var tieN = 0;
var streakN = 0;
var restartStreak = false;
var myhistory = [];
var streakState = "";

paperBtn.addEventListener("click", choosePaper);
scissorsBtn.addEventListener("click", chooseScissors);
stoneBtn.addEventListener("click", chooseStone);
go.addEventListener("click", select);


clearPlayerFingers();
clearComFingers();



















function select(){
	if(selectValue == 0)
		alert("choose one~");
	if(selectValue == 1)
		judge("paper");		
	if(selectValue == 2)
		judge("scissors");		
	if(selectValue == 3)
		judge("stone");		
}

function judge(playerSign){
	randomNum = Math.floor((Math.random() * 3) + 1);
	switch(playerSign){
		case "paper":
			if(randomNum == 1){ tie();   return;}
			if(randomNum == 2){ lose();  return;}
			if(randomNum == 3){ win();   return;}
			break;
		
		case "scissors":
			if(randomNum == 1){ win();    return;}
			if(randomNum == 2){ tie();    return;}
			if(randomNum == 3){ lose();   return;}
			break;
		
		case "stone":
			if(randomNum == 1) { lose();   return;} 
			if(randomNum == 2) { win();    return;} 
			if(randomNum == 3) { tie();    return;} 
			break;
	
		default:
			break;
	}
}


function choosePaper(){
	// alert("paper");

	for(let i = 0; i < playerFingers.length; ++i){
		playerFingers[i].style.display = "";
	}
	selectValue = 1;
}
function chooseScissors(){
	// alert("Scissors");
	clearPlayerFingers();
	playerFingers[1].style.display = "";
	playerFingers[3].style.display = "";
	selectValue = 2;

}
function chooseStone(){
	// alert("Stone");
	clearPlayerFingers();
	selectValue = 3;
}


function clearComFingers(){
	for(let i = 0; i < comFingers.length; ++i){
		comFingers[i].style.display = "none";
	}

}

function clearPlayerFingers(){
	for(let i = 0; i < playerFingers.length; ++i){
		playerFingers[i].style.display = "none";
	}
	selectValue = 0;
}



function win() {
	myhistory.push("win");
	console.log("win");
	showComSign();
	setTimeout(clearComFingers, 500);
	setTimeout(clearPlayerFingers, 500);
	selectValue = 0;
	winN += 1;
	setTimeout(updateGrades, 500);
}
function lose() {
	myhistory.push("lose");
	console.log("lose");
	showComSign();
	setTimeout(clearComFingers, 500);
	setTimeout(clearPlayerFingers, 500);
	// setTimeout(function(){alert("lose")}, 3000);
	selectValue = 0;
	loseN += 1;
	setTimeout(updateGrades, 500);

}
function tie() {
	myhistory.push("tie");
	console.log("tie");
	showComSign();
	setTimeout(clearComFingers, 500);
	setTimeout(clearPlayerFingers, 500);
	// setTimeout(function(){alert("lose")}, 3000);
	selectValue = 0;
	tieN += 1;
	setTimeout(updateGrades, 500);
	
}


function updateGrades(argument) {
	// alert("ho");
	record.innerHTML = (winN + " W " + loseN + " L " + tieN + " T ");
	money.innerHTML = 1000 + winN * 100 - loseN*100;
	var back = myhistory.length - 1;
	var count = 1;
	if(myhistory[back] == "tie") return;

	for(let i = back-1; i>= 0 ; --i){
		if(myhistory[i] == "tie") continue;
		if(myhistory[i] == myhistory[back]){
			++count;
			continue;
		}
		if(myhistory[i] != myhistory[back]){
			break;
		}
	}
	streak.innerHTML = count;

}

function showComSign(){
	if(randomNum == 1){
		for(let i = 0; i<comFingers.length; ++i){
			comFingers[i].style.display = "";
		}
	}
	if(randomNum == 2){
		comFingers[1].style.display = "";
		comFingers[3].style.display = "";
	}

}













var count = 0;
setInterval(function () {
    count++;
    time.innerHTML = count + " s"

}, 1000);










