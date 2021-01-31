class button {
    constructor(i, j, key) {
        const id = i * 10 + j 
        this.id = id;
        this.label = (key !== undefined) ? key : addLabels(id);
        if (this.label == "+" || this.label == "-" || this.label == "/" || this.label == "X") {
            this.type = "Operator";
        } else if (this.label === "=") {
            this.type = "Result";
        } else if (this.label === "c") {
            this.type = "Clear";
        } else {
            this.type = "Number";
        }
    }
};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a,b) {
    let result = (b == 0) ? "Can't divide by 0" : a / b;
    return result;
};

function calculate(aStr, bStr, operation) {
    let a = parseFloat(aStr);
    let b = parseFloat(bStr);
    let result;
    switch (operation) {
        case "+":
            result = add(a,b)
            break;
        case "-":
            result = subtract(a,b)
            break;
        case "X":
            result = multiply(a,b)
            break;
        case "/":
            result = divide(a,b)
            break;    
        default:
            break;
    };
    return Math.round(result*10000)/10000;
};


const amountOfSquares = 4;
var displayNumber = "";
var a = 0;
var b = 0;
var operatorActive = false;
var operator = "";

resizeCalculator();
buildGrid();

window.addEventListener("resize", () =>
  resizeCalculator()
);

window.addEventListener('keydown', inputViaKeyboard);

function resizeCalculator() {

    var windowSize = Math.min(window.innerWidth,(window.innerHeight - (window.innerHeight)/amountOfSquares)) - 50;

    let squareSize = (windowSize / amountOfSquares) + "px";
    var r = document.querySelector(':root');
    r.style.setProperty('--squareSize', squareSize);

    let gridSize = windowSize + "px";
    var r = document.querySelector(':root');
    r.style.setProperty('--gridSize', gridSize);  
}

function buildGrid() {

    //create grid

    const gridContainer = document.querySelector('#grid');

    for (let i = 0; i < amountOfSquares; i++) { 
        let rowDiv = document.createElement('div');
        rowDiv.id = i;
        rowDiv.classList.add('rowDiv');
        gridContainer.appendChild(rowDiv);
        for (let j = 0; j < amountOfSquares; j++) { 

            let calculatorButton = new button(i,j);
            let colSpan = document.createElement('span');

            colSpan.id = calculatorButton.id;
            colSpan.classList.add('colSpan');
            colSpan.innerHTML = calculatorButton.label;
            
            colSpan.addEventListener('mouseover', () => {
                colSpan.classList.add('mouseInSpan');
            });
            colSpan.addEventListener('mouseout', () => {
                colSpan.classList.remove('mouseInSpan');
            });
            colSpan.addEventListener('click', function(){
                buttonClick(calculatorButton)
            });

            colSpan.classList.add(calculatorButton.type);

            rowDiv.appendChild(colSpan);
        };
    };
};

function buttonClick(calculatorButton) {
    if (calculatorButton.type == "Number" && (operatorActive == false || b != 0)) {
        displayNumber += calculatorButton.label;
        displayNumber = parseFloat(displayNumber);
    } else if (calculatorButton.type == "Number" && operatorActive == true && b == 0) {
        displayNumber = calculatorButton.label;
        b = calculatorButton.label;
    } else if (calculatorButton.label == "c") {
        displayNumber = "0";
        a = 0;
        b = 0;
        operatorActive = false;
    } else if (calculatorButton.type == "Operator" || calculatorButton.type == "Result") {
        if (operatorActive == false || operator == "=") {
        a = displayNumber;
        operatorActive = true;
        operator = calculatorButton.label;
        } else {
        b = displayNumber;
        displayNumber = calculate(a, b, operator);
        a = displayNumber;
        b = 0;
        operator = calculatorButton.label;
        };
    };

    let display = document.querySelector('#window');
    display.innerHTML = displayNumber;

}; 

function addLabels(id) {

    switch (parseInt(id)) {
        case 0:
            return "7";
        case 1:
            return "8";   
        case 2:
            return "9";
        case 3:
            return "/";       
        case 10:
            return "4";
        case 11:
            return "5";   
        case 12:
            return "6";
        case 13:
            return "X";
        case 20:
            return "1";
        case 21:
            return "2";   
        case 22:
            return "3";
        case 23:
            return "-";
        case 30:
            return "0";
        case 31:
            return "c";   
        case 32:
            return "=";
        case 33:
            return "+";                 
        default:
            return "z";
    }  {

    }
}

function inputViaKeyboard(keyEvent) {
    let inputValue
    let value
    switch (keyEvent.key) {
        case  "1":
            inputValue = "1"
            break;
        case  "2": 
            inputValue = "2"
            break;
        case  "3": 
            inputValue = "3"
            break;
        case  "4": 
            inputValue = "4"
            break;
        case  "5":  
            inputValue = "5"
            break;
        case  "6":  
            inputValue = "6"
            break;
        case  "7":  
            inputValue = "7"
            break;
        case  "8":  
            inputValue = "8"
            break;
        case  "9":  
            inputValue = "9"
            break;
        case  "+": 
            inputValue = "+"
            break;
        case  "-": 
            inputValue = "-"
            break;
        case  "*":  
            inputValue = "X"
            break;
        case  "/": 
            inputValue = "/"
            break;
        case  "Enter":  
            inputValue = "="
            break;
        default:
            return;
    }

    console.log(keyEvent.key + inputValue);
    buttonClick(new button(1, 1, inputValue))
};