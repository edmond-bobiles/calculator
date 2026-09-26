const numbersButton = document.querySelectorAll("#buttons .number");
const operatorButton = document.querySelectorAll("#buttons .operator");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const buttons = document.querySelectorAll("#buttons button");
const display = document.querySelector("#display");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Adds number
        if(button.classList.contains("number")){
            if (operator === ""){
                num1 += button.textContent;
                display.textContent = num1;
            }
            else {
                num2 += button.textContent;
                let nul = button.textContent;
                display.textContent = nul;
            }
        }
        
        // Adds operator
        if(button.classList.contains("operator")){
            // If first number is empty
            if (num1 === ""){
                num1 = "";
                operator = "";
                num2 = "";
                display.textContent = "Error. No number input.";
            }
            // If operator and second number is empty (initial calculation)
            if (operator === "" && num2 === ""){
                operator = button.textContent;
            }

            // If another operator is added
            else {
                num1 = operate(operator, num1, num2);
                num2 = "";
                display.textContent = num1;
                operator = button.textContent;
            }
        }

        // Perform calculation
        if(button.id === "equal"){
            if (num1 !== "" && operator !== "" && num2 !== ""){
                display.textContent = operate(operator, num1, num2);
            }
        }

        // Clears the display
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

