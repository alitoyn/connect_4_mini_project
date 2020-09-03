function checkCols(row, column, localBoard, connectN) {
  if (row < connectN - 1) { // leave if too close to bottom of localBoard
    return false;
  }
  for (let i = 1; i < connectN; i++) {
    if (localBoard[row][column] === localBoard[row - i][column]) {
      if (i === connectN - 1) {
        console.log('column winner');
        return true;
      }
      continue;
    } else {
      break;
    }
  }
  return false;
}

// . get board, reset or init
function getBoard(rows, cols) {
  const board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    board[i].fill(null);
  }
  return board;
}

function checkRows(row, cols, board, connectN) {
  console.log('row checking...');
  for (let i = 0; i < cols - connectN + 1; i++) { // looping pointer across column
    if (board[row][i] === null) { // if the pointer is at a null slot, skip this iteration
      console.log('was null');
      continue;
    }

    // check the next token along as far as the win amount
    for (let j = i + 1; j <= i + connectN; j++) {
      if (board[row][i] === board[row][j]) { // if it is equal ...
        console.log(j + ' in a row');
        if (j === i + connectN - 1) { // check to see if it is the last one in the chain
          console.log('row winner'); // if it it, then we have a winner
          return true;
        }
      } else { // if the if statement failed, move the pointer to the next iteration
        break;
      }
    }
  }
  return false;
}

function checkDiagsPositive() {
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
            console.log('positive diag winner'); // if it it, then we have a winner
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

function checkDiagsNegative(row, column) {
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
            console.log('negative diag winner'); // if it it, then we have a winner
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

function returnLastChar(string) {
  return string[string.length - 1];
}

// eslint-disable-next-line no-global-assign
module = module || {};
module.exports = {
  checkCols,
  getBoard,
  checkRows,
};
