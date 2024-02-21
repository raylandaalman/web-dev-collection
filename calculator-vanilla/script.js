'use strict'

const buttons = document.querySelectorAll('.button');

const solar = document.querySelector('.panel');
const display = document.querySelector('.calc-display-content');


const state = {
    query: '',
    panelDisplay: '',
    periodPressed: false,
    zeroPressed: false,
    operatorSelected: false
};


const clearState = () => {
    state.query = '';
    state.panelDisplay = '';
    state.periodPressed = false;
    state.zeroPressed = false;
    state.operatorSelected = false;
};


const calculate = (input) => {
    console.log(input);
};



buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculate(button.innerText);
    })
});

solar.addEventListener('mouseover', () => {
    display.classList.add('cover');
});

solar.addEventListener('mouseout', () => {
    display.classList.remove('cover');
});
