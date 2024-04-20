const sessionStorageKeys = Object.keys(sessionStorage).sort(function(a,b) {return a-b});
const tasksRemainingText = document.querySelector(".todo-head-remain");
const addButton = document.querySelector(".todo-add");
const textBox = document.querySelector(".todo-input");

let itemNumber = sessionStorageKeys[sessionStorageKeys.length -1]


// Creating elements from text in storage
insertItem = (item) => {
    const divBody = document.querySelector('.todo-body');

    const div = document.createElement('div');
    div.className = 'todo-entry';

    const pElement = document.createElement('p');
    pElement.className = 'todo-entry-text';
    pElement.innerText = item;

    const divInner = document.createElement('div');
    divInner.className = 'todo-images';

    const checkImg = document.createElement('img');
    checkImg.className = 'check';
    checkImg.src = 'img/check.svg';

    const trashImg = document.createElement('img');
    trashImg.className = 'trash';
    trashImg.src = 'img/trash.svg';

    divInner.appendChild(checkImg);
    divInner.appendChild(trashImg);

    div.appendChild(pElement);
    div.appendChild(divInner);

    divBody.appendChild(div);
};


for (key of sessionStorageKeys) {
    insertItem(sessionStorage.getItem(key));
};

tasksRemainingText.innerText = `${document.querySelectorAll(".check").length} items remaining`;


// These must be run after all values in storage are made into elements
let check = document.querySelectorAll(".check");
let trash = document.querySelectorAll(".trash");

// defense against NaN bug
if (isNaN(itemNumber)) {
    itemNumber = 0;
};


// check conditions
checkFunction = (item) => {
    item.parentElement.previousElementSibling.
    classList.toggle("todo-entry-complete")
};

initializeCheck = (item) => {
    item.addEventListener("click", () => {
        checkFunction(item);
    });
};


check.forEach((item) => {
    item.addEventListener("click", () => {
        checkFunction(item);
    });
 });



// trash conditions
trashFunction = (item) => {
    const itemToRemove = item.parentElement.parentElement.innerText;
    const storageKeys = Object.keys(sessionStorage);

    for ( let i = 0; i <= storageKeys.length; i++ ) {
        if (sessionStorage.getItem(storageKeys[i]) === itemToRemove) {
            sessionStorage.removeItem(storageKeys[i]);
        };
    };

    item.parentElement.parentElement.remove();

    const tasksLeft = document.querySelectorAll(".check").length;
    tasksRemainingText.innerText = tasksLeft + " items remaining";
};


initializeTrash = (item) => {
    item.addEventListener("click", () => {
        trashFunction(item);
    })
}

trash.forEach((item) => {
    item.addEventListener("click", () => {
        trashFunction(item);
    });
});



addButton.addEventListener("click", () => {
    const inputText = document.querySelector(".todo-input").value;

    insertItem(inputText);

    const tasksLeft = document.querySelectorAll(".check").length;
    tasksRemainingText.innerText = tasksLeft + " items remaining";
    textBox.value = ""

    ++itemNumber
    sessionStorage.setItem(itemNumber, inputText);

    check = document.querySelectorAll(".check");
    trash = document.querySelectorAll(".trash");

    initializeCheck(check[check.length -1])
    initializeTrash(trash[trash.length -1])
});


textBox.addEventListener("keydown", () => {
    if (event.keyCode === 13) {
        addButton.click();
    }
})

/*

Old way that HTML elements were added, this is susceptible to injection attacks

        `<div class="todo-entry">
            <p class="todo-entry-text">${JSON.stringify(item)}</p>
            <div class="todo-images">
                <img src="img/check.svg" class="check"/>
                <img src="img/trash.svg" class="trash"/>
            </div>
        </div>`);
*/
