const tasksRemainingText = document.querySelector(".todo-head-remain");
const addButton = document.querySelector(".todo-add");
const textBox = document.querySelector(".todo-input");

let check = document.querySelectorAll(".check");
let trash = document.querySelectorAll(".trash");


check.forEach((item) => {
    item.addEventListener("click", () => {
        item.parentElement.previousElementSibling.
            classList.toggle("todo-entry-complete");
    });
 });


trash.forEach((item) => {
    item.addEventListener("click", () => {
        item.parentElement.parentElement.remove();
        const tasksLeft = document.querySelectorAll(".check").length;
        tasksRemainingText.innerText = tasksLeft + " tasks remaining";
    });
});


initializeCheck = (item) => {
    item.addEventListener("click", () => {
        item.parentElement.previousElementSibling.
            classList.toggle("todo-entry-complete")
    });
};

initializeTrash = (item) => {
    item.addEventListener("click", () => {
        item.parentElement.parentElement.remove();
        const tasksLeft = document.querySelectorAll(".check").length;
        tasksRemainingText.innerText = tasksLeft + " tasks remaining";
    })
}


textBox.addEventListener("keydown", () => {

    if (event.keyCode === 13) {
        addButton.click();
    }
})

addButton.addEventListener("click", () => {
    const inputText = document.querySelector(".todo-input").value;

    insertElement = document.querySelector(".todo-body");

    insertElement.insertAdjacentHTML("beforeend",
        `<div class="todo-entry">
            <p class="todo-entry-text">${inputText}</p>
            <div class="todo-images">
                <img src="img/check.svg" class="check"/>
                <img src="img/trash.svg" class="trash"/>
            </div>
        </div>`);

    const tasksLeft = document.querySelectorAll(".check").length;
    tasksRemainingText.innerText = tasksLeft + " tasks remaining";
    textBox.value = ""

    check = document.querySelectorAll(".check");
    trash = document.querySelectorAll(".trash");

    initializeCheck(check[check.length -1])
    initializeTrash(trash[trash.length -1])
});
