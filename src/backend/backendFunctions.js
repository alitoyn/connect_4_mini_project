const fs = require('fs').promises;

function isRequestValid(gameState, requestedColumn) {
  if (typeof (requestedColumn) !== 'number' || requestedColumn >= gameState.cols) {
    throw new Error('Request is not valid');
  } else {
    return true;
  }
}

function tokenTooCloseToBottom(row, winCondition) {
  if (typeof (row) !== 'number') {
    throw new Error('Invalid request - row arg should be a number');
  }
  return row < winCondition - 1;
}

function pointerEqualToLastCheckpoint(pointer, winCondition) {
  if (typeof (pointer) !== 'number') {
    throw new Error('Invalid request - pointer arg should be a number');
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
    throw new Error('Invalid request - args should be strings');
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
      // eslint-disable-next-line no-continue
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
        // eslint-disable-next-line no-continue
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
        // eslint-disable-next-line no-continue
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
    throw new Error('Input was not a string');
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

function returnUserObject(data, key, passedData) {
  const userIndex = data.findIndex((user) => user[key] === passedData);
  const userObject = data[userIndex];
  return userObject;
}

function returnUserGameData(userObject) {
  return userObject.gameData[0];
}

function createUser(dataObject, username, password, cookie) {
  const dataObjectCopy = JSON.parse(JSON.stringify(dataObject));
  dataObjectCopy[dataObjectCopy.length] = {};
  dataObjectCopy[dataObjectCopy.length - 1].username = username;
  dataObjectCopy[dataObjectCopy.length - 1].password = password;
  dataObjectCopy[dataObjectCopy.length - 1].token = cookie;
  dataObjectCopy[dataObjectCopy.length - 1].gameData = [{
    board: [],
    name: username,
    rows: 6,
    cols: 7,
    turnCount: 0,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }];
  dataObjectCopy[dataObjectCopy.length - 1].gameData[0].board = getBoard(
    dataObjectCopy[dataObjectCopy.length - 1].gameData[0].rows,
    dataObjectCopy[dataObjectCopy.length - 1].gameData[0].cols,
  );

  return dataObjectCopy;
}

async function checkDataObjectFileExists() {
  try {
    await fs.writeFile('./src/backend/secrets.json', JSON.stringify([]), { encoding: 'utf-8', flag: 'wx' });
    // eslint-disable-next-line no-console
    console.log('created data object file');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('found data object file');
  }
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
    returnUserObject,
    returnUserGameData,
    createUser,
    checkDataObjectFileExists,
  };
}
