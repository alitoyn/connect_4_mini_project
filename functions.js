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

function updateHTML(board) {
  // update buttons with current player token
  for (let i = 0; i < cols; i++) {
    const buttonInnerText = playerCount % 2 === 0 ? '🟡' : '🔴';
    $(`#button${i}`).text(buttonInnerText);
  }

  // match the html board to the array
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === null) {
        $(`#row-${i}-column-${j}`).text('🟣');
      } else if (board[i][j] === 'y') {
        $(`#row-${i}-column-${j}`).text('🟡');
      } else {
        $(`#row-${i}-column-${j}`).text('🔴');
      }
    }
  }
}

function resetBoard() {
  board = getBoard(rows, cols);
  if (winner === true) {
    $('#grid').css('background-color', 'darkblue');
  }
  winner = false;
  updateHTML(board);
}

function winnerNotification(winner) {
  const player = winner === 'y' ? 'yellow' : 'red';
  $('#grid').css('background-color', player);
}

function buttonClick(event) {
  let button = event.target.id;
  if (button === 'reset') {
    resetBoard();
  } else {
    if (winner === true) { // if the winner flag as not been reset, don't change anything
      return;
    }
    button = button[button.length - 1];
    for (let i = 0; i < rows; i++) {
      if (board[i][button] === null) { // if the selected cell is empty
        // put the right token in the cell
        board[i][button] = playerCount % 2 === 0.0 ? 'y' : 'r';
        playerCount++;
        // update the board
        updateHTML(board);
        console.log('checking for a winner...');
        // check for a winner
        if (checkCols(i, button, board, connectN)
          || checkRows(i, cols, board, connectN)
          || checkDiagsPositive()
          || checkDiagsNegative()) {
          winner = true;
          winnerNotification(board[i][button]);
        }
        break;
      }
    }
  }
}

// eslint-disable-next-line no-global-assign
module = module || {};
module.exports = {
  checkCols,
  getBoard,
  checkRows,
};
