function isRequestValid(gameState, requestedColumn) {
  if (typeof (requestedColumn) !== 'number') {
    return false;
  }
  return requestedColumn < gameState.cols;
}

function tokenTooCloseToBottom(row, winCondition) {
  if (typeof (row) !== 'number') {
    return false;
  }
  return row < winCondition - 1;
}

function pointerEqualToLastCheckpoint(pointer, winCondition) {
  if (typeof (pointer) !== 'number') {
    return false;
  }
  return pointer === winCondition - 1;
}

function checkCols(row, column, board, connectN) {
  if (tokenTooCloseToBottom(row, connectN)) {
    return false;
  }
  for (let i = 1; i < connectN; i++) {
    if (board[row][column] === board[row - i][column]) {
      if (pointerEqualToLastCheckpoint(i, connectN)) {
        return true;
      }
    } else {
      break;
    }
  }
  return false;
}

function getBoard(rows, cols) {
  if (typeof (rows) !== 'number' && typeof (cols) !== 'number') {
    return false;
  }
  const board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    board[i].fill(null);
  }
  return board;
}

function pointerAtEmptySlot(row, column, board) {
  return board[row][column] === null;
}

function checkRows(row, cols, board, connectN) {
  for (let i = 0; i < cols - connectN + 1; i++) { // looping pointer across row
    if (pointerAtEmptySlot(row, i, board)) {
      continue;
    }
    // check the next token along as far as the win amount
    for (let j = i + 1; j <= i + connectN; j++) {
      if (board[row][i] === board[row][j]) { // if it is equal ...
        if (pointerEqualToLastCheckpoint(j, i + connectN)) {
          return true;
        }
      } else {
        break;
      }
    }
  }
  return false;
}

function checkDiagsPositive(rows, cols, board, winCondition) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) { // ^ loop through every cell in the board
      if (board[i][j] === null) {
        continue;
      }
      // check the next token along as far as the win amount
      for (let k = 1; k < winCondition; k++) {
        if (i + k > rows - 1 || j + k > cols - 1) { // check the k pointer is not off the board
          break;
        }
        if (board[i][j] === board[i + k][j + k]) { // if it is equal ...
          if (k === winCondition - 1) { // check to see if it is the last one in the chain
            return true; // if it it, then we have a winner
          }
        } else { // if the if statement failed, move the pointer to the next iteration
          break;
        }
      }
    }
  }
  return false;
}

function checkDiagsNegative(rows, cols, board, winCondition) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) { // ^ loop through every cell in the board
      if (board[i][j] === null) {
        continue;
      }
      // check the next token along as far as the win amount
      for (let k = 1; k < winCondition; k++) {
        if (i - k < 0 || j + k > cols) { // check the k pointer is not off the board
          break;
        }
        if (board[i][j] === board[i - k][j + k]) { // if it is equal ...
          if (k === winCondition - 1) { // check to see if it is the last one in the chain
            return true; // if it it, then we have a winner
          }
        } else { // if the if statement failed, move the pointer to the next iteration
          break;
        }
      }
    }
  }
  return false;
}

function checkWinner(placedTokenRow, placedTokenCol, board, winCondition) {
  const cols = board[0].length;
  const rows = board.length;

  return checkCols(placedTokenRow, placedTokenCol, board, winCondition)
    || checkRows(placedTokenRow, cols, board, winCondition)
    || checkDiagsPositive(rows, cols, board, winCondition)
    || checkDiagsNegative(rows, cols, board, winCondition);
}

function returnLastChar(string) {
  if (typeof (string) !== 'string') {
    return false;
  }
  return string[string.length - 1];
}

function getFirstEmptyRow(board, selectedColumn) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][selectedColumn] === null) {
      return i;
    }
  }
  return null;
}

function getPlayerScoreKey(gameState, winner) {
  return winner === 'y' ? 'player1Score' : 'player2Score';
}

function increasePlayerScore(gameState, playerScoreKey) {
  const newPlayerScore = gameState[playerScoreKey] + 1;
  return newPlayerScore;
}

function checkArrayForLastTurn(array) {
  const newArray = array.flat().filter((x) => (x === null));
  return (newArray.length === 1);
}

if (typeof module !== 'undefined') {
  module.exports = {
    checkCols,
    getBoard,
    checkRows,
    checkDiagsPositive,
    checkDiagsNegative,
    checkWinner,
    getFirstEmptyRow,
    getPlayerScoreKey,
    increasePlayerScore,
    checkArrayForLastTurn,
    isRequestValid,
    returnLastChar,
    tokenTooCloseToBottom,
    pointerEqualToLastCheckpoint,
    pointerAtEmptySlot,
  };
}
