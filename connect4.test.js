// check cols
const { checkCols, getBoard } = require('./functions.js');
const each = require("jest-each").default;

describe("token in empty board", () => {

    let t1_counter = 'y'
    let t2_counter = 'r'
    let expected = false;

    each([
        ["Place yellow in empty board", t1_counter, expected],
        ["Place red in empty board", t2_counter, expected],


    ]).it("'%s'", (text, counter, expected_output) => {
        let rows = 6;
        let cols = 7;
        let connectN = 4;
        let board = getBoard(rows, cols);
        let placedCounter = [0, 0]
        board[0][0] = counter;

        expect(checkCols(placedCounter[0], placedCounter[1], board, connectN)).toStrictEqual(expected_output);


    });
});

describe("column in empty board", () => {

    let expected = true;
    counter1 = 'y'
    counter2 = 'r'

    each([
        ["yellow column in empty board", counter1, expected],
        ["red column in empty board", counter2, expected],

    ]).it("'%s'", (text, counter, expected_output) => {
        let rows = 6;
        let cols = 7;
        let connectN = 4;
        let board = getBoard(rows, cols);
        board[0][0] = counter
        board[1][0] = counter
        board[2][0] = counter
        board[3][0] = counter

        let placedCounter = [3, 0]

        expect(checkCols(placedCounter[0], placedCounter[1], board, connectN)).toStrictEqual(expected_output);

    });
});

// check rows

// check diagonals