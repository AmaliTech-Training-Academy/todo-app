const task = document.getElementById('.task');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

task.addEventListener('mousedown', dragStart);
task.addEventListener('mousemove', drag);
task.addEventListener('mouseup', dragEnd);

function dragStart(event) {
  initialX = event.clientX - xOffset;
  initialY = event.clientY - yOffset;

  if (event.target === task1) {
    isDragging = true;
  }
}

function drag(event) {
  if (isDragging) {
  
    event.preventDefault();
    
    currentX = event.clientX - initialX;
    currentY = event.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, task1);
  }
}

function dragEnd(event) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}