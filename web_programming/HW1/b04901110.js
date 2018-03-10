var initialChoice = 0;
var finalAnswer = false;
var carDoorNum = Math.floor((Math.random() * 3) + 1);
var openGoatDoor = 0;
var table = [[0,0],[0,0],[0,0]];


function openDoor(x){
	if (openGoatDoor == Number((x.id)[4])) return;  
	x.src= "dooropen.jpeg";
}

function closeDoor(x){ 
	if (openGoatDoor == Number((x.id)[4])) return;  
	x.src= "doorclose.jpeg";
}




function choose(x){
	if (openGoatDoor == Number((x.id)[4])) return;  

	if (finalAnswer == false){
		openAnotherDoor(x);
		initialChoice = Number((x.id)[4]);
		finalAnswer = true;
		return;
	}	
	else{ // 

		let swOrN = (initialChoice === Number((x.id[4])));
		let suOrN = (Number((x.id)[4]) === carDoorNum);

		if(suOrN){
			x.src = "car.jpeg";
			speSwNSuNdel(swOrN,suOrN,100);
		}
		else{
			x.src = "goat.jpeg";
			speSwNSuNdel(swOrN,suOrN,100);

		}

	}
}

function openAnotherDoor(x){
	var numOfChoice = Number((x.id)[4]);

	var numSet = new Set();
	numSet.add(1).add(2).add(3); //numSet ={1,2,3}
	numSet.delete(numOfChoice); // ex: numSet ={2,3}
	
	if(carDoorNum == numOfChoice){ // open another randomly
		// console.log(numSet);
		let switchToLar = false;
		if (Math.floor((Math.random() * 2) + 1) == 1) {switchToLar = true;}

		let it = numSet[Symbol.iterator]();
		openGoatDoor = it.next().value;
		if (switchToLar){openGoatDoor = it.next().value;}		
		document.getElementById("door"+openGoatDoor).src = "goat.jpeg";
		return;
	}

	else{ // open the other one with a goat
		let it = numSet[Symbol.iterator]();
		openGoatDoor = it.next().value;
		if( openGoatDoor == carDoorNum) {openGoatDoor = it.next().value;}
		document.getElementById("door"+openGoatDoor).src = "goat.jpeg";
		return;
	}

}

function restart(switchOrN, successOrN){
		
	finalAnswer = false;
	carDoorNum = Math.floor((Math.random() * 3) + 1);
	openGoatDoor = 0;
	document.getElementById("door1").src = "doorclose.jpeg";
	document.getElementById("door2").src = "doorclose.jpeg";
	document.getElementById("door3").src = "doorclose.jpeg";


	if (!switchOrN){
		table[0][0] += 1;
		if(successOrN) {table[1][0] += 1;}
	} 
	else{ 
		table[0][1] += 1;
		if(successOrN) {table[1][1] += 1;}
	}

	// watch out "0/0"
	if(table[0][0] != 0) {
		table[2][0] = Math.round(table[1][0]/table[0][0] * 100)/100; 
	}
	
	if(table[0][1] != 0) { 
		table[2][1] = Math.round(table[1][1]/table[0][1] * 100)/100; 
	}
	console.log(table);

	document.getElementById("r0c0").innerHTML = String(table[0][0]);
	document.getElementById("r0c1").innerHTML = String(table[0][1]);
	document.getElementById("r1c0").innerHTML = String(table[1][0]);
	document.getElementById("r1c1").innerHTML = String(table[1][1]);
	document.getElementById("r2c0").innerHTML = String(table[2][0]);
	document.getElementById("r2c1").innerHTML = String(table[2][1]);


}

function speSwNSuNdel(switchOrN, successOrN, delaymsec) {
    setTimeout(function(){alert("one more run~"); restart(switchOrN, successOrN); }, delaymsec);
}


function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

