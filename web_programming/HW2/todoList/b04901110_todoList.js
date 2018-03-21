var lists = document.getElementsByTagName('li');
var ul = document.getElementById("mylists");
var totoalDoneItems = 0;
var totoalUndoneItems = 0;
var totalUndone = 0;
var totalDone = 0;

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
	var titleName = document.createElement("SPAN");
	var text = document.createTextNode(inputTitle);

	newTitle = document.createElement("LI");
	titleName.appendChild(text);
	newTitle.appendChild(titleName);
	appendSigns(newTitle);
	ul.appendChild(newTitle);	

	input.value = "";
	return
}

function appendSigns(li) {
	let record = document.createElement("SPAN");
	let inputItem = document.createElement("INPUT");
	let addItemBut = document.createElement("SPAN");
	let delBut = document.createElement("SPAN");
	let rename = document.createElement("SPAN");
	let itemLists = document.createElement("UL");


	let addSign = document.createTextNode("+");
	let delSign = document.createTextNode("x");
	let renameSign = document.createTextNode("Rename");

	record.innerHTML = 0;
	record.className = "record";
	record.setAttribute("name", "record");

	addItemBut.onclick = createTodoItems;
	addItemBut.appendChild(addSign);
	addItemBut.className = "addItem";

	delBut.appendChild(delSign);
	delBut.className = "close";
	delBut.onclick = deleteTitle;

	rename.appendChild(renameSign);
	rename.className = "renameBut";
	rename.onclick = RenameTitle;	

	li.appendChild(record);
	li.appendChild(inputItem);
	li.appendChild(rename);
	li.appendChild(addItemBut);
	li.appendChild(delBut);
	li.appendChild(document.createElement("br"));
	li.appendChild(itemLists);
}





function RenameTitle() {
	var li = this.parentElement;
	var titleName = li.querySelector("span");
	var input = li.querySelector("input");
	var inputValue = input.value;

	if(inputValue == "") {
		alert("need input");
		return;
	}

	titleName.innerHTML = inputValue;
	input.value = "";
	return;

}


function createTodoItems(){
	var li = this.parentElement;
	var todoItems = li.querySelector("ul");
	var newItem = document.createElement("LI");
	var todoItemName = document.createElement("DIV");
	var input = li.querySelector("input");
	var inputValue = input.value;	
	var	deleteItem = document.createElement("SPAN");	
	var deleteSign = document.createTextNode("x")
	var record = li.querySelector("span[name=record]");

	if(inputValue == ""){
		alert("need input");
		return;
	}

	deleteItem.appendChild(deleteSign);
	deleteItem.className = "close";
	deleteItem.onclick = delItem;

	// newItem.innerHTML = inputValue;
	todoItemName.innerHTML = inputValue;
	newItem.appendChild(todoItemName);
	newItem.appendChild(deleteItem);

	// toggle between checked and default
	todoItemName.onclick = function(){
		if(this.className != "checked"){
			this.className = "checked";
			addDoneItems(this);
			updateTotal("addDone")
			updateTotal("popUndone")
			return;
		}

		if(this.className == "checked"){
			this.className = "";
			antiAddDoneItems(this);
			updateTotal("addUndone")
			updateTotal("popDone")
			return;
		}
	}

	//update undone number of todo items
	var value = record.innerHTML;
	value = parseInt(value);
	value += 1;
	record.innerHTML = value
	updateTotal("addUndone");
	////////////////////////////////
	todoItems.appendChild(newItem);
	input.value = "";
	return;

}


function deleteTitle(){

	var countDone = 0;
	var countUndone = 0;
	var titleLi = this.parentElement;
	var itemsUl = titleLi.querySelector('ul');	
	var itemLis = itemsUl.querySelectorAll('li');
	console.log(itemLis);

	for(let i = 0; i< itemLis.length; ++i){
		let itemDiv = itemLis[i].querySelector("div");
		if(itemDiv.className == "checked"){
			countDone += 1;
			updateTotal("popDone");
			console.log("popDone");
		}
		else{
			countUndone += 1;
			updateTotal("popUndone");
			console.log("popUndone");
		} 
	}


	var titles = titleLi.parentElement;
	titles.removeChild(titleLi);
}


function delItem(){
	var itemLi = this.parentElement;
	var todoItemsUl = itemLi.parentElement;
	var titleLi = todoItemsUl.parentElement;
	var record = titleLi.querySelector("span[name='record']");
	var itemName = itemLi.querySelector("div");

	if(itemName.className != "checked"){
		let value = record.innerHTML;
		value = parseInt(value);
		value -= 1;
		record.innerHTML = value;
		updateTotal("popUndone");
	}
	else{
		updateTotal("popDone");
	}


	todoItemsUl.removeChild(itemLi);
}



function addDoneItems(li){
	var title = li.parentElement.parentElement.parentElement;
	var record = title.querySelector('span[name="record"]');
	var value = record.innerHTML;
	value = parseInt(value);
	value -= 1;
	record.innerHTML = value

}

function antiAddDoneItems(li){
	var title = li.parentElement.parentElement.parentElement;
	var record = title.querySelector('span[name="record"]');
	var value = record.innerHTML;
	value = parseInt(value);
	value += 1;
	record.innerHTML = value;

}

function updateTotal(command){

	var undone = document.getElementById("#undone");
	var done = document.getElementById("#done");
	var undoneN = parseInt(undone.innerHTML);
	var doneN = parseInt(done.innerHTML);


	switch(command) {
    	case "addDone":
    		doneN += 1;
        	break;
    	case "addUndone":
        	undoneN += 1;
        	break;
    	case "popDone":
    		doneN -= 1;
        	break;
    	case "popUndone":
        	undoneN -= 1;
        	break;
    	default:
	}

	undone.innerHTML = undoneN;
	done.innerHTML = doneN;


}