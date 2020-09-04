function tokenTooCloseToBottom(row, winCondition) {
  return row < winCondition - 1;
}

function pointerEqualToLastCheckpoint(pointer, winCondition) {
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

function returnLastChar(string) {
  return string[string.length - 1];
}

// eslint-disable-next-line no-global-assign
module = module || {};
module.exports = {
  checkCols,
  getBoard,
  checkRows,
  checkDiagsPositive,
  checkDiagsNegative,
};
