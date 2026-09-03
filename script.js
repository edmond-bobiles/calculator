const numbersButton = document.querySelectorAll("#buttons .number");
const operatorButton = document.querySelectorAll("#buttons .operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const buttons = document.querySelectorAll("#buttons button");
const display = document.querySelector("#display");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("number")){
            num1 += button.textContent;
            display.textContent = num1;
        }
        if(button.classList.contains("operator")){
            if (num1 !== ""){
                operator = button.textContent;
                display.textContent += operator;
            }
        }
        if(button.id === "equal"){
            if (num1 === "" || operator === "" || num2 === ""){

            }
        }
        if(button.id === "clear"){
            num1 = "";
            operator = "";
            num2 = "";
            display.textContent = "";
        }
    });
});

let num1 = "";
let num2 = "";
let operator;


function add (num1, num2){
    return num1 + num2;
}

function subtract (num1, num2){
    return num1 - num2;
}

function multiply (num1, num2){
    return num1 * num2;
}

function divide (num1, num2){
    return num1 / num2;
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

