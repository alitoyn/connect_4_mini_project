const express = require('express');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const {
  getBoard,
  checkWinner,
  getFirstEmptyRow,
  getPlayerScoreKey,
  increasePlayerScore,
  checkArrayForLastTurn,
  isRequestValid,
  returnUserObject,
  returnUserGameData,
  createUser,
  checkDataObjectFileExists,
} = require('./backendFunctions.js');

const app = express();
app.use(express.json());
app.use(express.static('./src/frontend/'));
app.use(cookieParser());

const port = 3000;

checkDataObjectFileExists();

app.get('/info', (req, res) => {
  res.json('Welcome to connect 4. please read the docs to find the right endpoints');
});

app.get('/reset', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const { token } = req.cookies;
  const userObject = returnUserObject(data, 'token', token);
  const gameData = returnUserGameData(userObject);

  gameData.board = getBoard(gameData.rows, gameData.cols);
  gameData.winner = false;
  gameData.draw = false;
  fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
  res.json(gameData);
});

app.get('/reset-scores', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const { token } = req.cookies;
  const userObject = returnUserObject(data, 'token', token);
  const gameData = returnUserGameData(userObject);

  gameData.board = getBoard(gameData.rows, gameData.cols);
  gameData.winner = false;
  gameData.draw = false;
  gameData.player1Score = 0;
  gameData.player2Score = 0;
  fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
  res.json(gameData);
});

app.post('/move', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);
  const { token } = req.cookies;
  const userIndex = data.findIndex((user) => user.token === token);
  const userObject = data[userIndex];
  const gameData = returnUserGameData(userObject);

  if (checkArrayForLastTurn(gameData.board)) {
    gameData.draw = true;
    // res.status(400).json('The game is a draw');
  }
  const selectedColumn = parseInt(req.body.button, 10);
  if (!isRequestValid(gameData, selectedColumn)) {
    res.status(400).json('The selected column is out of range');
    return;
  }

  if (!gameData.winner) {
    const selectedRow = getFirstEmptyRow(gameData.board, selectedColumn);
    if (selectedRow !== null) {
      gameData.board[selectedRow][selectedColumn] = gameData.turnCount % 2 === 0 ? 'y' : 'r';
      gameData.turnCount += 1;
      gameData.winner = checkWinner(selectedRow, selectedColumn,
        gameData.board, gameData.winCondition);
      if (gameData.winner) {
        const playerScoreKey = getPlayerScoreKey(gameData,
          gameData.board[selectedRow][selectedColumn]);
        gameData[playerScoreKey] = increasePlayerScore(gameData, playerScoreKey);
      }
      fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
      res.json(gameData);
    } else {
      res.status(400).json('The selected column is full');
    }
  } else {
    res.status(400).json('There is a winner, please reset the game');
  }
});

app.post('/login', async (req, res) => {
  let data = await fs.readFile('./src/backend/secrets.json', 'utf-8');
  data = JSON.parse(data);

  const sentUser = req.body.username;
  const sentPass = req.body.password;
  const hashedPassword = bcrypt.hashSync(sentPass, saltRounds);

  // find index of user in data structure
  const userIndex = data.findIndex((user) => user.username === sentUser);

  if (userIndex === -1) { // if it doesn't exist
    const cookie = randomstring.generate(7);
    data = createUser(data, sentUser, hashedPassword, cookie);

    res.cookie('token', cookie, { sameSite: true });
    fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
    res.status(200).json(data[data.length - 1].gameData[0]);
  } else if (bcrypt.compareSync(sentPass, data[userIndex].password)) {
    const cookie = randomstring.generate(7);
    data[userIndex].token = cookie;

    res.cookie('token', cookie, { sameSite: true });

    fs.writeFile('./src/backend/secrets.json', JSON.stringify(data), 'utf-8');
    res.status(200).json(data[userIndex].gameData[0]);
  } else {
    res.status(401).json('incorrect password');
  }
});

app.use((req, res) => {
  res.status(404).send("<html><body><h1>404</h1><img src='https://media3.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif'></img><br>This is not the endpoint you are looking for</body></html>");
});

/* istanbul ignore next  */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${port}...`);
  });
}

module.exports = { app };
