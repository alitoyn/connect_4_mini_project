const rows = 6;
const cols = 7;
const grid = document.getElementById("grid")

//. grid initialiser
for (let i = 0; i < rows; i++) {

    let row = document.createElement("div")

    row.id = "row-" + i
    row.className = "row"

    document.getElementById("grid").appendChild(row)
    console.log(row)

    for (let j = 0; j < cols; j++) {
        console.log(row)
        let col = document.createElement("div")
        col.innerText = "🔵"
        col.className = "col-1"
        col.id = "row-" + i + "-column-" + j
        document.getElementById("row-" + i).appendChild(col)


    }
}


function resetBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById("row-" + i + "-column-" + j).innerText = '🔵';
        }
    }
}

function buttonClick(event) {
    console.log(event.target.id)
    let button = event.target.id
    if (button === 'reset') {
        console.log('i have been clicked')
        resetBoard()
    } else {
        button = button[button.length - 1]
        let i = 0
        document.getElementById("row-" + i + "-column-" + button).innerText = '🟡'
    }
}



// Bind the click event for the reset button.
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const reset = document.getElementById("reset");

button0.addEventListener("click", buttonClick);
button1.addEventListener("click", buttonClick);
button2.addEventListener("click", buttonClick);
button3.addEventListener("click", buttonClick);
button4.addEventListener("click", buttonClick);
button5.addEventListener("click", buttonClick);
button6.addEventListener("click", buttonClick);
reset.addEventListener("click", buttonClick);