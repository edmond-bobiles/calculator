const buttons = document.querySelectorAll("#buttons button");
const display = document.querySelector("#display");

let tokens = [];
let showingResult = false;
let hasError = false;

function render() {
    display.textContent = tokens.join(" ");
    display.scrollLeft = display.scrollWidth;
}

function reset() {
    tokens = [];
    showingResult = false;
    hasError = false;
    render();
}

function enterNumber(value) {
    if (showingResult || hasError) reset();

    const last = tokens.length - 1;
    if (last < 0 || tokens.length % 2 === 0) {
        tokens.push(value === "." ? "0." : value);
    } else if (value !== "." || !tokens[last].includes(".")) {
        tokens[last] += value;
    }
    render();
}

function enterOperator(value) {
    if (hasError || tokens.length === 0) return;
    if (showingResult) {
        tokens = [tokens[tokens.length - 1]];
        showingResult = false;
    }
    if (tokens.length % 2 === 0) {
        tokens[tokens.length - 1] = value;
    } else {
        tokens.push(value);
    }
    render();
}

function backspace() {
    if (hasError || showingResult) {
        reset();
        return;
    }
    if (tokens.length === 0) return;
    const last = tokens.length - 1;
    if (tokens.length % 2 === 0 || tokens[last].length === 1) {
        tokens.pop();
    } else {
        tokens[last] = tokens[last].slice(0, -1);
    }
    render();
}

function calculate() {
    if (hasError || showingResult || tokens.length < 3 || tokens.length % 2 === 0) return;

    let result = Number(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const next = Number(tokens[i + 1]);
        switch (tokens[i]) {
            case "+": result += next; break;
            case "-": result -= next; break;
            case "*": result *= next; break;
            case "/":
                if (next === 0) {
                    display.textContent = "Cannot divide by zero";
                    hasError = true;
                    return;
                }
                result /= next;
                break;
        }
        result = Number(result.toFixed(5));
    }
    tokens.push("=", String(result));
    showingResult = true;
    render();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) enterNumber(button.textContent);
        else if (button.classList.contains("operator")) enterOperator(button.textContent);
        else if (button.id === "dot") enterNumber(".");
        else if (button.id === "backspace") backspace();
        else if (button.id === "clear") reset();
        else if (button.id === "equal") calculate();
    });
});

document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    const numpadKeys = {
        NumpadDivide: "/",
        NumpadMultiply: "*",
        NumpadSubtract: "-",
        NumpadAdd: "+",
        NumpadDecimal: ".",
        NumpadEnter: "Enter",
    };
    const aliases = { "÷": "/", "×": "*" };
    const key = numpadKeys[event.code] || aliases[event.key] || event.key;
    const button = [...buttons].find(button => button.textContent === key);
    if (key === "Enter" || key === "=") document.querySelector("#equal").click();
    else if (key === "Backspace") document.querySelector("#backspace").click();
    else if (key === "Escape" || key === "Delete") document.querySelector("#clear").click();
    else if (button) button.click();
    else return;
    event.preventDefault();
});
