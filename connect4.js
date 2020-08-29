const rows = 6;
const cols = 7;
let connectN = 4;
let playerCount = 0;
const grid = document.getElementById("grid")
let winner = false;

//. grid initialiser
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div")
    row.id = "row-" + i
    row.className = "row"
    document.getElementById("grid").prepend(row)
    for (let j = 0; j < cols; j++) {
        let col = document.createElement("div")
        col.className = "col-1"
        col.id = "row-" + i + "-column-" + j
        document.getElementById("row-" + i).appendChild(col)
    }
}

function updateHTML(board) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let col = document.getElementById("row-" + i + "-column-" + j)
            if (board[i][j] === null) {
                col.innerText = "🟣"
            } else if (board[i][j] === 'y') {
                col.innerText = "🟡"
            } else {
                col.innerText = "🔴"
            }
        }
    }
}

function resetBoard() {
    winner = false;
    board = getBoard()
    updateHTML(board)
}

function buttonClick(event) {
    let button = event.target.id
    if (button === 'reset') {
        resetBoard()
    } else {
        if (winner === true) { // if the winner flag as not been reset, don't change anything
            return;
        }
        button = button[button.length - 1]
        for (let i = 0; i < rows; i++) {
            if (board[i][button] === null) { // if the selected cell is empty
                // put the right token in the cell
                playerCount % 2 === 0. ? board[i][button] = 'y' : board[i][button] = 'r'
                playerCount++;
                // update the board
                updateHTML(board)

                // check for a winner
                if (checkCols(i, button) || checkRows(i) || checkDiags_positive() || checkDiags_negative()) {
                    winner = true;
                }


                break;
            }
        }

    }
}


// setup
let board = getBoard()

updateHTML(board)

for (let i = 0; i < cols; i++) {
    let button = document.createElement("button")
    button.id = "button" + i
    button.className = "btn btn-primary btn-lg"
    button.innerText = "🖖"
    document.getElementById("button-row").appendChild(button)

}

for (i = 0; i < cols; i++) {
    let button_grab = document.getElementById("button" + i);
    button_grab.addEventListener("click", buttonClick);

}

const reset = document.getElementById("reset");
reset.addEventListener("click", buttonClick);