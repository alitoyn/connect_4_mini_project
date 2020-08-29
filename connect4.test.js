// check cols
const each = require("jest-each").default;

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

function getBoard() {
    let board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols);
        board[i].fill(null)
    }
    return board;
}

describe("multi_test", () => {
    rows = 6;
    cols = 7;
    connectN = 4;

    let t1_board = getBoard();
    t1_board[0][3] = 'y'
    let t1_counter = [0, 3]
    let t1_expected = false;



    each([
        ["Place in empty board", t1_board, t1_counter, t1_expected],


    ]).it("'%s'", (text, board, last_placed_counter, expected_output) => {

        expect(checkCols(t1_counter[0], t1_counter[1])).toStrictEqual(false);

    });
});


// check rows

// check diagonals