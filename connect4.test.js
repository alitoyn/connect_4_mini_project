const each = require('jest-each').default;
const { checkCols, getBoard, checkRows } = require('./logicalFunctions.js');

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

// check rows

describe('row in empty board', () => {
  const expected = true;
  counter1 = 'y';
  counter2 = 'r';

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
        placedCounter[1],
        board,
        connectN),
    )
      .toStrictEqual(expectedOutput);
  });
});
