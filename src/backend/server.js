const express = require('express');
const {
  checkCols,
  getBoard,
  checkRows,
  checkDiagsPositive,
  checkDiagsNegative,
  checkWinner,
  getFirstEmptyRow,
  getPlayerScoreKey,
  increasePlayerScore,
} = require('./logicalFunctions.js');

const app = express();
app.use(express.json());

const port = 8080;
const gameState = {
  board: [],
  rows: 6,
  cols: 7,
  turnCount: 0,
  winner: false,
  winCondition: 4,
  player1Score: 0,
  player2Score: 0,
};

gameState.board = getBoard(gameState.rows, gameState.cols);

// endpoints
// GET, POST /state
// post requires a body that lists the type of decision
// e.g. move/reset/newroom?
// then returns the updated state of the game
// get gets the current state of the game

app.get('/', (req, res) => {
  res.json('Welcome to connect 4. please read the docs to find the right endpoints').send();
});

app.get('/state', (req, res) => {
  res.json(gameState).send();
});

app.post('/reset', (req, res) => {
  gameState.board = getBoard(gameState.rows, gameState.cols);
  res.json(gameState).send();
});

app.post('/move', (req, res) => {
  if(parseInt(req.body.button) > gameState.cols - 1) {
    res.status(406).json('selected column is out of range').send();
  }
  if(!gameState.winner) {
    const selectedColumn = parseInt(req.body.button);
    const selectedRow = getFirstEmptyRow(gameState.board, selectedColumn);
    if (selectedRow !== null) {
      gameState.board[selectedRow][selectedColumn] = gameState.turnCount % 2 === 0 ? 'y' : 'r';
      console.log(gameState.board);
      gameState.turnCount++;
      gameState.winner = checkWinner(selectedRow, selectedColumn,
        gameState.board, gameState.winCondition);
      if (gameState.winner) {
        const playerScoreKey = getPlayerScoreKey(gameState,
          gameState.board[selectedRow][selectedColumn]);
        gameState[playerScoreKey] = increasePlayerScore(gameState, playerScoreKey);
      }
      res.json(gameState).send();
    } else {
        res.status(406).json('selected column is full').send();
    }
  } else {
    res.status(406).json('there is a winner, please reset the game').send();
  }
});

app.use((req, res) => {
  res.status(404).send("<html><body><h1>404</h1><img src='https://media3.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif'></img><br>This is not the endpoint you are looking for</body></html>");
});

app.listen(port, () => {
  console.log('listening on port ' + port + '...');
});
