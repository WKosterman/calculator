
const amountOfSquares = 4;

resizeCalculator();
buildGrid();

window.addEventListener("resize", () =>
  resizeCalculator()
);

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
            let colSpan = document.createElement('span');
            colSpan.id = i*10+j;
            colSpan.classList.add('colSpan');
            colSpan.innerHTML = addLabels(colSpan);
            
            colSpan.addEventListener('mouseover', () => {
                colSpan.classList.add('mouseInSpan');
            });
            colSpan.addEventListener('mouseout', () => {
                colSpan.classList.remove('mouseInSpan');
            });
            if (j < 3) {
            colSpan.classList.add('numberSpan');
            } else {
            colSpan.classList.add('operatorSpan');
        }
            rowDiv.appendChild(colSpan);
        };
    };
};

function addLabels(colSpan) {

    switch (parseInt(colSpan.id)) {
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