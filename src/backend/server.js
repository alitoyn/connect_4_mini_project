const express = require('express');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');

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

app.get('/reset', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const { token } = req.cookies;
  const userIndex = data.findIndex((user) => user.token === token);
  const userObject = data[userIndex];

  userObject.gameData[0].board = getBoard(userObject.gameData[0].rows, userObject.gameData[0].cols);
  userObject.gameData[0].winner = false;
  userObject.gameData[0].draw = false;
  fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
  res.json(userObject.gameData[0]);
});

app.post('/move', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const { token } = req.cookies;
  const userIndex = data.findIndex((user) => user.token === token);
  const userObject = data[userIndex];

  if (checkArrayForLastTurn(userObject.gameData[0].board)) {
    userObject.gameData[0].draw = true;
  }

  const selectedColumn = parseInt(req.body.button, 10);
  if (!isRequestValid(userObject.gameData[0], selectedColumn)) {
    res.status(406).json('The selected column is out of range');
    return;
  }

  if (!userObject.gameData[0].winner) {
    const selectedRow = getFirstEmptyRow(userObject.gameData[0].board, selectedColumn);
    if (selectedRow !== null) {
      userObject.gameData[0].board[selectedRow][selectedColumn] = userObject.gameData[0].turnCount % 2 === 0 ? 'y' : 'r';
      userObject.gameData[0].turnCount++;
      userObject.gameData[0].winner = checkWinner(selectedRow, selectedColumn,
        userObject.gameData[0].board, userObject.gameData[0].winCondition);
      if (userObject.gameData[0].winner) {
        const playerScoreKey = getPlayerScoreKey(userObject.gameData[0],
          userObject.gameData[0].board[selectedRow][selectedColumn]);
        userObject.gameData[0][playerScoreKey] = increasePlayerScore(
          userObject.gameData[0], playerScoreKey,
        );
      }
      fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
      res.json(userObject.gameData[0]);
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

    res.cookie('token', cookie, { sameSite: true });
    console.log(data[userIndex].gameData);

    fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
    res.status(200).json(data[userIndex].gameData[0]);
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
