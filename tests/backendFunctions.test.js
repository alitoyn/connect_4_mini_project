const each = require('jest-each').default;
const {
  checkCols, getBoard, checkRows,
  checkDiagsPositive, checkDiagsNegative,
  checkWinner, isRequestValid, tokenTooCloseToBottom,
  pointerEqualToLastCheckpoint, pointerAtEmptySlot,
  returnLastChar,
  getFirstEmptyRow,
} = require('../src/backend/backendFunctions');

describe('token in empty board', () => {
  const t1Counter = 'y';
  const t2Counter = 'r';
  const expected = false;

  each([
    ['Place yellow in empty board', t1Counter, expected],
    ['Place red in empty board', t2Counter, expected],

  ]).it("'%s'", (text, counter, expectedOutput) => {
    const rows = 6;
    const cols = 7;
    const connectN = 4;
    const board = getBoard(rows, cols);
    const placedCounter = [0, 0];
    board[0][0] = counter;

    expect(
      checkCols(placedCounter[0],
        placedCounter[1],
        board,
        connectN),
    )
      .toStrictEqual(expectedOutput);
  });
});

describe('column in empty board', () => {
  const expected = true;
  const counter1 = 'y';
  const counter2 = 'r';

  each([
    ['yellow column in empty board', counter1, expected],
    ['red column in empty board', counter2, expected],

  ]).it("'%s'", (text, counter, expectedOutput) => {
    const rows = 6;
    const cols = 7;
    const connectN = 4;
    const board = getBoard(rows, cols);
    board[0][0] = counter;
    board[1][0] = counter;
    board[2][0] = counter;
    board[3][0] = counter;

    const placedCounter = [3, 0];

    expect(
      checkCols(placedCounter[0],
        placedCounter[1],
        board,
        connectN),
    )
      .toStrictEqual(expectedOutput);
  });
});

describe('row in empty board', () => {
  const expected = true;
  const counter1 = 'y';
  const counter2 = 'r';

  each([
    ['yellow row in empty board', counter1, expected],
    ['red row in empty board', counter2, expected],

  ]).it("'%s'", (text, counter, expectedOutput) => {
    const rows = 6;
    const cols = 7;
    const connectN = 4;
    const board = getBoard(rows, cols);

    board[0][0] = counter;
    board[0][1] = counter;
    board[0][2] = counter;
    board[0][3] = counter;

    const placedCounter = [0, 3];

    expect(
      checkRows(placedCounter[0],
        cols,
        board,
        connectN),
    )
      .toBe(expectedOutput);
  });
});

describe('positive diagonal in empty board', () => {
  const expected = true;
  const counter1 = 'y';
  const counter2 = 'r';

  each([
    ['yellow positive diagonal in empty board', counter1, expected],
    ['red positive diagonal in empty board', counter2, expected],

  ]).it("'%s'", (text, counter, expectedOutput) => {
    const rows = 6;
    const cols = 7;
    const connectN = 4;
    const board = getBoard(rows, cols);

    board[0][0] = counter;
    board[1][1] = counter;
    board[2][2] = counter;
    board[3][3] = counter;

    expect(
      checkDiagsPositive(rows,
        cols,
        board,
        connectN),
    )
      .toBe(expectedOutput);
  });
});

describe('negative diagonal in empty board', () => {
  const expected = true;
  const counter1 = 'y';
  const counter2 = 'r';

  each([
    ['yellow negative diagonal in empty board', counter1, expected],
    ['red negative diagonal in empty board', counter2, expected],

  ]).it("'%s'", (text, counter, expectedOutput) => {
    const rows = 6;
    const cols = 7;
    const connectN = 4;
    const board = getBoard(rows, cols);

    board[0][3] = counter;
    board[1][2] = counter;
    board[2][1] = counter;
    board[3][0] = counter;

    expect(
      checkDiagsNegative(rows,
        cols,
        board,
        connectN),
    )
      .toBe(expectedOutput);
  });
});

describe('checkWinner function', () => {
  const rows = 6;
  const cols = 7;
  const winCondition = 4;

  const colTestBoard = getBoard(rows, cols);
  colTestBoard[0][0] = 'y';
  colTestBoard[1][0] = 'y';
  colTestBoard[2][0] = 'y';
  colTestBoard[3][0] = 'y';

  const colTestPlacedToken = [3, 0];
  const colTestExpected = true;

  const rowTestBoard = getBoard(rows, cols);
  rowTestBoard[0][0] = 'y';
  rowTestBoard[0][1] = 'y';
  rowTestBoard[0][2] = 'y';
  rowTestBoard[0][3] = 'y';

  const rowTestPlacedToken = [0, 3];
  const rowTestExpected = true;

  const diagPositiveTestBoard = getBoard(rows, cols);
  diagPositiveTestBoard[0][0] = 'y';
  diagPositiveTestBoard[1][1] = 'y';
  diagPositiveTestBoard[2][2] = 'y';
  diagPositiveTestBoard[3][3] = 'y';

  const diagPositiveTestPlacedToken = [3, 3];
  const diagPositiveTestExpected = true;

  const diagNegativeTestBoard = getBoard(rows, cols);
  diagNegativeTestBoard[0][3] = 'y';
  diagNegativeTestBoard[1][2] = 'y';
  diagNegativeTestBoard[2][1] = 'y';
  diagNegativeTestBoard[3][0] = 'y';

  const diagNegativeTestPlacedToken = [3, 0];
  const diagNegativeTestExpected = true;

  each([
    ['yellow column in empty board', colTestBoard, colTestPlacedToken,
      colTestExpected, winCondition],
    ['yellow row in empty board', rowTestBoard, rowTestPlacedToken,
      rowTestExpected, winCondition],
    ['yellow positive diagonal in empty board', diagPositiveTestBoard, diagPositiveTestPlacedToken,
      diagPositiveTestExpected, winCondition],
    ['yellow negative diagonal in empty board', diagNegativeTestBoard, diagNegativeTestPlacedToken,
      diagNegativeTestExpected, winCondition],

  ]).it("'%s'", (text, board, placedToken, expected, passedWinCondition) => {
    expect(
      checkWinner(placedToken[0], placedToken[1], board, passedWinCondition),
    )
      .toBe(expected);
  });
});

describe('isRequestValid function', () => {
  gameState = {
    board: [],
    rows: 6,
    cols: 7,
    turnCount: 0,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  };
  gameState.board = getBoard(gameState.rows, gameState.cols);

  const t1Col = 1;
  const t2Col = 5;
  const t3Col = 10;
  const t4Col = 'string';
  const t5Col = null;
  each([
    ['valid request #1', t1Col, gameState, true],
    ['valid request #2', t2Col, gameState, true],
    ['invalid request - out of range', t3Col, gameState, false],
    ['invalid request - string', t4Col, gameState, false],
    ['invalid request - null', t5Col, gameState, false],

  ]).it("'%s'", (text, column, gameState, expected) => {
    expect(
      isRequestValid(gameState, column),
    )
      .toBe(expected);
  });
});

describe('tokenTooCloseToBottom function', () => {
  const winCondition4 = 4;
  const winCondition5 = 5;

  const t1Row = 1;
  const t2Row = 5;
  const t3Row = 3;
  const t4Row = 'string';
  const t5Row = null;
  each([
    ['valid request #1', t1Row, winCondition4, true],
    ['valid request #2', t2Row, winCondition5, false],
    ['valid request #3', t3Row, winCondition5, true],
    ['invalid request - string', t4Row, winCondition4, false],
    ['invalid request - null', t5Row, winCondition4, false],

  ]).it("'%s'", (text, row, winCondition, expected) => {
    expect(
      tokenTooCloseToBottom(row, winCondition),
    )
      .toBe(expected);
  });
});

describe('pointerEqualToLastCheckpoint function', () => {
  const winCondition4 = 4;
  const winCondition5 = 5;

  const t1pointer = 3;
  const t2pointer = 4;
  const t3pointer = 3;
  const t4pointer = 'string';
  const t5pointer = null;
  each([
    ['valid request #1', t1pointer, winCondition4, true],
    ['valid request #2', t2pointer, winCondition5, true],
    ['valid request #3', t3pointer, winCondition5, false],
    ['invalid request - string', t4pointer, winCondition4, false],
    ['invalid request - null', t5pointer, winCondition4, false],

  ]).it("'%s'", (text, pointer, winCondition, expected) => {
    expect(
      pointerEqualToLastCheckpoint(pointer, winCondition),
    )
      .toBe(expected);
  });
});

describe('getBoard function', () => {
  const t1Row = 1;
  const t2Row = 2;
  const t3Row = null;
  const t1Cols = 1;
  const t2Cols = 2;
  const t3Cols = 'string';

  const expected1 = [[null]];
  const expected2 = [[null, null], [null, null]];
  const expected3 = false;

  each([
    ['valid request #1', t1Row, t1Cols, expected1],
    ['valid request #2', t2Row, t2Cols, expected2],
    ['invalid request', t3Row, t3Cols, expected3],

  ]).it("'%s'", (text, rows, cols, expected) => {
    expect(
      getBoard(rows, cols),
    )
      .toStrictEqual(expected);
  });
});

describe('pointerAtEmptySlot function', () => {
  const board = getBoard(5, 5);
  board[1][1] = 'yellow';
  board[1][2] = 'red';
  board[1][3] = 'other string';
  board[1][4] = 10;

  each([
    ['valid request #1', 0, 0, board, true],
    ['valid request #2', 1, 1, board, false],
    ['valid request #3', 1, 2, board, false],
    ['valid request #4', 1, 3, board, false],
    ['invalid request', 1, 4, board, false],

  ]).it("'%s'", (text, rows, cols, passedBoard, expected) => {
    expect(
      pointerAtEmptySlot(rows, cols, passedBoard),
    )
      .toStrictEqual(expected);
  });
});

describe('returnLastChar function', () => {
  const t1 = 'test1';
  const r1 = '1';

  const t2 = 10;
  const r2 = false;

  const t3 = null;
  const r3 = false;

  each([
    ['valid request #1', t1, r1],
    ['valid request #2', t2, r2],
    ['invalid request', t3, r3],
  ]).it("'%s'", (text, passedString, expected) => {
    expect(
      returnLastChar(passedString),
    )
      .toBe(expected);
  });
});

describe('getFirstEmptyRow function', () => {
  // Setup
  const board = getBoard(5, 5);

  // test 1
  board[0][0] = 'red';
  const t1Col = 0;
  const t1Expected = 1;

  // test 2
  board[0][1] = 'yellow';
  board[1][1] = 'red';
  const t2Col = 1;
  const t2Expected = 2;

  // test 3
  board[0][2] = 'yellow';
  board[1][2] = 'red';
  board[2][2] = 'red';
  const t3Col = 2;
  const t3Expected = 3;

  // test 4
  board[0][3] = 'yellow';
  board[1][3] = 'red';
  board[2][3] = 'red';
  board[3][3] = 'yellow';
  board[4][3] = 'red';
  const t4Col = 3;
  const t4Expected = null;

  each([
    ['valid request #1', board, t1Col, t1Expected],
    ['valid request #2', board, t2Col, t2Expected],
    ['valid request #3', board, t3Col, t3Expected],
    ['valid request #4 - full column', board, t4Col, t4Expected],

  ]).it("'%s'", (text, passedBoard, column, expected) => {
    expect(
      getFirstEmptyRow(passedBoard, column),
    )
      .toBe(expected);
  });
});

test.todo('getPlayerScoreKey');
test.todo('increasePlayerScore');
test.todo('checkArrayForLastTurn');
test.todo('returnUserObject');
test.todo('returnUserGameData');
