// eslint-disable-next-line no-unused-vars
const each = require('jest-each').default;

const supertest = require('supertest');
const mock = require('mock-fs');
const bcrypt = require('bcrypt');

const { app } = require('../src/backend/server');

const request = supertest(app);

const saltRounds = 10;

// eslint-disable-next-line import/no-extraneous-dependencies
require('iconv-lite').encodingExists('foo');

const hashedPassword = bcrypt.hashSync('123', saltRounds);

const dataObject = [{
  username: 'coolusername123',
  password: hashedPassword,
  token: 'RandomToken',
  gameData: [{
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'coolusername123',
  password: hashedPassword,
  token: 'RandomToken_2',
  gameData: [{
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 17,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'fullColumnTest',
  password: hashedPassword,
  token: 'fullColumnTest_token',
  gameData: [{
    board: [['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'lastTurnTest',
  password: hashedPassword,
  token: 'lastTurnTest_token',
  gameData: [{
    board: [['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: true,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'singleWinnerTest',
  password: hashedPassword,
  token: 'singleWinnerTest_token',
  gameData: [{
    board: [['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null],
      ['yellow', null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: true,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'makeWinningMove',
  password: hashedPassword,
  token: 'makeWinningMove_token',
  gameData: [{
    board: [['y', null, null, null, null, null, null],
      ['y', null, null, null, null, null, null],
      ['y', null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 0,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
}];

beforeEach(() => {
  mock({
    './src/backend/': {
      'secrets.json': JSON.stringify(dataObject),
    },
    './src/frontend/': {
      'index.html': JSON.stringify('<html></html>'),
    },
  });
});

afterEach(() => {
  mock.restore();
});

describe('/', () => {
  it('returns a html file', async (done) => {
    await request.get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8');
    done();
  });
  it('returns a 200 success code', async (done) => {
    await request.get('/')
      .expect(200);
    done();
  });
});

describe('/info', () => {
  it('returns 200 success when called', async (done) => {
    await request.get('/info')
      .expect(200);
    done();
  });
  it('returns a json file', async (done) => {
    await request.get('/info')
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
  it('returns the correct message', async (done) => {
    await request.get('/info')
      .expect('"Welcome to connect 4. please read the docs to find the right endpoints"');
    done();
  });
});

describe('/reset', () => {
  it('returns 200', async (done) => {
    await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  // TODO requesting reset without a valid token
  test.todo('refactor reset for no matching token and test');
});

describe('/reset-scores', () => {
  it('returns 200', async (done) => {
    await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
});

describe('/move', () => {
  const body = {
    button: '0',
  };

  it('returns 200 for correct move', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json for correct move', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns 200 and json for correct second move', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken_2'])
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns error 400 if board is full', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns correct message for a full board', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('"The game is a draw"');
    done();
  });

  it('returns correct error for full column', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=fullColumnTest_token'])
      .expect(400)
      .expect('"The selected column is full"');
    done();
  });

  it('returns correct error invalid selected column', async (done) => {
    await request
      .post('/move')
      .send({
        button: '50',
      })
      .set('Cookie', ['token=RandomToken'])
      .expect(400)
      .expect('"The selected column is out of range"');
    done();
  });

  it('returns error when there is a winner', async (done) => {
    await request
      .post('/move')
      .send({
        button: '1',
      })
      .set('Cookie', ['token=singleWinnerTest_token'])
      .expect(400)
      .expect('"There is a winner, please reset the game"');
    done();
  });

  it('winner flag flipped when winning move is made', async (done) => {
    await request
      .post('/move')
      .send({
        button: '0',
      })
      .set('Cookie', ['token=makeWinningMove_token'])
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            winner: true,
          }),
        );
      });
    done();
  });
});

describe('/login', () => {
  const bodyNewUser = {
    username: 'otherCoolUsername',
    password: '123',
  };

  const bodyExistingUser = {
    username: 'coolusername123',
    password: '123',
  };

  const dataExistingUser = {
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  };

  const dataNewUser = {
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'otherCoolUsername',
    rows: 6,
    cols: 7,
    turnCount: 0,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  };

  it('returns 200 for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect(200);
    done();
  });

  it('returns a json for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns the correct body data for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect(dataExistingUser);
    done();
  });

  it('returns 200 for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect(200);
    done();
  });

  it('returns a json for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns the correct body data for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect(dataNewUser);
    done();
  });

  it('returns 401 with incorrect password', async (done) => {
    await request
      .post('/login')
      .send({
        username: 'coolusername123',
        password: 'incorrect',
      })
      .expect(401);
    done();
  });

  it('returns correct message for incorrect password', async (done) => {
    await request
      .post('/login')
      .send({
        username: 'coolusername123',
        password: 'incorrect',
      })
      .expect('"incorrect password"');
    done();
  });
});

describe('hit an invalid endpoint', () => {
  it('return 404 error', async (done) => {
    await request
      .get('/non-existent-endpoint')
      .expect(404)
      .expect('Content-Type', 'text/html; charset=utf-8');
    done();
  });
});
