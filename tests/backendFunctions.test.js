const each = require('jest-each').default;
const {
  checkCols, getBoard, checkRows,
  checkDiagsPositive, checkDiagsNegative,
  checkWinner, isRequestValid, tokenTooCloseToBottom,
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

test.todo('pointerEqualToLastCheckpoint');
test.todo('getBoard?');
test.todo('pointerAtEmptySlot');
test.todo('returnLastChar');
test.todo('getFirstEmptyRow');
test.todo('getPlayerScoreKey');
test.todo('increasePlayerScore');
test.todo('checkArrayForLastTurn');
