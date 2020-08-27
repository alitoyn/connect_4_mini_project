let rows = 5;
let cols = 7;

resetBoard(0)

document.getElementById('main').style = ''

function buttonClick(event) {
    console.log(event.target.id)

    let button = event.target.id
    button = button[button.length - 1]

    document.getElementById("row-0-column-" + button).innerText = "🟣"
}

function resetBoard(event) {
    if (event !== 0) {
        console.log(event.target.id)
    } else {
        console.log('Initialising Game...')
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            document.getElementById("row-" + i + "-column-" + j).innerText = "🔵"
        }
    }
}


const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const resetButton = document.getElementById("reset");

button0.addEventListener("click", buttonClick);
button1.addEventListener("click", buttonClick);
button2.addEventListener("click", buttonClick);
button3.addEventListener("click", buttonClick);
button4.addEventListener("click", buttonClick);
button5.addEventListener("click", buttonClick);
button6.addEventListener("click", buttonClick);
resetButton.addEventListener("click", resetBoard);