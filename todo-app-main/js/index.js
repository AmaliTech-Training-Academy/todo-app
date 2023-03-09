

const taskContainer=document.getElementById("task-container");
const input = document.getElementById("task-input");

const itemsLeft = document.getElementById("itemsLeft");
// get item from localstorage
let data = localStorage.getItem("TODO");
const LINE_THROUGH = ''
const CHECK = 'checked-span';
const UNCHECK = 'check';

let itemsLeftFunction = () => {
    let taskList = JSON.parse(localStorage.getItem("TODO")) || [];
    let result = taskList.reduce((count, item) =>  {
        if(item.trash === false && item.done === false) {
            console.log(item.trash);
            count++;
        }
        return count;
    }, 0);
    itemsLeft.innerHTML = result;
}

itemsLeftFunction();

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}
console.log(LIST[0]);



// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : "";
    const LINE = done ? 'checked-span' : "";
    
    const item = `<div class="task border-radius" style="display: flex;" id="${id}">
                    <div class="check-box">
                        <div class="check" job="complete">
                            <img src="./images/icon-check.svg" alt="check">
                        </div>
                    </div>
                    <span class="text ${LINE}">${toDo}</span>
                    <div class="cancel" job="delete">
                        <img src="./images/icon-cross.svg"  alt="delete">
                    </div>
                </div>
                `;
    
    const position = "beforeend";
    
    taskContainer.insertAdjacentHTML(position, item);
    
}

// add an item to the list user the enter key
input.addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        console.log('toDo');
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
            itemsLeftFunction()
        }
        input.value = "";
    }
});



// complete to do
function completeToDo(element){
    // element.classList.toggle(CHECK);
    const id = element.parentNode.id;
    // console.log(element.parentNode.nextElementSibling.classList);
    // element.parentNode.nextElementSibling.classList.toggle(CHECK);
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    // element.parentNode.nextElementSibling.classList.toggle
    LIST[id].done = LIST[id].done ? false : true;
    
    console.log(element.children[0].style.display);
    if(element.children[0].style.display == 'none') {
        element.children[0].style.display = 'flex'
    } else {
        element.children[0].style.display = 'none'
        
    }
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    console.log(element);
    LIST[element.parentNode.id].trash = true;
}


// target the items created dynamically

taskContainer.addEventListener("click", function(event){
    const element = event.target.parentNode; // return the clicked element inside list
    console.log(element);
    // const elementJob = element.attributes.job.value; // complete or delete
    let completeJobAttr = element.children[0].attributes.job?.value
    if(completeJobAttr == "complete"){
        completeToDo(element);
    }else if(element.attributes.job.value == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    itemsLeftFunction();
});





