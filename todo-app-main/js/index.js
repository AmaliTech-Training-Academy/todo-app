const newDivTxt=document.getElementById("new-div-txt");
const taskBoxes=document.querySelectorAll(".task")
const itemsLeft=document.getElementById("clearBtn")
const displayAll=document.getElementById("displayAll");
const displayActive=document.getElementById("displayActive");
const displayCompleted=document.getElementById("displayCompleted");
const infoDiv=document.getElementById("infoDiv");
const displayStates=document.getElementById("displayStates");
const addNewTask=document.getElementById("addNewTask");
const darkLightBtn=document.getElementById("mode-svg");
const header=document.getElementById("header");

let count=0
const taskBoxList=[];
const taskBoxSpan=[];
const taskBoxCancel=[];
const taskBoxCheck=[];
let checkedTasks=[0,0,0,0,0,0,0,0,0];
let taskTxtList=[];
let displayState="all";
let isLight=true;


taskBoxes.forEach(el=>taskBoxList.push(el));
taskBoxes.forEach(el=>taskBoxSpan.push(el.children.item(1)));
taskBoxes.forEach(el=>taskBoxCancel.push(el.children.item(2).children.item(0)));
taskBoxes.forEach(el=>taskBoxCheck.push(el.children.item(0)));


if(localStorage.getItem("countStor")){
    count=parseInt(localStorage.getItem("countStor"));
    taskTxtList=JSON.parse(localStorage.getItem("taskTxtListStor"));
    checkedTasks=JSON.parse(localStorage.getItem("checkedTasksStor"));
    isLight=("true" ==localStorage.getItem("isDarkStor"));
    for(let i=0; i<count; i++){
        displayTasks(i)
    };
    addCheckToTasks();
    itemsLeftFunction();

    if(!isDark){
        darkToLightMode()
    }
};

darkLightBtn.addEventListener("click",function(){
    isLight=!isLight;
    localStorage.setItem("isDarkStor",isLight);
    darkToLightMode();
    addCheckToTasks();
});

function darkToLightMode(){
    header.classList.toggle("header-darkmode");
    document.body.classList.toggle("body-darkmode");
    darkLightBtn.children.item(0).classList.toggle("moon");
    darkLightBtn.children.item(1).classList.toggle("moon");
}