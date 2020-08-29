function checkCols(row, column) {
    if (row < connectN - 1) { // leave if too close to bottom of board
        return false;
    }
    for (let i = 1; i < connectN; i++) {
        if (board[row][column] === board[row - i][column]) {
            if (i === connectN - 1) {
                console.log('column winner')
                return true;
            }
            continue;
        } else {
            break;
        }
    }
    return false;
}

//. get board, reset or init
function getBoard() {
    let board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols);
        board[i].fill(null)
    }
    return board;
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
                    return true;
                }
            } else { // if the if statement failed, move the pointer to the next iteration
                break;
            }

        }

    }
    return false;
}

function checkDiags_positive() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) { // ^ loop through every cell in the board
            if (board[i][j] === null) {
                continue;
            }
            for (let k = 1; k < connectN; k++) { // check the next token along as far as the win amount
                if (i + k > rows - 1 || j + k > cols - 1) { // check the k pointer is not off the board
                    break;
                }
                if (board[i][j] === board[i + k][j + k]) { // if it is equal ...
                    if (k === connectN - 1) { // check to see if it is the last one in the chain
                        console.log('positive diag winner') // if it it, then we have a winner
                        return true;
                    }
                } else { // if the if statement failed, move the pointer to the next iteration
                    break;
                }
            }
        }
    }
    return false;
}

function checkDiags_negative(row, column) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) { // ^ loop through every cell in the board
            if (board[i][j] === null) {
                continue;
            }
            for (let k = 1; k < connectN; k++) { // check the next token along as far as the win amount
                if (i - k < 0 || j + k > cols) { // check the k pointer is not off the board
                    break;
                }
                if (board[i][j] === board[i - k][j + k]) { // if it is equal ...
                    if (k === connectN - 1) { // check to see if it is the last one in the chain
                        console.log('negative diag winner') // if it it, then we have a winner
                        return true;
                    }
                } else { // if the if statement failed, move the pointer to the next iteration
                    break;
                }
            }
        }
    }
    return false;
}


module = module || {};
module.exports = {
    checkCols: checkCols,
    getBoard: getBoard,
}