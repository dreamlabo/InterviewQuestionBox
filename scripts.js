const boxes = document.querySelectorAll(".box");
const ACTIVE_CLASS = 'active';
const timerValue = 750;

const CLICK_TYPE = 'click';
const KEYPRESS_TYPE = 'keypress';

const listeners = [CLICK_TYPE, KEYPRESS_TYPE];
const clickedBoxes = [];


boxes.forEach((box) => {
    listeners.forEach(listenerType => {
        switch(listenerType) {
            case CLICK_TYPE: 
                box.addEventListener('click', () => {
                    box.classList.add(ACTIVE_CLASS);
                    setArray(box.id);
                    
        
                    if(boxes.length === clickedBoxes.length) {
                        setTimeout(unColorBoxes, 500)
                    }
                });
                break;

            case KEYPRESS_TYPE: 
                box.addEventListener('keypress', (Event) => {
                    if (Event.key !== 'Enter') {
                        return
                    }
                    box.classList.add(ACTIVE_CLASS);
                    setArray(box.id);
        
                    if(boxes.length === clickedBoxes.length) {
                        box.getBoundingClientRect();
                        setTimeout(unColorBoxes, 500)
                    }
                });
                break;
        }
    });
});

function setArray(id) {
    if(clickedBoxes.includes(id)) {
        return;
    }
    clickedBoxes.push(id);
}

function unColorBoxes() {
    if(clickedBoxes.length > 0) {
        const boxID = clickedBoxes.pop();
        const box = document.getElementById(boxID);
        box.classList.remove(ACTIVE_CLASS);
        setTimeout(unColorBoxes, 750);
    }
}