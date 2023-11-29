const boxes = document.querySelectorAll(".box");
// const clickedItemOrderSection = document.getElementById('clicked-order');
const ACTIVE_CLASS = 'active';
const TIMER_VALUE = 750;
const CLICK_TYPE = 'click';
const KEYPRESS_TYPE = 'keypress';
const listeners = [CLICK_TYPE, KEYPRESS_TYPE];
const clickedBoxes = [];

boxes.forEach((box) => {
    listeners.forEach(listenerType => {
        switch(listenerType) {
            case CLICK_TYPE: 
                box.addEventListener(CLICK_TYPE, () => {
                    handleListeners(box);
                });
                break;

            case KEYPRESS_TYPE: 
                box.addEventListener(KEYPRESS_TYPE, (Event) => {
                    if (Event.key !== 'Enter') {
                        return;
                    }
                    handleListeners(box);
                });
                break;
        }
    });
});

function handleListeners(element) {
    element.classList.add(ACTIVE_CLASS);
    setArray(element.id);
    element.setAttribute('tabindex', '-1');
    
    if(boxes.length === clickedBoxes.length) {
        document.activeElement.blur();
        setTimeout(unColorBoxes, TIMER_VALUE);
    }
}

function setArray(id) {
    if(clickedBoxes.includes(id)) {
        return;
    }
    clickedBoxes.push(id);
    // appendBoxOrderSection(id);
}

function unColorBoxes()  {
    if(clickedBoxes.length > 0) {
        const boxID = clickedBoxes.pop();
        const box = document.getElementById(boxID);
        box.classList.remove(ACTIVE_CLASS);
        // removeChild();

        setTimeout(unColorBoxes, TIMER_VALUE);
    }
    else {
        boxes.forEach(box => {
            box.setAttribute('tabindex', '0');
        });
    }
}

function removeChild() {
    const lastElement = clickedItemOrderSection.lastElementChild;
    if (lastElement) {
      lastElement.remove();
    }
}

function appendBoxOrderSection(id) {
    const textTemplate = document.getElementById("clicked-box-template");
    const item = textTemplate.content.cloneNode(true);
    item.querySelector('.clicked-item').innerText = id;
    clickedItemOrderSection.appendChild(item);
}