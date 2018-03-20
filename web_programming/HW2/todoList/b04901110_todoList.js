var lists = document.getElementsByTagName('li');
var ul = document.getElementById("mylists");

for (let i = 0; i<lists.length; ++i){
	appendSigns(lists[i])
}

function createTodoTitle(){
	var input = document.getElementById("myinp");
	if(input.value === ""){
		alert("need input");
		return;
	}
	var inputTitle = input.value; 
	newTitle = document.createElement("LI");
	var text = document.createTextNode(inputTitle);
	newTitle.appendChild(text);
	appendSigns(newTitle);
	ul.appendChild(newTitle);	

	input.value = "";
	return
}

function appendSigns(li) {
	var addItemBut = document.createElement("SPAN");
	let delBut = document.createElement("SPAN");
	let inputItem = document.createElement("INPUT");
	let itemLists = document.createElement("UL")
	let addSign = document.createTextNode("+");
	let delSign = document.createTextNode("x");

	addItemBut.onclick = createTodoItems;
	addItemBut.appendChild(addSign);
	delBut.appendChild(delSign);
	delBut.className = "close";
	addItemBut.className = "addItem";
	li.appendChild(inputItem);
	li.appendChild(addItemBut);
	li.appendChild(delBut);
	li.appendChild(document.createElement("br"));
	li.appendChild(itemLists);
}

function createTodoItems(){
	console.log(this);
	// alert("sss");

}















