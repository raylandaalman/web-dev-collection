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


const splitString = (expression) => {

    const splitArray = [];

    let inNumber = false;
    let numberStart = 0;
    let numberEnd = 0;
    let j = 0;

    if(expression.length === 1) {
        return expression;
    };

    for(let i = 0; i < expression.length; i++) {

        if(!isNaN(Number(expression[i]))) {
            if(inNumber === false) {
                inNumber = true;
                numberStart = i;
            }
        } else if(expression[i] === '+' || expression[i] === '-' ||
           expression[i] === '*' || expression[i] === '/') {
            inNumber = false;
            numberEnd = i;
            splitArray[j] = expression.substring(numberStart, numberEnd);
            j++;
            splitArray[j] = expression[i];
            j++;
        }

        if(i === expression.length -1) {
            numberEnd = i + 1;
            splitArray[j] = expression.substring(numberStart, numberEnd);
        }
    }

    return splitArray;

};


const solveMultiplyDivide = (array) => {

    if(array.length === 1) {
        return array;
    }

    const solveMultDiv = [];

    let priorityState = false;
    let j = 0;

    for(let i = 0; i < array.length-1; i++) {

        if(array[i] === '+' || array[i] === '-') {
            if(priorityState === true) {
                priorityState = false;
                solveMultDiv[j] = array[i];
                j++;
            } else if(priorityState === false) {
                solveMultDiv[j] = array[i-1];
                j++;
                solveMultDiv[j] = array[i];
                j++;
            }
        } else if(array[i] === '*') {
            if(priorityState === false) {
                solveMultDiv[j] = (array[i-1] * array[i+1]).toString();
                j++;
                i++;
                priorityState = true;
            } else if(priorityState === true) {
                solveMultDiv[j-1] = (solveMultDiv[j-1] * array[i+1]).toString();
                i++;
            }
        } else if(array[i] === '/') {
            if(priorityState === false) {
                solveMultDiv[j] = (array[i-1] / array[i+1]).toString();
                j++;
                i++;
                priorityState = true;
            } else if(priorityState === true) {
                solveMultDiv[j-1] = (solveMultDiv[j-1] / array[i+1]).toString();
                i++;
            }
        } else {
        }
    }


    if(array[array.length -2] === '+' || array[array.length -2] === '-') {
        solveMultDiv[j] = array[array.length-1];
    }

    return solveMultDiv;
};


const solveAddSubtract = (array) => {

    if(array.length === 1) {
        return array[0];
    };

    let afterFirstSumDiff = false;
    let answer = 0;

    for(let i = 0; i < array.length; i++) {

        if(array[i] === '+' || array[i] === '-') {

            if(afterFirstSumDiff === true) {
                if(array[i] === '+') {
                    answer = answer + Number(array[i+1]);
                    i++;
                } else if(array[i] === '-') {
                    answer = answer - Number(array[i+1]);
                    i++
                }
            } else if(afterFirstSumDiff === false) {
                if(array[i] === '+') {
                    answer = Number(array[i-1]) + Number(array[i+1]);
                    i++;
                    afterFirstSumDiff = true;
                } else if(array[i] === '-') {
                    answer = Number(array[i-1]) - Number(array[i+1]);
                    i++;
                    afterFirstSumDiff = true;
                }
            }
        }
    };

    return answer.toString();
};


const solve  = (expression) => {

    const solveMultDiv = [];
    const solveAddSub = [];


    const expressArr = splitString(expression);

    const multDivArr = solveMultiplyDivide(expressArr);

    return solveAddSubtract(multDivArr);
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
                updateOperand('0.');
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
            } else if(state.panelDisplay[state.panelDisplay.length-1] === '0') {
                state.panelDisplay = '';
                state.query = '';
                updateOperand(input);
                updateDisplay();
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
        let solution;
        solution = solve(state.query) // launch function to solve
        if(solution  > 999999999999999) {
            display.innerText = "Err: overflow";
        } else {
            display.innerText = solution.substring(0,15);
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
