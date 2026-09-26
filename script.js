const numbersButton = document.querySelectorAll("#buttons .number");
const operatorButton = document.querySelectorAll("#buttons .operator");
const dotButton = document.querySelector("#dot");
const backspaceButton = document.querySelector("#backspace");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const buttons = document.querySelectorAll("#buttons button");
const display = document.querySelector("#display");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Adds number
        if (button.classList.contains("number")){
            if (operator === ""){
                num1 += button.textContent;
                display.textContent = num1;
            }
            else {
                num2 += button.textContent;
                display.textContent = num2;
            }
        }

        // Adds dot
        if (button.id === "dot"){
            if (operator === "" && !num1.includes(".")){
                num1 += ".";
                display.textContent = num1;
            }
            else if (operator !== "" && !num2.includes(".")){
                num2 += ".";
                display.textContent = num2;
            }
        }

        // Removes a variable by one
        if (button.id === "backspace"){
            if (operator === "") {
                num1 = num1.slice(0, -1);
                display.textContent = num1;
            }
            else {
                num2 = num2.slice(0, -1);
                display.textContent = num2;
            }
        }
        
        // Adds operator
        if(button.classList.contains("operator")){
            // If first number is empty
            if (num1 === ""){
                clearAllVariables();
                display.textContent = "Error. No number input.";
            }
            // If operator and second number is empty (initial calculation)
            else if (operator === "" && num2 === ""){
                operator = button.textContent;
            }

            // If another operator is added
            else {
                num1 = roundResult(operate(operator, num1, num2));
                num2 = "";
                display.textContent = num1;
                operator = button.textContent;
            }
        }

        // Perform calculation
        if (button.id === "equal"){
            if (num1 !== "" && operator !== "" && num2 !== ""){
                display.textContent = roundResult(operate(operator, num1, num2));
                clearAllVariables();
            }
        }

        // Clears the display
        if (button.id === "clear"){
            clearAllVariables();
            display.textContent = "";
        }
    });
});

let num1 = "";
let num2 = "";
let operator = "";

function clearAllVariables(){
    num1 = "";
    num2 = "";
    operator = "";
}

// Calculator logic
function add (num1, num2){
    return Number(num1) + Number(num2);
}

function subtract (num1, num2){
    return Number(num1) - Number(num2);
}

function multiply (num1, num2){
    return Number(num1) * Number(num2);
}

function divide (num1, num2){
    if (Number(num2) === 0) {
        num1 = "";
        operator = "";
        num2 = "";
        return display.textContent = "You rat!";
    }
    return Number(num1) / Number(num2);
}

function operate(operator, num1, num2){
    if (operator == '+'){
        return add(num1, num2);
    }

    if (operator == '-'){
       return subtract(num1, num2);
    }
    
    if (operator == '*'){
        return multiply(num1, num2);
    }

    if (operator == '/'){
        return divide(num1, num2);
    }
}

function roundResult(result) {
    return Number(result.toFixed(5));
}
