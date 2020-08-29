const rows = 6;
const cols = 7;
let connectN = 4;
let playerCount = 0;
const grid = document.getElementById("grid")
let winner = false;

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
    winner = false;
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
                checkRows(i)
                checkDiags(i, button)
                break;
            }
        }

    }
}

function checkCols(row, column) {
    if (row < connectN - 1) { // leave if too close to bottom of board
        return;
    }
    for (let i = 1; i < connectN; i++) {
        if (board[row][column] === board[row - i][column]) {
            if (i === connectN - 1) {
                console.log('column winner')
                return;
            }
            continue;
        } else {
            break;
        }
    }
}

function checkRows(row) {
    for (let i = 0; i < cols - connectN + 1; i++) { //looping pointer across column
        if (board[row][i] === null) { // if the pointer is at a null slot, skip this iteration
            continue;
        }

        for (let j = i + 1; j < i + connectN; j++) { // check the next token along as far as the win amount
            if (board[row][i] === board[row][j]) { // if it is equal ...
                if (j === i + connectN - 1) { // check to see if it is the last one in the chain
                    console.log('row winner') // if it it, then we have a winner
                    return;
                }
            } else { // if the if statement failed, move the pointer to the next iteration
                break;
            }

        }

    }
}
// need to check j doesn't go off the board
function checkDiags(row, column) {
    pointerRow = row - connectN //set pointer as connectN spaces down to the left
    pointerCol = column - connectN

    movePointer: for (let i = 0; i < connectN; i++) {
        if (pointerCol + i < 0 || pointerRow + i < 0) { // if pointer is off the board
            continue movePointer;
        } else if (board[pointerRow + i][pointerCol + i] === null) { // if pointer is at an empty slot
            continue movePointer;
        }

        for (let j = 1; j < connectN; j++) { //second pointer to check other tokens
            if (pointerRow + j < 0 || pointerCol + j < 0) { //confirm this pointer is on the board
                break;
            }
            if (board[pointerRow + i][pointerCol + i] === board[pointerRow + j][pointerCol + j]) {
                if (j === connectN - 1) {
                    console.log('diag winner', board[row][column])
                    return;
                }
            } else {
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

// game logic