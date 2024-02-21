'use strict'

const buttons = document.querySelectorAll(".button");

const solar = document.querySelector(".panel");
const display = document.querySelector(".calc-display-content");

let query = "";
let panelDisplay = "";

const state = {
    isSolved: false,
    operatorSelected: false,
    periodSelected: false,
}


const operation = (input) => {

    if(!isNaN(Number(input)) || input === ".") {
        if(state.isSolved === true) {
            query = "";
            panelDisplay = "";
            state.isSolved = false;
            state.operatorSelected = false;
        }
        if(panelDisplay.length === 0 && input === "0") {
            ;
        } else if(state.periodSelected === true && input === ".") {
            ;
        } else if(panelDisplay.length >= 15) {
            query = "";
            panelDisplay = "";
            state.isSolved = false;
            state.operatorSelected = false;
            display.innerText = "Err: overflow";
        } else {
            query += input;
            panelDisplay += input;
            display.innerText = panelDisplay;
            state.operatorSelected = false;
            if(input === ".") {
                state.periodSelected = true;
            }
        }
    } else if(input === "=") {
        let solution = eval(query);
        if(solution > 999999999999999) {
            display.innerText = "Err: overflow";
        } else {
            display.innerText = solution.toString().substring(0,15);
        }
        query = panelDisplay = solution;
        state.isSolved = true;
        state.operatorSelected = false;
        state.periodSelected = false;
    } else if(input === "c") {
        query = "";
        panelDisplay = "";
        display.innerText = "0";
        state.isSolved = false;
        state.operatorSelected = false;
        state.periodSelected = false;
    } else {
        if(state.operatorSelected === false) {
            query += input;
            display.innerText = input;
            panelDisplay = ""
            state.isSolved = false;
            state.operatorSelected = true;
            state.periodSelected = false;
        } else {
            query = query.substring(0, query.length -1) + input;
            display.innerText = input;
        }
    }
};


solar.addEventListener("mouseover", () => {
    display.classList.add("cover");
});

solar.addEventListener("mouseout", () => {
    display.classList.remove("cover");
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        operation(button.innerText);
    });
});

