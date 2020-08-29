const rows = 6;
const cols = 7;
let connectN = 4;
let playerCount = 0;
const grid = document.getElementById("grid")

//. get board, reset or init
function getBoard() {
    let board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols);
        board[i].fill(null)
    }
    return board;
}

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
    board = getBoard()
    updateHTML(board)
}

function buttonClick(event) {
    let button = event.target.id
    if (button === 'reset') {
        resetBoard()
    } else {
        button = button[button.length - 1]
        for (let i = 0; i < rows; i++) {
            if (board[i][button] === null) {
                playerCount % 2 === 0. ? board[i][button] = 'y' : board[i][button] = 'r'
                playerCount++;
                updateHTML(board)
                checkCols(i, button)
                checkRows(i, button)
                break;
            }
        }

    }
}

function checkCols(row, column) {
    if (row < connectN - 1) { // leave if too close to bottom of board
        return;
    }
    count = 1
    for (let i = 1; i < connectN; i++) {
        if (board[row][column] === board[row - i][column]) {
            if (i === connectN - 1) {
                console.log('winner', board[row][column])
            }
            continue;
        } else {
            break;
        }
    }
}

function checkRows(row, column) {

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

// game logic