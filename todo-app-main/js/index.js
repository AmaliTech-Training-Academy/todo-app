const darkLightBtn=document.getElementById("mode-svg");
const header=document.getElementById("header");

let isLight=true;

// if(localStorage.getItem("countStor")){
//     count=parseInt(localStorage.getItem("countStor"));
//     isLight=("true" ==localStorage.getItem("isDarkStor"));

//     if(!isDark){
//         darkToLightMode()
//     }
// };

darkLightBtn.addEventListener("click",function(){
    isLight=!isLight;
    localStorage.setItem("isDarkStor",isLight);
    darkToLightMode();
});

function darkToLightMode(){
    header.classList.toggle("header-darkmode");
    document.body.classList.toggle("body-darkmode");
    darkLightBtn.children.item(0).classList.toggle("moon");
    darkLightBtn.children.item(1).classList.toggle("moon");
}