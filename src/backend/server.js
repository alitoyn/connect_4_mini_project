const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');

dotenv.config();
const apiKey = process.env.APIKEY;

const {
  getBoard,
  checkWinner,
  getFirstEmptyRow,
  getPlayerScoreKey,
  increasePlayerScore,
  checkArrayForLastTurn,
  isRequestValid,
} = require('./backendFunctions.js');

const app = express();
app.use(express.json());
app.use(express.static('./src/frontend/'));
app.use(cookieParser());

const port = 8080;
const gameState = {
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

app.get('/info', (req, res) => {
  res.json('Welcome to connect 4. please read the docs to find the right endpoints');
});

app.get('/state', (req, res) => {
  res.json(gameState);
});

app.get('/reset', (req, res) => {
  console.log(req.cookies);
  gameState.board = getBoard(gameState.rows, gameState.cols);
  gameState.winner = false;
  gameState.draw = false;
  res.json(gameState);
});

app.post('/move', (req, res) => {
  if (checkArrayForLastTurn(gameState.board)) {
    gameState.draw = true;
  }

  const selectedColumn = parseInt(req.body.button, 10);
  if (!isRequestValid(gameState, selectedColumn)) {
    res.status(406).json('The selected column is out of range');
    return;
  }

  if (!gameState.winner) {
    const selectedRow = getFirstEmptyRow(gameState.board, selectedColumn);
    if (selectedRow !== null) {
      gameState.board[selectedRow][selectedColumn] = gameState.turnCount % 2 === 0 ? 'y' : 'r';
      gameState.turnCount++;
      gameState.winner = checkWinner(selectedRow, selectedColumn,
        gameState.board, gameState.winCondition);
      if (gameState.winner) {
        const playerScoreKey = getPlayerScoreKey(gameState,
          gameState.board[selectedRow][selectedColumn]);
        gameState[playerScoreKey] = increasePlayerScore(gameState, playerScoreKey);
      }
      res.json(gameState);
    } else {
      res.status(406).json('The selected column is full');
    }
  } else {
    res.status(406).json('There is a winner, please reset the game');
  }
});

app.post('/login', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const sentUser = req.body.username;
  const sentPass = req.body.password;

  // find index of user in data structure
  const userIndex = data.findIndex((user) => user.username === sentUser);

  if (userIndex === -1) { // if it doesn't exist
    res.status(404).json('user does not exist');
  } else if (sentPass === data[userIndex].password) {
    const cookie = randomstring.generate(7);
    data[userIndex].token = cookie;
    fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
    res.cookie('token', cookie, { sameSite: true });
    res.json('login user');
  } else {
    res.status(401).json('incorrect password');
  }
});

app.use((req, res) => {
  res.status(404).send("<html><body><h1>404</h1><img src='https://media3.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif'></img><br>This is not the endpoint you are looking for</body></html>");
});

app.listen(port, () => {
  console.log('listening on port ' + port + '...');
});
