const localStorageKeys = Object.keys(localStorage).sort(function(a,b) {return a-b});
const tasksRemainingText = document.querySelector(".todo-head-remain");

insertItem = (item) => {
    insertElement = document.querySelector(".todo-body");

    insertElement.insertAdjacentHTML("beforeend",
        `<div class="todo-entry">
            <p class="todo-entry-text">${item}</p>
            <div class="todo-images">
                <img src="img/check.svg" class="check"/>
                <img src="img/trash.svg" class="trash"/>
            </div>
        </div>`);
    
};


for (key of localStorageKeys) {
    insertItem(localStorage.getItem(key));
};

tasksRemainingText.innerText = `${document.querySelectorAll(".check").length} items remaining`;



const addButton = document.querySelector(".todo-add");
const textBox = document.querySelector(".todo-input");

let check = document.querySelectorAll(".check");
let trash = document.querySelectorAll(".trash");
let itemNumber = localStorageKeys[localStorageKeys.length -1]

if (isNaN(itemNumber)) {
    itemNumber = 0;
};


initializeCheck = (item) => {
    item.addEventListener("click", () => {
        item.parentElement.previousElementSibling.
            classList.toggle("todo-entry-complete")
    });
};

initializeTrash = (item) => {
    item.addEventListener("click", () => {

        const itemToRemove = item.parentElement.parentElement.innertext;
        const StorageKeys = Object.keys(localStorage);
        for ( let i = 1; i <= StorageKeys.length; i++ ) {
            if (localStorage.getItem(i) === itemToRemove) {
                localStorage.removeItem(i);
            };
        };

        item.parentElement.parentElement.remove();
        const tasksLeft = document.querySelectorAll(".check").length;
        tasksRemainingText.innerText = tasksLeft + " tasks remaining";
    })
}



check.forEach((item) => {
    item.addEventListener("click", () => {
        item.parentElement.previousElementSibling.
            classList.toggle("todo-entry-complete");
    });
 });



trash.forEach((item) => {
    item.addEventListener("click", () => {

        const itemToRemove = item.parentElement.parentElement.innerText;
        const StorageKeys = Object.keys(localStorage);
        console.log(itemToRemove, StorageKeys)
        for ( let i = 1; i <= StorageKeys.length; i++ ) {
            if (localStorage.getItem(i) === itemToRemove) {
                localStorage.removeItem(i);
            };
        };

        item.parentElement.parentElement.remove();
        const tasksLeft = document.querySelectorAll(".check").length;
        tasksRemainingText.innerText = tasksLeft + " tasks remaining";
    });
});



addButton.addEventListener("click", () => {
    const inputText = document.querySelector(".todo-input").value;

    insertItem(inputText);

    const tasksLeft = document.querySelectorAll(".check").length;
    tasksRemainingText.innerText = tasksLeft + " items remaining";
    textBox.value = ""

    ++itemNumber
    localStorage.setItem(itemNumber, inputText);

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
