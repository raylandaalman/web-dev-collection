'use strict'

const buttons = document.querySelectorAll('.button');

const solar = document.querySelector('.panel');
const display = document.querySelector('.calc-display-content');


const state = {
    query: '',
    panelDisplay: '',
    periodPressed: false,
    operandSelected: false,
    operatorSelected: false,
    isSolved: false
};


const clearState = () => {
    state.query = '';
    state.panelDisplay = '';
    state.periodPressed = false;
    state.operandSelected = false;
    state.isSolved = false;
};

const updateDisplay = () => {
    display.innerText = state.panelDisplay;
};

const updateOperand = (value) => {
    if(state.operatorSelected === true) {
        state.panelDisplay = '';
        state.operatorSelected = false;
    }
    state.query += value;
    state.panelDisplay += value;
}

const updateOperator = (value) => {
    state.query += value;
    state.panelDisplay = value;
    state.isSolved = false;
    state.operatorSelected = true;
    state.periodPressed = false;
}





const solve  = (expression) => {

    let prodAndQuot = [];

    let j = 0;
    let numberStart = 0;
    let numberEnd = 0;
    let inNumber = false;

    for(let i = 0; i < expression.length; i++) {

        if(!isNaN(Number(expression[i]))) {
            if(inNumber === false) {
                inNumber = true;
                numberStart = i;
            }
        }

        if(expression[i] === '+' || expression[i] === '-') {
            inNumber = false;
            numberEnd = i;
            prodAndQuot[j] = expression.substring(numberStart, numberEnd);
            j++;
            prodAndQuot[j] = expression[i];
            j++;
        }

        if(i === expression.length -1) {
            numberEnd = i + 1;
            prodAndQuot[j] = expression.substring(numberStart, numberEnd);
        }

    }

    console.log(prodAndQuot);

}



















const calculate = (input) => {

    if(!isNaN(Number(input)) || input === '.') {

        if(state.isSolved === true) {
            clearState();
        }

        // handling all cases of a period
        if(input === '.') {
            if(state.periodPressed === true) {
                ;
            } else if(state.panelDisplay.length === 0) {
                updateOperand('0' + input);
                state.periodPressed = true;
                updateDisplay();
            } else {
                state.periodPressed = true;
                updateOperand(input);
                updateDisplay();
            }
        // handling all cases of a zero
        } else if(input === '0') {
            if(state.panelDisplay.Length === 0) {
                updateOperand(input);
                updateDisplay();
            } else if(state.panelDisplay[0] === '0') {
                ;
            } else {
                updateOperand(input);
                updateDisplay();
            }
        // handing numbers, do not have leading zeroes
        } else {
            if(state.panelDisplay.length > 14) {
                clearState();
                display.innerText = "Err: overflow";
            } else if(state.panelDisplay[0] === '0') {
                state.panelDisplay = '';
                state.query = '';
            } else {
                updateOperand(input);
                updateDisplay();
            }
        }
    // clear button
    } else if(input === 'c') {
        clearState();
        display.innerText = 0;
    // equal button, with overflow protection
    } else if (input === '=') {
        const solution = solve(state.query)// launch function to solve
        if(solution  > 999999999999999) {
            display.innerText = "Err: overflow";
        } else {
            display.innerText = solution.toString().substring(0,15);
        }
        state.query = solution;
        state.panelDisplay = solution;
        state.periodPressed = false;
        state.operatorSelected = false;
        state.isSolved = true;
    // remaining operators
    } else {
        if(state.operatorSelected === true) {
            state.query = state.query.substring(0, state.query.length -1) + input;
            state.panelDisplay = input;
            updateDisplay();
        } else {
            state.operatorSelected = true;
            updateOperator(input);
            updateDisplay();
        }
    }
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
