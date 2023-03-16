const taskBoxes=document.querySelectorAll(".task");
const newDivTxt=document.getElementById("task-input");
// const taskContainer=document.getElementById("task-container");
const itemsLeft=document.getElementById("itemsLeft");
const header=document.getElementById("header");
const clearBtn=document.getElementById("clearBtn");
const displayAll=document.getElementById("displayAll");
const displayActive=document.getElementById("displayActive");
const displayCompleted=document.getElementById("displayCompleted");
const infoDiv=document.getElementById("contentFooter");
const displayStates=document.getElementById("displayStates");
const addNewTask=document.getElementById("addNewTask");
const darkLightBtn=document.getElementById("mode-svg");
const draggables = document.querySelectorAll('.task');
const container = document.querySelector('#main-content');

let count=0
const taskBoxList=[];
const taskBoxSpan=[];
const taskBoxCancel=[];
const taskBoxCheck=[];
let checkedTasks=[0,0,0,0,0,0,0,0,0];
// let checkedTasks = JSON.parse(localStorage.getItem("checkedTasksStor")) || [];
let taskTxtList=[];
let displayState="all";
let isLight=true;


// function renderTaskList () {
    
    // };
    
    
    
    
    
    
    taskBoxes.forEach(el=>taskBoxList.push(el));
    taskBoxes.forEach(el=>taskBoxSpan.push(el.children.item(1)));
    taskBoxes.forEach(el=>taskBoxCancel.push(el.children.item(2).children.item(0)));
    taskBoxes.forEach(el=>taskBoxCheck.push(el.children.item(0)));
    
    
    if(localStorage.getItem("countStor")){
        count=parseInt(localStorage.getItem("countStor"));
        taskTxtList=JSON.parse(localStorage.getItem("taskTxtListStor"));
        checkedTasks = JSON.parse(localStorage.getItem("checkedTasksStor"));
        isLight=("true" ==localStorage.getItem("isLightStor"));
        for(let i=0; i<count; i++){
            displayTasks(i)
            // taskContainer.innerHTML += renderTaskItem(taskTxtList[i]);
            
        };
        // addCancelEvent();
        addCheckToTasks();
        itemsLeftFunction();
        
        if(!isLight){
            darkToLightMode()
        }
        
    };
    // renderTaskList()
    
    
    
//     function renderTaskItem(task) {
//         // console.log(task);
//     return `
//     <div class="task border-radius" style="display: flex;">
//     <div class="check-box">
//     <div class="check">
//     <img src="./images/icon-check.svg" alt="check">
//     </div>
//     </div>
//     <span>${task}</span>
//     <div class="cancel">
//     <img src="./images/icon-cross.svg" alt="delete">
//     </div>
//     </div>
//     `;
// }


// console.log(taskBoxes);


darkLightBtn.addEventListener("click",function(){
    isLight=!isLight;
    localStorage.setItem("isLightStor",isLight);
    darkToLightMode();
    addCheckToTasks();
});


newDivTxt.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        // const value = newDivTxt.value.trim();
        if( count=== 10){
            alert("Reached max amount of tasks")
        }
         else if(newDivTxt.value.trim()==""){
            alert("Can't add an empty task")
        }
        else{
            taskTxtList.push(newDivTxt.value.trim());
            localStorage.setItem("taskTxtListStor",JSON.stringify(taskTxtList));
            newDivTxt.value="",
            displayTasks(count);
            // console.log(checkedTasks);
            count+=1;
            // checkedTasks.push(0)
            localStorage.setItem("countStor",count);
            localStorage.setItem("checkedTasksStor",JSON.stringify(checkedTasks))
            // taskContainer.innerHTML += renderTaskItem(value);
        };
        itemsLeftFunction();
    }
    
});

taskBoxCancel.forEach(cancel=>cancel.addEventListener("click",function(){
    let indexCancel=taskBoxCancel.indexOf(cancel);
    let taskToDelete=taskBoxSpan[indexCancel].textContent;
    let indexTaskToDelete=taskTxtList.indexOf(taskToDelete);
    deleteTask(indexTaskToDelete,indexCancel);
}));

// console.log(taskBoxCancel);

// function addTaskBoxCheck() {
    
    
    taskBoxCheck.forEach(check=>check.addEventListener("click",function(){
        let indexCheck=taskBoxCheck.indexOf(check);
        if(checkedTasks[indexCheck]==1){
            checkedTasks[indexCheck]=0
        }
        else{
            checkedTasks[indexCheck]=1
        };
        localStorage.setItem("checkedTasksStor",JSON.stringify(checkedTasks))
        taskBoxSpan[indexCheck].classList.toggle("checked-span");
        if(!isLight){
            taskBoxSpan[indexCheck].classList.toggle("checked-span-LM");
        }
        else if(isLight){
            taskBoxSpan[indexCheck].classList.remove("checked-span-LM");
        };
        check.children.item(0).children.item(0).classList.toggle("inner-check-img");
        check.children.item(0).classList.toggle("inner-check-style");
        check.classList.toggle("outer-check-style");
        
        itemsLeftFunction()
    }));
    // }
    
clearBtn.addEventListener("click",function(){
    while(checkedTasks.includes(1)){
        for(let i=0;i<checkedTasks.length;i++){
            if(checkedTasks[i]==1){
                deleteTask(i,i)
            }
        };
    }
})

displayAll.addEventListener("click",function(){
    displayStateColor(displayAll);
    taskBoxList.forEach(e=>e.style.display="none");
    for(e of taskBoxList){
        if(taskBoxList.indexOf(e)!=0){
            e.classList.remove("border-radius")
        }
    }
    for(let i=0;i<count;i++){
        displayTasks(i);
        displayState="all";
    };
});

displayActive.addEventListener("click", function(){
    displayStateColor(displayActive);
    taskBoxList.forEach(e=>e.style.display="none");
    for(e of taskBoxList){
        if(taskBoxList.indexOf(e)!=0){
            e.classList.remove("border-radius")
        }
    }
    let firstDisplayedTask=true;
    for(let i=0;i<count;i++){
        if(checkedTasks[i]==0){
            displayTasks(i);
            if(firstDisplayedTask){
                taskBoxList[i].classList.add("border-radius");
                firstDisplayedTask=!firstDisplayedTask;
            };
        }
        displayState="active";
    };
});

displayCompleted.addEventListener("click",function(){
    displayStateColor(displayCompleted);
    taskBoxList.forEach(e=>e.style.display="none");
    for(e of taskBoxList){
        if(taskBoxList.indexOf(e)!=0){
            e.classList.remove("border-radius")
        }
    }
    let firstDisplayedTask=true;
    for(let i=0;i<count;i++){
        if(checkedTasks[i]==1){
            displayTasks(i);
            if(firstDisplayedTask){
                taskBoxList[i].classList.add("border-radius")
                firstDisplayedTask=!firstDisplayedTask;
            }
            displayState="completed";
        }
    };
});



function displayTasks(num){
    taskBoxSpan[num].textContent=taskTxtList[num];
    taskBoxList[num].style.display="flex";
};

function deleteTask(index1, index2){
    // console.log(index1, index2);
    taskTxtList.splice(index1,1);
    count-=1;
    localStorage.setItem("taskTxtListStor",JSON.stringify(taskTxtList));
    localStorage.setItem("countStor",count);
    // taskBoxList[index1].remove()
    taskBoxList.forEach(el=>el.style.display="none");    
    
    checkedTasks.splice(index2,1);
    checkedTasks.push(0);
    localStorage.setItem("checkedTasksStor",JSON.stringify(checkedTasks));
    
    taskBoxCheck.forEach(el=>el.children.item(0).classList.remove("inner-check-style"));
    taskBoxCheck.forEach(el=>el.classList.remove("outer-check-style"));
    taskBoxCheck.forEach(el=>el.children.item(0).children.item(0).classList.remove("inner-check-img"));
    taskBoxSpan.forEach(el=>el.classList.remove("checked-span"));
    taskBoxSpan.forEach(el=>el.classList.remove("checked-span-LM"));
    
    addCheckToTasks();
    
    if(displayState=="all"){
        for(let i=0;i<count;i++){
            displayTasks(i)
        };
    }
    else if(displayState=="active"){
        for(let i=0;i<count;i++){
            if(checkedTasks[i]==0){
                displayTasks(i);
            };
        };
    }
    else{
        for(let i=0;i<count;i++){
            if(checkedTasks[i]==1){
                displayTasks(i);
            };
        };
    }
    
    // renderTaskList();
    itemsLeftFunction();
};


function addCheckToTasks(){
    // console.log(taskBoxSpan);
    for(let i=0;i<checkedTasks.length;i++){
        if(checkedTasks[i]==1){            
            taskBoxSpan[i].classList.add("checked-span");
            if(!isLight){
                taskBoxSpan[i].classList.add("checked-span-LM");
            }
            else if(isLight){
                taskBoxSpan[i].classList.remove("checked-span-LM");
            };
            taskBoxCheck[i].children.item(0).children.item(0).classList.add("inner-check-img");
            taskBoxCheck[i].children.item(0).classList.add("inner-check-style");
            taskBoxCheck[i].classList.add("outer-check-style");
        }
    };
};


// function addCancelEvent() {
    
    // }
    
    // addCancelEvent();
    function itemsLeftFunction(){
        let checkedTasksCount=0;
        let itemsLeftNum=0;
        for(let i=0;i<checkedTasks.length;i++){
            if(checkedTasks[i]==1){
                checkedTasksCount+=1
            }
        };
    
        itemsLeftNum=(count-checkedTasksCount)
        itemsLeft.textContent=itemsLeftNum   
    
    }
    
    function displayStateColor(displayX){
    displayActive.classList.remove("display-states-selected");
    displayAll.classList.remove("display-states-selected");
    displayCompleted.classList.remove("display-states-selected");
    displayX.classList.add("display-states-selected");
}

// Accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


// Draging function

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () =>{
        // console.log('dragstart')
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
})
})
// container.forEach(container => {
    container.addEventListener('dragover', e => {
        // console.log('dragover')
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        console.log(afterElement)
       const draggable =  document.querySelector('.dragging')
       if (afterElement == null) {
            console.log(container, draggable)
           container.appendChild(draggable)
       } else {
        container.insertBefore(draggable, afterElement)
       }
    //    console.log('dragover')
})
// })

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const  box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}


// This changes from dark to light mode
function darkToLightMode(){
    header.classList.toggle("header-darkmode");
    document.body.classList.toggle("body-darkmode");
    darkLightBtn.children.item(0).classList.toggle("moon");
    darkLightBtn.children.item(1).classList.toggle("moon");
    taskBoxList.forEach(e=>e.classList.toggle("task-darkMode"));
    taskBoxSpan.forEach(e=>e.classList.toggle("span-scrollbar-LM"));
    taskBoxList.forEach(e=>e.classList.toggle("task-border-darkMode"));
    taskBoxList.forEach(e=>e.classList.toggle("task-shadow-darkMode"));
    infoDiv.classList.toggle("display-states-darkMode");
    infoDiv.classList.toggle("content-footer-darkMode");
    displayStates.classList.toggle("display-states-darkMode");
    displayStates.classList.toggle("display-states-shadow-darkMode");
    displayActive.classList.toggle("display-states-span-darkMode");
    displayAll.classList.toggle("display-states-span-darkMode");
    displayCompleted.classList.toggle("display-states-span-LM");
    newDivTxt.classList.toggle("task-darkMode");
    addNewTask.classList.toggle("task-darkMode");
    clearBtn.classList.toggle("clearBtn-LM");
    taskBoxCheck.forEach(e=>e.children.item(0).classList.toggle("check-LM"));
}


