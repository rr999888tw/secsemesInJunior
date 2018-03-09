function openDoor(x){ x.src= "dooropen.jpeg";}

function closeDoor(x){x.src= "doorclose.jpeg";}

var finalAnswer = false;
var carDoorNum = Math.floor((Math.random() * 3) + 1);

function choose(x){
	if(finalAnswer == false){
		openAnotherDoor(x)
	}	
}

function openAnotherDoor(x){
	var numOfChoice = (x.id)[4];
	alert(numOfChoice);
}